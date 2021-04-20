import axios from "axios";
import {url} from "./url";
import {checkValidity, getToken, getUsername, setApplicationStatusJson} from "./localstorage";
import {notification} from "antd";

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
            console.log(application_data_json);
            var maxDate = new Date(Object.values(application_data_json)[0].created_at);
            var maxDateIndex = 0;
            Object.values(application_data_json).forEach((item,itemIndex) => {
                var currentDate = new Date(item.created_at);
                if (currentDate > maxDate) {
                    maxDate = currentDate;
                    maxDateIndex = itemIndex;
                }
            });
            setApplicationStatusJson(Object.values(application_data_json)[maxDateIndex]);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function accept(accept,uid){
    const fullUrl = url + '/api/applications/'+uid+'/student_' + (accept?"accept":"decline");
    console.log(fullUrl);
    const config = {
        method: 'post',
        url: fullUrl,
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            notification.success({
                message: accept?'Accepted!':"Declined!",
            });
            window.location.reload(true);
        })
        .catch(function (error) {
            notification.error({
                message: 'Failed!',
                description:
                    "Please try again!",
            });
        });
}
