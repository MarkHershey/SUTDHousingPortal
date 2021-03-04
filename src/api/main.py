from copy import copy

from fastapi import Depends, FastAPI, HTTPException
from markkk.logger import logger

from .auth import AuthHandler
from .models.room import Room, RoomProfile
from .models.student import Student
from .models.user import Admin, User

app = FastAPI()


auth_handler = AuthHandler()
users = []
all_students = []
all_admins = []


###############################################################################
# authentications


@app.post("/register/user", status_code=201)
def register(auth_details: User):
    if any(x["username"] == auth_details.username for x in users):
        raise HTTPException(status_code=400, detail="Username is taken")
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    users.append({"username": auth_details.username, "password": hashed_password})
    return


@app.post("/register/admin", status_code=201)
def register_admin(new_admin: Admin):
    if any(x["username"] == new_admin.username for x in users):
        raise HTTPException(status_code=400, detail="Username is taken")
    hashed_password = auth_handler.get_password_hash(new_admin.password)
    users.append({"username": new_admin.username, "password": hashed_password})
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
    all_students.append(student_info)
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


###############################################################################
# functions


@app.get("/students")
def get_all_student_info():
    """
    Set a Student as House Guardian
    Require: Admin-write
    """
    return {"all_students": all_students}


@app.put("/student/{student_id}/set_hg")
def set_student_as_hg(student_id: str):
    """
    Set a Student as House Guardian
    Require: Admin-write
    """
    # TODO:
    pass


@app.put("/student/{student_id}/revoke_sg")
def revoke_student_as_hg(student_id: str):
    """
    Revoke a Student as House Guardian
    Require: Admin-write
    """
    # TODO:
    pass


@app.put("/student/{student_id}/update_room_profile")
def update_room_profile(student_id: str, room_profile_id: RoomProfile):
    """
    Update (Overwrite) a student's prefered room profile
    Require: Student-self or Admin-write
    """
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
