
/*
*   setAuthenticated
*/
function setAuthenticated() {
    localStorage.setItem('authenticated', true);
}

/*
*   isAuthenticated
*   
*   @return {string}    'true' if user is authenticated
*/
function isAuthenticated() {
    return localStorage.getItem('authenticated');
}

module.exports = {
    setAuthenticated: setAuthenticated,
    isAuthenticated: isAuthenticated
}