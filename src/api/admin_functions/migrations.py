import json
from subprocess import run


def create_student(
    username: str,
    password: str,
    full_name: str,
    gender: str,  # Male / Female
    enrollment_type: str,
    year_of_enrollment: int,
    sc_status: bool,
    pr_status: bool,
    nationality: str,
    phone_number: str,
    email_sutd: str,
    email_personal: str,
    local_addr_post_code: str,
):
    payload = {
        "username": username,
        "password": password,
        "full_name": full_name,
        "gender": gender,
        "enrollment_type": enrollment_type,
        "year_of_enrollment": year_of_enrollment,
        "sc_status": sc_status,
        "pr_status": pr_status,
        "nationality": nationality,
        "phone_number": phone_number,
        "email_sutd": email_sutd,
        "email_personal": email_personal,
        "local_addr_post_code": "485999",
        "local_addr_street": "Block 59, Changi South Ave 1, SUTD Hostel",
        "local_addr_unit": "#08-107",
    }
    payload = json.dumps(payload)
    cmd = (
        """curl --header "Content-Type: application/json" --request POST --data '"""
        + payload
        + """' localhost:8000/register/student"""
    )
    print(cmd)


def create_admin(
    username: str,
    password: str,
    full_name: str,
    email_sutd: str,
    read_only_privilege: bool = False,
):
    payload = {
        "username": username,
        "password": password,
        "full_name": full_name,
        "email_sutd": email_sutd,
        "read_only_privilege": read_only_privilege,
    }
    payload = json.dumps(payload)
    cmd = (
        """curl --header "Content-Type: application/json" --request POST --data '"""
        + payload
        + """' localhost:8000/register/admin"""
    )
    print(cmd)


def login_and_get_token(username: str, password: str):
    payload = {
        "username": username,
        "password": password,
    }
    payload = json.dumps(payload)
    cmd = (
        """curl --header "Content-Type: application/json" --request POST --data '"""
        + payload
        + """' localhost:8000/login"""
    )
    print(cmd)


create_student(
    "1000000",
    "pass1234",
    "Mark Huang",
    "Male",
    "UG",
    "2019",
    False,
    False,
    "Chinese",
    "87654321",
    "mark_huang@mymail.sutd.edu.sg",
    "example@gmail.com",
    "485998",
)
create_student(
    "1003432",
    "pass1234",
    "Maria Johnson",
    "Female",
    "PhD",
    "2020",
    False,
    False,
    "American",
    "87654321",
    "maria_johnson@mymail.sutd.edu.sg",
    "example@gmail.com",
    "485999",
)
create_admin("admin", "pass1234", "Bill Gates", "bill_gates@sutd.edu.sg", False)
login_and_get_token("admin", "pass1234")
