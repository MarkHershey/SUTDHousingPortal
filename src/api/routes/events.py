from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import ReturnDocument
from ..error_msg import ErrorMsg as MSG
from ..auth import AuthHandler
from ..database import *
from ..models.event import Event, EventEditableInfo
from ..utils import Access, clean_dict, deduct_list_from_list, remove_none_value_keys

router = APIRouter(prefix="/api/events", tags=["events"])
auth_handler = AuthHandler()


@router.get("/", response_model=List[Event])
async def get_list_of_events(
    event_uids: List[str], username=Depends(auth_handler.auth_wrapper)
):
    """
    Get a list of Events for a given list of Event UIDs.
    If one or more provided uid(s) do not exist, it will be ignored.

    Require: Any authenticated user
    """

    logger.debug(f"User({username}) fetching a list of events info")
    event_info_list: List[dict] = []
    event_uids = list(set(event_uids))
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

    return event_info_list


@router.post("/", status_code=201, response_model=Event)
async def create_an_event(
    new_event: Event, username=Depends(auth_handler.auth_wrapper)
):
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

    new_event.created_by = str(username)
    event_dict = dict(new_event.dict())
    try:
        _inserted_id = events_collection.insert_one(event_dict).inserted_id
        logger.debug(f"New Event inserted to DB with inserted_id: {_inserted_id}")
        _event = events_collection.find_one({"_id": _inserted_id})
        clean_dict(_event)
        logger.debug(f"New Event info: {_event}")
        return _event
    except Exception as e:
        logger.error(f"New Event failed to be inserted to DB: {new_event.title}")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Failed to insert into database")


