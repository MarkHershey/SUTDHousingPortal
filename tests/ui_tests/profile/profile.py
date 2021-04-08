import string

from function import *
import random


class ProfileTest(unittest.TestCase):
    def test_edit_profile_all(self):
        driver.get("http://localhost:3000")
        input_text(driver, "text", "1004515")
        input_text(driver, "password", "pass1234")
        click_btn(driver, "loginbtn")
        time.sleep(1)
        driver.get("http://localhost:3000/profile")
        click_btn(driver, "edit_personal_profile_btn")
        time.sleep(1)
        # Edit with all field filled
        phone_num = random.randint(10000000, 99999999)
        email = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        postcode = str(random.randint(100000, 999999))
        street = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(8, 15)))
        unit = str(random.randint(10, 99)) + "-" + str(random.randint(10, 99))
        input_text(driver, "ppl_prof_roommate", "1004522")
        input_text(driver, "phone_number", phone_num)
        input_text(driver, "ppl_prof_email", email)
        input_text(driver, "ppl_prof_local_addr_post_code", postcode)
        input_text(driver, "ppl_prof_local_addr_street", street)
        input_text(driver, "ppl_prof_local_addr_unit", unit)
        time.sleep(1)
        click_btn(driver, "ppl_prof_submit")
        # Logout and Re-login
        click_btn(driver, "logout")
        time.sleep(1)
        input_text(driver, "text", "1004515")
        input_text(driver, "password", "pass1234")
        time.sleep(1)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        driver.get("http://localhost:3000/profile")
        time.sleep(5)
        self.assertEqual(get_text(driver, "ppl_prof_phone_number_display"), str(phone_num))
        self.assertEqual(get_text(driver, "ppl_prof_address_display"), street + " " + unit + " " + postcode)
        click_btn(driver, "logout")
        time.sleep(1)

    def test_edit_profile_one(self):
        driver.get("http://localhost:3000")
        input_text(driver, "text", "1004515")
        input_text(driver, "password", "pass1234")
        click_btn(driver, "loginbtn")
        time.sleep(1)
        driver.get("http://localhost:3000/profile")
        click_btn(driver, "edit_personal_profile_btn")
        time.sleep(1)
        # Edit with only one field filled
        phone_num = random.randint(10000000, 99999999)
        input_text(driver, "phone_number", phone_num)

        click_btn(driver, "ppl_prof_submit")

        # Logout and Re-login
        click_btn(driver, "logout")
        time.sleep(1)
        input_text(driver, "text", "1004515")
        input_text(driver, "password", "pass1234")
        time.sleep(1)
        click_btn(driver, "loginbtn")
        time.sleep(1)
        driver.get("http://localhost:3000/profile")
        self.assertEqual(get_text(driver, "ppl_prof_phone_number_display"), str(phone_num))
        click_btn(driver, "logout")
        time.sleep(1)