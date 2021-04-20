from datetime import datetime
from typing import List

from markkk.logger import logger
from pydantic import BaseModel, validator

from ..functional import uid_gen


class Event(BaseModel):
    uid: str = None
    created_at: datetime = None  # backend auto generate this
    created_by: str = None  # supply student_id or username
    title: str
    event_type: str  # example: FE, IBE, etc
    meetup_location: str
    block: str = "ANY"
    floor: str = "ANY"
    description: str = "None"  # long text description of the event
    start_time: datetime  # datetime object indicating event start time
    duration_mins: int = 60  # event duration in number of minutes
    count_attendance: bool = (
        True  # whether this event count towards housing residents's event participation
    )
    signups: List[str] = []  # list of registered student_id
    attendance: List[str] = []  # list of attended student_id
    signup_limit: int = 20  # maximum number of signups
    signup_ddl: datetime = None  # deadline for sign up
    archived: bool = False

    @validator("uid", pre=True, always=True)
    def default_uid(cls, v):
        return v or uid_gen("E")

    @validator("created_at", pre=True, always=True)
    def default_created_at(cls, v):
        return v or datetime.now()

    @validator("event_type", pre=True, always=True)
    def validate_event_type(cls, v):
        if isinstance(v, str) and v.upper() in ("IBE", "FE", "BE"):
            return v.upper()
        else:
            return "MEETUP"

    @validator("block", pre=True, always=True)
    def validate_block(cls, v):
        if isinstance(v, str) and v.upper() in ("59", "57", "55", "ANY"):
            return v.upper()
        else:
            return "ANY"

    @validator("floor", pre=True, always=True)
    def validate_floor(cls, v):
        if isinstance(v, str) and v.upper() != "ANY":
            try:
                v = str(int(v))
            except:
                pass

        if isinstance(v, str) and v.upper() in (
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "ANY",
        ):
            return v.upper()
        else:
            return "ANY"

    @validator("duration_mins", pre=True, always=True)
    def validate_duration_mins(cls, v):
        if isinstance(v, int) and v > 0:
            return v
        else:
            return 60

    @validator("signup_limit", pre=True, always=True)
    def validate_signup_limit(cls, v):
        if isinstance(v, int) and 0 < v <= 300:
            return v
        else:
            return 20

    @validator("signup_ddl", pre=True, always=True)
    def default_signup_ddl(cls, v, *, values, **kwargs):
        return v or values["start_time"]

    @validator("archived", pre=True, always=True)
    def default_archived(cls, v):
        if isinstance(v, bool):
            return v or False
        else:
            return False


class EventEditableInfo(BaseModel):
    title: str = None
    event_type: str = None
    meetup_location: str = None
    block: str = None
    floor: str = None
    description: str = None
    start_time: datetime = None
    duration_mins: int = None
    count_attendance: bool = None
    signup_limit: int = None
