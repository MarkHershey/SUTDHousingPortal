from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel
from user import User


class Student(User):
    student_id: str
    full_name: str
    gender: str  # Male / Female
    enrollment_type: str
    year_of_enrollment: int
    sc_status: str
    pr_status: str
    nationality: str
    phone_number: str
    email_sutd: str
    email_personal: str
    # local_addr_post_code: str
    # local_addr_street: str
    # local_addr_unit: str
    # travel_time_hrs: float
    # attended_events: List[str] = []
    # disciplinary_records: List[DisciplinaryRecords] = []
    # preference_lifestyle: LifestyleProfile = None
    # preference_roommate: List[str] = []
    # preference_room: RoomProfile = None
    # is_house_guardian: bool = False
