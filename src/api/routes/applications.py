from typing import Dict, List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import ReturnDocument

from ..access_utils import Access
from ..auth import AuthHandler
from ..constants import AFStatus
from ..database import *
from ..error_msg import ErrorMsg as MSG
from ..functional import clean_dict, convert_date_to_datetime
from ..models.application import ApplicationForm, ApplicationPeriod, TimePeriod
from .application_helpers import validate_new_application

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
        raise HTTPException(status_code=404, detail=MSG.TARGET_ITEM_NOT_FOUND)

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
    if not validate_new_application(AP_uid, target_student, stay_period):
        raise HTTPException(status_code=400, detail=MSG.INVALID_APPLICATION)

    # set values by this action
    application_form.created_by = str(username)
    application_form.visible_status = AFStatus.SUBMIT
    application_form.internal_status = AFStatus.SUBMIT
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
                    # NOTE: use dot notation to update field in dict in a document
                    update={"$push": {"application_uids": application_form.uid}},
                    return_document=ReturnDocument.AFTER,
                    session=session,
                )
                logger.debug(f"Student Updated: {str(_updated)}")
                # increate application period reference count
                # add application_form.uid to application map
                _updated = application_periods_collection.find_one_and_update(
                    filter={"uid": AP_uid},
                    update={
                        "$inc": {"reference_count": 1},
                        "$set": {
                            f"application_forms_map.{target_student}": application_form.uid
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
async def delete_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Delete an ApplicationForm info

    Require: Admin-write
    """
    logger.debug(f"{username} trying to delete an ApplicationForm")
    permission_ok = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    try:
        application_dict = applications_collection.find_one(filter={"uid": uid})
        owner_student = application_dict.get("student_id")
        AP_uid = application_dict.get("application_period_uid")
        clean_dict(application_dict)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    if not application_dict:
        raise HTTPException(status_code=404, detail=MSG.TARGET_ITEM_NOT_FOUND)

    try:
        with client.start_session() as session:
            with session.start_transaction():
                # delete application
                applications_collection.delete_one({"uid": uid})
                # remove application uid from student profile
                _updated = students_collection.find_one_and_update(
                    filter={"student_id": owner_student},
                    # NOTE: $pull Removes all array elements that match a specified query.
                    update={"$pull": {"application_uids": uid}},
                    return_document=ReturnDocument.AFTER,
                    session=session,
                )
                logger.debug(f"Student Updated: {str(_updated)}")
                # decrease application period reference count
                # remove uid from application map
                _updated = application_periods_collection.find_one_and_update(
                    filter={"uid": AP_uid},
                    update={
                        "$inc": {"reference_count": -1},
                        # NOTE: use dot notation to update field in dict in a document
                        "$unset": {f"application_forms_map.{owner_student}": uid},
                    },
                    return_document=ReturnDocument.AFTER,
                    session=session,
                )
                logger.debug(f"AP Updated: {str(_updated)}")

    except Exception as e:
        logger.error(MSG.DB_UPDATE_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)


def update_application_form_both_status(
    AF_uid: str, new_status: str = None, pre_status: List[str] = AFStatus.ALL
) -> dict:
    return update_application_form_status(
        AF_uid=AF_uid,
        new_internal_status=new_status,
        new_visible_status=new_status,
        pre_internal_status=pre_status,
        pre_visible_status=pre_status,
    )


def update_application_form_status(
    AF_uid: str,
    new_internal_status: str = None,
    new_visible_status: str = None,
    pre_internal_status: List[str] = AFStatus.ALL,
    pre_visible_status: List[str] = AFStatus.ALL,
) -> dict:

    # validate input
    if not hasattr(pre_internal_status, "__iter__"):
        logger.error(MSG.INVALID_STATUS_UPDATE_REQ)
        raise HTTPException(status_code=400, detail=MSG.INVALID_STATUS_UPDATE_REQ)
    for i in pre_internal_status:
        if i not in AFStatus.ALL:
            logger.error(MSG.INVALID_STATUS_UPDATE_REQ)
            raise HTTPException(status_code=400, detail=MSG.INVALID_STATUS_UPDATE_REQ)

    # validate input
    if not hasattr(pre_visible_status, "__iter__"):
        logger.error(MSG.INVALID_STATUS_UPDATE_REQ)
        raise HTTPException(status_code=400, detail=MSG.INVALID_STATUS_UPDATE_REQ)
    for i in pre_visible_status:
        if i not in AFStatus.ALL:
            logger.error(MSG.INVALID_STATUS_UPDATE_REQ)
            raise HTTPException(status_code=400, detail=MSG.INVALID_STATUS_UPDATE_REQ)

    # check target exists
    try:
        application_dict = applications_collection.find_one(filter={"uid": AF_uid})
        clean_dict(application_dict)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    if not application_dict:
        logger.error(MSG.TARGET_ITEM_NOT_FOUND)
        raise HTTPException(status_code=404, detail=MSG.TARGET_ITEM_NOT_FOUND)

    owner_student = application_dict.get("student_id")
    AP_uid = application_dict.get("application_period_uid")
    curr_internal_status = application_dict.get("internal_status")
    curr_visible_status = application_dict.get("visible_status")

    status_to_be_updated: Dict[str, str] = {}

    if new_internal_status is not None:
        # validate input
        if new_internal_status not in AFStatus.ALL:
            logger.error(MSG.INVALID_STATUS_UPDATE_REQ)
            raise HTTPException(status_code=400, detail=MSG.INVALID_STATUS_UPDATE_REQ)
        # check pre-condition
        if curr_internal_status not in pre_internal_status:
            logger.error(MSG.INVALID_PRE_STATUS)
            raise HTTPException(status_code=400, detail=MSG.INVALID_PRE_STATUS)

        status_to_be_updated["internal_status"] = new_internal_status
        logger.debug(
            f"ApplicationForm ({AF_uid}) internal_status to be updated from '{curr_internal_status}' to '{new_internal_status}'"
        )

    if new_visible_status is not None:
        # validate input
        if new_visible_status not in AFStatus.ALL:
            logger.error(MSG.INVALID_STATUS_UPDATE_REQ)
            raise HTTPException(status_code=400, detail=MSG.INVALID_STATUS_UPDATE_REQ)
        # check pre-condition
        if curr_visible_status not in pre_internal_status:
            logger.error(MSG.INVALID_PRE_STATUS)
            raise HTTPException(status_code=400, detail=MSG.INVALID_PRE_STATUS)

        status_to_be_updated["visible_status"] = new_visible_status
        logger.debug(
            f"ApplicationForm ({AF_uid}) visible_status to be updated from '{curr_visible_status}' to '{new_visible_status}'"
        )

    try:
        with client.start_session() as session:
            with session.start_transaction():
                # delete application
                _updated = applications_collection.find_one_and_update(
                    filter={"uid": AF_uid},
                    update={"$set": status_to_be_updated},
                    return_document=ReturnDocument.AFTER,
                    session=session,
                )
                clean_dict(_updated)
    except Exception as e:
        logger.error(MSG.DB_UPDATE_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)

    logger.debug(f"ApplicationForm Updated: {str(_updated)}")

    return _updated


@router.post("/{uid}/offer", response_model=ApplicationForm)
async def approve_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Approve an Application

    Require: Admin-write
    """
    logger.debug(f"{username} trying to offer (approve) an ApplicationForm")
    permission_ok = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    _updated = update_application_form_both_status(uid, AFStatus.OFFER)
    return _updated


@router.post("/{uid}/waitlist")
async def waitlist_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Waitlist an Application

    Require: Admin-write
    """
    logger.debug(f"{username} trying to waitlist an ApplicationForm")
    permission_ok = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    _updated = update_application_form_both_status(uid, AFStatus.WAITLIST)
    return _updated


@router.post("/{uid}/reject")
async def reject_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Reject an Application

    Require: Admin-write
    """
    logger.debug(f"{username} trying to reject an ApplicationForm")
    permission_ok = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    _updated = update_application_form_both_status(uid, AFStatus.REJECT)
    return _updated


def student_update_application_form_status(
    AF_uid: str, username: str, new_status: str, pre_status: List[str]
) -> dict:
    # Check access 1
    permission_ok = False
    if Access.is_student(username) or Access.is_admin_write(username):
        permission_ok = True

    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    # Check access 2: check if the application belongs to student
    if Access.is_student(username):
        try:
            student_info = students_collection.find_one({"student_id": username})
            clean_dict(student_info)
        except Exception as e:
            logger.error(MSG.DB_QUERY_ERROR)
            logger.error(e)
            raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

        student_application_uids = student_info.get("application_uids", [])

        if AF_uid not in student_application_uids:
            raise HTTPException(status_code=400, detail=MSG.NOT_YOUR_AF)

    _updated = update_application_form_both_status(AF_uid, new_status, pre_status)
    return _updated


@router.post("/{uid}/student_accept", response_model=ApplicationForm)
async def student_accept_offer(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Student to accept the offer in an Application

    Require: Student-self or Admin-write
    """
    logger.debug(f"{username} trying to accept the offer in an ApplicationForm")
    _updated = student_update_application_form_status(
        AF_uid=uid,
        username=username,
        new_status=AFStatus.ACCEPT,
        pre_status=[AFStatus.OFFER],
    )
    return _updated


@router.post("/{uid}/student_decline", response_model=ApplicationForm)
async def student_decline_offer(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Student to decline the offer in an Application

    Require: Student-self or Admin-write
    """
    logger.debug(f"{username} trying to decline the offer in an ApplicationForm")
    _updated = student_update_application_form_status(
        AF_uid=uid,
        username=username,
        new_status=AFStatus.DECLINE,
        pre_status=[AFStatus.OFFER],
    )
    return _updated


@router.post("/{uid}/student_withdraw", response_model=ApplicationForm)
async def student_withdraw_application(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Student to withdraw an Application

    Require: Student-self or Admin-write
    """
    logger.debug(f"{username} trying to withdraw an ApplicationForm")
    _updated = student_update_application_form_status(
        AF_uid=uid,
        username=username,
        new_status=AFStatus.WITHDRAW,
        pre_status=AFStatus.PRE_WITHDRAW,
    )
    return _updated
