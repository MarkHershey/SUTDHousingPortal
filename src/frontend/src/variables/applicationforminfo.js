import {checkValidity, getToken, getUsername} from "./localstorage";
import axios from "axios";
import {url} from "./url";

export var application_period_uid = "application period id"; //must have an application period id
export var created_at = new Date();
export var student_id = "student id";
export var room_profile = "room profile object";
export var lifestyle_profile = "lifestyle_profile object";
export var time_period = "Time period object";

export async function submitApplication(){

    var data = JSON.stringify({"uid":"string","application_period_uid":"string",
    "created_at":"2021-04-02T16:01:19.138Z","student_id":"string",
    "room_profile":{"room_type":"string","room_type_2nd":"string","block":"ANY",
    "block_2nd":"ANY","level_range":"ANY","window_facing":"ANY","near_to_lift":true,
    "near_to_washroom":true,"level_has_pantry":true,"level_has_mr":true,"level_has_gsr":true,
    "level_has_rr":true,"weightage_order":[1,2,3,4,5,6,7,8,9]},
    
    "lifestyle_profile":{"bedtime":0,"wakeup_time":0,"like_social":true,
    "like_clean":true},
    
    "stay_period":{"start_date":"2021-04-02","end_date":"2021-04-02"}});

    var config = {
    method: 'post',
    url: url+'/api/applications/',
    headers: { 
        'accept': 'application/json', 
        'Authorization': 'Bearer '+getToken(), 
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