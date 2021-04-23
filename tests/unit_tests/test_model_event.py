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

    def test_creation_with_full_data(self):
        _now = datetime.now()
        event = Event(
            title="Inter Block Movie Night",
            event_type="FE",
            meetup_location="Root Cove",
            start_time=_now,
            block="59",
            floor="8",
            description="Let's watch a movie together.",
            duration_mins=120,
            count_attendance=True,
            signup_limit=30,
            signup_ddl=_now,
            archived=False,
        )
        print(event)
        self.assertTrue(isinstance(event, Event))
        self.assertTrue(event.title == "Inter Block Movie Night")
        self.assertTrue(event.event_type == "FE")
        self.assertTrue(event.meetup_location == "Root Cove")
        self.assertTrue(event.start_time == _now)
        self.assertTrue(event.block == "59")
        self.assertTrue(event.floor == "8")
        self.assertTrue(event.description == "Let's watch a movie together.")
        self.assertTrue(event.duration_mins == 120)
        self.assertTrue(event.count_attendance == True)
        self.assertTrue(event.signup_limit == 30)
        self.assertTrue(event.signup_ddl == _now)
        self.assertTrue(event.archived == False)

    def test_creation_with_full_data_string_int(self):
        _now = datetime.now()
        event = Event(
            title="Inter Block Movie Night",
            event_type="FE",
            meetup_location="Root Cove",
            start_time=_now,
            block="59",
            floor="8",
            description="Let's watch a movie together.",
            duration_mins="120",
            count_attendance=True,
            signup_limit="30",
            signup_ddl=_now,
            archived=False,
        )
        print(event)
        self.assertTrue(isinstance(event, Event))
        self.assertTrue(event.title == "Inter Block Movie Night")
        self.assertTrue(event.event_type == "FE")
        self.assertTrue(event.meetup_location == "Root Cove")
        self.assertTrue(event.start_time == _now)
        self.assertTrue(event.block == "59")
        self.assertTrue(event.floor == "8")
        self.assertTrue(event.description == "Let's watch a movie together.")
        self.assertTrue(event.duration_mins == 120)
        self.assertTrue(event.count_attendance == True)
        self.assertTrue(event.signup_limit == 30)
        self.assertTrue(event.signup_ddl == _now)
        self.assertTrue(event.archived == False)

    def test_creation_with_full_data_invalid_string(self):
        _now = datetime.now()
        event = Event(
            title="Inter Block Movie Night",
            event_type="FE",
            meetup_location="Root Cove",
            start_time=_now,
            block="59",
            floor="8",
            description="Let's watch a movie together.",
            duration_mins="xxxxxx",
            count_attendance=True,
            signup_limit="xxxxxx",
            signup_ddl=_now,
            archived=False,
        )
        print(event)
        self.assertTrue(isinstance(event, Event))
        self.assertTrue(event.title == "Inter Block Movie Night")
        self.assertTrue(event.event_type == "FE")
        self.assertTrue(event.meetup_location == "Root Cove")
        self.assertTrue(event.start_time == _now)
        self.assertTrue(event.block == "59")
        self.assertTrue(event.floor == "8")
        self.assertTrue(event.description == "Let's watch a movie together.")
        self.assertTrue(event.duration_mins == 60)
        self.assertTrue(event.count_attendance == True)
        self.assertTrue(event.signup_limit == 20)
        self.assertTrue(event.signup_ddl == _now)
        self.assertTrue(event.archived == False)

    def test_creation_with_invalid_data(self):
        _now = datetime.now()
        event = Event(
            title="Inter Block Movie Night",
            event_type="IBB",
            meetup_location="Root Cove",
            start_time=_now,
            block="999",
            floor="888",
            description="Let's watch a movie together.",
            duration_mins=0,
            count_attendance=True,
            signup_limit=-10,
            archived="False",
        )
        print(event)
        self.assertTrue(isinstance(event, Event))
        self.assertTrue(event.title == "Inter Block Movie Night")
        self.assertTrue(event.event_type == "MEETUP")
        self.assertTrue(event.meetup_location == "Root Cove")
        self.assertTrue(event.start_time == _now)
        self.assertTrue(event.block == "ANY")
        self.assertTrue(event.floor == "ANY")
        self.assertTrue(event.description == "Let's watch a movie together.")
        self.assertTrue(event.duration_mins == 60)
        self.assertTrue(event.count_attendance == True)
        self.assertTrue(event.signup_limit == 20)
        self.assertTrue(event.signup_ddl == _now)
        self.assertTrue(event.archived == False)


if __name__ == "__main__":
    unittest.main()
