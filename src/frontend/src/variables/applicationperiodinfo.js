import {checkValidity, getToken, getUsername} from "./localstorage";
import axios from "axios";
import {url} from "./url";

var uid = "string";
var created_at = new Date();
var created_by = "string";
var application_window_open = new Date();
var application_window_close = new Date();
var applicable_periods = [] // list of time period objects
var applicable_rooms = [] // list of room ids
var applicable_students = []// list of student ids
var application_forms = [] // list of application form objects


export default async function submitApplicationPeriod(application_window_open,application_window_close,
    applicable_periods,applicable_rooms,applicable_students){
    var data = JSON.stringify({"application_window_open":application_window_open,
    "application_window_close":application_window_close,
    "applicable_periods":[{"start_date":"2021-04-10","end_date":"2021-04-11"}],
    "applicable_rooms":["string"],"applicable_students":["string"]
    });
    var config = {
    method: 'post',
    url: url+'/api/application_periods/',
    headers: { 
        'accept': 'application/json', 
        'Authorization': 'Bearer '+getToken(), 
        'Content-Type': 'application/json'
    },
    data : data
    
    };
    console.log(data);
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}