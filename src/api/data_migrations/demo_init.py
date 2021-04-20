import sys
from datetime import date, datetime, timedelta
from math import ceil
from pathlib import Path
from random import choice, randint, sample, shuffle, uniform
from typing import List

import names
import requests
from markkk.logger import logger

src_dir = Path(__file__).resolve().parent.parent.parent

sys.path.insert(0, str(src_dir))


###############################################
## Configs
LOCAL_ROOT = "http://127.0.0.1:8000"
SERVER_ROOT = "http://esc.dev.markhh.com"
API_ROOT_URL = SERVER_ROOT
###############################################

from api.database import *
from api.routes.auth import auth_handler

BASE_HEADERS = {
    "accept": "application/json",
    "Content-Type": "application/json",
}
ADMIN_TOKEN = ""
STUDENT_TOKEN = ""
HG_TOKEN = ""

STUDENTS_IDS: List[str] = [str(x) for x in range(1000000, 1000031)]


def init_tokens():
    global ADMIN_TOKEN
    global HG_TOKEN
    global STUDENT_TOKEN

    ADMIN_TOKEN = auth_handler.encode_token(user_id="admin")
    HG_TOKEN = auth_handler.encode_token(user_id="1000000")
    STUDENT_TOKEN = auth_handler.encode_token(user_id="1000001")


def post_request(
    endpoint: str, data: dict, token=ADMIN_TOKEN, headers=BASE_HEADERS
) -> dict:
    request_url = API_ROOT_URL + endpoint
    if token:
        headers["Authorization"] = "Bearer " + token
    response = requests.post(
        url=request_url,
        headers=headers,
        json=data,
    )
    return response.json()


def get_request(
    endpoint: str, data: dict = None, token=ADMIN_TOKEN, headers=BASE_HEADERS
) -> dict:
    request_url = API_ROOT_URL + endpoint
    if token:
        headers["Authorization"] = "Bearer " + token
    response = requests.get(
        url=request_url,
        headers=headers,
        json=data,
    )
    return response.json()


########################################################
## Create Admin User
def create_admin():
    data = {
        "username": "admin",
        "password": "pass1234",
        "full_name": "admin",
        "email_sutd": "admin@sutd.edu.sg",
        "read_only": False,
    }
    post_request(endpoint="/api/auth/register/admin", data=data, token=None)


########################################################
## Create Students
def create_students():
    for i in range(30):
        student_id = 1000000 + i
        gender = choice(["male", "female"])
        first_name = names.get_first_name(gender=gender)
        last_name = names.get_last_name()
        email_sutd = f"{first_name.lower()}_{last_name.lower()}@mail.sutd.edu.sg"
        email_personal = f"{first_name.lower()}@gmail.com"
        sc_status = choice([True, False])
        data = {
            "username": str(student_id),
            "password": str(student_id),
            "student_id": str(student_id),
            "full_name": f"{first_name} {last_name}",
            "gender": gender,
            "enrollment_type": choice(("PhD", "MArch", "MSSD", "UG", "UG", "UG")),
            "year_of_enrollment": randint(2009, 2022),
            "sc_status": sc_status,
            "pr_status": False if sc_status else choice((True, False)),
            "nationality": "Singaporean"
            if sc_status
            else choice(("Chinese", "Indian", "Indonesian", "Malaysian")),
            "phone_number": str(randint(80000000, 99999999)),
            "email_sutd": email_sutd,
            "email_personal": email_personal,
            "local_addr_post_code": str(randint(300000, 999999)),
            "local_addr_street": "Changi South Avenue 1",
            "local_addr_unit": f"#{str(randint(10, 99))}-{str(randint(100, 199))}",
            "preference_roommate": [str(randint(1000000, 1000030))],
            "preference_room": {
                "room_type": choice(("DOUBLE", "SINGLE", "SINGLE_ENSUITE")),
                "room_type_2nd": choice(("DOUBLE", "SINGLE", "SINGLE_ENSUITE")),
                "block": choice(("59", "57", "55", "ANY")),
                "block_2nd": choice(("59", "57", "55", "ANY")),
                "level_range": choice(("UPPER", "MIDDLE", "LOWER", "ANY")),
                "window_facing": choice(("CAMPUS", "AIRPORT", "BUILDING", "ANY")),
                "near_to_lift": choice((True, False)),
                "near_to_washroom": choice((True, False)),
                "level_has_pantry": choice((True, False)),
                "level_has_mr": choice((True, False)),
                "level_has_gsr": choice((True, False)),
                "level_has_rr": choice((True, False)),
                "weightage_order": shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            },
            "preference_lifestyle": {
                "sleep_time": choice((21, 22, 23, 0, 1, 2, 3)),
                "wakeup_time": choice((5, 6, 7, 8, 9, 10, 11)),
                "like_social": randint(0, 10),
                "like_quiet": randint(0, 10),
                "like_clean": randint(0, 10),
                "diet": choice(
                    ("Standard", "Vegetarian", "Vegan", "Raw", "No Sugar", "Halal")
                ),
                "use_aircon": choice((True, False)),
                "smoking": choice((True, False)),
            },
            "is_house_guardian": True if student_id == 1000000 else False,
            "travel_time_hrs": uniform(0.0, 2.0),
        }
        post_request(endpoint="/api/auth/register/student", data=data, token=None)


