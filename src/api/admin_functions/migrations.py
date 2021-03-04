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
        "local_addr_post_code": local_addr_post_code,
    }
    payload = json.dumps(payload)
    cmd = (
        """curl --header "Content-Type: application/json" --request POST --data '"""
        + payload
        + """' localhost:8000/register/student"""
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
    "American",
    "87654321",
    "he_huang@mymail.sutd.edu.sg",
    "example@gmail.com",
    "485998",
)
