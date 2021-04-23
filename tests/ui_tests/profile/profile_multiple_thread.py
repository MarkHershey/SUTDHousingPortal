from function import *


class ProfileTestMultipleThread(unittest.TestCase):
    def test_edit_profile_multiple_users(self):
        users = []
        users.append(TestThread(student_username, student_password))
        users.append(TestThread(student_username_ms, student_password_ms))

        for user in users:
            user.start()
        for user in users:
            user.join()
        self.assertTrue(True)


class TestThread(threading.Thread):
    def __init__(self, username, password):
        threading.Thread.__init__(self)
        self.username = username
        self.password = password

    def run(self):
        driver_ = webdriver.Chrome(executable_path=path, options=options)
        driver_.get(url)
        input_text(driver_, "text", self.username)
        input_text(driver_, "password", self.password)
        click_btn(driver_, "loginbtn")
        time.sleep(1)
        driver_.get(url + "/profile")
        click_btn(driver_, "edit_personal_profile_btn")
        time.sleep(1)
        # Edit with all field filled
        phone_num = random.randint(10000000, 99999999)
        email = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        postcode = str(random.randint(100000, 999999))
        street = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        unit = str(random.randint(10, 99)) + "-" + str(random.randint(10, 99))
        input_text(driver_, "ppl_prof_roommate", "1004522")
        input_text(driver_, "phone_number", phone_num)
        input_text(driver_, "ppl_prof_email", email)
        input_text(driver_, "ppl_prof_local_addr_post_code", postcode)
        input_text(driver_, "ppl_prof_local_addr_street", street)
        input_text(driver_, "ppl_prof_local_addr_unit", unit)
        time.sleep(1)
        click_btn(driver_, "ppl_prof_submit")
        # Logout and Re-login
        click_btn(driver_, "logout")
        time.sleep(1)
        input_text(driver_, "text", self.username)
        input_text(driver_, "password", self.password)
        time.sleep(1)
        click_btn(driver_, "loginbtn")
        time.sleep(1)

        driver_.get(url + "/profile")
        time.sleep(5)
        assert get_text(driver_, "ppl_prof_phone_number_display") == str(phone_num)
        assert (
            get_text(driver_, "ppl_prof_address_display")
            == street + " " + unit + " " + postcode
        )
        click_btn(driver_, "logout")
        time.sleep(1)
        driver_.quit()