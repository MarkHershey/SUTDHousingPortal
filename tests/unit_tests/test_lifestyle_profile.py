import sys
import unittest
from pathlib import Path

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.models.lifestyle import LifestyleProfile


class TestLifestyleProfileCreation(unittest.TestCase):
    def test_creation_with_complete_data_1(self):
        lifestyle_profile = LifestyleProfile(
            sleep_time=23,
            wakeup_time=9,
            like_social=5,
            like_quiet=5,
            like_clean=5,
            diet="Vegetarian",
            use_aircon=True,
            smoking=False,
        )
        self.assertTrue(lifestyle_profile.sleep_time == 23)
        self.assertTrue(lifestyle_profile.wakeup_time == 9)
        self.assertTrue(lifestyle_profile.like_social == 5)
        self.assertTrue(lifestyle_profile.like_quiet == 5)
        self.assertTrue(lifestyle_profile.like_clean == 5)
        self.assertTrue(lifestyle_profile.diet == "Vegetarian")
        self.assertTrue(lifestyle_profile.use_aircon == True)
        self.assertTrue(lifestyle_profile.smoking == False)

    def test_creation_with_string_int(self):
        lifestyle_profile = LifestyleProfile(
            sleep_time="23",
            wakeup_time="9",
            like_social="5",
            like_quiet="5",
            like_clean="5",
            diet="Vegetarian",
            use_aircon=True,
            smoking=False,
        )
        self.assertTrue(lifestyle_profile.sleep_time == 23)
        self.assertTrue(lifestyle_profile.wakeup_time == 9)
        self.assertTrue(lifestyle_profile.like_social == 5)
        self.assertTrue(lifestyle_profile.like_quiet == 5)
        self.assertTrue(lifestyle_profile.like_clean == 5)
        self.assertTrue(lifestyle_profile.diet == "Vegetarian")
        self.assertTrue(lifestyle_profile.use_aircon == True)
        self.assertTrue(lifestyle_profile.smoking == False)

    def test_creation_with_invalid_string(self):
        lifestyle_profile = LifestyleProfile(
            sleep_time="xx",
            wakeup_time="xx",
            like_social="xx",
            like_quiet="xx",
            like_clean="xx",
            diet="Vegetarian",
            use_aircon=True,
            smoking=False,
        )
        self.assertTrue(lifestyle_profile.sleep_time is None)
        self.assertTrue(lifestyle_profile.wakeup_time is None)
        self.assertTrue(lifestyle_profile.like_social == 5)
        self.assertTrue(lifestyle_profile.like_quiet == 5)
        self.assertTrue(lifestyle_profile.like_clean == 5)
        self.assertTrue(lifestyle_profile.diet == "Vegetarian")
        self.assertTrue(lifestyle_profile.use_aircon == True)
        self.assertTrue(lifestyle_profile.smoking == False)

    def test_creation_with_out_of_range_data(self):
        lifestyle_profile = LifestyleProfile(
            sleep_time=8,
            wakeup_time=23,
            like_social=99,
            like_quiet=100,
            like_clean=-5,
        )
        self.assertTrue(lifestyle_profile.sleep_time is None)
        self.assertTrue(lifestyle_profile.wakeup_time is None)
        self.assertTrue(lifestyle_profile.like_social == 5)
        self.assertTrue(lifestyle_profile.like_quiet == 5)
        self.assertTrue(lifestyle_profile.like_clean == 5)

    def test_creation_with_no_data(self):
        lifestyle_profile = LifestyleProfile()
        self.assertTrue(lifestyle_profile.sleep_time is None)
        self.assertTrue(lifestyle_profile.wakeup_time is None)
        self.assertTrue(lifestyle_profile.like_social == 5)
        self.assertTrue(lifestyle_profile.like_quiet == 5)
        self.assertTrue(lifestyle_profile.like_clean == 5)


if __name__ == "__main__":
    unittest.main()
