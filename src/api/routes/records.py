from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger

from ..auth import AuthHandler
from ..database import *
from ..models.application import ApplicationForm, ApplicationPeriod
from ..models.lifestyle import LifestyleProfile
from ..models.record import DisciplinaryRecord
from ..models.room import Room, RoomProfile
from ..models.user import Admin, User
from ..utils import clean_dict, Access, remove_none_value_keys

router = APIRouter(prefix="/api/records", tags=["records"])
auth_handler = AuthHandler()


@router.get("/")
async def get_all_disciplinary_record(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Disciplinary Records
    Require: Admin-read
    """
    # TODO:

    logger.debug(f"User({username}) fetching all records info")

    permission_ok: bool = Access.is_admin(username)
    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="Permission denied."
        )

    records_list = []
    try:
        for record in records_collection.find():
            clean_dict(record)
            records_list.append(record)
    except Exception as e:
        logger.erorr("Failed to query database")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Database Error")

    if len(records_list) == 0:
        raise HTTPException(status_code=404, detail="No Records found")
    
    return records_list


@router.post("/", status_code=201)
async def add_disciplinary_record(
    record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Add a new DisciplinaryRecord to database
    Require: Admin-write
    """
    # TODO:
    
    logger.debug(f"User({username}) trying add new record.")

    permission_ok = Access.is_admin_write(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    record.created_by = str(username)
    records_dict = dict(record.dict())
    try:
        records_collection.insert_one(records_dict)
        logger.debug(f"New record inserted to DB: {record.title}")
        return records_dict
    except Exception as e:
        logger.error(f"New record failed to be inserted to DB: {record.title}")
        logger.error(e)
        raise HTTPException(
            status_code=500, detail="Failed to insert into database"
        )


@router.get("/{uid}")
async def get_disciplinary_record(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get a DisciplinaryRecord
    Require: Student-self or Admin-read
    """
    # TODO:

    logger.debug(f"User({username}) fetching record({uid}) info")
    
    permission_ok = Access.is_student(username) or Access.is_admin(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to access this."
        )

    try:
        record_dict: dict = records_collection.find_one({"uid": uid})
    except Exception as e:
        logger.error("Failed to query database")
        logger.error(e)
        raise HTTPException (
            status_code=500, detail="Database Error."
        )

    if record_dict:
        clean_dict(record_dict)
        return record_dict
    else:
        raise HTTPException(status_code=404, detail="Record not found.")


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

    permission_ok = Access.is_admin_write(username)
    
    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        record_dict: dict = records_collection.find_one({'uid': uid})
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Database Error.")

    record_dict = dict(record.dict())
    remove_none_value_keys(record_dict)
    try:
        updated = students_collection.find_one_and_update(filter({"uid": uid}), update={"$set": record_dict})
        return updated if updated else {"msg": "failed"}
    except Exception as e:
        logger.error("Failed to update database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Database Error.")


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
    
    permission_ok = Access.is_admin_write(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        record_dict: dict = records_collection.find_one({"uid": uid})
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Database Error.")

    if record_dict:
        clean_dict(record_dict)
        events_collection.delete_one(record_dict)
    else:
        raise HTTPException(status_code=404, detail="Record not found.")
