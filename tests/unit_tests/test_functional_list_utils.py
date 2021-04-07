import sys
import unittest
from pathlib import Path

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.functional import deduct_list_from_list


class TestListUtils(unittest.TestCase):
    def test_deduct_list_from_list_0(self):
        A = [0, 1, 2, 3, 4, 5]
        B = [2, 3, 0]
        delta = [1, 4, 5]

        deduct_list_from_list(host_list=A, deduct_list=B)
        self.assertEqual(len(A), len(delta))

    def test_deduct_list_from_list_1(self):
        A = [0, 1, 2, 3, 4, 5]
        B = [2, 3, 0]
        delta = [1, 4, 5]

        deduct_list_from_list(host_list=A, deduct_list=B)
        self.assertEqual(A, delta)

    def test_deduct_list_from_list_2(self):
        A = [0]
        B = [2, 3, 0]
        delta = []

        deduct_list_from_list(host_list=A, deduct_list=B)
        self.assertEqual(A, delta)

    def test_deduct_list_from_list_3(self):
        A = ["A", "C"]
        B = [2, 3, 0, "B", "A"]
        delta = ["C"]

        deduct_list_from_list(host_list=A, deduct_list=B)
        self.assertEqual(A, delta)

    def test_deduct_list_from_list_3(self):
        A = ["A", "C", 1, 6, 12223344]
        B = [2, 3, 0, "B", "12223344", "A"]
        delta = ["C", 1, 6, 12223344]

        deduct_list_from_list(host_list=A, deduct_list=B)
        self.assertEqual(A, delta)


if __name__ == "__main__":
    unittest.main()
