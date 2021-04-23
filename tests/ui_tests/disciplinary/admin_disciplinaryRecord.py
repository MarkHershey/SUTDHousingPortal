from function import *


class DisciplinaryRecordTest(unittest.TestCase):
    def test_disciplinary_record(self):
        # Login
        print("login")
        driver.get(url)
        input_text(driver, "text", admin_username)
        input_text(driver, "password", admin_password)
        click_btn(driver, "loginbtn")
        time.sleep(1)

        # create disciplinary record
        print("creating record")
        id = student_username
        record_type = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 15))
        )
        description = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 100))
        )
        points = random.randrange(0, 1000)
        driver.get(url + "/admin/disciplinary_record_create")
        input_text(driver, "create_disciplinary_record_id", id)
        input_text(driver, "create_disciplinary_record_type", record_type)
        input_text(driver, "create_disciplinary_record_description", description)
        input_text(driver, "create_disciplinary_points_deduction", points)
        click_btn(driver, "create_disciplinary_record_btn")
        self.assertEqual(driver.current_url, "http://localhost:3000/")

        print("check disciplinary record")
        driver.get(url + "/admin/disciplinary_record_view_all")
        time.sleep(3)
        # check the record
        self.assertEqual(id, get_text(driver, id + description))
        self.assertEqual(
            record_type, get_text(driver, id + description + "_record_type")
        )
        self.assertEqual(
            description, get_text(driver, id + description + "_description")
        )
        self.assertEqual(
            str(points), get_text(driver, id + description + "_points_deduction")
        )

        # Edit Disciplinary Record
        print("Edit disciplinary record")
        time.sleep(1)
        click_btn(driver, id + description + "_view_individual_btn")
        time.sleep(1)
        click_btn(driver, "edit_disciplinary_record_btn")

        description = "".join(
            random.choice(string.ascii_uppercase + string.digits)
            for _ in range(random.randint(8, 100))
        )
        points = random.randrange(0, 1000)
        clear_input_text(driver, "edit_disciplinary_record_description")
        input_text(driver, "edit_disciplinary_record_description", description)
        input_text(driver, "edit_disciplinary_record_points_deduction", str(points))
        click_btn(driver, "edit_disciplinary_record_btn")

        # check the record is updated
        driver.get(url + "/admin/disciplinary_record_view_all")
        time.sleep(3)

        self.assertEqual(id, get_text(driver, id + description))
        self.assertEqual(
            record_type, get_text(driver, id + description + "_record_type")
        )
        self.assertEqual(
            description, get_text(driver, id + description + "_description")
        )
        self.assertEqual(
            str(points), get_text(driver, id + description + "_points_deduction")
        )

        # delete the record
        print("Deleting record")
        click_btn(driver, id + description + "_view_individual_btn")
        time.sleep(1)
        click_btn(driver, "delete_disciplinary_record_btn")
        driver.quit()