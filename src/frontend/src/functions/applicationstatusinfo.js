import axios from "axios";
import {url} from "./url";
import {checkValidity, getToken, getUsername, setApplicationStatusJson} from "./localstorage";

export async function getApplicationInfo(){
    if (!checkValidity()) return undefined;
    const config = {
        method: 'get',
        url: url + '/api/students/'+ getUsername() +'/applications',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    await axios(config)
        .then(function (response) {
            const application_data_json = response.data;
            console.log("Application Status JSON:");
            console.log(Object.values(application_data_json)[0]);
            setApplicationStatusJson(Object.values(application_data_json)[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
}
