from function import *
import unittest
from datetime_selenium import send_datetime
from datetime import datetime
#login
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
# options.add_argument('headless')
options.add_argument('--no-sandbox')
options.add_argument('-disable-dev-shm-usage')
driver = webdriver.Chrome(executable_path="C:/Users/user/seleniumstuff/chromedriver", options=options)
driver.get("http://localhost:3000")
input_text(driver, "text", "adminjustin")
input_text(driver, "password", "pass1234")
click_btn(driver, "loginbtn")
time.sleep(1)
driver.get("http://localhost:3000/admin/application_creation")

#edit all fields
input_text(driver, "app_period_window_open", "2021-04-08T17:37")
input_text(driver, "app_period_window_close", "2021-04-08T17:37")

click_btn(driver, "app_period_create_app_period")

assert driver.current_url == "http://localhost:3000/"

