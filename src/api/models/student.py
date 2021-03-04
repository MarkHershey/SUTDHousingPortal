from typing import List, Dict
from markkk.logger import logger

from .event import Event
from .record import DisciplinaryRecords
from .lifestyle import LifestyleProfile
from .room import Room, RoomProfile


class Student:
    def __init__(
        self, student_id: str, full_name: str, gender: str, enrollment_type: str
    ):
        self._student_id: str = student_id
        self.full_name: str = full_name
        self.gender: str = gender
        self.enrollment_type: str = enrollment_type
        self.year_of_enrollment: int = None
        self._sc_status: str = None
        self._pr_status: str = None
        self.nationality: str = None
        self.phone_number: str = None
        self.email_sutd: str = None
        self.email_personal: str = None
        self.local_addr_post_code: str = None
        self.local_addr_street: str = None
        self.local_addr_unit: str = None
        self.travel_time_hrs: float = None
        self.attended_events: List[str] = []
        self.disciplinary_records: List[DisciplinaryRecords] = []
        self.preference_lifestyle: LifestyleProfile = None
        self.preference_roommate: List[str] = []
        self.preference_room: RoomProfile = None
        self.is_house_guardian: bool = False

    @property
    def student_id(self) -> str:
        return self._student_id

    @student_id.setter
    def student_id(self, value) -> None:
        raise Exception("student_id is not mutable.")

    @property
    def sc_status(self) -> bool:
        return self._sc_status

    @sc_status.setter
    def sc_status(self, value: bool) -> None:
        self._sc_status = value
        return

    @property
    def pr_status(self) -> bool:
        return self._pr_status

    @sc_status.setter
    def pr_status(self, value: bool) -> None:
        self._pr_status = value
        return
