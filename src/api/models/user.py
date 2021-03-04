from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str
