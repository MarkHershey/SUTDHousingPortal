""" Application Exercises (ApExs) """
from typing import Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger

from ..auth import AuthHandler
from ..database import *
from ..models.application import ApplicationForm, ApplicationPeriod
from ..models.lifestyle import LifestyleProfile
from ..models.record import DisciplinaryRecord
from ..models.room import Room, RoomProfile
from ..models.user import Admin, User
from ..utils import clean_dict

router = APIRouter(prefix="/api/application_periods", tags=["application_periods"])
auth_handler = AuthHandler()


@router.get("/", response_model=List[ApplicationPeriod])
async def get_all_application_periods(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Application Periods
    Require: Admin-read
    """
    # TODO:
    pass


@router.post("/", response_model=List[ApplicationPeriod])
async def create_new_application_period(
    ap: ApplicationPeriod, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get all Application Periods
    Require: Admin-write
    """
    # TODO:
    pass


@router.get("/", response_model=ApplicationPeriod)
async def get_an_application_period(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get an Application Period
    Require: Admin-read
    """
    # TODO:
    pass
