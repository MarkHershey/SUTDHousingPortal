let storage = window.localStorage;

export function getToken(){
    return storage["token"];
}

export function setToken(newToken){
    storage.setItem("token",newToken);
    console.log(getToken());
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

export function logout(){
    clearToken();
    clearEventInfoJson();
    clearUserInfoJson();
    clearUpcomingEventInfoJson();
    clearPersonalEventInfoJson();
}
