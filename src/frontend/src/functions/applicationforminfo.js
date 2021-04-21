import {checkValidity, getToken, getUsername,
    setSpecificApplicationInfoJson,getSpecificApplicationInfoJson,clearSpecificApplicationInfoJson} from "./localstorage";
import axios from "axios";
import {url} from "./url";

export var application_period_uid = "application period id"; //must have an application period id
export var created_at = new Date();
export var student_id = "student id";
export var room_profile = "room profile object";
export var lifestyle_profile = "lifestyle_profile object";
export var time_period = "Time period object";

export default async function submitApplication(application_period_uid,student_id,room_profile,
    lifestyle_profile,applicable_period){
    //var stay_period = {start_date: start_date, end_date:end_date}
    var data = JSON.stringify({"application_period_uid":application_period_uid,
    "student_id":student_id,
    "room_profile":room_profile,
    "lifestyle_profile":lifestyle_profile,
    "stay_period":applicable_period});

    console.log("DATAAAA");
    console.log(data);
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

    await axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

export async function getSpecificApplicationInfo(uid){
    
    var config = {
        method: 'get',
        url: url+'/api/applications/'+uid,
        headers: { 
        'accept': 'application/json', 
        'Authorization': 'Bearer '+getToken(),
        }
    };
    
    await axios(config)
    .then(function (response) {
        let data = response.data;
        //console.log("methiod data");
        //console.log(data);
        clearSpecificApplicationInfoJson();
        setSpecificApplicationInfoJson(data);
        //return data
    })
    .catch(function (error) {
        console.log(error);
    });
}

export async function approveApplication(uid){
    var config = {
        method: 'post',
        url: url+'/api/applications/'+uid+'/offer',
        headers: { 
           'accept': 'application/json', 
           'Authorization': 'Bearer '+getToken(),
        }
     };
     
     axios(config)
     .then(function (response) {
        console.log(JSON.stringify(response.data));
     })
     .catch(function (error) {
        console.log(error);
     });
}

export async function rejectApplication(uid){
    var config = {
        method: 'post',
        url: url+'/api/applications/'+uid+'/reject',
        headers: { 
           'accept': 'application/json', 
           'Authorization': 'Bearer '+getToken(),
        }
     };
     
     axios(config)
     .then(function (response) {
        console.log(JSON.stringify(response.data));
     })
     .catch(function (error) {
        console.log(error);
     });
}

export function waitlistApplication(uid){
    var config = {
        method: 'post',
        url: url+'/api/applications/'+uid+'/waitlist',
        headers: { 
           'accept': 'application/json', 
           'Authorization': 'Bearer '+getToken(),
        }
     };
     
     axios(config)
     .then(function (response) {
        console.log(JSON.stringify(response.data));
     })
     .catch(function (error) {
        console.log(error);
     });
}