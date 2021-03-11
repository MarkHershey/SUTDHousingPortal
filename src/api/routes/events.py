from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger

from ..auth import AuthHandler
from ..database import *
from ..models.application import ApplicationForm, ApplicationPeriod
from ..models.event import Event
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
from ..utils import Access, clean_dict

router = APIRouter(prefix="/api/events", tags=["events"])
auth_handler = AuthHandler()


@router.get("/all", response_model=List[Event])
async def get_all_events(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Events
    Require: Any authenticated user
    """

    logger.debug(f"User({username}) fetching all events info")
    event_info_list = []
    try:
        for event_dict in events_collection.find().sort("start_time"):
            clean_dict(event_dict)
            event_info_list.append(event_dict)
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if len(event_info_list) == 0:
        raise HTTPException(status_code=404, detail="No Events found.")

    return event_info_list


@router.get("/upcoming", response_model=List[Event])
async def get_upcoming_events(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all upcoming Events
    Require: Any authenticated user
    """
    logger.debug(f"User({username}) fetching all upcoming events info")
    event_info_list = []
    _now = datetime.now()
    try:
        for event_dict in events_collection.find({"start_time": {"$gte": _now}}).sort(
            "start_time"
        ):
            clean_dict(event_dict)
            event_info_list.append(event_dict)
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if len(event_info_list) == 0:
        raise HTTPException(status_code=404, detail="No upcoming Events found.")

    return event_info_list


@router.post("/", status_code=201, response_model=Event)
async def create_event(new_event: Event, username=Depends(auth_handler.auth_wrapper)):
    """
    Create an Event
    Require: Student-HG or Admin-write
    """
    logger.debug(f"User({username}) trying creating new Event.")
    # Check access
    permission_ok = Access.at_least_student_hg_write(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    event_dict = dict(new_event.dict())
    try:
        events_collection.insert_one(event_dict)
        logger.debug(f"New Event inserted to DB: {new_event.title}")
        return event_dict
    except Exception as e:
        logger.error(f"New Event failed to be inserted to DB: {new_event.title}")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Failed to insert into database")


@router.get("/{uid}", response_model=Event)
async def get_an_events(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Get an Event info
    Require: Any authenticated user
    """
    logger.debug(f"User({username}) fetching event({uid}) info")
    try:
        event_dict: dict = events_collection.find_one({"uid": uid})
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if event_dict:
        clean_dict(event_dict)
        return event_dict
    else:
        raise HTTPException(status_code=404, detail="Event not found.")
