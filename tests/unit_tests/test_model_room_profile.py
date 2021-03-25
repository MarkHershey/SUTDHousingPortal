import sys
import unittest
from pathlib import Path

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.models.room import RoomProfile


class TestRoomProfileCreation(unittest.TestCase):
    def test_creation_with_missing_data(self):
        with self.assertRaises(Exception):
            student = RoomProfile(
                room_type="single",
                block="56",
                level_has_mr=True,
            )

    def test_creation_with_minimal_data(self):
        room_profile = RoomProfile(room_type="single", room_type_2nd="single_ensuite")
        self.assertTrue(isinstance(room_profile, RoomProfile))
        self.assertTrue(room_profile.room_type == "SINGLE")
        self.assertTrue(room_profile.room_type_2nd == "SINGLE_ENSUITE")
        self.assertTrue(room_profile.block == "ANY")
        self.assertTrue(room_profile.block_2nd == "ANY")
        self.assertTrue(room_profile.level_range == "ANY")
        self.assertTrue(room_profile.window_facing == "ANY")
        self.assertTrue(room_profile.near_to_lift == None)
        self.assertTrue(room_profile.near_to_washroom == None)
        self.assertTrue(room_profile.level_has_pantry == None)
        self.assertTrue(room_profile.level_has_mr == None)
        self.assertTrue(room_profile.level_has_gsr == None)
        self.assertTrue(room_profile.level_has_rr == None)
        self.assertTrue(room_profile.weightage_order == [1, 2, 3, 4, 5, 6, 7, 8, 9])

    def test_creation_success_1(self):
        room_profile = RoomProfile(
            room_type="SINGLE_ENSUITE",
            room_type_2nd="double",
            block="55",
            block_2nd="57",
            level_range="lower",
            window_facing="airport",
            near_to_lift=False,
            near_to_washroom=True,
            level_has_pantry=None,
            level_has_mr=None,
            level_has_gsr=True,
            level_has_rr=False,
            weightage_order=[2, 4, 5, 7, 1, 9, 3, 6, 8],
        )
        self.assertTrue(isinstance(room_profile, RoomProfile))
        self.assertTrue(room_profile.room_type == "SINGLE_ENSUITE")
        self.assertTrue(room_profile.room_type_2nd == "DOUBLE")
        self.assertTrue(room_profile.block == "55")
        self.assertTrue(room_profile.block_2nd == "57")
        self.assertTrue(room_profile.level_range == "LOWER")
        self.assertTrue(room_profile.window_facing == "AIRPORT")
        self.assertTrue(room_profile.near_to_lift == False)
        self.assertTrue(room_profile.near_to_washroom == True)
        self.assertTrue(room_profile.level_has_pantry == None)
        self.assertTrue(room_profile.level_has_mr == None)
        self.assertTrue(room_profile.level_has_gsr == True)
        self.assertTrue(room_profile.level_has_rr == False)
        self.assertTrue(room_profile.weightage_order == [2, 4, 5, 7, 1, 9, 3, 6, 8])

    def test_creation_success_2(self):
        room_profile = RoomProfile(
            room_type="sinGLE",
            room_type_2nd="Double",
            block="59",
            block_2nd="Any",
            level_range="upper",
            window_facing="airport",
            near_to_lift=False,
            near_to_washroom=True,
            level_has_pantry=True,
            level_has_mr=True,
            level_has_gsr=True,
            level_has_rr=False,
            weightage_order=[9, 8, 7, 6, 5, 4, 3, 2, 1],
        )
        self.assertTrue(isinstance(room_profile, RoomProfile))
        self.assertTrue(room_profile.room_type == "SINGLE")
        self.assertTrue(room_profile.room_type_2nd == "DOUBLE")
        self.assertTrue(room_profile.block == "59")
        self.assertTrue(room_profile.block_2nd == "ANY")
        self.assertTrue(room_profile.level_range == "UPPER")
        self.assertTrue(room_profile.window_facing == "AIRPORT")
        self.assertTrue(room_profile.near_to_lift == False)
        self.assertTrue(room_profile.near_to_washroom == True)
        self.assertTrue(room_profile.level_has_pantry == True)
        self.assertTrue(room_profile.level_has_mr == True)
        self.assertTrue(room_profile.level_has_gsr == True)
        self.assertTrue(room_profile.level_has_rr == False)
        self.assertTrue(room_profile.weightage_order == [9, 8, 7, 6, 5, 4, 3, 2, 1])

    def test_invalid_data_handling_1(self):
        room_profile = RoomProfile(
            room_type="asdfasdfasdfasdf",
            room_type_2nd="asdfasdfsdafsdafashgr",
            block="23r34ef345g5g5g",
            block_2nd="dsfaksh",
            level_range="kjfsha434dkfj",
            window_facing="asdfkh3234askf",
            near_to_lift="sdsdafas32df",
            near_to_washroom="fakljdflasjdf",
            level_has_pantry="asdfa322sdfasdfasfefawef",
            level_has_mr="asdfa2r2sdfas",
            level_has_gsr="asd3rrfasdf",
            level_has_rr="asdfg23rsdg",
            weightage_order="asdgsdgfawe43sdfasdf",
        )
        self.assertTrue(isinstance(room_profile, RoomProfile))
        self.assertTrue(room_profile.room_type == "ANY")
        self.assertTrue(room_profile.room_type_2nd == "ANY")
        self.assertTrue(room_profile.block == "ANY")
        self.assertTrue(room_profile.block_2nd == "ANY")
        self.assertTrue(room_profile.level_range == "ANY")
        self.assertTrue(room_profile.window_facing == "ANY")
        self.assertTrue(room_profile.near_to_lift == None)
        self.assertTrue(room_profile.near_to_washroom == None)
        self.assertTrue(room_profile.level_has_pantry == None)
        self.assertTrue(room_profile.level_has_mr == None)
        self.assertTrue(room_profile.level_has_gsr == None)
        self.assertTrue(room_profile.level_has_rr == None)
        self.assertTrue(room_profile.weightage_order == [1, 2, 3, 4, 5, 6, 7, 8, 9])

    def test_invalid_data_handling_2(self):
        room_profile = RoomProfile(
            room_type=[4563453245],
            room_type_2nd=[234234, "sdafgsda"],
            block=56,
            block_2nd=5645,
            level_range=["jsladjf", 234234],
            window_facing="  ",
            near_to_lift="TRUE",
            near_to_washroom=43534543,
            level_has_pantry=34545345,
            level_has_mr=34534534534,
            level_has_gsr=34534534534,
            level_has_rr=345345345,
            weightage_order=6785678657,
        )
        self.assertTrue(isinstance(room_profile, RoomProfile))
        self.assertTrue(room_profile.room_type == "ANY")
        self.assertTrue(room_profile.room_type_2nd == "ANY")
        self.assertTrue(room_profile.block == "ANY")
        self.assertTrue(room_profile.block_2nd == "ANY")
        self.assertTrue(room_profile.level_range == "ANY")
        self.assertTrue(room_profile.window_facing == "ANY")
        self.assertTrue(room_profile.near_to_lift == None)
        self.assertTrue(room_profile.near_to_washroom == None)
        self.assertTrue(room_profile.level_has_pantry == None)
        self.assertTrue(room_profile.level_has_mr == None)
        self.assertTrue(room_profile.level_has_gsr == None)
        self.assertTrue(room_profile.level_has_rr == None)
        self.assertTrue(room_profile.weightage_order == [1, 2, 3, 4, 5, 6, 7, 8, 9])

    def test_invalid_data_handling_3(self):
        room_profile = RoomProfile(
            room_type="double room",
            room_type_2nd="single room",
            block="51",
            block_2nd="50",
            level_range="level 20",
            window_facing="sky",
            near_to_lift="FALSE",
            near_to_washroom="FALSE",
            level_has_pantry="NONE",
            level_has_mr="FALSE",
            level_has_gsr="TRUE",
            level_has_rr="TRUE",
            weightage_order=[1, 2, 3],
        )
        self.assertTrue(isinstance(room_profile, RoomProfile))
        self.assertTrue(room_profile.room_type == "ANY")
        self.assertTrue(room_profile.room_type_2nd == "ANY")
        self.assertTrue(room_profile.block == "ANY")
        self.assertTrue(room_profile.block_2nd == "ANY")
        self.assertTrue(room_profile.level_range == "ANY")
        self.assertTrue(room_profile.window_facing == "ANY")
        self.assertTrue(room_profile.near_to_lift == None)
        self.assertTrue(room_profile.near_to_washroom == None)
        self.assertTrue(room_profile.level_has_pantry == None)
        self.assertTrue(room_profile.level_has_mr == None)
        self.assertTrue(room_profile.level_has_gsr == None)
        self.assertTrue(room_profile.level_has_rr == None)
        self.assertTrue(room_profile.weightage_order == [1, 2, 3, 4, 5, 6, 7, 8, 9])


if __name__ == "__main__":
    unittest.main()
