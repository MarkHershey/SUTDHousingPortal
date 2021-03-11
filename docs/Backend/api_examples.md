# API Examples

### Create a new student

```bash
curl --header "Content-Type: application/json" --request POST --data '{"username": "1000000", "password": "pass1234", "full_name": "Mark Huang", "gender": "Male", "enrollment_type": "UG", "year_of_enrollment": "2019", "sc_status": false, "pr_status": false, "nationality": "Chinese", "phone_number": "87654321", "email_sutd": "mark_huang@mymail.sutd.edu.sg", "email_personal": "example@gmail.com", "local_addr_post_code": "485999", "local_addr_street": "Block 59, Changi South Ave 1, SUTD Hostel", "local_addr_unit": "#08-107"}' localhost:8000/register/student
```

```bash
curl --header "Content-Type: application/json" --request POST --data '{"username": "1003432", "password": "pass1234", "full_name": "Maria Johnson", "gender": "Female", "enrollment_type": "PhD", "year_of_enrollment": "2020", "sc_status": false, "pr_status": false, "nationality": "American", "phone_number": "87654321", "email_sutd": "maria_johnson@mymail.sutd.edu.sg", "email_personal": "example@gmail.com", "local_addr_post_code": "485998", "local_addr_street": "Block 57, Changi South Ave 1, SUTD Hostel", "local_addr_unit": "#06-57"}' localhost:8000/register/student
```

### Create a new admin

```bash
curl --header "Content-Type: application/json" --request POST --data '{"username": "admin", "password": "pass1234", "full_name": "Bill Gates", "email_sutd": "bill_gates@sutd.edu.sg", "read_only": false}' localhost:8000/register/admin
```

### Get a particular student profile without logging in

```bash
curl -X GET "http://127.0.0.1:8000/students/1004561" -H  "accept: application/json"
```

### Login

```bash
curl --header "Content-Type: application/json" --request POST --data '{"username": "admin", "password": "pass1234"}' localhost:8000/login
```

### Get a particular student profile

```bash
curl -X GET "http://127.0.0.1:8000/students/1000000" -H  "accept: application/json" -H  "Authorization: Bearer JWT_TOKEN"
```

### Get all user details

```bash
curl -X GET "http://127.0.0.1:8000/users" -H  "accept: application/json" -H  "Authorization: Bearer JWT_TOKEN"
```
