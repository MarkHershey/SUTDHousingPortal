import {
    checkValidity, getToken, getUsername,
    setSpecificApplicationInfoJson, getSpecificApplicationInfoJson, clearSpecificApplicationInfoJson
} from "./localstorage";
import axios from "axios";
import {url} from "./url";
import {notification} from "antd";

export var application_period_uid = "application period id"; //must have an application period id
export var created_at = new Date();
export var student_id = "student id";
export var room_profile = "room profile object";
export var lifestyle_profile = "lifestyle_profile object";
export var time_period = "Time period object";

export default async function submitApplication(application_period_uid, student_id, room_profile,
                                                lifestyle_profile, applicable_period) {
    //var stay_period = {start_date: start_date, end_date:end_date}
    var data = JSON.stringify({
        "application_period_uid": application_period_uid,
        "student_id": student_id,
        "room_profile": room_profile,
        "lifestyle_profile": lifestyle_profile,
        "stay_period": applicable_period
    });

    console.log("DATAAAA");
    console.log(data);
    var config = {
        method: 'post',
        url: url + '/api/applications/',
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
                message: 'Submitted!',
                description:
                    "Submitted Application Form Successfully!",
            });
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'Failed!',
                description:
                    "Application Form Failed to Submit!",
            });
        });
}

export async function getSpecificApplicationInfo(uids) {
    var result = []
    console.log(uids)
    for (const uid in uids) {

        if (uids[uid] !== "") {
            const config = {
                method: 'get',
                url: url + '/api/applications/' + uids[uid],
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                }
            };

            await axios(config)
                .then(function (response) {
                    let data = response.data;
                    console.log(data);
                    result.push(data);
                    //return data
                })
                .catch(function (error) {
                    notification.error({
                        message: 'Error!',
                        description:
                            "Application Form Failed to Fetch!",
                    });
                });
        }
    }
    console.log("result:");
    console.log(result)
    setSpecificApplicationInfoJson(result);
}

export async function approveApplication(uid) {
    var config = {
        method: 'post',
        url: url + '/api/applications/' + uid + '/offer',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(true);
        })
        .catch(function (error) {
            notification.error({
                message: 'Failed!',
                description:
                    "Failed to Accept!",
            });
        });
}

export async function rejectApplication(uid) {
    var config = {
        method: 'post',
        url: url + '/api/applications/' + uid + '/reject',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(true);
        })
        .catch(function (error) {
            notification.error({
                message: 'Failed!',
                description:
                    "Failed to Reject!",
            });
        });
}

export function waitlistApplication(uid) {
    var config = {
        method: 'post',
        url: url + '/api/applications/' + uid + '/waitlist',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(true);
        })
        .catch(function (error) {
            notification.error({
                message: 'Failed!',
                description:
                    "Failed to Waitlist!",
            });
        });
}
