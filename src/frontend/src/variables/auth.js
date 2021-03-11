let storage= window.localStorage;

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
