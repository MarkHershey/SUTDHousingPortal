from datetime import datetime

from markkk.logger import logger
from pydantic import BaseModel


class DisciplinaryRecords(BaseModel):
    id: str = None
    student_id: str = None
    type: str = None
    description: str = None
    issue_date: datetime = datetime.now()
