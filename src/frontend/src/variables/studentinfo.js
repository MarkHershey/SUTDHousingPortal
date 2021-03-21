import axios from "axios";
import {checkValidity,getToken} from "./auth";
import {getUsername,setUserInfoJson} from "./auth";

export class Student {
    constructor(student_data){
        this.student_id = student_data.student_id;
        this.full_name = student_data.full_name;
        this.gender = student_data.gender;
        this.enrollment_type = student_data.enrollment_type;
        this.year_of_enrollment = student_data.year_of_enrollment;
        this.sc_status = student_data.sc_status;
        this.pr_status = student_data.pr_status;
        this.nationality = student_data.nationality;
        this.phone_number = student_data.phone_number;
        this.email_sutd = student_data.email_sutd;
        this.email_personal = student_data.email_personal;
        this.local_addr_post_code = student_data.local_addr_post_code;
        this.local_addr_street = student_data.local_addr_street;
        this.local_addr_unit = student_data.local_addr_unit;
        this.attended_events = student_data.attended_events;
        this.disciplinary_records = student_data.disciplinary_records;
        this.preference_roommate = student_data.preference_roommate;
        this.preference_room = student_data.preference_room;
        this.preference_lifestyle = student_data.preference_lifestyle;
        this.is_house_guardian = student_data.is_house_guardian;
        this.travel_time = student_data.travel_time;
    }
}


export async function getCurrentStudentInfo(){
    if (!checkValidity()) return undefined;

    var student_data_json;
    const config = {
        method: 'get',
        url: 'http://esc.dev.markhh.com/api/students/' + getUsername(),
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    axios(config)
        .then(function (response) {
            student_data_json = response.data;
            console.log("User Info JSON:");
            console.log(student_data_json);
            setUserInfoJson(student_data_json);
        })
        .catch(function (error) {
            console.log(error);
        });
}
