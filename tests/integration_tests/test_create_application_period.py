import sys
import unittest
from pydantic.utils import Representation
import requests
from datetime import date, datetime, timedelta
from pathlib import Path
from random import randint
from markkk.logger import logger
from bson import json_util
import json
import time

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.routes.auth import auth_handler


class TestApplicationPeriodCreation(unittest.TestCase):
    def setUp(self):
        self.test_use_uid = "TEST_123"
        self.url_local_root = "http://127.0.0.1:8000"
        self.url_server_root = "http://esc.dev.markhh.com/"
        self.admin_username = "markkk"
        self.admin_password = None
        self.token = auth_handler.encode_token(self.admin_username)
        self.ignore = False
        # test connection
        request_url = str(self.url_local_root + "/api")
        try:
            response = requests.get(url=request_url)
            if response.status_code != 200:
                logger.error("setUp: Failed to connect")
                self.ignore = True
                return
        except Exception as e:
            logger.error(f"setUp: Failed to connect: {e}")
            self.ignore = True
            return
        # construct header
        headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
        }
        request_url = self.url_local_root + "/api/auth/login"
        data = {
            "username": self.admin_username,
            "password": self.admin_password,
        }
        if not self.token:
            logger.debug("setUp: Getting new TOKEN")
            response = requests.post(url=request_url, headers=headers, json=data)
            if response.status_code != 200:
                raise Exception("Failed to login")
            res_data = response.json()
            self.token = str(res_data["token"])

        # set self.headers
        logger.debug(f"setUp: TOKEN: {self.token}")
        headers["Authorization"] = "Bearer " + self.token
        self.headers = headers

    def test_1(self):
        """Test Creation of a new ApplicationPeriod by using API endpoint POST method"""
        if self.ignore:
            return
        request_url = self.url_local_root + "/api/application_periods/"
        _data = {
            "uid": self.test_use_uid,
            "application_window_open": datetime.now().isoformat(),
            "application_window_close": (
                datetime.now() + timedelta(days=1)
            ).isoformat(),
            "applicable_periods": [
                {
                    "start_date": date.today().isoformat(),
                    "end_date": (date.today() + timedelta(days=30)).isoformat(),
                }
            ],
            "applicable_rooms": ["59-409", "59-410", "59-411", "59-412"],
            "applicable_students": ["1000000", "1003432", "1004515", "1004234"],
        }
        # Not supposed to be used here but note here first
        # Ref: https://stackoverflow.com/a/11875813
        # data = json.dumps(_data, default=json_util.default, indent=4)
        data = json.dumps(_data, indent=4)
        logger.debug(f"data: {data}")
        response = requests.post(
            url=request_url,
            headers=self.headers,
            # json=data,
            data=data,
        )
        self.assertEqual(response.status_code, 201)

    # NOTE: The order in which the various tests will be run is determined by
    # sorting the test method names with respect to the built-in ordering for strings.
    # Ref: https://docs.python.org/3/library/unittest.html#organizing-test-code
    def test_2(self):
        """Check the newly created Application Period by using API endpoint GET method"""
        if self.ignore:
            return
        request_url = self.url_local_root + "/api/application_periods/"
        _data = {
            "uid": self.test_use_uid,
            "application_window_open": datetime.now().isoformat(),
            "application_window_close": (
                datetime.now() + timedelta(days=1)
            ).isoformat(),
            "applicable_periods": [
                {
                    "start_date": date.today().isoformat(),
                    "end_date": (date.today() + timedelta(days=30)).isoformat(),
                }
            ],
            "applicable_rooms": ["59-409", "59-410", "59-411", "59-412"],
            "applicable_students": ["1000000", "1003432", "1004515", "1004234"],
        }
        data = json.dumps(_data, indent=4)
        logger.debug(f"data: {data}")
        response = requests.post(
            url=request_url,
            headers=self.headers,
            # json=data,
            data=data,
        )
        self.assertEqual(response.status_code, 201)
        ###
        request_url = (
            self.url_local_root + f"/api/application_periods/{self.test_use_uid}"
        )
        time.sleep(1)
        response = requests.get(url=request_url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        res_data = response.json()
        self.assertEqual(res_data.get("uid"), self.test_use_uid)
        self.assertEqual(res_data.get("created_by"), self.admin_username)

        # self.assertEqual(res_data.get("application_window_open"), self.admin_username)
        # self.assertEqual(res_data.get("application_window_close"), self.admin_username)

    def tearDown(self):
        if self.ignore:
            return
        request_url = (
            self.url_local_root + f"/api/application_periods/{self.test_use_uid}"
        )
        response = requests.delete(url=request_url, headers=self.headers)
        if response.status_code == 200:
            logger.debug("Successfully removed test-generated data from database.")
        elif response.status_code == 404:
            logger.debug("No test-generated data found in database.")
        else:
            logger.error("Failed to remove test-generated data from database.")


if __name__ == "__main__":
    unittest.main()
