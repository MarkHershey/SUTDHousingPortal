import {getToken} from "./localstorage";
import axios from "axios";
import {url} from "./url";
import {notification} from "antd";

export async function setHouseGuardian(id) {
    var config = {
        method: 'put',
        url: url + '/api/students/' + id + '/set_hg',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            notification.success({
                message: 'House Guardian Added Successfully for ' + id,
            });
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'House Guardian Addition Failed for ' + id,
            });
        });
}

export async function revokeHouseGuardian(id) {
    var config = {
        method: 'put',
        url: url + '/api/students/' + id + '/revoke_sg',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            notification.success({
                message: 'House Guardian Revoked Successfully for ' + id,
            });
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: 'House Guardian Revoked Failed for ' + id,
            });
        });
}
