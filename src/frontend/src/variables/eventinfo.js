import {
    checkValidity,
    getEventInfoJson, getPersonalEventInfoJson,
    getToken, getUpcomingEventInfoJson, getUsername, isHG,
    setEventInfoJson, setPersonalEventInfoJson,
    setUpcomingEventInfoJson,
} from "./localstorage";
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

    await axios(config)
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

export async function getUpcomingEventInfo(){
    if (!checkValidity()) return undefined;
    var event_data_json;
    const config = {
        method: 'get',
        url: url + '/api/events/upcoming',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    await axios(config)
        .then(function (response) {
            event_data_json = response.data;
            setUpcomingEventInfoJson(event_data_json);
            console.log("Upcoming Event Info JSON:");
            console.log(getUpcomingEventInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function getPersonalEventInfo(){
    if (!checkValidity()) return undefined;
    var event_data_json;
    const config = {
        method: 'get',
        url: url + '/api/students/' + getUsername() + '/events',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    await axios(config)
        .then(function (response) {
            event_data_json = response.data;
            setPersonalEventInfoJson(event_data_json);
            console.log("Personal Event Info JSON:");
            console.log(getPersonalEventInfoJson());
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function createEvent(json) {
    if (!checkValidity() || !isHG()) return undefined;
    const config = {
        method: 'post',
        url: url + '/api/events/',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(json)
    };

    await axios(config)
        .then(function (response) {
            alert("Event Created Successfully");
        }).catch(error => {
            alert("Event Creation Failed");
        });
}

export async function deleteEvent(uid){
    if (!checkValidity() || !isHG()) return undefined;
    const config = {
        method: 'delete',
        url: url + '/api/events/' + uid,
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    axios(config)
        .then(function (response) {
            alert("Event deleted successfully");
            window.location.reload(true);
        })
        .catch(function (error) {
            alert("Event deletion failed");
        });
}
