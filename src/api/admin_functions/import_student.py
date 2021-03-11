import pandas as pd 

import sys
import os
sys.path.append(os.path.abspath('../models'))
from student import Student

def import_student(file):
    student_data = pd.read_excel(file) # read excel
    student_data.fillna('', inplace=True) 
    student_data = student_data.to_dict() 
    
    number_of_students = len(list(student_data.values())[0])

    key_list = []
    for key in student_data:
        key_list.append(key)

    students = [] 
    for j in range(number_of_students):
        s = Student(
        username=student_data[key_list[0]][j],
        password="pass1234",
        full_name=student_data[key_list[1]][j],
        gender=student_data[key_list[2]][j],
        enrollment_type=student_data[key_list[3]][j],
        year_of_enrollment=student_data[key_list[4]][j],
        sc_status=student_data[key_list[5]][j],
        pr_status=student_data[key_list[6]][j],
        nationality=student_data[key_list[7]][j],
        phone_number=student_data[key_list[8]][j],
        email_sutd=student_data[key_list[9]][j],
        email_personal=student_data[key_list[10]][j],
        local_addr_post_code=student_data[key_list[11]][j],
        local_addr_street=student_data[key_list[12]][j],
        local_addr_unit=student_data[key_list[13]][j],
        )
        students.append(s)
    return students

if __name__ == '__main__':
    studentInfo = import_student(r'./student_dummy_info.xlsx')
    print(studentInfo)

