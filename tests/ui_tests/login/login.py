from function import *
from selenium.common.exceptions import UnexpectedAlertPresentException


class LoginTest(unittest.TestCase):
    """Case 1: login and logout"""

    def test_login_normal_admin(self):
        # login normal
        input_text(driver, "text", "admin")
        input_text(driver, "password", "pass1234")
        time.sleep(2)
        click_btn(driver, "loginbtn")
        time.sleep(2)
        self.assertEqual(driver.current_url, "http://localhost:3000/")
        # logout
        click_btn(driver, "adminlogout")
        time.sleep(1)
        self.assertEqual(driver.current_url, "http://localhost:3000/login")
        time.sleep(1)

    def test_login_normal_student(self):
        # login normal
        input_text(driver, "text", "1000001")
        input_text(driver, "password", "1000001")
        time.sleep(2)
        click_btn(driver, "loginbtn")
        time.sleep(2)
        self.assertEqual(driver.current_url, "http://localhost:3000/")
        # logout
        click_btn(driver, "logout")
        time.sleep(1)
        self.assertEqual(driver.current_url, "http://localhost:3000/login")
        time.sleep(1)

    def test_login_abnormal(self):
        # login abnormally
        input_text(driver, "text", "1000001")
        input_text(driver, "password", "hahahawrongpswd")
        click_btn(driver, "loginbtn")
        time.sleep(5)
        self.assertNotEqual(driver.current_url, "http://localhost:3000/")
        time.sleep(1)

    def test_login_guard(self):
        print("Testing all possible routers after logout")
        self.assertTrue(test_guard_after_logout("profile"))
        self.assertTrue(test_guard_after_logout("event"))
        self.assertTrue(test_guard_after_logout("event_history"))
        self.assertTrue(test_guard_after_logout("profile_edit"))
        self.assertTrue(test_guard_after_logout("room_profile_edit"))
        self.assertTrue(test_guard_after_logout("lifestyle_profile_edit"))
        self.assertTrue(test_guard_after_logout("apply"))
        self.assertTrue(test_guard_after_logout("apply2"))
        self.assertTrue(test_guard_after_logout("apply3"))
        self.assertTrue(test_guard_after_logout("application_summary"))
        self.assertTrue(test_guard_after_logout("event_creation"))
        self.assertTrue(test_guard_after_logout("application_status"))


# trying tp go to an forbidden page after logout
def test_guard_after_logout(router_name):
    driver.get("http://localhost:3000/" + router_name)
    time.sleep(0.1)
    if driver.current_url != "http://localhost:3000/login":
        return False
    return True
