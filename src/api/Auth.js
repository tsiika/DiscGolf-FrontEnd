
const ACCESS_TOKEN_KEY = 'accessToken';
const USER_ID_KEY = 'userId';

function setAuthentication(accessToken, userId) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(USER_ID_KEY, userId);
}

function removeAuthentication() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}

function isAuthenticated() {
    return ( (localStorage.getItem(ACCESS_TOKEN_KEY) && localStorage.getItem(USER_ID_KEY)) ? true : false);
}

module.exports = {
    setAuthentication: setAuthentication,
    removeAuthentication: removeAuthentication,
    isAuthenticated: isAuthenticated,
    getAccessToken: getAccessToken,
    getUserId: getUserId
}