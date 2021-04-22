import {getToken, getUsername, setUserInfoJson} from "./localstorage";
import axios from "axios";
import {url} from "./url";
import {notification} from "antd";

var bedtime = 0;
var wakeup_time = 0;
var like_social = 0;
var like_clean = 0;
var like_quiet =0;



export async function updateLifestyleProfileInfo(sleep_time,wakeup_time,like_social,like_quiet,like_clean,diet,use_aircon,smoking){
    var data = JSON.stringify({"sleep_time":sleep_time,"wakeup_time":wakeup_time,"like_social":like_social,"like_quiet":like_quiet,"like_clean":like_clean,
    "diet":diet,"use_aircon":use_aircon,"smoking":smoking});

    var config = {
    method: 'put',
    url: url+'/api/students/'+getUsername()+'/update_lifestyle_profile',
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
            setUserInfoJson(response.data);
            notification.success({
                message: 'Profile Edited!',
            });
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'Profile Edition Failed',
                description: 'Please try again'
            });
        });
}
