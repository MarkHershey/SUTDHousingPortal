from datetime import datetime

from markkk.logger import logger
from pydantic import BaseModel, validator

from .helpers import uid_gen


class DisciplinaryRecord(BaseModel):
    uid: str = None
    student_id: str = None
    record_type: str = None
    description: str = None

    @validator("uid", pre=True, always=True)
    def default_created_at(cls, v):
        return v or uid_gen("DR")
