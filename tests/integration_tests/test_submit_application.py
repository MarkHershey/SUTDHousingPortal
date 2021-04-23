import json
import sys
import time
import unittest
from datetime import date, datetime, timedelta
from pathlib import Path
from random import randint

import requests
from bson import json_util
from markkk.logger import logger
from pydantic.utils import Representation

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.routes.auth import auth_handler


class TestApplicationCreation(unittest.TestCase):
    def setUp(self):
        self.test_use_uid = "TEST_123"
        self.test_use_uid2 = "TEST_456"
        self.url_local_root = "http://127.0.0.1:8000"
        self.url_server_root = "http://esc.dev.markhh.com"
        self.admin_username = "markkk"
        self.admin_password = None
        self.token = auth_handler.encode_token(self.admin_username)
        self.ignore = False
        # test connection
        request_url = str(self.url_server_root + "/api")
        try:
            response = requests.get(url=request_url, timeout=1)
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
        request_url = self.url_server_root + "/api/auth/login"
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

        ################################################################################
        # set up an AP for testing
        request_url = self.url_server_root + "/api/application_periods/"
        data = {
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
        response = requests.post(
            url=request_url,
            headers=self.headers,
            json=data,
        )
        self.assertEqual(response.status_code, 201)

    def test_1(self):
        """Test Submission of Application via endpoint POST method"""
        if self.ignore:
            return
        request_url = self.url_server_root + "/api/applications"
        data = {
            "uid": self.test_use_uid2,
            "application_period_uid": self.test_use_uid,
            "created_at": "2021-04-09T09:29:53.668Z",
            "student_id": "1000000",
            "room_profile": {
                "room_type": "string",
                "room_type_2nd": "string",
                "block": "59",
                "block_2nd": "55",
                "level_range": "UPPER",
                "window_facing": "CAMPUS",
                "near_to_lift": False,
                "near_to_washroom": True,
                "level_has_pantry": None,
                "level_has_mr": None,
                "level_has_gsr": True,
                "level_has_rr": None,
                "weightage_order": [3, 4, 5, 1, 2, 6, 7, 8, 9],
            },
            "lifestyle_profile": {
                "bedtime": 2,
                "wakeup_time": 8,
                "like_social": False,
                "like_clean": True,
            },
            "stay_period": {
                "start_date": date.today().isoformat(),
                "end_date": (date.today() + timedelta(days=30)).isoformat(),
            },
        }
        response = requests.post(
            url=request_url,
            headers=self.headers,
            json=data,
        )
        self.assertEqual(response.status_code, 201)
        res_data = response.json()
        self.assertEqual(res_data.get("uid"), self.test_use_uid2)
        self.assertEqual(res_data.get("created_by"), self.admin_username)

    def tearDown(self):
        if self.ignore:
            return
        request_url = (
            self.url_server_root + f"/api/application_periods/{self.test_use_uid}"
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
