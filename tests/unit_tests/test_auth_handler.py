import sys
import unittest
from datetime import date, datetime, time, timedelta
from pathlib import Path
from random import randint
from markkk.logger import logger
from typing import List
import string

src_dir = Path(__file__).resolve().parent.parent.parent / "src"

sys.path.insert(0, str(src_dir))

from api.routes.auth import auth_handler


def random_N_strings(
    N: int = 10, min_length: int = 5, max_length: int = 20
) -> List[str]:
    source_chars = string.ascii_letters + string.digits + string.punctuation
    source_length = len(source_chars)

    random_strings = []
    for _ in range(N):
        rand_length = randint(min_length, max_length)
        random_string = ""
        for _ in range(rand_length):
            random_string += source_chars[randint(0, source_length - 1)]
        random_strings.append(random_string)

    return random_strings


class TestAuthHandler(unittest.TestCase):
    def setUp(self):
        self.username = "test_username"
        self.password = "test_password"

    def test_1_password_hashing(self):
        password_hash = auth_handler.get_password_hash(self.password)
        self.assertTrue(isinstance(password_hash, str))
        self.assertTrue(password_hash != self.password)

    def test_2_password_checking(self):
        password_hash = auth_handler.get_password_hash(self.password)
        verified = auth_handler.verify_password(
            plain_password=self.password,
            hashed_password=password_hash,
        )
        self.assertTrue(verified)
        verified = auth_handler.verify_password(
            plain_password="test_password_wrong",
            hashed_password=password_hash,
        )
        self.assertFalse(verified)

    def test_3_random_password_verification(self):
        password_hash = auth_handler.get_password_hash(self.password)
        for i in random_N_strings(N=30):
            logger.debug(f"Testing Random Password: {i}")
            verified = auth_handler.verify_password(
                plain_password=i,
                hashed_password=password_hash,
            )
            self.assertFalse(verified)

    def test_token_encoding_decoding(self):
        token = auth_handler.encode_token(user_id=self.username)
        self.assertEqual(auth_handler.decode_token(token), self.username)

    def test_token_encoding_decoding_random(self):
        for i in random_N_strings(N=10):
            logger.debug(f"Testing Random Username: {i}")
            token = auth_handler.encode_token(user_id=i)
            self.assertEqual(auth_handler.decode_token(token), i)


if __name__ == "__main__":
    unittest.main()