@router.get("/{uid}", response_model=Event)
async def get_an_event(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Get an Event info

    Require: Any authenticated user
    """
    logger.debug(f"User({username}) fetching event({uid}) info")
    try:
        event_dict: dict = events_collection.find_one({"uid": uid})
        clean_dict(event_dict)
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if event_dict:
        return event_dict
    else:
        raise HTTPException(status_code=404, detail="Event not found.")


@router.put("/{uid}", response_model=Event)
async def update_an_event(
    uid: str,
    event_editable_info: EventEditableInfo,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Update an Event info

    Require: Student-HG or Admin-write
    """
    logger.debug(f"User({username}) trying updating Event({uid}) info.")
    # Check access
    permission_ok = False

    if Access.is_admin_write(username):
        permission_ok = True

    if Access.is_student_hg(username):
        try:
            event_dict: dict = events_collection.find_one({"uid": uid})
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

        if event_dict and event_dict.get("created_by") == username:
            permission_ok = True

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    # Proceed to update event
    event_dict = dict(event_editable_info.dict())
    remove_none_value_keys(event_dict)
    try:
        updated = students_collection.find_one_and_update(
            filter={"uid": uid}, update={"$set": event_dict}
        )
        logger.debug(f"{str(updated)}")
        clean_dict(updated)
        return updated if updated else {"msg": "failed"}
    except Exception as e:
        logger.error("Failed to update database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")


@router.delete("/{uid}")
async def delete_an_event(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Delete an Event.

    Deletion can be done if and only if nobody has signed up/ attended the event.

    Require: HG or Admin-write
    """

    logger.debug(f"User({username}) trying to delete Event({uid}).")
    permission_ok = Access.is_student_hg(username) or Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    try:
        event_info = events_collection.find_one(filter={"uid": uid})
        clean_dict(event_info)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    if not event_info:
        raise HTTPException(status_code=404, detail=MSG.TARGET_ITEM_NOT_FOUND)

    ref_count = len(event_info.get("signups", [])) + len(
        event_info.get("attendance", [])
    )

    if ref_count != 0:
        raise HTTPException(status_code=400, detail=MSG.DEL_REF_COUNT_ERR)

    try:
        _DeleteResult = events_collection.delete_one({"uid": uid})
    except Exception as e:
        logger.error(MSG.DB_UPDATE_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)

    if _DeleteResult.deleted_count != 1:
        logger.error(MSG.UNEXPECTED)
        raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)

    return


@router.post("/{uid}/signup", response_model=Event)
async def register_students_for_event(
    uid: str, student_id_list: List[str], username=Depends(auth_handler.auth_wrapper)
):
    """
    Sign a list of Students up for a specific event

    This is done by student themselves, hence, len(student_id_list) == 1
    """
    logger.debug(f"User({username}) trying to sign up Event({uid}).")
    permission_ok = False
    if len(student_id_list) == 1:
        permission_ok = student_id_list[0] == username

    if Access.is_admin_write(username):
        permission_ok = True

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    # 0. validate student list first
    validated_students = []
    for student_id in student_id_list:
        if not isinstance(student_id, str):
            continue
        try:
            info = students_collection.find_one(
                filter={"student_id": student_id},
            )
            if info:
                _events = info.get("registered_events", [])
                if uid not in _events:
                    validated_students.append(student_id)
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    # 1. add them into event's sign up list
    try:
        updated = events_collection.find_one_and_update(
            filter={"uid": uid},
            update={"$push": {"signups": {"$each": validated_students}}},
            return_document=ReturnDocument.AFTER,
        )
        logger.debug(f"Updated: {str(updated)}")
    except Exception as e:
        logger.error("Failed to update database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not updated:
        raise HTTPException(status_code=404, detail="Event not found.")
    else:
        clean_dict(updated)

    # 2. add event uid to student registered event list
    for student_id in validated_students:
        try:
            # NOTE: push operator
            # push may add duplicated value into array
            # https://docs.mongodb.com/manual/reference/operator/update/push/#up._S_push
            _updated = students_collection.find_one_and_update(
                filter={"student_id": student_id},
                update={"$push": {"registered_events": uid}},
                return_document=ReturnDocument.AFTER,
            )
            logger.debug(f"Updated: {str(_updated)}")
        except Exception as e:
            logger.error("Failed to update database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    return updated


@router.delete("/{uid}/signup", response_model=Event)
async def deregister_students_for_event(
    uid: str, student_id_list: List[str], username=Depends(auth_handler.auth_wrapper)
):
    """
    deregister a list of Students for a specific event

    This can be done by self, admin-write, usually len(student_id_list) == 1
    """
    logger.debug(f"User({username}) trying to de-register Event({uid}).")
    permission_ok = False
    if len(student_id_list) == 1:
        permission_ok = student_id_list[0] == username

    if Access.is_admin_write(username):
        permission_ok = True

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    # 0. validate student list first
    validated_students = []
    for student_id in student_id_list:
        if not isinstance(student_id, str):
            continue
        try:
            info = students_collection.find_one(
                filter={"student_id": student_id},
            )
            if info:
                _events = info.get("registered_events", [])
                if uid in _events:
                    validated_students.append(student_id)
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    # 1. remove them from event's sign up list
    try:
        # get event
        event_info = events_collection.find_one(
            filter={"uid": uid},
        )
        logger.debug(f"Before update: {str(event_info)}")
        _signups = event_info.get("signups", [])
        # reduce list
        deduct_list_from_list(_signups, validated_students)
        # update event signups
        event_info = events_collection.find_one_and_update(
            filter={"uid": uid},
            update={"$set": {"signups": _signups}},
            return_document=ReturnDocument.AFTER,
        )
        logger.debug(f"Updated: {str(event_info)}")

    except Exception as e:
        logger.error("Failed to update database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not event_info:
        raise HTTPException(status_code=404, detail="Event not found.")
    else:
        clean_dict(event_info)

    # 2. add event uid to student registered event list
    for student_id in validated_students:
        try:
            # NOTE: Pull operator
            # pull will remove all items in the array matching the value
            # https://docs.mongodb.com/manual/reference/operator/update/pull/#up._S_pull
            _updated = students_collection.find_one_and_update(
                filter={"student_id": student_id},
                update={"$pull": {"registered_events": uid}},
                return_document=ReturnDocument.AFTER,
            )
            logger.debug(f"Updated: {str(_updated)}")
        except Exception as e:
            logger.error("Failed to update database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    return event_info


@router.post("/{uid}/attend", response_model=Event)
async def add_students_attendance_for_event(
    uid: str, student_id_list: List[str], username=Depends(auth_handler.auth_wrapper)
):
    """
    Add a list of Students's attendence for a specific event

    Require: HG or Admin-write, usually len(student_id_list) >= 1
    """
    logger.debug(f"User({username}) trying to add attendance for Event({uid}).")
    permission_ok = Access.is_admin_write(username) or Access.is_student_hg(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    # 0. validate student list first
    validated_students = []
    for student_id in student_id_list:
        if not isinstance(student_id, str):
            continue
        try:
            info = students_collection.find_one(
                filter={"student_id": student_id},
            )
            if info:
                _events = info.get("registered_events", [])
                if uid in _events:
                    validated_students.append(student_id)
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    # 1. Add them into event's attendance list
    try:
        # get event
        event_info = events_collection.find_one(
            filter={"uid": uid},
        )
        logger.debug(f"Before update: {str(event_info)}")
        _attendance: List[str] = event_info.get("attendance", [])
        # union list
        _attendance = list(set(_attendance + validated_students))
        # update event signups
        event_info = events_collection.find_one_and_update(
            filter={"uid": uid},
            update={"$set": {"attendance": _attendance}},
            return_document=ReturnDocument.AFTER,
        )
        logger.debug(f"Updated: {str(event_info)}")

    except Exception as e:
        logger.error("Failed to update database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not event_info:
        raise HTTPException(status_code=404, detail="Event not found.")
    else:
        clean_dict(event_info)

    # 2. add event uid to student attended_events list
    for student_id in validated_students:
        try:
            _updated = students_collection.find_one_and_update(
                filter={"student_id": student_id},
                update={"$push": {"attended_events": uid}},
                return_document=ReturnDocument.AFTER,
            )
            logger.debug(f"Updated: {str(_updated)}")
        except Exception as e:
            logger.error("Failed to update database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    return event_info


@router.delete("/{uid}/attend", response_model=Event)
async def remove_students_attendance_for_event(
    uid: str, student_id_list: List[str], username=Depends(auth_handler.auth_wrapper)
):
    """
    Remove a list of Students's attendence for a specific event

    Require: HG or Admin-write, usually len(student_id_list) >= 1
    """
    logger.debug(f"User({username}) trying to remove attendance for Event({uid}).")
    permission_ok = Access.is_admin_write(username) or Access.is_student_hg(username)

    if not permission_ok:
        logger.debug(f"User({username}) permission denied.")
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this."
        )

    # 0. validate student list first
    validated_students = []
    for student_id in student_id_list:
        if not isinstance(student_id, str):
            continue
        try:
            info = students_collection.find_one(
                filter={"student_id": student_id},
            )
            if info:
                _attended_events = info.get("attended_events", [])
                if uid in _attended_events:
                    validated_students.append(student_id)
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    # 1. Remove them from event's attendance list
    try:
        # get event
        event_info = events_collection.find_one(
            filter={"uid": uid},
        )
        logger.debug(f"Before update: {str(event_info)}")
        _attendance: List[str] = event_info.get("attendance", [])
        # reduce list
        deduct_list_from_list(_attendance, validated_students)
        # update event signups
        event_info = events_collection.find_one_and_update(
            filter={"uid": uid},
            update={"$set": {"attendance": _attendance}},
            return_document=ReturnDocument.AFTER,
        )
        logger.debug(f"Updated: {str(event_info)}")

    except Exception as e:
        logger.error("Failed to update database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not event_info:
        raise HTTPException(status_code=404, detail="Event not found.")
    else:
        clean_dict(event_info)

    # 2. add event uid to student attended_events list
    for student_id in validated_students:
        try:
            _updated = students_collection.find_one_and_update(
                filter={"student_id": student_id},
                update={"$pull": {"attended_events": uid}},
                return_document=ReturnDocument.AFTER,
            )
            logger.debug(f"Updated: {str(_updated)}")
        except Exception as e:
            logger.error("Failed to update database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    return event_info
