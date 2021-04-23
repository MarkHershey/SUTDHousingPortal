import unittest

from selenium.webdriver.common.keys import Keys

from .common import *


class EventTest(unittest.TestCase):
    def test_application_normal_workflow(self):
        # Login with admins account
        print("Login with admins account")
        driver.get(url)
        input_text(driver, "text", admin_username)
        input_text(driver, "password", admin_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Create an application period
        print("Create an application period")
        driver.get(url + "/admin/application_creation")
        input_text(driver, "app_period_window_open", "20042021" + Keys.RIGHT + "0500AM")
        input_text(
            driver, "app_period_window_close", "20062021" + Keys.RIGHT + "0700AM"
        )
        number_of_AP = random.randint(1, 4)
        for i in range(0, number_of_AP):
            input_text(driver, "start_date_" + str(i), "200" + str(5 + i) + "2021")
            input_text(driver, "end_date_" + str(i), "200" + str(6 + i) + "2021")
            click_btn(driver, "plus_" + str(i))

        click_btn(driver, "minus_" + str(number_of_AP))
        input_text(driver, "app_period_applicable_rooms", "BLK55+57+59")
        click_btn(driver, "app_period_create_app_period")

        # Admin logout
        print("Admin logout")
        driver.get(url + "/login")

        # Student login
        print("Student login")
        driver.get(url)
        input_text(driver, "text", student_username)
        input_text(driver, "password", student_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Student submit application form
        print("Student submit application form")
        driver.get(url + "/apply0")
        window_open = "2021-04-20T05:00:00"
        window_close = "2021-06-20T07:00:00"
        click_btn(driver, "expand_row_button" + window_open + window_close)
        click_btn(driver, "next" + window_open + window_close + "_0")

        click_btn(driver, "application1_next_btn")
        click_btn(driver, "application2_next_btn")
        click_btn(driver, "application3_next_btn")
        click_btn(driver, "application4_next_btn")
        click_btn(driver, "submit_application_btn")

        # Student check status(submitted)
        print("Student check status(submitted)")
        driver.get(url + "/application_status")
        time.sleep(5)
        driver.find_element_by_xpath('//div[text()="Offer submitted"]')

        # Student logout
        print("Student logout")
        driver.get(url + "/login")

        # Admin login
        print("Login with admins account")
        driver.get(url)
        input_text(driver, "text", admin_username)
        input_text(driver, "password", admin_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Admin go to view application
        print("Admin go to view application")
        driver.get(url + "/admin/application_viewing")
        time.sleep(1)
        click_btn(driver, "view" + window_open + window_close)

        # Admin view student's application
        print("Admin view student's application")

        # Admin accept student's application
        print("Admin accept student's application")
        click_btn(driver, "accept_" + student_username)

        # Admin logout
        print("Admin logout")
        driver.get(url + "/login")
        # Student login
        print("Student login")
        driver.get(url)
        input_text(driver, "text", student_username)
        input_text(driver, "password", student_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)
        # Student accept offer
        print("Student accept offer")
        driver.get(url + "/application_status")
        time.sleep(5)
        click_btn(driver, "accept_btn")

        # Student logout
        print("Student logout")
        driver.get(url + "/login")

        driver.quit()
