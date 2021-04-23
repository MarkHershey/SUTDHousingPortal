import unittest

from .common import *


class LoginTest(unittest.TestCase):
    """Case 1: login and logout"""

    def test_login_normal_admin(self):
        # login normal
        driver.get(url)
        input_text(driver, "text", admin_username)
        input_text(driver, "password", admin_password)
        time.sleep(2)
        click_btn(driver, "loginbtn")
        time.sleep(2)
        self.assertEqual(driver.current_url, url + "/")
        # logout
        driver.get(url + "/login")
        time.sleep(1)
        self.assertEqual(driver.current_url, url + "/login")
        time.sleep(1)

    def test_login_normal_student(self):
        # login normal
        driver.get(url)
        input_text(driver, "text", student_username)
        input_text(driver, "password", student_username)
        time.sleep(2)
        click_btn(driver, "loginbtn")
        time.sleep(2)
        self.assertEqual(driver.current_url, url + "/")
        # logout
        driver.get(url + "/login")
        time.sleep(1)
        self.assertEqual(driver.current_url, url + "/login")
        time.sleep(1)

    def test_login_abnormal(self):
        # login abnormally
        driver.get(url)
        input_text(driver, "text", student_username)
        input_text(driver, "password", "hahahawrongpswd")
        click_btn(driver, "loginbtn")
        time.sleep(5)
        self.assertNotEqual(driver.current_url, url + "/")
        time.sleep(1)

    def test_login_guard(self):
        print("Testing all possible routers after logout")
        self.assertTrue(test_guard_after_logout("profile"))
        self.assertTrue(test_guard_after_logout("event"))
        self.assertTrue(test_guard_after_logout("event_history"))
        self.assertTrue(test_guard_after_logout("profile_edit"))
        self.assertTrue(test_guard_after_logout("room_profile_edit"))
        self.assertTrue(test_guard_after_logout("lifestyle_profile_edit"))
        self.assertTrue(test_guard_after_logout("apply0"))
        self.assertTrue(test_guard_after_logout("apply1"))
        self.assertTrue(test_guard_after_logout("apply2"))
        self.assertTrue(test_guard_after_logout("apply3"))
        self.assertTrue(test_guard_after_logout("apply4"))
        self.assertTrue(test_guard_after_logout("application_summary"))
        self.assertTrue(test_guard_after_logout("event_creation"))
        self.assertTrue(test_guard_after_logout("application_status"))

    def test_404(self):
        driver.get(url + "/I_am_not_a_valid_path")
        self.assertEqual(driver.current_url, url + "/404")


# trying tp go to an forbidden page after logout
def test_guard_after_logout(router_name):
    driver.get(url + "/" + router_name)
    time.sleep(0.1)
    if driver.current_url != url + "/login":
        return False
    return True
