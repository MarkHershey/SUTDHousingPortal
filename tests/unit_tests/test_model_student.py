import sys
import unittest
from pathlib import Path

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.models.student import Student


class TestStudentCreation(unittest.TestCase):
    def test_creation_with_missing_data(self):
        with self.assertRaises(Exception):
            student = Student(
                username="1006879",
                password="pass1234",
                full_name="Mark Hershey",
                gender="Male",
                enrollment_type="UG",
                year_of_enrollment="2019",
            )

    def test_student_id_auto_fill(self):
        student = Student(
            username="1006879",
            password="pass1234",
            full_name="Mark Hershey",
            gender="Male",
            enrollment_type="UG",
            year_of_enrollment="2019",
            sc_status=False,
            pr_status=False,
            nationality="Chinese",
            phone_number="87654321",
            email_sutd="mark_hershey@mymail.sutd.edu.sg",
            email_personal="ddggffdd@gmail.com",
            local_addr_post_code="485998",
        )

        self.assertTrue(student.username == "1006879")

    def test_creation_with_complete_data(self):
        student = Student(
            username="1000000",
            password="pass1234",
            full_name="Mark Hershey",
            gender="Male",
            enrollment_type="UG",
            year_of_enrollment=2019,
            sc_status=False,
            pr_status=False,
            nationality="Chinese",
            phone_number="87654321",
            email_sutd="mark_hershey@mymail.sutd.edu.sg",
            email_personal="ddggffdd@gmail.com",
            local_addr_post_code="485998",
        )

        self.assertTrue(student.username == "1000000")
        self.assertTrue(student.student_id == "1000000")
        self.assertTrue(student.full_name == "Mark Hershey")
        self.assertTrue(student.gender == "Male")
        self.assertTrue(student.enrollment_type == "UG")
        self.assertTrue(student.year_of_enrollment == 2019)
        self.assertTrue(student.sc_status == False)
        self.assertTrue(student.pr_status == False)
        self.assertTrue(student.nationality == "Chinese")
        self.assertTrue(student.phone_number == "87654321")
        self.assertTrue(student.email_sutd == "mark_hershey@mymail.sutd.edu.sg")
        self.assertTrue(student.email_personal == "ddggffdd@gmail.com")
        self.assertTrue(student.local_addr_post_code == "485998")


if __name__ == "__main__":
    unittest.main()
