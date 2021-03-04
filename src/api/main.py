from copy import copy

from fastapi import Depends, FastAPI, HTTPException
from markkk.logger import logger

from .auth import AuthHandler
from .models.room import Room, RoomProfile
from .models.student import Student, StudentSettingsProfile
from .models.user import Admin, User
from .models.lifestyle import LifestyleProfile
from .models.record import DisciplinaryRecord
from .models.application import ApplicationForm, ApplicationPeriod

app = FastAPI()

###############################################################################
# database

users = []
all_students = {}
all_admins = []
all_user_info = {}

###############################################################################
# authentications

auth_handler = AuthHandler()


@app.post("/register/user", status_code=201)
def register(auth_details: User):
    if any(x["username"] == auth_details.username for x in users):
        raise HTTPException(status_code=400, detail="Username is taken")
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    user_info = {"username": auth_details.username, "password": hashed_password}
    users.append(user_info)
    all_user_info[auth_details.username] = user_info
    return


@app.post("/register/admin", status_code=201)
def register_admin(new_admin: Admin):
    if any(x["username"] == new_admin.username for x in users):
        raise HTTPException(status_code=400, detail="Username is taken")
    hashed_password = auth_handler.get_password_hash(new_admin.password)
    user_info = {"username": new_admin.username, "password": hashed_password}
    users.append(user_info)
    all_user_info[new_admin.username] = user_info
    return


@app.post("/register/student", status_code=201)
def register_student(new_student: Student):
    if any(x["username"] == new_student.username for x in users):
        raise HTTPException(status_code=400, detail="Student already exists")
    hashed_password = auth_handler.get_password_hash(new_student.password)
    users.append({"username": new_student.username, "password": hashed_password})
    student_info = new_student.dict()
    student_info.pop("password")
    student_info["hashed_password"] = hashed_password
    all_students[new_student.username] = student_info
    all_user_info[new_student.username] = student_info
    return


@app.post("/login")
def login(auth_details: User):
    user = None
    for x in users:
        if x["username"] == auth_details.username:
            user = x
            break

    if (user is None) or (
        not auth_handler.verify_password(auth_details.password, user["password"])
    ):
        raise HTTPException(status_code=401, detail="Invalid username and/or password")
    token = auth_handler.encode_token(user["username"])
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


@app.get("/student")
def get_all_student_info(username=Depends(auth_handler.auth_wrapper)):
    """
    Get all student info
    Require: Admin-read
    """
    return {"all_students": all_students}


@app.get("/student/{student_id}")
def get_student_info(student_id: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Set a particular Student info
    Require: Student-self or Admin-read
    """
    # TODO:
    student_info = all_user_info.get(student_id, {"msg": "student not found"})
    return student_info


@app.put("/student/{student_id}")
def update_student_info(
    student_id: str,
    student_settings: StudentSettingsProfile,
    username=Depends(auth_handler.auth_wrapper),
):
    """
    Update (Overwrite) a particular Student info
    Require: Student-self or Admin-write
    """
    # TODO:
    pass


@app.put("/student/{student_id}/set_hg")
def set_student_as_hg(student_id: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Set a Student as House Guardian
    Require: Admin-write
    """
    # TODO:
    pass


@app.put("/student/{student_id}/revoke_sg")
def revoke_student_as_hg(student_id: str, username=Depends(auth_handler.auth_wrapper)):
    """
    Revoke a Student as House Guardian
    Require: Admin-write
    """
    # TODO:
    pass


@app.put("/student/{student_id}/update_room_profile")
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


@app.put("/student/{student_id}/update_lifestyle_profile")
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
