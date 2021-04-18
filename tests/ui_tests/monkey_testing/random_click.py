from selenium.common.exceptions import ElementNotInteractableException, ElementClickInterceptedException

from function import *


class MonkeyTesting(unittest.TestCase):

    def test_random_click(self):
        # login normally
        driver.get(url)
        input_text(driver, "text", "1004515")
        input_text(driver, "password", "pass1234")
        time.sleep(2)
        click_btn(driver, "loginbtn")
        time.sleep(2)
        for i in range(10):
            links = []
            links.extend(driver.find_elements_by_tag_name("a"))
            links.extend(driver.find_elements_by_tag_name("Button"))
            links.extend(driver.find_elements_by_tag_name("button"))
            l = links[random.randint(0, len(links) - 1)]
            try:
                if not l.text == ("Logout" or "Housing Application"):
                    print(l.text)
                    l.click()
            except ElementNotInteractableException:  # when the attribute is not clickable
                continue
            except ElementClickInterceptedException:  # when the attribute is loading /changing
                continue
            time.sleep(1)
