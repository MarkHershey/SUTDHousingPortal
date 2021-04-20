from datetime import date, datetime
from typing import Dict, List

from markkk.logger import logger
from pydantic import BaseModel, validator

from ..functional import convert_date_to_datetime, convert_datetime_to_date, uid_gen
from .lifestyle import LifestyleProfile
from .room import RoomProfile


class TimePeriod(BaseModel):
    start_date: date
    end_date: date

    @validator("start_date", pre=True, always=True)
    def start_date_casting(cls, v):
        if isinstance(v, datetime):
            return convert_datetime_to_date(v)
        else:
            return v

    @validator("end_date", pre=True, always=True)
    def end_date_casting(cls, v):
        if isinstance(v, datetime):
            return convert_datetime_to_date(v)
        else:
            return v

    def to_datetime_dict(self):
        return {
            "start_date": convert_date_to_datetime(self.start_date),
            "end_date": convert_date_to_datetime(self.end_date),
        }

    @classmethod
    def from_datetime_dict(cls, datetime_dict: Dict[str, datetime]):
        return cls(
            start_date=convert_datetime_to_date(datetime_dict["start_date"]),
            end_date=convert_datetime_to_date(datetime_dict["end_date"]),
        )


class ApplicationForm(BaseModel):
    uid: str = None  # auto-generated on instantiation
    application_period_uid: str  # every AF must belong to one AP
    created_at: datetime = None  # auto-generated on instantiation
    created_by: str = None  # force populated by endpoint function
    student_id: str
    room_profile: RoomProfile
    lifestyle_profile: LifestyleProfile
    stay_period: TimePeriod
    visible_status: str = None
    internal_status: str = None
    contract_uid: str = None

    @validator("uid", pre=True, always=True)
    def default_uid(cls, v):
        return v or uid_gen("AF")

    @validator("created_at", pre=True, always=True)
    def default_created_at(cls, v):
        return v or datetime.now()


class ApplicationPeriod(BaseModel):
    uid: str = None
    created_at: datetime = None
    created_by: str = None  # username
    application_window_open: datetime
    application_window_close: datetime
    applicable_periods: List[TimePeriod]
    applicable_rooms: List[str]  # list of room IDs
    applicable_students: List[str]  # list of student IDs
    application_forms_map: Dict[str, str] = None  # student_id -> Application uid
    reference_count: int = 0

    @validator("uid", pre=True, always=True)
    def default_uid(cls, v):
        return v or uid_gen("AP")

    @validator("created_at", pre=True, always=True)
    def default_created_at(cls, v):
        return v or datetime.now()

    @validator("application_forms_map", pre=True, always=True)
    def construct_application_forms_map(cls, v, *, values, **kwargs):
        if v:
            return v
        _tmp = {}
        for s in values["applicable_students"]:
            _tmp[s] = ""
        return _tmp
