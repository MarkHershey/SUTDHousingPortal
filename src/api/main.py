from copy import copy

from fastapi import Depends, FastAPI, HTTPException

from auth import AuthHandler
from models.admin import Admin
from models.student import Student
from models.user import User

app = FastAPI()


auth_handler = AuthHandler()
users = []
all_students = []
all_admins = []


@app.post("/register/user", status_code=201)
def register(auth_details: User):
    if any(x["username"] == auth_details.username for x in users):
        raise HTTPException(status_code=400, detail="Username is taken")
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    users.append({"username": auth_details.username, "password": hashed_password})
    return


@app.post("/register/admin", status_code=201)
def register(new_admin: Admin):
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


@app.get("/students")
def get_all_student():
    return {"all_students": all_students}


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


@app.get("/unprotected")
def unprotected():
    return {"hello": "world"}


@app.get("/protected")
def protected(username=Depends(auth_handler.auth_wrapper)):
    return {"name": username}
