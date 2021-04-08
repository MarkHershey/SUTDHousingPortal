import time
from selenium import webdriver
import unittest
import random
import string

path = "/Users/home/Documents/WebStorm/SUTDHousingPortal/tests/ui_tests/chromedriver"
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
# options.add_argument('headless')
options.add_argument('--no-sandbox')
options.add_argument('-disable-dev-shm-usage')
driver = webdriver.Chrome(executable_path=path, options=options)
driver.get("http://localhost:3000")


def input_text(driver, element_id, value):
    driver.find_element_by_xpath('//*[@id="' + element_id + '"]').send_keys(value)
    time.sleep(0.1)


def input_text_by_name(driver, element_name, value):
    driver.find_element_by_name(element_name).send_keys(value)
    time.sleep(0.1)


def click_btn(driver, element_id):
    driver.find_element_by_xpath('//*[@id="' + element_id + '"]').click()
    time.sleep(0.1)


def get_text(driver, element_id):
    return driver.find_element_by_xpath('//*[@id="' + element_id + '"]').text
