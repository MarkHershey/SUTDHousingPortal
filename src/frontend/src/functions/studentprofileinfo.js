import {checkValidity, getToken, getUsername, setUserInfoJson} from "./localstorage";
import axios from "axios";
import {url} from "./url";
import {notification} from "antd";

export var phone_number = "string";
export var email_personal = "";
export var local_addr_post_code = "";
export var local_addr_street ="";
export var local_addr_unit ="";
export var preference_roommate = []; //list of string


export async function updateStudentProfileInfo(phone_number,
    email_personal,post_code,street,unit,preferredRoommate){
    if(!checkValidity()) return undefined;
    var data = JSON.stringify({"phone_number":phone_number+"","email_personal":email_personal,
    "local_addr_post_code":post_code,"local_addr_street":street,
    "local_addr_unit":unit,"preference_roommate":preferredRoommate});

    var config = {
       method: 'put',
       url: url+'/api/students/'+getUsername(),
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
