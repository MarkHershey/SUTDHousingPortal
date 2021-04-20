import sys
import unittest
from pathlib import Path

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.models.lifestyle import LifestyleProfile, RoommatePreference


class TestProfileCreation(unittest.TestCase):
    def test_lifestyle_creation_with_missing_data(self):
        with self.assertRaises(Exception):
            lifeStyleProfile = LifestyleProfile(
                sleep_time="AROUND MIDNIGHT",
                like_social="2323243",
                like_clean=4,
                like_music=True,
            )

    def test_profile_creation_with_minimal_data(self):
        lifestyleProfile = LifestyleProfile(
            sleep_time="AROUND MIDNIGHT",
            like_social=False,
            like_clean=4,
            like_music=True,
            relationship_scale=3,
            aircon_usage="OCCASIONALLY",
            smoking="DO NOT SMOKE",
        )
        self.assertTrue(isinstance(lifestyleProfile, LifestyleProfile))
        self.assertTrue(lifestyleProfile.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(lifestyleProfile.like_social == False)
        self.assertTrue(lifestyleProfile.like_clean == 4)
        self.assertTrue(lifestyleProfile.like_music == True)
        self.assertTrue(lifestyleProfile.relationship_scale == 3)
        self.assertTrue(lifestyleProfile.aircon_usage == "OCCASIONALLY")
        self.assertTrue(lifestyleProfile.smoking == "DO NOT SMOKE")
        self.assertTrue(lifestyleProfile.interests == [])
        self.assertTrue(lifestyleProfile.intended_pillar == None)
        self.assertTrue(lifestyleProfile.diet == None)

    def test_profile_creation_success_1(self):
        lifestyleProfile = LifestyleProfile(
            sleep_time="AROUND MIDNIGHT",
            like_social=False,
            like_clean=4,
            like_music=True,
            relationship_scale=3,
            aircon_usage="OCCASIONALLY",
            smoking="DO NOT SMOKE",
            intended_pillar="ISTD",
            diet="HALAL",
            interests=[],
        )
        self.assertTrue(isinstance(lifestyleProfile, LifestyleProfile))
        self.assertTrue(lifestyleProfile.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(lifestyleProfile.like_social == False)
        self.assertTrue(lifestyleProfile.like_clean == 4)
        self.assertTrue(lifestyleProfile.like_music == True)
        self.assertTrue(lifestyleProfile.relationship_scale == 3)
        self.assertTrue(lifestyleProfile.aircon_usage == "OCCASIONALLY")
        self.assertTrue(lifestyleProfile.smoking == "DO NOT SMOKE")
        self.assertTrue(lifestyleProfile.interests == [])
        self.assertTrue(lifestyleProfile.intended_pillar == "ISTD")
        self.assertTrue(lifestyleProfile.diet == "HALAL")

    def test_profile_creation_success_2(self):
        lifestyleProfile = LifestyleProfile(
            sleep_time="AROUND MIDNIGHT",
            like_social=True,
            like_clean=5,
            like_music=True,
            relationship_scale=4,
            aircon_usage="OFTEN",
            smoking="DO NOT SMOKE",
            intended_pillar="ISTD",
            diet=None,
            interests=[],
        )
        self.assertTrue(isinstance(lifestyleProfile, LifestyleProfile))
        self.assertTrue(lifestyleProfile.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(lifestyleProfile.like_social == True)
        self.assertTrue(lifestyleProfile.like_clean == 5)
        self.assertTrue(lifestyleProfile.like_music == True)
        self.assertTrue(lifestyleProfile.relationship_scale == 4)
        self.assertTrue(lifestyleProfile.aircon_usage == "OFTEN")
        self.assertTrue(lifestyleProfile.smoking == "DO NOT SMOKE")
        self.assertTrue(lifestyleProfile.interests == [])
        self.assertTrue(lifestyleProfile.intended_pillar == "ISTD")
        self.assertTrue(lifestyleProfile.diet == None)

    def test_profile_invalid_data_handling_1(self):
        lifestyleProfile = LifestyleProfile(
            sleep_time="12am",
            like_social="kjdfnsd",
            like_clean=87987,
            like_music="ddvsd",
            relationship_scale=23,
            aircon_usage="gsdfvdf",
            smoking="adscmkjads",
            intended_pillar="lkdcmalksam",
            diet=7367862,
            interests="jknsjcn",
        )
        self.assertTrue(isinstance(lifestyleProfile, LifestyleProfile))
        self.assertTrue(lifestyleProfile.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(lifestyleProfile.like_social == None)
        self.assertTrue(lifestyleProfile.like_clean == 3)
        self.assertTrue(lifestyleProfile.like_music == None)
        self.assertTrue(lifestyleProfile.relationship_scale == 3)
        self.assertTrue(lifestyleProfile.aircon_usage == "OCCASIONALLY")
        self.assertTrue(lifestyleProfile.smoking == "DO NOT SMOKE")
        self.assertTrue(lifestyleProfile.interests == [])
        self.assertTrue(lifestyleProfile.intended_pillar == None)
        self.assertTrue(lifestyleProfile.diet == None)

    def test_profile_invalid_data_handling_2(self):
        lifestyleProfile = LifestyleProfile(
            sleep_time=291310932,
            like_social=["sdjkcns"],
            like_clean="dslkcmsdkc",
            like_music=9048324,
            relationship_scale="jksnkjcdsc",
            aircon_usage=["sdjkcnksjc"],
            smoking=9834248,
            intended_pillar=["lkdcmalksam"],
            diet=3982942,
            interests=93482384,
        )
        self.assertTrue(isinstance(lifestyleProfile, LifestyleProfile))
        self.assertTrue(lifestyleProfile.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(lifestyleProfile.like_social == None)
        self.assertTrue(lifestyleProfile.like_clean == 3)
        self.assertTrue(lifestyleProfile.like_music == None)
        self.assertTrue(lifestyleProfile.relationship_scale == 3)
        self.assertTrue(lifestyleProfile.aircon_usage == "OCCASIONALLY")
        self.assertTrue(lifestyleProfile.smoking == "DO NOT SMOKE")
        self.assertTrue(lifestyleProfile.interests == [])
        self.assertTrue(lifestyleProfile.intended_pillar == None)
        self.assertTrue(lifestyleProfile.diet == None)

    def test_profile_invalid_data_handling_3(self):
        lifestyleProfile = LifestyleProfile(
            sleep_time=True,
            like_social="NONE",
            like_clean="TRUE",
            like_music="NONE",
            relationship_scale="NONE",
            aircon_usage=True,
            smoking=True,
            intended_pillar=True,
            diet=True,
            interests="NONE",
        )
        self.assertTrue(isinstance(lifestyleProfile, LifestyleProfile))
        self.assertTrue(lifestyleProfile.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(lifestyleProfile.like_social == None)
        self.assertTrue(lifestyleProfile.like_clean == 3)
        self.assertTrue(lifestyleProfile.like_music == None)
        self.assertTrue(lifestyleProfile.relationship_scale == 3)
        self.assertTrue(lifestyleProfile.aircon_usage == "OCCASIONALLY")
        self.assertTrue(lifestyleProfile.smoking == "DO NOT SMOKE")
        self.assertTrue(lifestyleProfile.interests == [])
        self.assertTrue(lifestyleProfile.intended_pillar == None)
        self.assertTrue(lifestyleProfile.diet == None)

    def test_roommate_creation_with_no_input(self):
        roommatePreference = RoommatePreference()
        self.assertTrue(roommatePreference.sleep_time == None)
        self.assertTrue(roommatePreference.like_social == None)
        self.assertTrue(roommatePreference.like_music == None)
        self.assertTrue(roommatePreference.interests == None)
        self.assertTrue(roommatePreference.intended_pillar == None)
        self.assertTrue(roommatePreference.diet == None)
        self.assertTrue(roommatePreference.smoking == None)
        self.assertTrue(roommatePreference.preferred_roommate == None)
        self.assertTrue(roommatePreference.blacklist_roommate == None)

    def test_roommate_creation_success_1(self):
        roommatePreference = RoommatePreference(
            sleep_time="AROUND MIDNIGHT",
            like_music=True,
            intended_pillar="ESD",
            smoking="DO NOT SMOKE",
        )
        self.assertTrue(roommatePreference.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(roommatePreference.like_social == None)
        self.assertTrue(roommatePreference.like_music == True)
        self.assertTrue(roommatePreference.interests == None)
        self.assertTrue(roommatePreference.intended_pillar == "ESD")
        self.assertTrue(roommatePreference.diet == None)
        self.assertTrue(roommatePreference.smoking == "DO NOT SMOKE")
        self.assertTrue(roommatePreference.preferred_roommate == None)
        self.assertTrue(roommatePreference.blacklist_roommate == None)

    def test_roommate_creation_success_2(self):
        roommatePreference = RoommatePreference(
            sleep_time="AROUND MIDNIGHT",
            like_social=True,
            intended_pillar="EPD",
            smoking="DO NOT SMOKE",
        )
        self.assertTrue(roommatePreference.sleep_time == "AROUND MIDNIGHT")
        self.assertTrue(roommatePreference.like_social == True)
        self.assertTrue(roommatePreference.like_music == None)
        self.assertTrue(roommatePreference.interests == None)
        self.assertTrue(roommatePreference.intended_pillar == "EPD")
        self.assertTrue(roommatePreference.diet == None)
        self.assertTrue(roommatePreference.smoking == "DO NOT SMOKE")
        self.assertTrue(roommatePreference.preferred_roommate == None)
        self.assertTrue(roommatePreference.blacklist_roommate == None)

    def test_roommate_invalid_data_handling_1(self):
        roommatePreference = RoommatePreference(
            sleep_time=99048204823,
            like_social="ksjdcnksjcd",
            intended_pillar=29048394,
            smoking="djkndskjcns",
            interests="skdckjsnc",
        )
        self.assertTrue(roommatePreference.sleep_time == None)
        self.assertTrue(roommatePreference.like_social == None)
        self.assertTrue(roommatePreference.like_music == None)
        self.assertTrue(roommatePreference.interests == None)
        self.assertTrue(roommatePreference.intended_pillar == None)
        self.assertTrue(roommatePreference.diet == None)
        self.assertTrue(roommatePreference.smoking == None)
        self.assertTrue(roommatePreference.preferred_roommate == None)
        self.assertTrue(roommatePreference.blacklist_roommate == None)

    def test_roommate_invalid_data_handling_2(self):
        roommatePreference = RoommatePreference(
            sleep_time="sjkcnsjdcjsd",
            like_social=3847389,
            like_music=84984574,
            intended_pillar="jdkcnskjcdsdc",
            smoking=89479824,
            interests=4948435304,
        )
        self.assertTrue(roommatePreference.sleep_time == None)
        self.assertTrue(roommatePreference.like_social == None)
        self.assertTrue(roommatePreference.like_music == None)
        self.assertTrue(roommatePreference.interests == None)
        self.assertTrue(roommatePreference.intended_pillar == None)
        self.assertTrue(roommatePreference.diet == None)
        self.assertTrue(roommatePreference.smoking == None)
        self.assertTrue(roommatePreference.preferred_roommate == None)
        self.assertTrue(roommatePreference.blacklist_roommate == None)

    def test_roommate_invalid_data_handling_3(self):
        roommatePreference = RoommatePreference(
            sleep_time=True,
            like_social="NONE",
            like_music="NONE",
            intended_pillar=True,
            smoking=True,
            interests=True,
        )
        self.assertTrue(roommatePreference.sleep_time == None)
        self.assertTrue(roommatePreference.like_social == None)
        self.assertTrue(roommatePreference.like_music == None)
        self.assertTrue(roommatePreference.interests == None)
        self.assertTrue(roommatePreference.intended_pillar == None)
        self.assertTrue(roommatePreference.diet == None)
        self.assertTrue(roommatePreference.smoking == None)
        self.assertTrue(roommatePreference.preferred_roommate == None)
        self.assertTrue(roommatePreference.blacklist_roommate == None)


if __name__ == "__main__":
    unittest.main()
