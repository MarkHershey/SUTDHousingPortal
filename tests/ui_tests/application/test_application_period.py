from selenium.webdriver.common.keys import Keys

from function import *


class EventTest(unittest.TestCase):

    def test_application_normal_workflow(self):
        # Login with admins account
        print("Login with admins account")
        admin_usrname = "admin"
        admin_passwd = "pass1234"
        driver.get(url)
        input_text(driver, "text", admin_usrname)
        input_text(driver, "password", admin_passwd)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Create an application period
        print("Create an application period")
        driver.get(url + "/admin/application_creation")
        input_text(driver, "app_period_window_open", "20042021" + Keys.RIGHT + "0500AM")
        input_text(driver, "app_period_window_close", "20062021" + Keys.RIGHT + "0700AM")
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
        click_btn(driver, "adminlogout")

        # Student login
        print("Student login")
        admin_usrname = "1000001"
        admin_passwd = "1000001"
        driver.get(url)
        input_text(driver, "text", admin_usrname)
        input_text(driver, "password", admin_passwd)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Student Submit application form
        print("Student submit application form")
        driver.get(url+ "/apply0")
        window_open = "2021-04-20T05:00:00.666+00:00"
        window_close = "2021-06-20T07:00:00.666+00:00"
        
        click_btn(driver,"expand_row_button"+window_open+window_close)
        click_btn(driver,"next"+window_open+window_close)
        
        click_btn(driver,"application1_next_btn")
        click_btn(driver,"application2_next_btn")
        click_btn(driver,"application3_next_btn")
        click_btn(driver,"application4_next_btn")
        click_btn(driver,"submit_application_btn")




        # Student check status(submitted)
        driver.get(url+"/application_status")
        # Student logout

        # Admin login

        # Admin go to view application

        # Admin 



        driver.quit()
