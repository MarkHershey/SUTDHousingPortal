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

router = APIRouter(prefix="/api/records", tags=["records"])
auth_handler = AuthHandler()


@router.get("/")
async def get_all_disciplinary_record(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Disciplinary Records
    Require: Admin-read
    """
    # TODO:
    pass


@router.post("/", status_code=201)
async def add_disciplinary_record(
    record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Add a new DisciplinaryRecord to database
    Require: Admin-write
    """
    # TODO:
    pass


@router.get("/{uid}")
async def get_disciplinary_record(
    record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get a DisciplinaryRecord
    Require: Student-self or Admin-read
    """
    # TODO:
    pass


@router.put("/{uid}")
async def update_disciplinary_record(
    uid: str, record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Update a DisciplinaryRecord from database
    Require: Admin-write
    """
    logger.debug(f"{username} trying to update a DisciplinaryRecord")
    # TODO:
    pass


@router.delete("/{uid}")
async def delete_disciplinary_record(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Delete a DisciplinaryRecord from database
    Require: Admin-write
    """
    logger.debug(f"{username} trying to delete a DisciplinaryRecord")
    # TODO:
    pass
