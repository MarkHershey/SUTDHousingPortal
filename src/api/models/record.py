from datetime import datetime

from markkk.logger import logger
from pydantic import BaseModel, validator

from .helpers import uid_gen


class DisciplinaryRecord(BaseModel):
    uid: str = None
    created_at: datetime = None  # backend auto generate this
    created_by: str = None  # supply student_id or username
    student_id: str
    record_type: str
    description: str = None
    points_deduction: int = 100  # >= 0

    @validator("uid", pre=True, always=True)
    def default_uid(cls, v):
        return v or uid_gen("DR")

    @validator("created_at", pre=True, always=True)
    def default_created_at(cls, v):
        return v or datetime.now()

    # points_deduction validation, force >= 0
    @validator("points_deduction", pre=True, always=True)
    def validate_points_deduction(cls, v):
        if isinstance(v, int):
            return abs(v)
        else:
            raise ValueError("Invalid 'points_deduction' value.")


class RecordEditable(BaseModel):
    description: str = None
    points_deduction: int = 100  # >= 0
