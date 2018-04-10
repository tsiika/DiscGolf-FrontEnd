/*
*   Api
*
*   Defines API-endpoints and provides wrapper functions for using them.
*
*   TODO: Change every function to accept callback functions for succes- and failure-events,
*   and to return resolved data or just the fetch-promise respectively.
*/

const API_URL = 'http://localhost:5000/api/v0';


function getUsers() {

    //headers: {'content-type': 'application/json'}
    let options = { method: 'GET'};
    return fetch(API_URL + '/users', options);
}

function postUser(user) {

    let options = { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user) 
    };

    return fetch(API_URL + '/users', options);
}

function getCourses(courseId) {
    courseId = courseId || '';
    
    let url = API_URL + '/courses/' + courseId;
    let options = { method: 'GET'};
    
    return fetch(url, options);
}

/*
*   postCourse
*
*   @param      Object      Course-dataobject
*   @onSuccess  Function    Optional callback function for success event.
*   @onFailure  Function    Optional callback function for failure event.
*   
*   @return     Object      If callbacks where provided, calls them respectively with the resolved promise result,
*                           otherwise returns promise itself.
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

        promise.then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            onSuccess(jsonResponse);
        }).catch((reason) => {
            onFailure(reason);
        });
    } else {
        
        return promise;    
    }
}

/*
*   putCourse
*
*   @param      Object      Course-dataobject
*   @onSuccess  Function    Optional callback function for success event.
*   @onFailure  Function    Optional callback function for failure event.
*   
*   @return     Object      If callbacks where provided, calls them respectively with the resolved promise result,
*                           otherwise returns promise itself.
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

        // TODO: Not sure if the failure is handled correctly
        promise.then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            onSuccess(jsonResponse);
        }).catch((reason) => {
            onFailure(reason);
        });
    } else {
        
        return promise;    
    }
}


function postRound(data) {

    let options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    }
    
    return fetch(API_URL + '/rounds', options);
}

function putRound(data) {

    let options = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    }
    
    return fetch(API_URL + '/rounds', options);
}

module.exports = {
    getUsers: getUsers,
    getCourses: getCourses,
    postUser: postUser,
    postCourse: postCourse,
    putCourse: putCourse,
    postRound: postRound,
    putRound: putRound
};