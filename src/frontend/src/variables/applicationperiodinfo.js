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


export default async function submitApplicationPeriod(json){
    var data = JSON.stringify({"uid":"string","created_at":"2021-04-05T06:18:04.446Z",
    "created_by":"string","application_window_open":"2021-04-05T06:18:04.446Z",
    "application_window_close":"2021-04-05T06:18:04.446Z",
    "applicable_periods":[{"start_date":"2021-04-05","end_date":"2021-04-05"}],
    "applicable_rooms":["string"],"applicable_students":["string"],
    "application_forms_map":{"additionalProp1":"string","additionalProp2":"string",
    "additionalProp3":"string"},"reference_count":0});

    var config = {
    method: 'post',
    url: url+'/api/application_periods/',
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}