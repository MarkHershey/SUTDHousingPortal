from function import *

class SetHgTest(unittest.TestCase):
    def test_normal_workflow(self):
        #Login
        print("login")
        usrname = "adminjustin"
        driver.get(url)
        input_text(driver,"text",usrname)
        input_text(driver,"password","pass1234")
        click_btn(driver,"loginbtn")
        time.sleep(1)

        #Set HG
        print("set house guardian")
        
        driver.get(url+"/admin/house_guardian_add")

        input_text_by_name(driver,"student_id","100000")
        click_btn(driver,"add_house_guardians_btn")
        self.assertEqual(driver.current_url,url)

    def test_invalid_inputs(self):
        #Login
        print("login")
        usrname = "adminjustin"
        driver.get(url)
        input_text(driver,"text",usrname)
        input_text(driver,"password","pass1234")
        click_btn(driver,"loginbtn")
        time.sleep(1)

        #Set HG
        print("set house guardian")
        
        driver.get(url+"/admin/house_guardian_add")

        input_text_by_name(driver,"student_id","100")
        click_btn(driver,"add_house_guardians_btn")
        self.assertEqual(driver.current_url,"http://localhost:3000/admin/house_guardian_add")

