from datetime import date, datetime
from typing import Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import DESCENDING

from ..access_utils import Access
from ..auth import AuthHandler
from ..database import *
from ..error_msg import ErrorMsg as MSG
from ..functional import clean_dict
from ..models.application import ApplicationPeriod

router = APIRouter(
    prefix="/api/application_periods", tags=["Housing Application Periods"]
)
auth_handler = AuthHandler()


@router.get("/all", response_model=List[ApplicationPeriod])
async def get_all_application_periods(username=Depends(auth_handler.auth_wrapper)):
    """
    Get ALL Application Periods

    Require: Admin-read
    """

    logger.debug(f"User({username}) fetching ALL ApplicationPeriods.")
    permission_ok = Access.is_admin(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    ap_list = []
    try:
        for ap_dict in application_periods_collection.find().sort(
            "created_by", DESCENDING
        ):
            clean_dict(ap_dict)
            ap_list.append(ap_dict)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    return ap_list


@router.get("/", response_model=List[ApplicationPeriod])
async def get_active_application_periods(username=Depends(auth_handler.auth_wrapper)):
    """
    Get Active (currently open) Application Periods

    Require: Any authenticated user
    """

    logger.debug(f"User({username}) fetching active ApplicationPeriods")
    ap_list = []
    _now = datetime.now()
    try:
        for ap_dict in application_periods_collection.find(
            {
                "application_window_open": {"$gte": _now},
                "application_window_close": {"$lt": _now},
            }
        ).sort("application_window_open"):
            clean_dict(ap_dict)
            ap_list.append(ap_dict)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    return ap_list


@router.post("/", response_model=ApplicationPeriod, status_code=201)
async def create_new_application_period(
    ap: ApplicationPeriod, username=Depends(auth_handler.auth_wrapper)
):
    """
    Create an ApplicationPeriod

    Require: Admin-write
    """
    permission_ok = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    ap.created_by = str(username)
    ap_dict = dict(ap.dict())
    try:
        _inserted_id = application_periods_collection.insert_one(ap_dict).inserted_id
        logger.debug(
            f"New ApplicationPeriod inserted to DB with inserted_id: {_inserted_id}"
        )
        logger.debug(f"New ApplicationPeriod info: {ap_dict}")
        return ap_dict
    except Exception as e:
        logger.error(MSG.DB_UPDATE_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)


@router.delete("/{uid}")
async def delete_an_application_period(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Delete an ApplicationPeriod

    Require: Admin-write
    """
    permission_ok = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    try:
        ap_info = application_periods_collection.find_one(filter={"uid": uid})
        clean_dict(ap_info)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    if ap_info:
        ref_count = ap_info.get("reference_count", -1)
        if ref_count == 0:
            try:
                application_periods_collection.delete_one({"uid": uid})
            except Exception as e:
                logger.error(MSG.DB_UPDATE_ERROR)
                logger.error(e)
                raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)
        else:
            if ref_count == -1:
                logger.error(
                    f"Unexpected error: cannot get reference count from ApplicationPeriod({uid})"
                )
            else:
                logger.debug(
                    f"User({username}) attempted to delete ApplicationPeriod({uid}) with reference count({ref_count}) > 0"
                )
            raise HTTPException(status_code=400, detail=MSG.DEL_REF_COUNT_ERR)
    else:
        raise HTTPException(status_code=404, detail=MSG.TARGET_ITEM_NOT_FOUND)


@router.get("/{uid}", response_model=ApplicationPeriod)
async def get_an_application_period(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get an Application Period

    Require: Admin-read
    """
    logger.debug(f"User({username}) requested to get ApplicationPeriod({uid}).")
    permission_ok = Access.is_admin(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    try:
        ap_info = application_periods_collection.find_one(filter={"uid": uid})
        clean_dict(ap_info)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    if ap_info:
        return ap_info
    else:
        raise HTTPException(status_code=404, detail=MSG.ITEM_NOT_FOUND)
