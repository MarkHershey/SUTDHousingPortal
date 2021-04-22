from datetime import datetime, timedelta
import time
import threading
from datetime_selenium import send_datetime
from selenium import webdriver
import unittest
import random
import string

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

url = "http://localhost:3000"
path = "/Users/home/Documents/WebStorm/SUTDHousingPortal/tests/ui_tests/chromedriver"
admin_username = "admin"
admin_password = "pass1234"
student_username = "1000007"
student_password = "1000007"
student_username_ms = "1000006"
student_password_ms = "1000006"
HG_username = "1000000"
HG_password = "1000000"


options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
# options.add_argument('headless')
options.add_argument('--no-sandbox')
options.add_argument('-disable-dev-shm-usage')
driver = webdriver.Chrome(executable_path=path, options=options)


def input_text(driver, element_id, value):
    driver.find_element_by_xpath('//*[@id="' + element_id + '"]').clear()
    driver.find_element_by_xpath('//*[@id="' + element_id + '"]').send_keys(value)
    time.sleep(0.5)


def input_text_by_name(driver, element_name, value):
    driver.find_element_by_name(element_name).clear()
    driver.find_element_by_name(element_name).send_keys(value)
    time.sleep(0.5)


def input_datetime_by_name(driver, element_name):
    # datetime_local = driver.find_element_by_xpath('//*[@name="' + element_name + '"]')
    input_text_by_name(driver, element_name, str(random.randint(1,28)) + "0" + str(random.randint(1,9)) + str(random.randint(2021,2024)) + Keys.RIGHT + "0" + str(random.randint(1,9)) + "00AM")
    time.sleep(0.5)


def click_btn(driver, element_id):
    driver.find_element_by_xpath('//*[@id="' + element_id + '"]').click()
    time.sleep(2)


def get_text(driver, element_id):
    return driver.find_element_by_xpath('//*[@id="' + element_id + '"]').text


def input_textarea_by_id(driver, element_id, value):
    driver.find_element_by_id(element_id).send_keys(value)
    time.sleep(0.5)


def gen_datetime(min_year=2019, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1, 00, 00, 00)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    result = start + (end - start) * random.random()
    print(result)
    return result

def clear_input_text(driver,element_id):
    driver.find_element_by_xpath('//*[@id="'+element_id + '"]').clear()
    time.sleep(0.1)

def clear_input_text_by_name(driver, element_name):
    driver.find_element_by_name(element_name).clear()
    time.sleep(0.1)