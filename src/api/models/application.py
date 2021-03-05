from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator
from .room import RoomProfile
from datetime import datetime, date
from .lifestyle import LifestyleProfile


class TimePeriod(BaseModel):
    start_date: date
    end_date: date


class ApplicationForm(BaseModel):
    uid: str = None
    created_at: datetime = None
    student_id: str
    room_profile: RoomProfile
    lifestyle_profile: LifestyleProfile
    stay_period: TimePeriod


class ApplicationPeriod(BaseModel):
    uid: str = None
    created_at: datetime = None
    created_by: str  # username
    application_window_open: datetime
    application_window_close: datetime
    applicable_periods: List[TimePeriod]
    applicable_rooms: List[str]  # list of room IDs
    applicable_students: List[str]  # list of student IDs
