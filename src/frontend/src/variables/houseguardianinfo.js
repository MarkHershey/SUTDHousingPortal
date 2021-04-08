import {checkValidity, getToken, getUsername} from "./localstorage";
import axios from "axios";
import {url} from "./url";

export async function setHouseGuardian(id){
    var config = {
        method: 'put',
        url: '/api/students/'+id+'/set_hg',
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

export async function revokeHouseGuardian(id){
    var config = {
        method: 'put',
        url: url+'/api/students/'+id+'/revoke_sg',
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