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
    student_settings: StudentSettingsProfile,
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

    try:
        admin = admins_collection.find_one({"username": username})
        if admin and admin.read_only_privilege == False:
            permission_ok = True
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not permission_ok:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        # NOTE: there is a potential bug here, need to distinguish cases where
        # A: user wants to clear certain field (supply 'None' as new value)
        # B: user wants to preserve the value of certain field (Not changing anything, so supplying 'None')
        updated = students_collection.find_one_and_update(
            filter={"student_id": student_id}, update={"$set": student_settings}
        )
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
    try:
        admin = admins_collection.find_one({"username": username})
        if admin and admin.read_only_privilege == False:
            permission_ok = True
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not permission_ok:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        updated = students_collection.find_one_and_update(
            filter={"student_id": student_id},
            update={"$set": {"is_house_guardian": True}},
        )
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
    try:
        admin = admins_collection.find_one({"username": username})
        if admin and admin.read_only_privilege == False:
            permission_ok = True
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not permission_ok:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        updated = students_collection.find_one_and_update(
            filter={"student_id": student_id},
            update={"$set": {"is_house_guardian": False}},
        )
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
    # TODO:
    pass


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
