from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator


class LifestyleProfile(BaseModel):
    bedtime: int = None
    wakeup_time: int = None
    like_social: bool = None
    like_clean: bool = None
