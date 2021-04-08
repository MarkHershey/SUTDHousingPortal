# Front End Testing
from datetime import datetime

from datetime_selenium import send_datetime
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
        title = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        event_type = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        duration_mins = random.randint(1, 100)
        signup_limit = random.randint(1, 100)
        block = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        floor = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        meetup_location = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        start_time = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        signup_ddl = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )

        driver.get("http://localhost:3000/event_creation")
        input_text_by_name(driver, "title", title)
        input_text_by_name(driver, "event_type", event_type)
        input_text_by_name(driver, "duration_mins", duration_mins)
        input_text_by_name(driver, "signup_limit", signup_limit)
        input_text_by_name(driver, "block", block)
        input_text_by_name(driver, "floor", floor)
        input_text_by_name(driver, "meetup_location", meetup_location)
        datetime_ = datetime.utcnow()

        css_selectors = (
            "input[type=date]",
            "input[type=datetime-local]",
            "input[type=month]",
            "input[type=time]",
            "input[type=week]",
        )
        for selector in css_selectors:
            input_ = driver.find_element_by_css_selector(selector)
            send_datetime(input_, datetime_)

        input_text_by_name(driver, "start_time", "2021-03-29T19:23")
        input_text_by_name(driver, "signup_ddl", "2021-03-28T19:23")
        click_btn(driver, "count_attendance_check")

        click_btn(driver, "create_event_btn")
        time.sleep(1)
        driver.get("http://localhost:3000/events")
        time.sleep(20)
