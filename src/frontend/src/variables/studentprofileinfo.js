import {checkValidity, getToken, getUsername} from "./auth";
import axios from "axios";

export var phone_number = "string";
export var email_personal = "";
export var local_addr_post_code = "";
export var local_addr_street ="";
export var local_addr_unit ="";
export var preference_roommate = []; //list of string


export async function updateStudentProfileInfo(username,password,phone_number,
    email_personal,post_code,street,unit,preferredRoommate){
    if(!checkValidity()) return undefined;
    var data = JSON.stringify({"username":username,"password":password,
    "phone_number":phone_number,"email_personal":email_personal,
    "local_addr_post_code":post_code,"local_addr_street":street,
    "local_addr_unit":unit,"preference_roommate": preferredRoommate});
    
    var config = {
       method: 'put',
       url: 'http://esc.dev.markhh.com/api/students/'+getUsername(),
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