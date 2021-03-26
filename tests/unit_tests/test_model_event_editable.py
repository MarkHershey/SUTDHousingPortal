import sys
import unittest
from pathlib import Path
from datetime import datetime
from pydantic.error_wrappers import ValidationError

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.models.event import EventEditableInfo


class TestRoomCreation(unittest.TestCase):
    def test_uid_creation(self):
        event_editable_info = EventEditableInfo(
            title="Inter Block Movie Night",
            event_type="IBE",
            meetup_location="BLK 57, Student Lounge",
            start_time=datetime.now(),
        )
        print(event_editable_info)
        self.assertTrue(isinstance(event_editable_info, EventEditableInfo))


if __name__ == "__main__":
    unittest.main()
