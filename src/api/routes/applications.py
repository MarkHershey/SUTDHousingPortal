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

router = APIRouter(prefix="/api/applications", tags=["applications"])
auth_handler = AuthHandler()


@router.get("/")
async def get_all_applications(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Application Forms
    Require: Admin-read
    """
    # TODO:
    pass


@router.post("/", status_code=201)
async def submit_application(
    application_form: ApplicationForm, username=Depends(auth_handler.auth_wrapper)
):
    """
    Submit a new Application Form to database
    Require: Student-self or Admin-write
    """
    # TODO:
    pass


@router.get("/{uid}")
async def get_an_application_info(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get an ApplicationForm info
    Require: Student-self or Admin-read
    """
    # TODO:
    pass


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
