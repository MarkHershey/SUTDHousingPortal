from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator

from .user import User


class Student(User):
    student_id: str = None
    full_name: str
    gender: str  # Male / Female
    enrollment_type: str
    year_of_enrollment: int
    sc_status: bool = False
    pr_status: bool = False
    nationality: str
    phone_number: str
    email_sutd: str
    email_personal: str
    local_addr_post_code: str
    # local_addr_street: str
    # local_addr_unit: str
    # travel_time_hrs: float
    # attended_events: List[str] = []
    # disciplinary_records: List[str] = []
    # preference_lifestyle: LifestyleProfile = None
    preference_roommate: List[str] = []
    # preference_room: RoomProfile = None
    is_house_guardian: bool = False

    @validator("student_id", pre=True, always=True)
    def port_username_to_studentId(cls, v, *, values, **kwargs):
        return values["username"]


if __name__ == "__main__":
    s = Student(
        username="1004561",
        password="pass1234",
        # student_id="1004561",
        full_name="Mark Huang",
        gender="Male",
        enrollment_type="UG",
        year_of_enrollment="2019",
        sc_status=False,
        pr_status=False,
        nationality="Chinese",
        phone_number="87654321",
        email_sutd="he_huang@mymail.sutd.edu.sg",
        email_personal="hhzeos@gmail.com",
        local_addr_post_code="485998",
    )
    print(s.dict)
