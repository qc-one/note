import Cookies from "js-cookie";

const TokenKey = "workspace-token";

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    window.localStorage.removeItem("allUserInfo");
    window.localStorage.removeItem("tempRouteJson");
    console.log("localStorage has been cleared by remove token");
    return Cookies.remove(TokenKey);
}
