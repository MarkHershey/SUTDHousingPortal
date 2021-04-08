from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator

from api.data_migrations.import_student import import_student
from ..data_migrations import import_student

class LifestyleProfile(BaseModel):
    sleep_time: str # choice (before midnight/after midnight/around midnight)
    like_social: bool 
    like_clean: int # how tidy do they need their room to be? range from 1 to 5
    like_music: bool # do they like to have music in the room?
    relationship_scale: int # from 1 to 5
    aircon: str # choice (often, occasionally, not at all) 
    interests: List[str] = [] # select from given list, let them add on if they want (others)
    intended_pillar: str = "NA" # choice (ISTD, EPD, ESD, ASD, DAI, NA)
    diet: str = "None" # choice (halal, no beef, kosher, others)
    smoking: str # choice (social smoker, not smoker, active smoker)

    @validator("sleep_time", pre=True, always=True)
    def validate_sleep_time(cls, v):
        if isinstance(v, str) and v.upper() in (
            "BEFORE MIDNIGHT",
            "AROUND MIDNIGHT",
            "AFTER MIDNIGHT",
        ):
            return v
        else:
            return "AROUND MIDNIGHT"

    @validator("social_habits", pre=True, always=True) 
    # like_social boolean 
    def validate_social_habits(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None 

    @validator("room_cleanliness", pre=True, always=True)
    def validate_room_cleanliness(cls, v):
        if isinstance(v, int) and v <= 5 and v >= 0:
            return v
        else:
            return 3

    @validator("music_volume", pre=True, always=True)
    def validate_music_volume(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None 

    @validator("relationship_scale", pre=True, always=True)
    def validate_relationship_scale(cls, v):
        if isinstance(v, int) and v <= 5 and v >= 0:
            return v
        else:
            return 3

    @validator("aircon_usage", pre=True, always=True)
    def validate_aircon_usage(cls, v):
        if isinstance(v, str) and v.upper() in (
            "OFTEN",
            "OCCASIONALLY",
            "NOT AT ALL",
        ):
            return v
        else:
            return "OCCASIONALLY"

    @validator("interests_list", pre=True, always=True)
    def validate_interests_list(cls, v):
        interests = ["kpop", "anime", "film", "reading", "photography", "art"] # random list of interests
        valid = []
        if isinstance(v, list):
            for interest in v:
                if interest.lower() not in interests:
                    continue
                else:
                    valid.append(interest)
        if len(valid) == len(v): 
            return v
        else:
            return valid

    @validator("intended_pillar", pre=True, always=True)
    def validate_intended_pillar(cls, v):
        if isinstance(v, str) and v.upper() in (
            "ISTD",
            "EPD",
            "ESD",
            "DAI",
            "ASD",
        ):
            return v
        else:
            return None

    @validator("diet", pre=True, always=True)
    def validate_diet(cls, v):
        if isinstance(v, str):
            return v
        else:
            return None

    @validator("smoker", pre=True, always=True)
    def validate_smoker(cls, v):
        if isinstance(v, str) and v.upper() in (
            "ACTIVE SMOKER",
            "SOCIAL SMOKER",
            "DO NOT SMOKE",
        ):
            return v
        else:
            return "DO NOT SMOKE"

class RoommatePreference(BaseModel): # all options are set to None unless stated otherwise
    sleep_time: str = None
    like_social: bool = None
    like_music: bool = None
    interests: List[str] = None
    intended_pillar: str = None
    diet: str = None
    smoking: str = None
    preferred_roommate: str = None
    blacklist_roommate: List[str] = None

    @validator("sleep_time", pre=True, always=True)
    def validate_sleep_time(cls, v):
        if isinstance(v, str) and v.upper() in (
            "BEFORE MIDNIGHT",
            "AROUND MIDNIGHT",
            "AFTER MIDNIGHT",
        ):
            return v
        else:
            return "AROUND MIDNIGHT"

    @validator("social_habits", pre=True, always=True) 
    # like_social boolean 
    def validate_social_habits(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None 

    @validator("music_volume", pre=True, always=True)
    def validate_music_volume(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None 

    @validator("interests_list", pre=True, always=True)
    def validate_interests_list(cls, v):
        interests = ["kpop", "anime", "film", "reading", "photography", "art"] # random list of interests
        valid = []
        if isinstance(v, list):
            for interest in v:
                if interest.lower() not in interests:
                    continue
                else:
                    valid.append(interest)
        if len(valid) == len(v): 
            return v
        else:
            return valid

    @validator("intended_pillar", pre=True, always=True)
    def validate_intended_pillar(cls, v):
        if isinstance(v, str) and v.upper() in (
            "ISTD",
            "EPD",
            "ESD",
            "DAI",
            "ASD",
        ):
            return v
        else:
            return None

    @validator("diet", pre=True, always=True)
    def validate_diet(cls, v):
        if isinstance(v, str):
            return v
        else:
            return None

    @validator("smoker", pre=True, always=True)
    def validate_smoker(cls, v):
        if isinstance(v, str) and v.upper() in (
            "ACTIVE SMOKER",
            "SOCIAL SMOKER",
            "DO NOT SMOKE",
        ):
            return v
        else:
            return "DO NOT SMOKE"

    @validator("blacklist_roommate", pre=True, always=True) 
    def validate_blacklisted_roomates(cls, v):
        if isinstance(v, list): # do not have a student list to check if name in student list
            return v 
        else:
            return None
        
    @validator("preferred_roommate", pre=True, always=True) 
    def validate_preferred_roommate(cls, v):
        if isinstance(v, str): # same issue as blacklist roommate
            return v
        else:
            return None
            