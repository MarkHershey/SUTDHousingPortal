from markkk.logger import logger
from pydantic import BaseModel, validator


class LifestyleProfile(BaseModel):
    sleep_time: int = None  # dropdown selection - Only allow: 21, 22, 23, 0, 1, 2, 3
    wakeup_time: int = None  # dropdown selection - Only allow: 5, 6, 7, 8, 9, 10, 11
    like_social: int = None  # on a scale of 0 to 10
    like_quiet: int = None  # on a scale of 0 to 10
    like_clean: int = None  # on a scale of 0 to 10
    diet: str = None
    use_aircon: bool = None
    smoking: bool = None

    @validator("sleep_time", pre=True, always=True)
    def validate_sleep_time(cls, v):
        if isinstance(v, str):
            try:
                v = int(v)
            except:
                pass
        if isinstance(v, int) and v in (21, 22, 23, 0, 1, 2, 3):
            return v
        else:
            return None

    @validator("wakeup_time", pre=True, always=True)
    def validate_wakeup_time(cls, v):
        if isinstance(v, str):
            try:
                v = int(v)
            except:
                pass
        if isinstance(v, int) and v in (5, 6, 7, 8, 9, 10, 11):
            return v
        else:
            return None

    @validator("like_social", pre=True, always=True)
    def validate_like_social(cls, v):
        if isinstance(v, str):
            try:
                v = int(v)
            except:
                pass
        if isinstance(v, int) and 0 <= v <= 10:
            return v
        else:
            return 5

    @validator("like_quiet", pre=True, always=True)
    def validate_like_quiet(cls, v):
        if isinstance(v, str):
            try:
                v = int(v)
            except:
                pass
        if isinstance(v, int) and 0 <= v <= 10:
            return v
        else:
            return 5

    @validator("like_clean", pre=True, always=True)
    def validate_like_clean(cls, v):
        if isinstance(v, str):
            try:
                v = int(v)
            except:
                pass
        if isinstance(v, int) and 0 <= v <= 10:
            return v
        else:
            return 5