########################################################
## House Guardian Create Events
def create_events():
    for _ in range(30):
        game = choice(
            (
                "Table Soccer",
                "Darts",
                "Board Game",
                "Fortnite",
                "Minecraft",
                "Among Us",
                "Animal Crossing",
                "Cyberpunk",
                "FIFA",
                "2K21",
                "The Sims",
                "Overcooked",
            )
        )
        startM = randint(4, 12)
        startD = randint(1, 28)
        startH = randint(15, 22)
        startMin = choice((0, 0, 30))
        start_time = datetime(2021, startM, startD, startH, startMin)
        location = choice(("Hostel Rooftop", "Student Lounge", "Root Cove", "Zoom"))
        data = {
            "title": f"{game} {choice(('Night', 'Event', 'Meetup'))}",
            "event_type": choice(("IBE", "BE", "FE", "MEETUP")),
            "meetup_location": location,
            "block": choice(("59", "57", "55", "ANY")),
            "floor": str(randint(2, 12)),
            "description": f"Let us play {game} together at {location}, no experiences required, sign up and see you there!",
            "start_time": start_time.isoformat(),
            "signup_ddl": (start_time - timedelta(days=1, seconds=1)).isoformat(),
            "duration_mins": choice((30, 60, 90)),
            "count_attendance": choice((True, True, True, True, False)),
            "signup_limit": choice((15, 20, 25, 30)),
        }
        post_request(endpoint="/api/events/", data=data, token=HG_TOKEN)


########################################################
## Student Sign up Event
def get_upcoming_events_uid() -> List[str]:
    uids = []
    events: List[dict] = get_request(endpoint="/api/events/upcoming", token=ADMIN_TOKEN)
    for event in events:
        if event.get("uid"):
            uids.append(event.get("uid"))
    return uids


def signup_attend_events():
    for event_uid in get_upcoming_events_uid():
        num_ppl = randint(3, 15)
        students: List[str] = sample(STUDENTS_IDS, num_ppl)
        post_request(
            endpoint=f"/api/events/{event_uid}/signup", data=students, token=ADMIN_TOKEN
        )
        students: List[str] = sample(students, num_ppl - 2)
        post_request(
            endpoint=f"/api/events/{event_uid}/attend", data=students, token=ADMIN_TOKEN
        )


########################################################
## Create Disciplinary Records
def create_disciplinary_records():
    random_students = sample(STUDENTS_IDS, ceil(len(STUDENTS_IDS) * 0.2))
    for student_id in random_students:
        data = {
            "student_id": student_id,
            "record_type": choice(("LOW", "WARNING", "SUSPENSION")),
            "description": f"This is a Disciplinary Record issued to student(id: {student_id}) for breaching SUTD Housing rules. Disciplinary action may result in a range of sanctions including, but not limited to, suspension, termination, revocation of visitation privileges and non-consideration for future accommodation at the University’s Student Housing. ",
            "points_deduction": choice(list(range(0, 101, 10))),
        }
        post_request(endpoint=f"/api/records/", data=data, token=ADMIN_TOKEN)


########################################################
## Create Rooms
ROOM_UIDs = []


def create_rooms():
    global ROOM_UIDs
    for block in ("59", "57", "55"):
        for level in range(2, 13):
            for loc_idx in range(0, 30):
                _tmp_level = str(level) if level >= 10 else f"0{level}"
                _tmp_room = str(loc_idx) if loc_idx >= 10 else f"0{loc_idx}"
                room_number = f"{block}-{_tmp_level}-{_tmp_room}"
                ROOM_UIDs.append(room_number)
                data = {
                    "uid": room_number,
                    "room_number": room_number,
                    "room_type": "SINGLE_ENSUITE"
                    if loc_idx > 26
                    else choice(("DOUBLE", "DOUBLE", "SINGLE")),
                    "block": block,
                    "level": level,
                    "window_facing": "BUILDING"
                    if block == "57"
                    else choice(("CAMPUS", "BUILDING"))
                    if block == "59"
                    else choice(("AIRPORT", "BUILDING")),
                    "location_idx": loc_idx,
                }
                post_request(endpoint=f"/api/rooms/", data=data, token=ADMIN_TOKEN)


########################################################
## Create Application Periods
def create_application_periods():
    data = {
        "application_window_open": datetime.now().isoformat(),
        "application_window_close": (datetime.now() + timedelta(days=30)).isoformat(),
        "applicable_periods": [
            {
                "start_date": date.today().isoformat(),
                "end_date": (date.today() + timedelta(days=30)).isoformat(),
            }
        ],
        "applicable_rooms": sample(ROOM_UIDs, int(len(ROOM_UIDs) * 0.3)),
        "applicable_students": STUDENTS_IDS,
    }
    post_request(endpoint=f"/api/application_periods/", data=data, token=ADMIN_TOKEN)


########################################################
## Create Application

## TODO

if __name__ == "__main__":
    ### Drop collections
    users_collection.drop()
    admins_collection.drop()
    students_collection.drop()
    applications_collection.drop()
    application_periods_collection.drop()
    contracts_collection.drop()
    events_collection.drop()
    records_collection.drop()
    rooms_collection.drop()
    ### populate database
    create_admin()
    create_students()
    init_tokens()
    create_events()
    signup_attend_events()
    create_disciplinary_records()
    create_rooms()
    create_application_periods()
