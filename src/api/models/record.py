from datetime import datetime

from markkk.logger import logger
from pydantic import BaseModel


class DisciplinaryRecord(BaseModel):
    uid: str = None
    student_id: str = None
    record_type: str = None
    description: str = None
    issue_date: datetime = datetime.now()
