import sys
import unittest
from datetime import date, datetime, time, timedelta
from pathlib import Path
from random import randint
from pydantic.error_wrappers import ValidationError

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.functional import convert_date_to_datetime, convert_datetime_to_date


class TestDatetimeUtils(unittest.TestCase):
    def test_convert_date_to_datetime_0(self):
        dt_obj: date = date(2019, 12, 4)
        dtt_obj: datetime = datetime(2019, 12, 4)

        converted_obj = convert_date_to_datetime(dt_obj)
        self.assertTrue(isinstance(converted_obj, datetime))

    def test_convert_date_to_datetime_use_today(self):
        dt_obj: date = date.today()
        dtt_obj: datetime = datetime.combine(datetime.now().date(), time())

        converted_obj = convert_date_to_datetime(dt_obj)
        self.assertTrue(isinstance(converted_obj, datetime))
        self.assertTrue(dtt_obj == converted_obj)

    def test_convert_date_to_datetime_1(self):
        dt_obj: date = date(2019, 12, 4)
        dtt_obj: datetime = datetime(2019, 12, 4)

        converted_obj = convert_date_to_datetime(dt_obj)
        self.assertTrue(isinstance(converted_obj, datetime))
        self.assertTrue(dtt_obj == converted_obj)

    def test_convert_date_to_datetime_2(self):
        dt_obj: date = date(2023, 1, 1)
        dtt_obj: datetime = datetime(2023, 1, 1)

        converted_obj = convert_date_to_datetime(dt_obj)
        self.assertTrue(isinstance(converted_obj, datetime))
        self.assertTrue(dtt_obj == converted_obj)

    def test_convert_date_to_datetime_exception(self):
        with self.assertRaises(AssertionError):
            convert_date_to_datetime([12312321])
        with self.assertRaises(AssertionError):
            convert_date_to_datetime("2019, 12, 4")
        with self.assertRaises(AssertionError):
            convert_date_to_datetime("20191204T231220")

    def test_pass_datetime_obj(self):
        """
        convert_date_to_datetime() is expected to return the original
        value if the input is a datetime object
        """
        dtt_obj: datetime = datetime.now()

        converted_obj = convert_date_to_datetime(dtt_obj)
        self.assertTrue(isinstance(converted_obj, datetime))
        self.assertTrue(dtt_obj == converted_obj)

    ###################################################################

    def test_convert_datetime_to_date_0(self):
        dt_obj: date = date(2019, 12, 4)
        dtt_obj: datetime = datetime(2019, 12, 4)

        converted_obj = convert_datetime_to_date(dtt_obj)
        self.assertTrue(isinstance(converted_obj, date))

    def test_convert_datetime_to_date_use_today(self):
        dt_obj: date = date.today()
        dtt_obj: datetime = datetime.now()

        converted_obj = convert_datetime_to_date(dtt_obj)
        self.assertTrue(isinstance(converted_obj, date))
        self.assertTrue(dt_obj == converted_obj)

    def test_convert_datetime_to_date_1(self):
        dt_obj: date = date(2019, 12, 4)
        dtt_obj: datetime = datetime(2019, 12, 4)

        converted_obj = convert_datetime_to_date(dtt_obj)
        self.assertTrue(isinstance(converted_obj, date))
        self.assertTrue(dt_obj == converted_obj)

    def test_convert_datetime_to_date_2(self):
        dt_obj: date = date(2045, 12, 31)
        dtt_obj: datetime = datetime(2045, 12, 31)

        converted_obj = convert_datetime_to_date(dtt_obj)
        self.assertTrue(isinstance(converted_obj, date))
        self.assertTrue(dt_obj == converted_obj)

    def test_convert_datetime_to_date_with_time(self):
        # random number of seconds with length less than 24 hours
        for _ in range(10):
            random_seconds = randint(1, 86399)
            dt_obj: date = date(2045, 12, 31)
            dtt_obj: datetime = datetime(2045, 12, 31) + timedelta(
                seconds=random_seconds
            )

            converted_obj = convert_datetime_to_date(dtt_obj)
            self.assertTrue(isinstance(converted_obj, date))
            self.assertTrue(dt_obj == converted_obj)

    def test_convert_datetime_to_date_exception(self):
        with self.assertRaises(AssertionError):
            convert_datetime_to_date([12312321])
        with self.assertRaises(AssertionError):
            convert_datetime_to_date("2019, 12, 4")
        with self.assertRaises(AssertionError):
            convert_datetime_to_date("20191204T231220")
        with self.assertRaises(AssertionError):
            convert_datetime_to_date(date.today())


if __name__ == "__main__":
    unittest.main()
