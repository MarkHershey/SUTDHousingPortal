from typing import List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import ReturnDocument

from ..access_utils import Access
from ..auth import AuthHandler
from ..constants import ApStatus
from ..database import *
from ..error_msg import ErrorMsg as MSG
from ..functional import clean_dict, convert_date_to_datetime
from ..models.application import ApplicationForm, ApplicationPeriod, TimePeriod
from .application_helpers import validate_AP

router = APIRouter(prefix="/api/applications", tags=["Housing Applications"])
auth_handler = AuthHandler()


@router.get("/", response_model=List[ApplicationForm])
async def get_all_applications(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Application Forms

    Require: Admin-read
    """
    logger.debug(f"User({username}) fetching all records info")

    permission_ok: bool = Access.is_admin(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    application_list = []
    try:
        for application in applications_collection.find():
            clean_dict(application)
            application_list.append(application)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    return application_list


@router.post("/", status_code=201, response_model=ApplicationForm)
async def submit_application(
    application_form: ApplicationForm, username=Depends(auth_handler.auth_wrapper)
):
    """
    Submit a new Application Form to database

    Require: Student-self or Admin-write
    """
    logger.debug(f"User({username}) trying creating new Application.")

    # 0. check if student exists
    target_student: str = application_form.student_id
    if not target_student or not Access.is_student(target_student):
        logger.debug("Student does not exist.")
        raise HTTPException(status_code=400, detail=MSG.TARGET_ITEM_NOT_FOUND)

    # Check access
    permission_ok = (username == target_student) or Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    # get student's intended stay period
    stay_period: TimePeriod = application_form.stay_period
    start_datetime = convert_date_to_datetime(stay_period.start_date)
    end_datetime = convert_date_to_datetime(stay_period.end_date)
    stay_period_dict = {
        "start_date": start_datetime,
        "end_date": end_datetime,
    }
    # validate application period
    # make sure only one application per student for an application period
    # validate stay period, cross check with allowable period
    AP_uid: str = application_form.application_period_uid
    if not validate_AP(AP_uid, target_student, stay_period):
        raise HTTPException(status_code=400, detail=MSG.INVALID_APPLICATION)

    # set values by this action
    application_form.created_by = str(username)
    application_form.visible_status = ApStatus.SUBMIT
    application_form.internal_status = ApStatus.SUBMIT
    # cast data to dict
    application_dict = dict(application_form.dict())
    application_dict["stay_period"] = stay_period_dict

    # start database transaction
    try:
        with client.start_session() as session:
            with session.start_transaction():

                # insert application
                _inserted_id = applications_collection.insert_one(
                    document=application_dict,
                    session=session,
                ).inserted_id
                logger.debug(f"New Application inserted: {application_dict}")
                # add application uid to student profile
                _updated = students_collection.find_one_and_update(
                    filter={"student_id": target_student},
                    update={"$push": {"applications": application_form.uid}},
                    return_document=ReturnDocument.AFTER,
                    session=session,
                )
                logger.debug(f"Student Updated: {str(_updated)}")
                # increate application period reference count
                # add student to application map
                _updated = application_periods_collection.find_one_and_update(
                    filter={"uid": AP_uid},
                    update={
                        "$inc": {"reference_count": 1},
                        "$set": {
                            "application_forms_map": {
                                target_student: application_form.uid
                            }
                        },
                    },
                    return_document=ReturnDocument.AFTER,
                    session=session,
                )
                logger.debug(f"AP Updated: {str(_updated)}")

    except Exception as e:
        logger.error(f"New Application failed to be inserted to DB: {application_dict}")
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)

    return application_dict


@router.get("/{uid}", response_model=ApplicationForm)
async def get_an_application_info(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get an ApplicationForm info

    Require: Student-self or Admin-read
    """
    # Special case, check permission after getting item from DB
    logger.debug(f"User({username}) fetching record({uid}) info")
    try:
        application_dict: dict = applications_collection.find_one({"uid": uid})
        clean_dict(application_dict)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    if not application_dict:
        raise HTTPException(status_code=404, detail=MSG.ITEM_NOT_FOUND)

    # Student-self can access DisciplinaryRecord issued to himself/herself.
    application_owner = application_dict.get("student_id", "")
    permission_ok = Access.is_admin(username)
    permission_ok = True if username == application_owner else permission_ok
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    return application_dict


@router.put("/{uid}")
async def update_application(
    uid: str,
    application_form: ApplicationForm,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Update (Overwrite) an ApplicationForm info

    Require: Admin-write
    """
    # TODO:
    pass


@router.delete("/{uid}")
async def delete_application(
    uid: str,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Delete an ApplicationForm info

    Require: Admin-write
    """
    # TODO:
    pass


@router.post("/{uid}/offer")
async def approve_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Approve an Application

    Require: Admin-write
    """
    # TODO:
    pass


@router.post("/{uid}/waitlist")
async def waitlist_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Waitlist an Application

    Require: Admin-write
    """
    # TODO:
    pass


@router.post("/{uid}/reject")
async def reject_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Reject an Application

    Require: Admin-write
    """
    # TODO:
    pass
