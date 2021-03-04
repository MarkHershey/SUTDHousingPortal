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
    current_occupants: List[str] = []  # list of current residents' student_id
    history_occupants: List[str] = []  # list of past residents' student_id


class RoomProfile(BaseModel):
    room_type: str
    room_type_2nd: str
    block: str = "Any"
    block_2nd: str = "Any"
    level_range: str = "Any"
    window_facing: str = "Any"
    near_to_lift: bool = None
    near_to_washroom: bool = None
    level_has_pantry: bool = None
    level_has_mr: bool = None
    level_has_gsr: bool = None
    level_has_rr: bool = None
    weightage_order: List[int] = None
