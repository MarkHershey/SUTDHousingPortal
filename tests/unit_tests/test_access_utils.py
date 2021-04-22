import sys
import unittest
from datetime import date, datetime, time, timedelta
from pathlib import Path
from random import randint

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.access_utils import Access
from api.database import _DB_USER, db_available


class TestAccessUtils(unittest.TestCase):
    def setUp(self):
        self.ignore = False
        if _DB_USER == "REPLACE_ME":
            self.ignore = True
        if not db_available:
            self.ignore = True

    def test_is_admin(self):
        if self.ignore:
            return
        self.assertTrue(Access.is_admin("admin"))
        self.assertFalse(Access.is_admin("1000000"))
        self.assertFalse(Access.is_admin("1000001"))
        self.assertFalse(Access.is_admin("xxxxxxxxxx"))

    def test_is_admin_write(self):
        if self.ignore:
            return
        self.assertTrue(Access.is_admin_write("admin"))
        self.assertFalse(Access.is_admin_write("xxxxxxxxxx"))

    def test_is_student(self):
        if self.ignore:
            return
        self.assertTrue(Access.is_student("1000000"))
        self.assertTrue(Access.is_student("1000001"))
        self.assertFalse(Access.is_student("admin"))
        self.assertFalse(Access.is_student("xxxxxxxxxxxx"))

    def test_is_student_hg(self):
        if self.ignore:
            return
        self.assertTrue(Access.is_student_hg("1000000"))
        self.assertTrue(Access.is_student_hg("1000001"))
        self.assertTrue(Access.is_student_hg("1000002"))
        self.assertTrue(Access.is_student_hg("1000003"))
        self.assertFalse(Access.is_student_hg("1000029"))
        self.assertFalse(Access.is_student_hg("1000030"))
        self.assertFalse(Access.is_student_hg("admin"))
        self.assertFalse(Access.is_student_hg("xxxxxxxxxxx"))

    def test_at_least_student_hg_write(self):
        if self.ignore:
            return
        self.assertTrue(Access.at_least_student_hg_write("1000000"))
        self.assertTrue(Access.at_least_student_hg_write("admin"))
        self.assertFalse(Access.at_least_student_hg_write("1000010"))
        self.assertFalse(Access.at_least_student_hg_write("xxxxxxxxxx"))


if __name__ == "__main__":
    unittest.main()
