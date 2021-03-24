import {checkValidity, getToken, getUsername} from "./localstorage";
import axios from "axios";

var bedtime = 0;
var wakeup_time = 0;
var like_social = 0;
var like_clean = 0;
var like_quiet =0;

export async function updateLifestyleProfileInfo(bedtime,wakeup_time,like_social,
    like_clean,like_quite){
    var data = JSON.stringify({"bedtime":bedtime,"wakeup_time":wakeup_time,
    "like_social":like_social,"like_clean":like_clean,"like_quite":like_quite});

    var config = {
    method: 'put',
    url: 'http://esc.dev.markhh.com/api/students/'+getUsername()+'/update_lifestyle_profile',
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