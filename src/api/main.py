import json
from copy import copy

from fastapi import Depends, FastAPI, HTTPException
from markkk.logger import logger

from .auth import AuthHandler
from .database import db
from .models.application import ApplicationForm, ApplicationPeriod
from .models.lifestyle import LifestyleProfile
from .models.record import DisciplinaryRecord
from .models.room import Room, RoomProfile
from .models.student import Student, StudentSettingsProfile
from .models.user import Admin, User
from .utils import clean_dict

app = FastAPI()

###############################################################################
# Database

users = []
all_students = {}
all_admins = []
all_user_info = {}

### MongoDB Collection Reference ###
# User
users_collection = db["users"]
# Admin
admins_collection = db["admins"]
# Student
students_collection = db["students"]
# ApplicationForm
applications_collection = db["applications"]
# ApplicationPeriod
application_periods_collection = db["application_periods"]
# Contract
contracts_collection = db["contracts"]
# Event
events_collection = db["events"]
# DisciplinaryRecord
records_collection = db["records"]
# Room
rooms_collection = db["rooms"]


###############################################################################
# authentications

auth_handler = AuthHandler()


@app.post("/register/user", status_code=201)
def register(new_user: User):
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


@app.post("/register/admin", status_code=201)
def register_admin(new_user: Admin):
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


@app.post("/register/student", status_code=201)
def register_student(new_user: Student):
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


@app.post("/login")
def login(auth_details: User):
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


@app.get("/users")
def get_all_users_info(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all users info
    Require: Admin-read
    """
    return {"users": users}


###############################################################################
# /student


@app.get("/students")
def get_all_student_info(username=Depends(auth_handler.auth_wrapper), num: int = 30):
    """
    Get all student info
    Require: Admin-read
    """
    student_info_list = []
    count = 0
    try:
        for student_info in users_collection.find():
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


@app.get("/students/{student_id}")
def get_student_info(student_id: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Set a particular Student info
    Require: Student-self or Admin-read
    """
    try:
        student_info = users_collection.find_one({"student_id": student_id})
    except Exception as e:
        logger.error("Failed to query database.")
        logger.error(e)
        raise HTTPException(status_code=500, detail="Databse Error.")

    if not student_info:
        raise HTTPException(status_code=404, detail="Student not found.")

    clean_dict(student_info)

    return student_info


@app.put("/students/{student_id}")
def update_student_info(
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


@app.put("/students/{student_id}/set_hg")
def set_student_as_hg(student_id: str, username=Depends(auth_handler.auth_wrapper)):
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


@app.put("/students/{student_id}/revoke_sg")
def revoke_student_as_hg(student_id: str, username=Depends(auth_handler.auth_wrapper)):
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


@app.put("/students/{student_id}/update_room_profile")
def update_room_profile(
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


@app.put("/students/{student_id}/update_lifestyle_profile")
def update_lifestyle_profile(
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


###############################################################################
# /applications


@app.get("/applications")
def get_all_applications(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Application Forms
    Require: Admin-read
    """
    # TODO:
    pass


@app.post("/applications", status_code=201)
def submit_application(
    application_form: ApplicationForm, username=Depends(auth_handler.auth_wrapper)
):
    """
    Submit a new Application Form to database
    Require: Student-self or Admin-write
    """
    # TODO:
    pass


@app.get("/applications/{uid}")
def get_an_application_info(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Get an ApplicationForm info
    Require: Student-self or Admin-read
    """
    # TODO:
    pass


@app.put("/applications/{uid}")
def update_application(
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


@app.delete("/applications/{uid}")
def delete_application(
    uid: str,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Delete an ApplicationForm info
    Require: Admin-write
    """
    # TODO:
    pass


@app.post("/applications/{uid}/offer")
def approve_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Approve an Application
    Require: Admin-write
    """
    # TODO:
    pass


@app.post("/applications/{uid}/waitlist")
def waitlist_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Waitlist an Application
    Require: Admin-write
    """
    # TODO:
    pass


@app.post("/applications/{uid}/reject")
def reject_application(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Reject an Application
    Require: Admin-write
    """
    # TODO:
    pass


###############################################################################
# /events


@app.get("/events")
def get_all_events(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Events
    Require: Any User
    """
    # TODO:
    pass


@app.post("/events", status_code=201)
def create_event(username=Depends(auth_handler.auth_wrapper)):
    """
    Create an Event
    Require: Any User
    """
    # TODO:
    pass


@app.get("/events/{uid}")
def get_all_events(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Get an Event info
    Require: Any User
    """
    # TODO:
    pass


###############################################################################
# /disciplinary_record


@app.get("/disciplinary_record")
def get_all_disciplinary_record(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all Disciplinary Records
    Require: Admin-read
    """
    # TODO:
    pass


@app.post("/disciplinary_record", status_code=201)
def add_disciplinary_record(
    record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Add a new DisciplinaryRecord to database
    Require: Admin-write
    """
    # TODO:
    pass


@app.get("/disciplinary_record/{uid}")
def get_disciplinary_record(
    record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Get a DisciplinaryRecord
    Require: Student-self or Admin-read
    """
    # TODO:
    pass


@app.put("/disciplinary_record/{uid}")
def update_disciplinary_record(
    uid: str, record: DisciplinaryRecord, username=Depends(auth_handler.auth_wrapper)
):
    """
    Update a DisciplinaryRecord from database
    Require: Admin-write
    """
    logger.debug(f"{username} trying to update a DisciplinaryRecord")
    # TODO:
    pass


@app.delete("/disciplinary_record/{uid}")
def delete_disciplinary_record(uid: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Delete a DisciplinaryRecord from database
    Require: Admin-write
    """
    logger.debug(f"{username} trying to delete a DisciplinaryRecord")
    # TODO:
    pass


###############################################################################
# experiments


@app.get("/")
def index():
    return "SUTD Housing Portal"


@app.get("/protected")
def protected(username=Depends(auth_handler.auth_wrapper)):
    return {"name": username}
