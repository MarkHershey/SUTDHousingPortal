import {
    checkValidity, getToken, getUsername,
    setApplicationPeriodInfoJson,
    getApplicationPeriodInfoJson,
    setPersonalApplicationPeriodInfoJson,
    getPersonalApplicationPeriodInfoJson,
    getOngoingApplicationPeriodInfoJson,
    setOngoingApplicationPeriodInfoJson

} from "./localstorage";
import axios from "axios";
import {url} from "./url";
import {notification} from "antd";


export async function submitApplicationPeriod(application_window_open, application_window_close,
                                              applicable_periods, applicable_rooms, applicable_students) {
    var data = JSON.stringify({
        "application_window_open": application_window_open,
        "application_window_close": application_window_close,
        "applicable_periods": applicable_periods,
        "applicable_rooms": ["string"],
        "applicable_students": ["1004000", "1000000", "1003432", "1004515", "1004234", "justinHG"]
    });
    if (!checkValidity()) return undefined;
    var config = {
        method: 'post',
        url: url + '/api/application_periods/',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data: data

    };
    console.log(data);
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            notification.success({
                message: 'New Application Created Successfully',
            });
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'New Application Creation Failed',
                description: 'Please try again'
            });
        });
}

export async function getAllApplicationPeriodInfo() {
    if (!checkValidity) return undefined;
    var application_data_json;
    var config = {
        method: 'get',
        url: url + '/api/application_periods/all',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    axios(config)
        .then(function (response) {
            application_data_json = response.data
            setApplicationPeriodInfoJson(application_data_json);
            console.log("Application period Info JSON")
            console.log(getApplicationPeriodInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function getApplicationPeriodInfo(uid) {
    if (!checkValidity()) return undefined;
    var application_period_info_json;
    var config = {
        method: 'get',
        url: url + '/api/application_periods/' + uid,
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    axios(config)
        .then(function (response) {
            application_period_info_json = response.data;
            setPersonalApplicationPeriodInfoJson(application_period_info_json);
            console.log("Personal Application Period Info Json");
            console.log(getPersonalApplicationPeriodInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function deleteApplicationPeriodInfo(uid) {
    if (!checkValidity()) return undefined;
    var config = {
        method: 'delete',
        url: url + '/api/application_periods/' + uid,
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    axios(config)
        .then(function (response) {
            notification.success({
                message: "Application Period deleted successfully",
            });
            window.location.reload(true);
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            notification.error({
                message: "Application Period deleted failed",
            });
        });
}

export async function getOngoingApplicationPeriodInfo() {
    if (!checkValidity()) return undefined;
    let ongoing_application_period_data_json;
    const config = {
        method: 'get',
        url: url + '/api/application_periods/',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    await axios(config)
        .then(function (response) {
            ongoing_application_period_data_json = response.data;
            setOngoingApplicationPeriodInfoJson(ongoing_application_period_data_json);
            console.log("Ongoing Application Period Info Json");
            console.log(getOngoingApplicationPeriodInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}
