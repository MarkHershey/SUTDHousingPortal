from typing import Dict, List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import ReturnDocument

from ..auth import AuthHandler
from ..database import *
from ..models.application import ApplicationForm, ApplicationPeriod
from ..models.event import Event
from ..models.lifestyle import LifestyleProfile
from ..models.record import DisciplinaryRecord
from ..models.room import Room, RoomProfile
from ..models.student import (
    Student,
    StudentEditableProfile,
    StudentIdentityProfile,
    StudentProfile,
)
from ..models.user import Admin, User
from ..utils import Access, clean_dict, remove_none_value_keys

router = APIRouter(prefix="/api/students", tags=["students"])
auth_handler = AuthHandler()


@router.get("/")
async def get_all_student_info(
    username=Depends(auth_handler.auth_wrapper), num: int = 30
):
    """
    Get all student info

    Require: Admin-read
    """
    logger.debug(f"User({username}) trying fetching all students info.")
    permission_ok: bool = Access.is_admin(username)
    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to read this."
        )

    student_info_list = []
    count = 0
    try:
        for student_info in students_collection.find():
            count += 1
            clean_dict(student_info)
            student_info_list.append(student_info)
            if count >= num:
                break
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if len(student_info_list) == 0:
        raise HTTPException(status_code=404, detail="No students found.")

    return student_info_list


@router.get("/{student_id}", response_model=StudentProfile)
async def get_student_info(
    student_id: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Set a particular Student info

    Require: Student-self or Admin-read
    """
    logger.debug(f"User({username}) trying fetching student({student_id}) info.")
    permission_ok = False
    if student_id == username or Access.is_admin(username):
        permission_ok = True

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to read this."
        )

    try:
        student_info = students_collection.find_one({"student_id": student_id})
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not student_info:
        raise HTTPException(status_code=404, detail="Student not found.")

    clean_dict(student_info)

    return student_info


@router.put("/{student_id}")
async def update_student_info(
    student_id: str,
    student_editable_profile: StudentEditableProfile,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Update (Overwrite) a particular Student info

    Require: Student-self or Admin-write
    """
    permission_ok = False
    # Check access
    if username == student_id:
        permission_ok = True

    if Access.is_admin_write(username):
        permission_ok = True

    if not permission_ok:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    student_update_dict = dict(student_editable_profile.dict())
    remove_none_value_keys(student_update_dict)

    try:
        # NOTE: there is a potential bug here, need to distinguish cases where
        # A: user wants to clear certain field (supply 'None' as new value)
        # B: user wants to preserve the value of certain field (Not changing anything, so supplying 'None')
        updated = students_collection.find_one_and_update(
            filter={"student_id": student_id}, update={"$set": student_update_dict}
        )
        logger.debug(f"{str(updated)}")
        clean_dict(updated)
        return updated if updated else {"msg": "failed"}
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")


@router.put("/{student_id}/set_hg")
async def set_student_as_hg(
    student_id: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Set a Student as House Guardian

    Require: Admin-write
    """
    permission_ok = False
    if Access.is_admin_write(username):
        permission_ok = True

    if not permission_ok:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        updated = students_collection.find_one_and_update(
            filter={"student_id": student_id},
            update={"$set": {"is_house_guardian": True}},
        )
        logger.debug(f"{str(updated)}")
        clean_dict(updated)
        return updated if updated else {"msg": "failed"}
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")


@router.put("/{student_id}/revoke_sg")
async def revoke_student_as_hg(
    student_id: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Revoke a Student as House Guardian

    Require: Admin-write
    """
    permission_ok = False
    if Access.is_admin_write(username):
        permission_ok = True

    if not permission_ok:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        updated = students_collection.find_one_and_update(
            filter={"student_id": student_id},
            update={"$set": {"is_house_guardian": False}},
        )
        logger.debug(f"{str(updated)}")
        clean_dict(updated)
        return updated if updated else {"msg": "failed"}
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")


@router.put("/{student_id}/update_room_profile")
async def update_room_profile(
    student_id: str,
    room_profile: RoomProfile,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Update (Overwrite) a student's prefered Room Profile

    Require: Student-self or Admin-write
    """
    permission_ok = False
    if username == student_id:
        permission_ok = True
    if Access.is_admin_write(username):
        permission_ok = True
    if not permission_ok:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    data = dict(room_profile.dict())
    try:
        updated = students_collection.find_one_and_update(
            filter={"student_id": student_id},
            update={"$set": {"preference_room": data}},
            return_document=ReturnDocument.AFTER,
        )
        clean_dict(updated)
        logger.debug(f"Updated: {str(updated)}")
    except Exception as e:
        logger.error("Failed to update room_profile to database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    return updated


@router.put("/{student_id}/update_lifestyle_profile")
async def update_lifestyle_profile(
    student_id: str,
    lifestyle_profile: LifestyleProfile,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Update (Overwrite) a student's prefered Lifestyle Profile

    Require: Student-self or Admin-write
    """
    # TODO:
    pass


@router.get("/{student_id}/events", response_model=List[Event])
async def get_participated_events(
    student_id: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get a list of Events that the student has signed up and/or attended.

    Require: Any authenticated user
    """
    logger.debug(f"User({username}) fetching student({student_id})'s Event list.")

    try:
        student_info = students_collection.find_one({"student_id": student_id})
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not student_info:
        raise HTTPException(status_code=404, detail="Student not found.")

    clean_dict(student_info)
    event_uids = student_info.get("registered_events", [])
    if not event_uids:
        return []
    else:
        event_uids = list(set(event_uids))

    event_info_list: List[dict] = []

    try:
        for uid in event_uids:
            if isinstance(uid, str):
                event_dict: dict = events_collection.find_one({"uid": uid})
                if event_dict:
                    clean_dict(event_dict)
                    event_info_list.append(event_dict)
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    return event_info_list


@router.get("/{student_id}/records", response_model=List[DisciplinaryRecord])
async def get_disciplinary_records(
    student_id: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get all DisciplinaryRecords that belong to the particular student

    Require: Student-self or Admin-read
    """
    logger.debug(
        f"User({username}) trying fetching Student({student_id})'s DisciplinaryRecords"
    )

    permission_ok = Access.is_admin(username)
    if username == student_id:
        permission_ok = True

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to view this."
        )

    # get DisciplinaryRecord uids from student profile
    try:
        student_info = students_collection.find_one({"student_id": student_id})
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not student_info:
        raise HTTPException(status_code=404, detail="Student not found.")

    clean_dict(student_info)
    record_uids: List[str] = student_info.get("disciplinary_records", [])
    if not record_uids:
        return []
    else:
        record_uids = list(set(record_uids))

    event_info_list: List[dict] = []
    try:
        for uid in record_uids:
            if isinstance(uid, str):
                _record_dict: dict = records_collection.find_one({"uid": uid})
                clean_dict(_record_dict)
                if _record_dict:
                    event_info_list.append(_record_dict)
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    logger.debug(
        f"Fetched {len(event_info_list)} DisciplinaryRecord(s) that belong to Student({student_id})"
    )
    return event_info_list
