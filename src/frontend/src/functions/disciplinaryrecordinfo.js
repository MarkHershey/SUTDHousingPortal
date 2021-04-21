import {
    getAllDisciplinaryRecordsInfoJson,
    getPersonalDisciplinaryRecordInfoJson,
    getToken,
    setAllDisciplinaryRecordsInfoJson,
    setPersonalDisciplinaryRecordInfoJson
} from "./localstorage";
import axios from "axios";
import {url} from "./url";
import {notification} from "antd";

export async function createDisciplinaryRecord(id, record_type, description, points_deduction) {
    var data = JSON.stringify({
        "student_id": id, "record_type": record_type,
        "description": description, "points_deduction": points_deduction
    });

    var config = {
        method: 'post',
        url: url + '/api/records/',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            notification.success({
                message: 'Disciplinary Record Created!',
            });
            getAllDisciplinaryRecords();
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'Disciplinary Record Creation Failed',
                description: 'Please try again'
            });
        });
}

export async function getAllDisciplinaryRecords() {
    var all_disciplinary_records;
    var config = {
        method: 'get',
        url: url + '/api/records/',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    await axios(config)
        .then(function (response) {
            all_disciplinary_records = response.data;
            setAllDisciplinaryRecordsInfoJson(all_disciplinary_records);
            console.log("All disciplinary reocrds info json");
            console.log(getAllDisciplinaryRecordsInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function getDisciplinaryRecord(uid) {
    var personal_disciplinary_record;
    var config = {
        method: 'get',
        url: url + '/api/records/' + uid,
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    await axios(config)
        .then(function (response) {
            personal_disciplinary_record = response.data;
            setPersonalDisciplinaryRecordInfoJson(personal_disciplinary_record);
            console.log("personal disciplinary record");
            console.log(getPersonalDisciplinaryRecordInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function updateDisciplinaryRecord(uid, description, points_deduction) {
    var data = JSON.stringify({"description": description, "points_deduction": points_deduction});

    var config = {
        method: 'put',
        url: url + '/api/records/' + uid,
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            getAllDisciplinaryRecords();
            notification.success({
                message: 'Disciplinary Record Updated',
            });
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'Disciplinary Record Update Failed',
                description: 'Please try again'
            });
        });
}

export async function deleteDisciplinaryRecord(uid) {
    var config = {
        method: 'delete',
        url: url + '/api/records/' + uid,
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            getAllDisciplinaryRecords();
            notification.success({
                message: 'Disciplinary Record Deleted',
            });
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'Disciplinary Record Deletion Failed',
                description: 'Please try again'
            });
        });
}
