from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel


class UserLoginResponse(BaseModel):
    token: str
    is_student: bool
    is_student_hg: bool
    is_admin: bool
    is_admin_write: bool


class UserAccessResponse(BaseModel):
    is_student: bool
    is_student_hg: bool
    is_admin: bool
    is_admin_write: bool
