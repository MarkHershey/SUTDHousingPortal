from datetime import datetime
from typing import Dict, List


class Event:
    def __init__(
        self,
        title: str = None,
        type: str = None,
        description: str = None,
        start_time: datetime = datetime.now(),
        duration: float = 1.0,
    ):
        self.title = title
        self.type: str = None  # FE, IBE, etc
        self.description: str = description
        self.start_time: datetime = start_time
        self.duration: float = duration
