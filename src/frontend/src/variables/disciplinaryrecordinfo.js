import {checkValidity, getToken, getUsername} from "./localstorage";
import axios from "axios";
import {url} from "./url";

export async function createDisciplinaryRecord(id,record_type,description,points_deduction){
    var data = JSON.stringify({"student_id":id,"record_type":record_type,
    "description":description,"points_deduction":points_deduction});

    var config = {
    method: 'post',
    url: url+'/api/records/',
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