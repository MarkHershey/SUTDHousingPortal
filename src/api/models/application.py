from datetime import date, datetime
from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator

from .helpers import uid_gen
from .lifestyle import LifestyleProfile
from .room import RoomProfile


class TimePeriod(BaseModel):
    start_date: date
    end_date: date


class ApplicationForm(BaseModel):
    uid: str = None
    application_period_uid: str  # every AF must belong to one AP
    created_at: datetime = None
    student_id: str
    room_profile: RoomProfile
    lifestyle_profile: LifestyleProfile
    stay_period: TimePeriod

    @validator("uid", pre=True, always=True)
    def default_uid(cls, v):
        return v or uid_gen("AF")


class ApplicationPeriod(BaseModel):
    uid: str = None
    created_at: datetime = None
    created_by: str = None  # username
    application_window_open: datetime
    application_window_close: datetime
    applicable_periods: List[TimePeriod]
    applicable_rooms: List[str]  # list of room IDs
    applicable_students: List[str]  # list of student IDs
    application_forms: List[str] = []
    reference_count: int = 0

    @validator("uid", pre=True, always=True)
    def default_uid(cls, v):
        return v or uid_gen("AP")

    @validator("created_at", pre=True, always=True)
    def default_created_at(cls, v):
        return v or datetime.now()

    @validator("reference_count", pre=True, always=True)
    def default_reference_count(cls, v):
        return 0
