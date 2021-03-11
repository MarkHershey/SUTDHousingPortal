import pandas as pd 
from models import Student



def import_student(file):
    student_data = pd.read_excel(file) # read excel
    student_data = student_data.to_dict() 
    students = []  
    number_of_students = len(list(student_data.values())[0])
    for j in range(number_of_students):
        info_list = []
        for attribute in student_data:
            info_list.append(student_data[attribute][j])
        students.append(student.Student(*info_list))
    return students

    if __name__ == '__main__':
        studentInfo = import_student(r'*/student_dummy_info.xlsx')
        print(studentInfo)

