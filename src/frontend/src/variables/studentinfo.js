class Student {
    constructor(student_id,full_name,gender,enrollment_type,year_of_enrollment,
        sc_status,pr_status,nationality,phone_number,email_sutd,email_personal,
        local_addr_post_code,local_addr_street,local_addr_unit,attended_events,
        disciplinary_records,preference_roommate,preference_room,preference_lifestyle,
        is_house_guardian,travel_time){
            
        this.student_id=student_id;
        this.full_name = full_name;
        this.gender = gender;
        this.enrollment_type =enrollment_type;
        this.year_of_enrollment = year_of_enrollment;
        this.sc_status = sc_status;
        this.pr_status = pr_status;
        this.nationality = nationality;
        this.phone_number = phone_number;
        this.email_sutd = email_sutd;
        this.email_personal = email_personal;
        this.local_addr_post_code = local_addr_post_code;
        this.local_addr_street = local_addr_street;
        this.local_addr_unit = local_addr_unit;
        this.attended_events = attended_events;
        this.disciplinary_records = disciplinary_records;
        this.preference_roommate = preference_roommate;
        this.preference_room = preference_room;
        this.preference_lifestyle = preference_lifestyle;
        this.is_house_guardian = is_house_guardian;
        this.travel_time = travel_time; 
    }
}
module.exports = Student;