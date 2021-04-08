import sys
import unittest
from datetime import datetime
from pathlib import Path

from pydantic.error_wrappers import ValidationError

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.models.event import Event


class TestEventCreation(unittest.TestCase):
    def test_creation_with_missing_data(self):
        with self.assertRaises(Exception):
            event = Event(
                title="Inter Block Movie Night",
                event_type="IBE",
                meetup_location="BLK 57, Student Lounge",
            )

    def test_creation_with_missing_data_2(self):
        with self.assertRaises(Exception):
            event = Event(
                event_type="IBE",
                meetup_location="BLK 57, Student Lounge",
            )

    def test_uid_creation(self):
        event = Event(
            title="Inter Block Movie Night",
            event_type="IBE",
            meetup_location="BLK 57, Student Lounge",
            start_time=datetime.now(),
        )
        print(event)
        self.assertTrue(isinstance(event, Event))
        self.assertTrue(event.uid.startswith("E"))

    def test_creation_with_minimal_data(self):
        _now = datetime.now()
        event = Event(
            title="Inter Block Movie Night",
            event_type="IBE",
            meetup_location="BLK 57, Student Lounge",
            start_time=_now,
        )
        print(event)
        self.assertTrue(isinstance(event, Event))
        self.assertTrue(event.title == "Inter Block Movie Night")
        self.assertTrue(event.event_type == "IBE")
        self.assertTrue(event.meetup_location == "BLK 57, Student Lounge")
        self.assertTrue(event.start_time == _now)


if __name__ == "__main__":
    unittest.main()
