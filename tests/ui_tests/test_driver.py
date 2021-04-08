# built-in modules
import json
import os
import platform
import time
from pathlib import Path
from random import randint

# external modules
from markkk.logger import logger
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support import select
from selenium.webdriver.support.ui import WebDriverWait


def testChromeDriver():
    system = platform.system()
    if system == "Darwin":
        system = "macos"
        logger.debug("System identified as macOS")
    elif system == "Linux":
        system = "linux"
        logger.debug("System identified as Linux")
    elif system == "Windows":
        logger.error("Windows system is not supported.")
        return
    else:
        logger.error("{system} is not supported.")
        return

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    if system == "linux":
        CHROME_PATH = "/usr/bin/google-chrome"
        chrome_options.binary_location = CHROME_PATH
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

    driver = None
    driver_connected = None
    drivers_folder = Path("drivers")
    assert drivers_folder.is_dir()
    for filename in sorted(os.listdir(drivers_folder), reverse=True):
        if system not in filename:
            continue
        driver_file = drivers_folder / filename
        try:
            driver = webdriver.Chrome(
                executable_path=driver_file, options=chrome_options
            )
            driver_connected = driver_file.resolve()
            logger.debug(f"Driving Chrome using driver: {filename}")
            break
        except:
            pass

    if driver is not None:
        driver.get("https://www.google.com/")
        logger.debug("Testing connection to Google: Succuss!")
        time.sleep(1)

    return system, driver_connected


if __name__ == "__main__":
    testChromeDriver()
