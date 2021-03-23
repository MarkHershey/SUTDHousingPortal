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
    return JSON.parse(storage["userinfojson"]);
}

export function setUserInfoJson(newUserInfoJson){
    storage.setItem("userinfojson",JSON.stringify(newUserInfoJson));
}

export function clearUserInfoJson(){
    storage.removeItem("userinfojson");
    console.log(typeof(storage["userinfojson"]));
}

export function getEventInfoJson(){
    return JSON.parse(storage["eventinfojson"]);
}

export function setEventInfoJson(newEventInfoJson){
    storage.setItem("eventinfojson",JSON.stringify(newEventInfoJson));
}

export function clearEventInfoJson(){
    storage.removeItem("eventinfojson");
    console.log(typeof(storage["eventinfojson"]));
}

export function logout(){
    clearToken();
    clearEventInfoJson();
    clearUserInfoJson();
}
