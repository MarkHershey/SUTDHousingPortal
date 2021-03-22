import {checkValidity, getEventInfoJson, getToken, setEventInfoJson, setUserInfoJson} from "./localstorage";
import {url} from "./url";
import axios from "axios";
export class Event{
    constructor(event_data){
        this.uid = event_data.uid;
        this.created_at = event_data.created_at;
        this.created_by = event_data.created_by;
        this.title = event_data.title;
        this.event_type = event_data.event_type;
        this.meetup_location = event_data.meetup_location;
        this.floor = event_data.floor;
        this.block = event_data.block;
        this.description = event_data.description;
        this.start_time = event_data.start_time;
        this.duration_mins = event_data.duration_mins;
        this.count_attendance = event_data.count_attendance;
        this.signups = event_data.signups;
        this.attendance = event_data.attendance;
        this.signup_limit = event_data.signup_limit;
        this.signup_ddl = event_data.signup_ddl;
    }

    getEnd_time = function(){
        //To do
        //uses start time and duration to get a end time
        return "18:00";
    }
}

export async function getEventInfo(){
    if (!checkValidity()) return undefined;
    var event_data_json;
    const config = {
        method: 'get',
        url: url + '/api/events/all',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    axios(config)
        .then(function (response) {
            event_data_json = response.data;
            setEventInfoJson(event_data_json);
            console.log("Event Info JSON:");
            console.log(getEventInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}

