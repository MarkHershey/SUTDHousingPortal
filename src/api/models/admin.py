from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator

from .user import User


class Admin(User):
    full_name: str
    email_sutd: str
