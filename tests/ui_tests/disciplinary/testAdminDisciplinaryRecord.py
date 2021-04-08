from function import *
import pytest
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
driver.get("http://localhost:3000/admin/disciplinary_record_create")

#Edit all fields
input_text(driver,"create_disciplinary_record_id","1004000")
input_text(driver,"create_disciplinary_record_type","test type")
input_text(driver,"create_event_description","test description")
input_text(driver,"create_disciplinary_points_deduction","100")

click_btn(driver,"create_disciplinary_record_btn")
time.sleep(1)
assert driver.current_url == "http://localhost:3000/"

#Incomplete fields, id mising

#input_text(driver,"create_disciplinary_record_id","1004000")
driver.get("http://localhost:3000/admin/disciplinary_record_create")
input_text(driver,"create_disciplinary_record_type","test type")
input_text(driver,"create_event_description","test description")
input_text(driver,"create_disciplinary_points_deduction","100")

click_btn(driver,"create_disciplinary_record_btn")
time.sleep(1)
assert driver.current_url == "http://localhost:3000/"

#record type missing
driver.get("http://localhost:3000/admin/disciplinary_record_create")
input_text(driver,"create_disciplinary_record_id","1004000")
input_text(driver,"create_event_description","test description")
input_text(driver,"create_disciplinary_points_deduction","100")

click_btn(driver,"create_disciplinary_record_btn")
time.sleep(1)
assert driver.current_url == "http://localhost:3000/"

#description missing
driver.get("http://localhost:3000/admin/disciplinary_record_create")
input_text(driver,"create_disciplinary_record_id","1004000")
input_text(driver,"create_disciplinary_record_type","test type")
input_text(driver,"create_disciplinary_points_deduction","100")

click_btn(driver,"create_disciplinary_record_btn")
time.sleep(1)
assert driver.current_url == "http://localhost:3000/"

#points_deduction missing
driver.get("http://localhost:3000/admin/disciplinary_record_create")
input_text(driver,"create_disciplinary_record_id","1004000")
input_text(driver,"create_disciplinary_record_type","test type")
input_text(driver,"create_event_description","test description")

click_btn(driver,"create_disciplinary_record_btn")
time.sleep(1)
assert driver.current_url == "http://localhost:3000/"