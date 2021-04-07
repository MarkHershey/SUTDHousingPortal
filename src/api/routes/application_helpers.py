from datetime import datetime
from typing import Dict, List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import ReturnDocument

from ..access_utils import Access
from ..auth import AuthHandler
from ..constants import ApStatus
from ..database import *
from ..error_msg import ErrorMsg as MSG
from ..functional import clean_dict, convert_datetime_to_date
from ..models.application import ApplicationForm, ApplicationPeriod, TimePeriod


def validate_AP(AP_uid: str, student_id: str, stay_period: TimePeriod) -> bool:
    """
    This method does the following checks to ensure incoming Application Form is valid.

    1. Check if target ApplicationPeriod exists in DB.
    2. Check if current time fall in between the valid application window.
    3. Check if current student is among the eligible students in the particular ApplicationPeriod.
    4. Check if current student has already submitted an application for this particular ApplicationPeriod.
    5. Check if the stay period specified by the student is valid options in this particular ApplicationPeriod.
    """
    _now = datetime.now()
    try:
        ap_dict = application_periods_collection.find_one({"uid": AP_uid})
        clean_dict(ap_dict)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    if not ap_dict:
        logger.info(f"ApplicationPeriod '{AP_uid}' Not Found")
        return False

    window_open_dt = ap_dict.get("application_window_open")
    window_close_dt = ap_dict.get("application_window_close")
    if not window_open_dt <= _now <= window_close_dt:
        logger.info(
            f"Student({student_id}) attempted submitting application to ApplicationPeriod({AP_uid})"
        )
        logger.info(f"Failed. Not in Application Window: {AP_uid}")
        return False

    application_forms_map: Dict[str, str] = ap_dict.get("application_forms_map")
    if student_id not in application_forms_map:
        logger.info(
            f"Ineligible Student({student_id}) attempted submitting application to ApplicationPeriod({AP_uid})"
        )
        return False
    if application_forms_map[student_id] != "":
        logger.info(
            f"Illegal second submission by Student({student_id}) to ApplicationPeriod({AP_uid})"
        )
        return False

    u_start_date = stay_period.start_date
    u_end_date = stay_period.end_date
    applicable_periods: List[Dict[str, datetime]] = ap_dict.get("applicable_periods")
    period_matched = False
    for _period in applicable_periods:
        start_date = convert_datetime_to_date(_period.get("start_date"))
        end_date = convert_datetime_to_date(_period.get("end_date"))
        if u_start_date == start_date and u_end_date == end_date:
            logger.debug("Stay Period Matched!")
            period_matched = True
            break
    if not period_matched:
        logger.info(
            f"Illegal Stay Period by Student({student_id}) to ApplicationPeriod({AP_uid})"
        )
        return False

    return True


def convert_to_applicable_periods(
    applicable_periods_dicts: List[Dict[str, datetime]]
) -> List[TimePeriod]:
    applicable_periods = []
    for period in applicable_periods_dicts:
        applicable_periods.append(TimePeriod.from_datetime_dict(period))
    return applicable_periods


def convert_from_applicable_periods(
    applicable_periods: List[TimePeriod],
) -> List[Dict[str, datetime]]:
    applicable_periods_dicts = []
    for period in applicable_periods:
        applicable_periods_dicts.append(period.to_datetime_dict())
    return applicable_periods_dicts


def update_application_status(uid: str, new_status: str):
    pass