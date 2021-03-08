from datetime import date, datetime, timedelta
from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator

from .helpers import uid_gen


class Contract(BaseModel):
    uid: str
    created_at: datetime = None
    room_uid: str
    bed_id: str = ""
    student_id: str
    start_date: date
    end_date: date
    unit_price_per_day: float
    payment_received: bool = False
    # derived
    total_days: int = 0

    @validator("uid", pre=True, always=True)
    def default_created_at(cls, v):
        return v or uid_gen("C")

    @validator("created_at", pre=True, always=True)
    def default_created_at(cls, v):
        return v or datetime.now()

    @validator("total_days", pre=True, always=True)
    def calculate_total_days(cls, v, *, values, **kwargs):
        start_date: date = values.get("start_date")
        end_date: date = values.get("end_date")
        delta: timedelta = end_date - start_date
        return int(delta.days)


if __name__ == "__main__":
    start_date: date = date(2021, 1, 1)
    end_date: date = date.today()
    time_delta: timedelta = end_date - start_date
    print(time_delta.days)
