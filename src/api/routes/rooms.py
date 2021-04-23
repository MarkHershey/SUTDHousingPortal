from typing import List

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger
from pymongo import ReturnDocument

from ..access_utils import Access
from ..auth import AuthHandler
from ..database import rooms_collection
from ..error_msg import ErrorMsg as MSG
from ..functional import clean_dict, remove_none_value_keys
from ..models.room import Room, RoomProfile

router = APIRouter(prefix="/api/rooms", tags=["Rooms"])
auth_handler = AuthHandler()


@router.get("/", response_model=List[Room])
async def get_all_rooms(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Rooms

    Require: Admin-read
    """
    logger.debug(f"User({username}) fetching all Rooms info")

    permission_ok: bool = Access.is_admin(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    room_list = []
    try:
        for r in rooms_collection.find():
            clean_dict(r)
            room_list.append(r)
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    return room_list


@router.post("/", status_code=201, response_model=Room)
async def add_room(new_room: Room, username=Depends(auth_handler.auth_wrapper)):
    """
    Add a new Room to database

    Require: Admin-write
    """
    logger.debug(f"User({username}) trying add new Room.")

    permission_ok: bool = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    room_dict = dict(new_room.dict())
    try:
        _inserted_id = rooms_collection.insert_one(room_dict).inserted_id
        logger.debug(f"New Room inserted to DB with inserted_id: {_inserted_id}")
    except Exception as e:
        logger.error(MSG.DB_UPDATE_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_UPDATE_ERROR)

    clean_dict(room_dict)
    logger.debug(f"New Room info: {room_dict}")
    return room_dict


@router.get("/{uid}", response_model=Room)
async def get_room_info(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Get a Room Info

    Require: Admin-read
    """
    logger.debug(f"User({username}) fetching all Rooms info")

    permission_ok: bool = Access.is_admin(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    try:
        room_info = rooms_collection.find_one({"uid": uid})
        clean_dict(room_info)

    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)

    return room_info


@router.delete("/{uid}")
async def delete_a_room(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Delete a Room from database

    Require: Admin-write
    """
    logger.debug(f"{username} trying to delete a Room")

    permission_ok = Access.is_admin_write(username)
    if not permission_ok:
        logger.debug(MSG.permission_denied_msg(username))
        raise HTTPException(status_code=401, detail=MSG.PERMISSION_ERROR)

    try:
        rooms_collection.delete_one({"uid": uid})
    except Exception as e:
        logger.error(MSG.DB_QUERY_ERROR)
        logger.error(e)
        raise HTTPException(status_code=404, detail=MSG.TARGET_ITEM_NOT_FOUND)
