import random
import string
import threading
import time
import unittest
from datetime import datetime, timedelta

from datetime_selenium import send_datetime
from selenium import webdriver
from selenium.webdriver.common.by import By

url = "http://localhost:3000"
path = "/Users/home/Documents/WebStorm/SUTDHousingPortal/tests/ui_tests/chromedriver"
admin_username = "admin"
admin_password = "pass1234"
student_username = "1000007"
student_password = "1000007"
HG_username = "1000000"
HG_password = "1000000"


options = webdriver.ChromeOptions()
options.add_argument("--ignore-certificate-errors")
# options.add_argument('headless')
options.add_argument("--no-sandbox")
options.add_argument("-disable-dev-shm-usage")
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
    datetime_local = driver.find_element_by_xpath('//*[@name="' + element_name + '"]')
    send_datetime(
        datetime_local,
        datetime(
            random.randint(2016, 2022),
            random.randint(1, 12),
            random.randint(1, 28),
            random.randint(1, 23),
            random.randint(1, 59),
            random.randint(1, 59),
        ),
    )
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