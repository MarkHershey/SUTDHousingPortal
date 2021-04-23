from function import *


class RevokeHgTest(unittest.TestCase):
    def test_normal_workflow(self):
        # Login
        print("login")
        driver.get(url + "/login")
        input_text(driver, "text", admin_username)
        input_text(driver, "password", admin_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Set HG
        print("set house guardian")

        driver.get(url + "/admin/house_guardian_add")

        input_text_by_name(driver, "student_id", student_username)
        click_btn(driver, "add_house_guardians_btn")
        self.assertEqual(driver.current_url, url + "/admin/house_guardian_add")

        # Revoke HG
        print("revoke house guardian")

        driver.get(url + "/admin/house_guardian_remove")
        input_text_by_name(driver, "student_id", student_username)
        click_btn(driver, "revoke_house_guardians_btn")
        self.assertEqual(driver.current_url, url + "/admin/house_guardian_remove")

    def test_invalid_workflow(self):
        # Login
        print("login")
        driver.get(url + "/login")
        input_text(driver, "text", admin_username)
        input_text(driver, "password", admin_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # Set HG
        print("set house guardian")

        driver.get(url + "/admin/house_guardian_add")

        input_text_by_name(driver, "student_id", "100")
        click_btn(driver, "add_house_guardians_btn")
        self.assertEqual(driver.current_url, url + "/admin/house_guardian_add")

        # Revoke HG
        print("revoke house guardian")
        driver.get(url + "/admin/house_guardian_remove")
        input_text_by_name(driver, "student_id", "100")
        click_btn(driver, "revoke_house_guardians_btn")
        self.assertEqual(driver.current_url, url + "/admin/house_guardian_remove")