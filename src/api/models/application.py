from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator


class ApplicationForm(BaseModel):
    uid: str = None
    pass


class ApplicationPeriod(BaseModel):
    uid: str = None
    pass
