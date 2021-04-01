import sys
import unittest
from pathlib import Path

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.functional import clean_dict, remove_none_value_keys


class TestDictUtils(unittest.TestCase):
    def test_clean_dict_return_none(self):
        test_dict = {
            "A": 123,
            "B": "456",
            "C": 1234,
            "D": [(1, "2")],
        }
        nothing = clean_dict(test_dict)
        self.assertTrue(isinstance(test_dict, dict))
        self.assertTrue(nothing is None)

    def test_clean_password_from_dict(self):
        test_dict = {
            "A": 123,
            "B": "456",
            "password": 1234,
        }
        clean_dict(test_dict)
        self.assertTrue(isinstance(test_dict, dict))
        self.assertTrue(len(test_dict.keys()) == 2)

        with self.assertRaises(KeyError):
            password = test_dict["password"]
            print(password)

    def test_clean_mongoId_from_dict(self):
        test_dict = {
            "A": 123,
            "B": "456",
            "_id": "Aasiodufo323",
        }
        clean_dict(test_dict)
        self.assertTrue(isinstance(test_dict, dict))
        self.assertTrue(len(test_dict.keys()) == 2)

        with self.assertRaises(KeyError):
            _id = test_dict["_id"]
            print(_id)

    def test_clean_both_keys_from_dict(self):
        test_dict = {
            "A": 123,
            "B": "456",
            "password": 1234,
            "_id": "Aasiodufo323",
        }
        clean_dict(test_dict)
        self.assertTrue(isinstance(test_dict, dict))
        self.assertTrue(len(test_dict.keys()) == 2)

        with self.assertRaises(KeyError):
            _id = test_dict["_id"]
            print(_id)

        with self.assertRaises(KeyError):
            password = test_dict["password"]
            print(password)

    def test_invalid_type_handlling(self):
        test_list = [1, 2, 3, 4, "password", "_id"]
        test_tuple = ("password", "_id")
        test_none = None
        test_bool = True
        test_bool_neg = False
        clean_dict(test_list)
        clean_dict(test_tuple)
        clean_dict(test_none)
        clean_dict(test_bool)
        clean_dict(test_bool_neg)
        self.assertTrue(isinstance(test_list, list))
        self.assertTrue(isinstance(test_tuple, tuple))
        self.assertTrue(test_none is None)
        self.assertTrue(isinstance(test_bool, bool))
        self.assertTrue(isinstance(test_bool_neg, bool))

    def test_return_none_with_invalid_type(self):
        test_list = [1, 2, 3, 4, "password", "_id"]
        result = clean_dict(test_list)
        self.assertTrue(result is None)
        test_tuple = ("password", "_id")
        result = clean_dict(test_tuple)
        self.assertTrue(result is None)
        test_none = None
        result = clean_dict(test_none)
        self.assertTrue(result is None)
        test_bool = True
        result = clean_dict(test_bool)
        self.assertTrue(result is None)
        test_bool_neg = False
        result = clean_dict(test_bool_neg)
        self.assertTrue(result is None)

    def test_remove_none_value_keys(self):
        some_dict = {
            "A": 123,
            "B": "haha",
            "C": None,
            "D": "",
            "E": [],
            "F": "None",
            "G": 0,
            "H": None,
        }
        remove_none_value_keys(some_dict)
        self.assertTrue(isinstance(some_dict, dict))
        self.assertTrue(some_dict.get("A") == 123)
        self.assertTrue(some_dict.get("B") == "haha")
        self.assertTrue(some_dict.get("D") == "")
        self.assertTrue(some_dict.get("E") == [])
        self.assertTrue(some_dict.get("F") == "None")
        self.assertTrue(some_dict.get("G") == 0)

        with self.assertRaises(KeyError):
            some_dict["C"]
        with self.assertRaises(KeyError):
            some_dict["H"]


if __name__ == "__main__":
    unittest.main()
