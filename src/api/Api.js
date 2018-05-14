/*
*   Api
*
*   Defines API-endpoints and provides wrapper functions for using them.
*
*   TODO: Change every function to accept callback functions for succes- and failure-events,
*   and to return resolved data or just the fetch-promise respectively.
*/

//const API_URL = 'http://localhost:5000/api/v0';
const API_URL = 'https://flatbread-api.herokuapp.com/api/v0';

/*
*   getUsers
*
*   @param  {Function}  Optional callback function for success event.
*   @param  {Function}  Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function getUsers(onSuccess, onFailure) {

    const options = { method: 'GET' };
    let promise = fetch(API_URL + '/users', options);

    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}

/*
*   getUser - Returns user data by the given user id
*
*   @param  {String}    User id
*   @param  {Function}  Optional callback function for success event.
*   @param  {Function}  Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function getUser(userId, onSuccess, onFailure) {

    const url = API_URL + '/users/' + userId;
    const options = { method: 'GET' };

    let promise = fetch(url, options);

    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}

/*
*   getUserRounds - Returns user's rounds data by the given user id  
*
*   @param  {String}    User id
*   @param  {Function}  Optional callback function for success event.
*   @param  {Function}  Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function getUserRounds(userId, onSuccess, onFailure) {

    const url = API_URL + '/users/' + userId + '/rounds/';
    const options = { method: 'GET' };

    let promise = fetch(url, options);

    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}


/*
*   registerUser
*   
*   @param  {Object}    user        User-object
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function registerUser(user, onSuccess, onFailure) {

    let options = { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    };

    let promise = fetch(API_URL + '/auth/register/user', options); 

    // If callback functions were provided, resolve fetch-promise here,
    // otherwise just return the promise.
    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}

/*
*   authenticateUser
*   
*   @param  {Object}    user        User-object
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function authenticateUser(user, onSuccess, onFailure) {

    let options = { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    };

    let promise = fetch(API_URL + '/auth/authenticate/user', options); 

    // If callback functions were provided, resolve fetch-promise here,
    // otherwise just return the promise.
    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}



/*
*   postUser
*   
*   @param  {Object}    user        User-object
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function postUser(user, onSuccess, onFailure) {

    let options = { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    };

    let promise = fetch(API_URL + '/users', options); 

    // If callback functions were provided, resolve fetch-promise here,
    // otherwise just return the promise.
    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}


/*
*   getRounds
*   
*   @param  {String}    courseId    Optional roundId
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function getRounds(roundId, onSuccess, onFailure) {
    roundId = roundId || '';
    
    let url = API_URL + '/rounds/' + roundId;
    let options = { method: 'GET'};
    
    let promise = fetch(url, options);

    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}

/*
*   getCourses
*   
*   @param  {String}    courseId    Optional courseId
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function getCourses(courseId, onSuccess, onFailure) {
    courseId = courseId || '';
    
    let url = API_URL + '/courses/' + courseId;
    let options = { method: 'GET'};
    
    let promise = fetch(url, options);

    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}

/*
*   postCourse
*   
*   @param  {Object}    course      Course-object
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function postCourse(course, onSuccess, onFailure) {

    let options = { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(course) 
    };

    let promise = fetch(API_URL + '/courses', options);

    // If callback functions were provided, resolve fetch-promise here,
    // otherwise just return the promise.
    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;    
    }
}

/*
*   putCourse
*   
*   @param  {Object}    course      Course-object
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function putCourse(course, onSuccess, onFailure) {

    let options = { 
        method: 'PUT', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(course) 
    };

    let promise = fetch(API_URL + '/courses', options);

    // If callback functions were provided, resolve fetch-promise here,
    // otherwise just return the promise.
    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;    
    }
}

/*
*   postRound
*   
*   @param  {Object}    round       Round-object
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function postRound(round, onSuccess, onFailure) {

    let options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(round)
    }
    
    let promise = fetch(API_URL + '/rounds', options); 

    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}

/*
*   putRound
*   
*   @param  {Object}    round       Round-object
*   @param  {Function}  onSuccess   Optional callback function for success event.
*   @param  {Function}  onFailure   Optional callback function for failure event.
*   
*   @return {Object}    If callbacks where provided, calls them respectively with the resolved promise result,
*                       otherwise returns promise itself.
*
*   Note: If onSuccess is provided, onFailure must be too.
*/
function putRound(data, onSuccess, onFailure) {

    let options = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    }
    
    let promise = fetch(API_URL + '/rounds', options); 

    if(onSuccess && onFailure) {
        handleJsonPromise(promise, onSuccess, onFailure);
    } else {
        return promise;
    }
}

/*
*   handleJsonPromise
*   
*   @param  {Object}    promise     Promise-object
*   @param  {Function}  onSuccess   Callback function for success event.
*   @param  {Function}  onFailure   Callback function for failure event.
*   
*   @return {Function call} Calls onSuccess and onFailure respectively. 
*/
function handleJsonPromise(promise, onSuccess, onFailure) {

    promise.then((response) => {

        // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
        // Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or 
        // if anything prevented the request from completing.
        return response.json();

    }).then((jsonResponse) => {

        // Expecting that faulty response contains 'error'-property
        if(jsonResponse.error) {
            return onFailure(jsonResponse.error);
        } else {
            return onSuccess(jsonResponse);
        }

    }).catch((error) => {
        // Will end up here only on rejected promise (on NetworkError or etc...)
        return onFailure(error.message);
    });
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    getUserRounds: getUserRounds,
    getRounds: getRounds,
    getCourses: getCourses,
    postUser: postUser,
    postCourse: postCourse,
    putCourse: putCourse,
    postRound: postRound,
    putRound: putRound,
    registerUser: registerUser,
    authenticateUser: authenticateUser
};
