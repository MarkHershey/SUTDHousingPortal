from typing import List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import ReturnDocument

from ..auth import AuthHandler
from ..database import records_collection, students_collection
from ..models.record import DisciplinaryRecord, RecordEditable
from ..utils import Access, clean_dict, remove_none_value_keys

router = APIRouter(prefix="/api/records", tags=["Disciplinary Records"])
auth_handler = AuthHandler()


@router.get("/", response_model=List[DisciplinaryRecord])
async def get_all_disciplinary_record(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Disciplinary Records

    Require: Admin-read
    """
    logger.debug(f"User({username}) fetching all records info")

    permission_ok: bool = Access.is_admin(username)
    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(status_code=401, detail="Permission denied.")

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


@router.post("/", status_code=201, response_model=DisciplinaryRecord)
async def add_disciplinary_record(
    record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Add a new DisciplinaryRecord to database

    Require: Admin-write
    """
    logger.debug(f"User({username}) trying add new record.")

    permission_ok = Access.is_admin_write(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    record.created_by = str(username)
    records_dict = dict(record.dict())
    target_student: str = record.student_id
    # 0. check if student exists
    if not target_student or not Access.is_student(target_student):
        raise HTTPException(status_code=400, detail="Target student does not exist.")

    # 1. add record
    try:
        _inserted_id = records_collection.insert_one(records_dict).inserted_id
        logger.debug(
            f"New DisciplinaryRecord inserted to DB with inserted_id: {_inserted_id}"
        )
        _record = records_collection.find_one({"_id": _inserted_id})
        logger.debug(f"Dev debug: {type(_record)}")
        clean_dict(_record)
        logger.debug(f"New DisciplinaryRecord info: {_record}")
    except Exception as e:
        logger.error(f"New record failed to be inserted to DB")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Failed to insert into database")

    # 2. add event uid to student attended_events list
    try:
        _updated = students_collection.find_one_and_update(
            filter={"student_id": target_student},
            update={"$push": {"disciplinary_records": record.uid}},
            return_document=ReturnDocument.AFTER,
        )
        logger.debug(f"Updated: {str(_updated)}")
    except Exception as e:
        logger.error("Failed to update database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    return _record


@router.get("/{uid}", response_model=DisciplinaryRecord)
async def get_disciplinary_record(
    uid: str, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get a DisciplinaryRecord

    Require: Student-self or Admin-read
    """
    logger.debug(f"User({username}) fetching record({uid}) info")
    permission_ok = Access.is_admin(username)

    try:
        record_dict: dict = records_collection.find_one({"uid": uid})
        clean_dict(record_dict)
    except Exception as e:
        logger.error("Failed to query database")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Database Error.")

    if not record_dict:
        raise HTTPException(status_code=404, detail="Record not found.")

    record_owner = record_dict.get("student_id", "")

    if username == record_owner:
        permission_ok = True

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to access this."
        )
    else:
        return record_dict


@router.put("/{uid}", response_model=DisciplinaryRecord)
async def update_disciplinary_record(
    uid: str, record_edit: RecordEditable, username=Depends(auth_handler.auth_wrapper)
):
    """
    Update a DisciplinaryRecord

    Require: Admin-write
    """
    logger.debug(f"{username} trying to update a DisciplinaryRecord({uid})")
    permission_ok = Access.is_admin_write(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    record_dict = dict(record_edit.dict())
    remove_none_value_keys(record_dict)
    try:
        updated = records_collection.find_one_and_update(
            filter={"uid": uid}, update={"$set": record_dict}
        )
        clean_dict(updated)
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

    permission_ok = Access.is_admin_write(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    try:
        record_dict: dict = records_collection.find_one({"uid": uid})
        record_target_student = record_dict.get("student_id")
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Database Error.")

    if record_dict:
        records_collection.delete_one({"uid": uid})
        _updated = students_collection.find_one_and_update(
            filter={"student_id": record_target_student},
            update={"$pull": {"disciplinary_records": uid}},
            return_document=ReturnDocument.AFTER,
        )
        logger.debug(f"Updated: {str(_updated)}")
    else:
        raise HTTPException(status_code=404, detail="Record not found.")
