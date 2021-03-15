from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator

from .lifestyle import LifestyleProfile
from .room import RoomProfile
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
    local_addr_street: str = None
    local_addr_unit: str = None
    attended_events: List[str] = []
    disciplinary_records: List[str] = []
    preference_roommate: List[str] = []
    preference_room: RoomProfile = None
    preference_lifestyle: LifestyleProfile = None
    is_house_guardian: bool = False
    # derived
    travel_time_hrs: float = None

    @validator("student_id", pre=True, always=True)
    def port_username_to_studentId(cls, v, *, values, **kwargs):
        return values["username"]


class StudentProfile(BaseModel):
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
    local_addr_street: str = None
    local_addr_unit: str = None
    attended_events: List[str] = []
    disciplinary_records: List[str] = []
    preference_roommate: List[str] = []
    preference_room: RoomProfile = None
    preference_lifestyle: LifestyleProfile = None
    is_house_guardian: bool = False


class StudentEditableProfile(User):
    phone_number: str = None
    email_personal: str = None
    local_addr_post_code: str = None
    local_addr_street: str = None
    local_addr_unit: str = None
    preference_roommate: List[str] = None


class StudentIdentityProfile(User):
    student_id: str = None
    full_name: str = None
    gender: str = None  # Male / Female
    enrollment_type: str = None
    year_of_enrollment: int = None
    sc_status: bool = False
    pr_status: bool = False
    nationality: str
    email_sutd: str
