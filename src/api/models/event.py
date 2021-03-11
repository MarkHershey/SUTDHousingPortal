from datetime import datetime
from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator

from .helpers import uid_gen


class Event(BaseModel):
    uid: str = None
    title: str
    created_by: str  # supply student_id or username
    created_at: datetime = None  # backend auto generate this
    event_type: str  # example: FE, IBE, etc
    meetup_location: str
    block: str = "Any"
    floor: str = "Any"
    description: str = "None"  # long text description of the event
    start_time: datetime  # datetime object indicating event start time
    duration_mins: int = 60  # event duration in number of minutes
    count_attendance: bool = (
        True  # whether this event count towards housing residents's event participation
    )
    signups: List[str] = []  # list of registered student_id
    attendance: List[str] = []  # list of attended student_id

    @validator("uid", pre=True, always=True)
    def default_uid(cls, v):
        return v or uid_gen("E")

    @validator("created_at", pre=True, always=True)
    def default_created_at(cls, v):
        return v or datetime.now()
