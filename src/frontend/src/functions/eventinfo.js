import {
    checkValidity,
    getAttendanceEditJson,
    getEventInfoJson,
    getPersonalEventInfoJson,
    getToken,
    getUpcomingEventInfoJson,
    getUsername,
    isHG,
    setEventInfoJson,
    setPersonalEventInfoJson,
    setUpcomingEventInfoJson,
} from "./localstorage";
import {url} from "./url";
import axios from "axios";
import {notification} from "antd";

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
            notification.success({
                message: 'Event Created Successfully',
            });
            window.location.href="/event";
        }).catch(error => {
            notification.error({
                message: 'Event Creation Failed',
            });
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

    await axios(config)
        .then(function (response) {
            window.location.reload(true);
        })
        .catch(function (error) {
            notification.error({
                message: 'Event Deletion Failed',
                description:
                    'There are students signed up already',
            });
        });
}

export async function eventHandler(uid){
    var config = {
        method: 'post',
        url: url + '/api/events/' + uid + '/signup',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data : JSON.stringify([getUsername()])
    };

    await axios(config)
        .then(function (response) {
            window.location.reload(true);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function updateAttendance(eventId){
    const addList = getAttendanceEditJson().addition;
    const delList = getAttendanceEditJson().deletion;
    console.log(addList);
    console.log(delList);
    let config = {
        method: 'post',
        url: url + '/api/events/' + eventId + '/attend',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(addList)
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    config = {
        method: 'delete',
        url: url + '/api/events/'+ eventId + '/attend',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(delList)
    };

    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    
}

export async function editEvent(uid,title,event_type,meetup_location,
                                block,floor,description,start_time,duration_mins,count_attendance,signup_limit){

    if (!checkValidity() || !isHG()) return undefined;
    var data = JSON.stringify({"title":title,
        "event_type":event_type,"meetup_location":meetup_location,
        "block":block,"floor":floor,"description":description,
        "start_time":start_time,"duration_mins":duration_mins,
        "count_attendance":count_attendance,"signup_limit":signup_limit});

    var config = {
        method: 'put',
        url: url+'/api/events/'+uid,
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
            window.location.href="/event";
        })
        .catch(function (error) {
            console.log(error);
        });
}
