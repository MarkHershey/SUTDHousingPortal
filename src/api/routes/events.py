from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger

from ..auth import AuthHandler
from ..database import *
from ..models.application import ApplicationForm, ApplicationPeriod
from ..models.lifestyle import LifestyleProfile
from ..models.record import DisciplinaryRecord
from ..models.room import Room, RoomProfile
from ..models.student import (
    Student,
    StudentIdentityProfile,
    StudentProfile,
    StudentSettingsProfile,
)
from ..models.user import Admin, User
from ..utils import clean_dict

router = APIRouter(prefix="/api/events", tags=["events"])
auth_handler = AuthHandler()


@router.get("/")
def get_all_events(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Events
    Require: Any User
    """
    # TODO:
    pass


@router.post("/", status_code=201)
def create_event(username=Depends(auth_handler.auth_wrapper)):
    """
    Create an Event
    Require: Any User
    """
    # TODO:
    pass


@router.get("/{uid}")
def get_all_events(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Get an Event info
    Require: Any User
    """
    # TODO:
    pass
