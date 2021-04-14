import logging
import string
import time
import unittest
from random import randint
from typing import List

from markkk.logger import logger
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support import select
from selenium.webdriver.support.ui import WebDriverWait

from .test_driver import testChromeDriver

###############################################################################
### Setup selenium driver ###

# get Chrome driver
system, driver_path = testChromeDriver()
if not driver_path:
    err = "Cannot find a suitable Chrome driver."
    logger.error(err)
    raise Exception(err)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
if system == "linux":
    CHROME_PATH = "/usr/bin/google-chrome"
    chrome_options.binary_location = CHROME_PATH
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

# initialise web driver
driver = webdriver.Chrome(executable_path=driver_path, options=chrome_options)

### Do not change above code ###
###############################################################################

# Example
class TestWebPage(unittest.TestCase):
    def test_1(self):
        page_url = "https://docs.markhh.com/"
        driver.get(page_url)

        a_tags: List[WebElement] = driver.find_elements_by_tag_name("a")
        URLs = []
        for a_tag in a_tags:

            url = a_tag.get_attribute("href")
            if url and url.startswith("http"):
                URLs.append(url)

        for url in URLs:
            self.assertTrue(driver.get(url).status_code == 200)


if __name__ == "__main__":
    unittest.main()
