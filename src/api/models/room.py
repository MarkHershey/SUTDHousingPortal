from typing import Dict, List, Optional

from markkk.logger import logger
from pydantic import BaseModel, validator


class Room(BaseModel):
    uid: str
    room_type: str
    block: str
    level: int
    location_idx: int = 0
    # derived
    dist_to_lift: int = None
    dist_to_washroom: int = None
    near_to_lift: bool = None
    near_to_washroom: bool = None
    window_facing: str = "NA"
    face_campus: bool = None
    face_airport: bool = None
    face_building: bool = None
    current_effective_contract_count: int = 0
    all_contracts: List[str] = []  # list of Contract UIDs


class RoomProfile(BaseModel):
    room_type: str  # Choice (DOUBLE, SINGLE, SINGLE_ENSUITE, ANY)
    room_type_2nd: str  # Choice (DOUBLE, SINGLE, SINGLE_ENSUITE, ANY)
    block: str = "ANY"  # 1 # Choice (59, 57, 55, ANY)
    block_2nd: str = "ANY"  # 1 # Choice (59, 57, 55, ANY)
    level_range: str = "ANY"  # 2 # Choice (UPPER, MIDDLE, LOWER, ANY)
    window_facing: str = "ANY"  # 3 # Choice (CAMPUS, AIRPORT, BUILDING, ANY)
    near_to_lift: bool = None  # 4
    near_to_washroom: bool = None  # 5
    level_has_pantry: bool = None  # 6
    level_has_mr: bool = None  # 7
    level_has_gsr: bool = None  # 8
    level_has_rr: bool = None  # 9
    weightage_order: List[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    @validator("room_type", pre=True, always=True)
    def validate_room_type(cls, v):
        if isinstance(v, str) and v.upper() in (
            "DOUBLE",
            "SINGLE",
            "SINGLE_ENSUITE",
            "ANY",
        ):
            return v.upper()
        else:
            return "ANY"

    @validator("room_type_2nd", pre=True, always=True)
    def validate_room_type_2nd(cls, v):
        if isinstance(v, str) and v.upper() in (
            "DOUBLE",
            "SINGLE",
            "SINGLE_ENSUITE",
            "ANY",
        ):
            return v.upper()
        else:
            return "ANY"

    @validator("block", pre=True, always=True)
    def validate_block(cls, v):
        if isinstance(v, str) and v.upper() in ("59", "57", "55", "ANY"):
            return v.upper()
        else:
            return "ANY"

    @validator("block_2nd", pre=True, always=True)
    def validate_block_2nd(cls, v):
        if isinstance(v, str) and v.upper() in ("59", "57", "55", "ANY"):
            return v.upper()
        else:
            return "ANY"

    @validator("level_range", pre=True, always=True)
    def validate_level_range(cls, v):
        if isinstance(v, str) and v.upper() in ("UPPER", "MIDDLE", "LOWER", "ANY"):
            return v.upper()
        else:
            return "ANY"

    @validator("window_facing", pre=True, always=True)
    def validate_window_facing(cls, v):
        if isinstance(v, str) and v.upper() in ("CAMPUS", "AIRPORT", "BUILDING", "ANY"):
            return v.upper()
        else:
            return "ANY"

    @validator("near_to_lift", pre=True, always=True)
    def validate_near_to_lift(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None

    @validator("near_to_washroom", pre=True, always=True)
    def validate_near_to_washroom(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None

    @validator("level_has_pantry", pre=True, always=True)
    def validate_level_has_pantry(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None

    @validator("level_has_mr", pre=True, always=True)
    def validate_level_has_mr(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None

    @validator("level_has_gsr", pre=True, always=True)
    def validate_level_has_gsr(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None

    @validator("level_has_rr", pre=True, always=True)
    def validate_level_has_rr(cls, v):
        if isinstance(v, bool) or v is None:
            return v
        else:
            return None

    @validator("weightage_order", pre=True, always=True)
    def validate_weightage_order(cls, v):
        EXPECTED_LIST_LENGTH = 9
        validated = True
        if isinstance(v, list) and len(v) == EXPECTED_LIST_LENGTH:
            for value in v:
                if not isinstance(value, int):
                    validated = False
                    break
                if not 1 <= value <= 9:
                    validated = False
                    break

            if len(set(v)) != EXPECTED_LIST_LENGTH:
                validated = False
        else:
            validated = False

        if validated:
            return v
        else:
            return [1, 2, 3, 4, 5, 6, 7, 8, 9]
