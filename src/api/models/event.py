from datetime import datetime
from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator


class Event(BaseModel):
    uid: str = None
    title: str
    event_type: str  # example: FE, IBE, etc
    description: str = "None"  # long text description of the event
    start_time: datetime  # datetime object indicating event start time
    duration_mins: int = 60  # event duration in number of minutes
    count_attendance: bool = (
        True  # whether this event count towards housing residents's event participation
    )
    signups: List[str] = []  # list of registered student_id
    attendance: List[str] = []  # list of attended student_id
