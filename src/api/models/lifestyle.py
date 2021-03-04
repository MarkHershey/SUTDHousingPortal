from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator


class LifestyleProfile(BaseModel):
    bedtime: int = None
    wakeup_time: int = None
    like_social: int = None
    like_clean: int = None
    like_quite: int = None
