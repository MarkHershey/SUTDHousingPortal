let storage = window.localStorage;

export function getToken(){
    return storage["token"];
}

export function setToken(newToken){
    storage.setItem("token",newToken);
    console.log(getToken());
}

export function isAdmin(){
    if(!checkValidity) return false;
    if(storage["admin"] === undefined){
        return false;
    } else {
        return true;
    }
}

export function setAdmin(newAdmin){
    storage.setItem("admin",newAdmin);
    console.log(isAdmin());
}

export function clearAdmin(){
    storage.removeItem("admin");
    console.log(typeof(storage["admin"]));
}

export function isAdminWrite(){
    return storage["adminWrite"];
}

export function clearAdminWrite(){
    storage.removeItem("adminWrite");
    console.log(typeof(storage["adminWrite"]));
}

export function setAdminWrite(newAdminWrite){
    storage.setItem("adminWrite",newAdminWrite);
    console.log(isAdminWrite());
}

export function checkValidity(){
    return (typeof(storage["token"]) !== "undefined");
}

export function clearToken(){
    storage.removeItem("token");
    console.log(typeof(storage["token"]));
}

export function getUsername(){
    return storage["username"];
}

export function setUsername(newUsername){
    storage.setItem("username",newUsername);
}

export function clearUsername(){
    storage.removeItem("username");
    console.log(typeof(storage["username"]));
}

export function getUserInfoJson(){
    if (storage["userinfojson"] === undefined) return undefined;
    return JSON.parse(storage["userinfojson"]);
}

export function isHG(){
    if (!checkValidity()) return false;
    if (getUserInfoJson() === undefined) return false;
    return getUserInfoJson().is_house_guardian;

}

export function setUserInfoJson(newUserInfoJson){
    storage.setItem("userinfojson",JSON.stringify(newUserInfoJson));
}

export function clearUserInfoJson(){
    storage.removeItem("userinfojson");
    console.log(typeof(storage["userinfojson"]));
}

export function getEventInfoJson(){
    if (storage["eventinfojson"] === undefined) return undefined;
    return JSON.parse(storage["eventinfojson"]);
}

export function setEventInfoJson(newEventInfoJson){
    storage.setItem("eventinfojson",JSON.stringify(newEventInfoJson));
}

export function clearEventInfoJson(){
    storage.removeItem("eventinfojson");
    console.log(typeof(storage["eventinfojson"]));
}

export function getUpcomingEventInfoJson(){
    if (storage["upcomingeventinfojson"] === undefined) return undefined;
    return JSON.parse(storage["upcomingeventinfojson"]);
}

export function setUpcomingEventInfoJson(newEventInfoJson){
    storage.setItem("upcomingeventinfojson",JSON.stringify(newEventInfoJson));
}

export function clearUpcomingEventInfoJson(){
    storage.removeItem("personaleventinfojson");
    console.log(typeof(storage["personaleventinfojson"]));
}

export function getPersonalEventInfoJson(){
    if (storage["personaleventinfojson"] === undefined) return undefined;
    return JSON.parse(storage["personaleventinfojson"]);
}

export function setPersonalEventInfoJson(newEventInfoJson){
    storage.setItem("personaleventinfojson",JSON.stringify(newEventInfoJson));
}

export function clearPersonalEventInfoJson(){
    storage.removeItem("personaleventinfojson");
    console.log(typeof(storage["personaleventinfojson"]));
}

export function getAttendanceEditJson(){
    return JSON.parse(storage["attendanceeditjson"]);
}

export function initAttendanceEditJson(){
    console.log(storage["attendanceeditjson"]);
    const Json = {
        addition: [],
        deletion: [],
    }
    storage.setItem("attendanceeditjson",JSON.stringify(Json));
    console.log(storage["attendanceeditjson"]);
}

export function addAttendanceADDJson(id){
    const Json = getAttendanceEditJson();
    Json.addition.push(id);
    storage.setItem("attendanceeditjson",JSON.stringify(Json));
    console.log(getAttendanceEditJson());
}

export function addAttendanceDELJson(id){
    const Json = getAttendanceEditJson();
    Json.deletion.push(id);
    storage.setItem("attendanceeditjson",JSON.stringify(Json));
    console.log(getAttendanceEditJson());
}

export function deleteAttendanceADDJson(id){
    const Json = getAttendanceEditJson();
    for (let i = 0; i < Json.addition.length; i++) if(Json.addition[i] === id) Json.addition.splice(i,1);
    storage.setItem("attendanceeditjson",JSON.stringify(Json));
    console.log(getAttendanceEditJson());
}

export function deleteAttendanceDELJson(id){
    const Json = getAttendanceEditJson();
    for (let i = 0; i < Json.deletion.length; i++) if(Json.deletion[i] === id) Json.deletion.splice(i,1);
    storage.setItem("attendanceeditjson",JSON.stringify(Json));
    console.log(getAttendanceEditJson());
}

export function clearAttendanceEditJson(){
    initAttendanceEditJson();
    storage.removeItem("attendanceeditjson");
    console.log(typeof(storage["attendanceeditjson"]));
    console.log(getAttendanceEditJson());
}

export function getApplicationPeriodInfoJson(){
    if (storage["applicationperiodinfojson"]=== undefined) return undefined;
    return JSON.parse(storage["applicationperiodinfojson"]);
}

export function setApplicationPeriodInfoJson(newApplicationPeriodInfoJson){
    storage.setItem("applicationperiodinfojson",JSON.stringify(newApplicationPeriodInfoJson))
}

export function getPersonalApplicationPeriodInfoJson(){
    if (storage["personalapplicationperiodinfojson"] === undefined) return undefined;
    return JSON.parse(storage["personalapplicationperiodinfojson"]);
}

export function setPersonalApplicationPeriodInfoJson(newApplicationPeriodInfoJson){
    storage.setItem("personalapplicationperiodinfojson",
    JSON.stringify(newApplicationPeriodInfoJson));
}

export function clearPersonalApplicationPeriodInfoJson(){
    storage.removeItem("personalapplicationperiodinfojson");
    console.log(typeof(storage["personalapplicationperiodinfojson"]));
}

export function getOngoingApplicationPeriodInfoJson(){
    if (storage["ongoingapplicationperiodinfojson"] === undefined) return undefined;
    return JSON.parse(storage["ongoingapplicationperiodinfojson"]);
}

export function setOngoingApplicationPeriodInfoJson(newOngoingApplicationPeriodInfoJson){
    storage.setItem("ongoingapplicationperiodinfojson",JSON.stringify(newOngoingApplicationPeriodInfoJson));
}

export function setAllDisciplinaryRecordsInfoJson(newAllDisciplinaryRecordsInfoJson){
    storage.setItem("alldisciplinaryrecords",JSON.stringify(newAllDisciplinaryRecordsInfoJson));
}

export function getAllDisciplinaryRecordsInfoJson(){
    if(storage["alldisciplinaryrecords"]===undefined) return undefined;
    return JSON.parse(storage["alldisciplinaryrecords"]);
}

export function setPersonalDisciplinaryRecordInfoJson(newInfoJson){
    storage.setItem("personaldisciplinaryrecord",JSON.stringify(newInfoJson));
}

export function getPersonalDisciplinaryRecordInfoJson(){
    if(storage["personaldisciplinaryrecord"]===undefined) return undefined;
    return JSON.parse(storage["personaldisciplinaryrecord"]);
}


export function logout(){
    clearToken();
    clearEventInfoJson();
    clearUserInfoJson();
    clearUpcomingEventInfoJson();
    clearAdmin();
    clearAdminWrite();
}
