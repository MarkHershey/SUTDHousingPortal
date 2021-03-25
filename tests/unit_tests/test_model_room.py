import sys
import unittest
from pathlib import Path

from pydantic.error_wrappers import ValidationError

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.models.room import Room


class TestRoomCreation(unittest.TestCase):
    def test_creation_with_missing_data(self):
        with self.assertRaises(Exception):
            room = Room(room_type="single")

    def test_uid_creation(self):
        room = Room(
            room_number="59-108",
            room_type="single",
            block="59",
            level=8,
            window_facing="campus",
        )
        print(room)
        self.assertTrue(isinstance(room, Room))
        self.assertTrue(room.uid.startswith("R"))

    def test_creation_with_minimal_data(self):
        room = Room(
            room_number="59-108",
            room_type="single",
            block="59",
            level=8,
            window_facing="campus",
        )
        print(room)
        self.assertTrue(isinstance(room, Room))
        self.assertTrue(room.room_type == "SINGLE")
        self.assertTrue(room.block == "59")
        self.assertTrue(room.level == 8)
        self.assertTrue(room.window_facing == "CAMPUS")
        self.assertTrue(room.location_idx == 0)
        self.assertTrue(room.face_campus == True)
        self.assertTrue(room.face_airport == False)
        self.assertTrue(room.face_building == False)

    def test_location_index_calculation_1(self):
        room = Room(
            room_number="59-108",
            room_type="single",
            block="59",
            level=8,
            window_facing="campus",
            location_idx=8,
        )
        print(room)
        self.assertTrue(isinstance(room, Room))
        self.assertTrue(room.room_type == "SINGLE")
        self.assertTrue(room.block == "59")
        self.assertTrue(room.level == 8)
        self.assertTrue(room.window_facing == "CAMPUS")
        self.assertTrue(room.location_idx == 8)
        self.assertTrue(room.dist_to_lift == 1)
        self.assertTrue(room.dist_to_washroom == 16)
        self.assertTrue(room.near_to_lift == True)
        self.assertTrue(room.near_to_washroom == False)
        self.assertTrue(room.face_campus == True)
        self.assertTrue(room.face_airport == False)
        self.assertTrue(room.face_building == False)
        self.assertTrue(room.current_effective_contract_count == 0)
        self.assertTrue(room.all_contracts == [])

    def test_location_index_calculation_2(self):
        room = Room(
            room_number="59-108",
            room_type="single",
            block="59",
            level=8,
            window_facing="campus",
            location_idx=20,
        )
        print(room)
        self.assertTrue(isinstance(room, Room))
        self.assertTrue(room.room_type == "SINGLE")
        self.assertTrue(room.block == "59")
        self.assertTrue(room.level == 8)
        self.assertTrue(room.window_facing == "CAMPUS")
        self.assertTrue(room.location_idx == 20)
        self.assertTrue(room.dist_to_lift == 13)
        self.assertTrue(room.dist_to_washroom == 4)
        self.assertTrue(room.near_to_lift == False)
        self.assertTrue(room.near_to_washroom == True)
        self.assertTrue(room.face_campus == True)
        self.assertTrue(room.face_airport == False)
        self.assertTrue(room.face_building == False)
        self.assertTrue(room.current_effective_contract_count == 0)
        self.assertTrue(room.all_contracts == [])

    def test_window_facing_derivation_1(self):
        room = Room(
            room_number="59-108",
            room_type="single",
            block="59",
            level=8,
            window_facing="Building",
            location_idx=20,
        )
        print(room)
        self.assertTrue(isinstance(room, Room))
        self.assertTrue(room.window_facing == "BUILDING")
        self.assertTrue(room.face_campus == False)
        self.assertTrue(room.face_airport == False)
        self.assertTrue(room.face_building == True)

    def test_window_facing_derivation_2(self):
        room = Room(
            room_number="59-108",
            room_type="single",
            block="59",
            level=8,
            window_facing="airport",
            location_idx=20,
        )
        print(room)
        self.assertTrue(isinstance(room, Room))
        self.assertTrue(room.window_facing == "AIRPORT")
        self.assertTrue(room.face_campus == False)
        self.assertTrue(room.face_airport == True)
        self.assertTrue(room.face_building == False)

    def test_window_facing_derivation_3(self):
        room = Room(
            room_number="59-108",
            room_type="single",
            block="59",
            level=8,
            window_facing="CAMPUS",
            location_idx=20,
        )
        print(room)
        self.assertTrue(isinstance(room, Room))
        self.assertTrue(room.window_facing == "CAMPUS")
        self.assertTrue(room.face_campus == True)
        self.assertTrue(room.face_airport == False)
        self.assertTrue(room.face_building == False)


if __name__ == "__main__":
    unittest.main()
