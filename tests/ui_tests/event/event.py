# Front End Testing
from function import *

class EventTest(unittest.TestCase):

    def test_event_creation_normal(self):
        # login
        driver.get("http://localhost:3000")
        input_text(driver, "text", "1004515")
        input_text(driver, "password", "pass1234")
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # submit form with some fields unfilled
        title =
        driver.get("http://localhost:3000/event_creation")
        input_text_by_name(driver, "title", "TEST3 Attempt")
        input_text_by_name(driver, "event_type", "TEST3 Attempt")
        input_text_by_name(driver, "duration_mins", "60")
        input_text_by_name(driver, "signup_limit", "20")
        input_text_by_name(driver, "block", "57")
        input_text_by_name(driver, "floor", "3")
        input_text_by_name(driver, "meetup_location", "TEST3 Attempt")
        input_text_by_name(driver, "start_time", "2021-03-29T19:23")
        click_btn(driver, "count_attendance_check")
        input_text_by_name(driver, "signup_ddl", "2021-03-28T19:23")

        click_btn(driver, "create_event_btn")
        time.sleep(1)
        driver.get("http://localhost:3000/events")
        time.sleep(20)