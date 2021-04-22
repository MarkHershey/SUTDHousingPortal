# Front End Testing

from function import *


class EventTest(unittest.TestCase):

    def test_event_normal_workflow(self):
        # Login
        print("login")
        driver.get(url)
        input_text(driver, "text", HG_username)
        input_text(driver, "password", HG_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Create Event
        print("create event")
        title = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        event_type = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        duration_mins = random.randint(1, 100)
        signup_limit = random.randint(1, 100)
        block = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        floor = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        meetup_location = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        description = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 100)))
        count_attendance = random.randint(0, 1)

        driver.get(url + "/event_creation")
        input_text_by_name(driver, "title", title)
        input_text_by_name(driver, "event_type", event_type)
        input_text_by_name(driver, "duration_mins", duration_mins)
        input_text_by_name(driver, "signup_limit", signup_limit)
        input_text_by_name(driver, "block", block)
        input_text_by_name(driver, "floor", floor)
        input_text_by_name(driver, "meetup_location", meetup_location)

        input_datetime_by_name(driver, "start_time")
        input_datetime_by_name(driver, "signup_ddl")
        input_textarea_by_id(driver, "create_event_description", description)
        if not count_attendance: click_btn(driver, "event_count_attendance")
        time.sleep(1)
        click_btn(driver, "create_event_btn")
        time.sleep(1)
        # Check whether the event is here
        print("check event")
        driver.get(url + "/event")
        time.sleep(3)
        # find the correct drop down
        click_btn(driver, title + "-drop-down")
        time.sleep(1)
        # Check whether the event is created successfully
        self.assertEqual(description, get_text(driver, title + "-description-text"))
        self.assertEqual(str(duration_mins) + "mins", get_text(driver, title + "-duration"))
        self.assertEqual(str(meetup_location), get_text(driver, title + "-location"))
        self.assertEqual(str(signup_limit), get_text(driver, title + "-signup-limit"))
        self.assertEqual(HG_username, get_text(driver, title + "-held-by"))
        self.assertEqual("Yes" if count_attendance else "No", get_text(driver, title + "-count-attendance"))

        # Join event
        print("join event")
        click_btn(driver, title + "-join-status")
        time.sleep(2)

        # Try to delete this event (Will be rejected)
        print("try delete event when someone's joined")
        click_btn(driver, title + "-drop-down")
        time.sleep(2)
        click_btn(driver, title + "-delete-event")
        driver.refresh()
        # Find the correct drop down(If found, that means that doesn't delete properly)
        time.sleep(1)
        click_btn(driver, title + "-drop-down")

        # Edit Event (Edit one field)
        print("edit event")
        click_btn(driver, title + "-edit-event")
        time.sleep(1)
        event_type = ''.join(
            random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        input_text(driver, "event_type", event_type)
        click_btn(driver, "edit_event_btn")
        driver.get(url + "/event")
        time.sleep(3)
        # find the correct drop down
        click_btn(driver, title + "-drop-down")
        time.sleep(1)
        # Check whether the event is created successfully
        print("check edition")
        self.assertEqual(description, get_text(driver, title + "-description-text"))
        self.assertEqual(str(duration_mins) + "mins", get_text(driver, title + "-duration"))
        self.assertEqual(str(meetup_location), get_text(driver, title + "-location"))
        self.assertEqual(str(signup_limit), get_text(driver, title + "-signup-limit"))
        self.assertEqual(HG_username, get_text(driver, title + "-held-by"))
        self.assertEqual("Yes" if count_attendance else "No", get_text(driver, title + "-count-attendance"))

        # Take attendance
        print("take attendance")
        click_btn(driver, title + "-take-attendance")
        click_btn(driver, HG_username + "-mark")
        click_btn(driver, title + "update-attendance")

        # Cancel attendance
        print("cancel attendance")
        driver.refresh()
        time.sleep(1)
        click_btn(driver, title + "-drop-down")
        click_btn(driver, title + "-take-attendance")
        click_btn(driver, HG_username + "-mark")
        click_btn(driver, title + "update-attendance")

        # Quit event
        print("quit event")
        driver.refresh()
        click_btn(driver, title + "-drop-down")
        click_btn(driver, title + "-quit")

        # Try to delete this event (Will be accepted)
        print("delete event")
        click_btn(driver, title + "-drop-down")
        time.sleep(2)
        click_btn(driver, title + "-delete-event")
        driver.refresh()
        with self.assertRaises(Exception):
            click_btn(driver, title + "-drop-down")
