# authentications

from fastapi import APIRouter, Depends, HTTPException
from markkk.logger import logger

from ..auth import AuthHandler
from ..database import *
from ..models.student import Student
from ..models.user import Admin, User

router = APIRouter(prefix="/api/auth", tags=["User Authentication"])
auth_handler = AuthHandler()


@router.post("/register/user", status_code=201)
async def register(new_user: User):
    search_count = users_collection.count_documents({"username": new_user.username})
    if search_count > 0:
        raise HTTPException(status_code=400, detail="Username is taken")
    new_user.password = auth_handler.get_password_hash(new_user.password)

    user_dict = dict(new_user.dict())
    try:
        # insert into database
        users_collection.insert_one(user_dict)
        logger.debug(f"New User inserted to DB: {new_user.username}")
    except Exception as e:
        logger.error(f"New User failed to be inserted to DB: {new_user.username}")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Failed to insert into database")
    return


@router.post("/register/admin", status_code=201)
async def register_admin(new_user: Admin):
    search_count = users_collection.count_documents({"username": new_user.username})
    if search_count > 0:
        raise HTTPException(status_code=400, detail="Username is taken")
    new_user.password = auth_handler.get_password_hash(new_user.password)

    user_dict = dict(new_user.dict())
    try:
        # insert into database
        admins_collection.insert_one(user_dict)
        users_collection.insert_one(user_dict)
        logger.debug(f"New Admin inserted to DB: {new_user.username}")
    except Exception as e:
        logger.error(f"New Admin failed to be inserted to DB: {new_user.username}")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Failed to insert into database")
    return


@router.post("/register/student", status_code=201)
async def register_student(new_user: Student):
    search_count = students_collection.count_documents({"username": new_user.username})
    if search_count > 0:
        raise HTTPException(status_code=400, detail="Student already exists")

    # hash user password
    new_user.password = auth_handler.get_password_hash(new_user.password)

    user_dict = dict(new_user.dict())
    try:
        # insert into database
        students_collection.insert_one(user_dict)
        users_collection.insert_one(user_dict)
        logger.debug(f"New Student inserted to DB: {new_user.username}")
    except Exception as e:
        logger.error(f"New Student failed to be inserted to DB: {new_user.username}")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Failed to insert into database")
    return


@router.post("/login")
async def login(auth_details: User):
    try:
        user = users_collection.find_one({"username": auth_details.username})
    except Exception as e:
        logger.error("Failed to query user from database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")
    if not user or not auth_handler.verify_password(
        auth_details.password, user["password"]
    ):
        raise HTTPException(status_code=401, detail="Invalid username and/or password")
    token = auth_handler.encode_token(auth_details.username)
    logger.debug(f"New JWT token generated for user: '{auth_details.username}'")
    return {"token": token}
