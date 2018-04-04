const API_URL = 'http://localhost:5000/api/v0';

function getUsers() {

    //headers: {'content-type': 'application/json'}
    let options = { method: 'GET'};
    return fetch(API_URL + '/users', options);
}

function getCourses() {
    let options = { method: 'GET'};
    return fetch(API_URL + '/courses', options);
}

function postUser(user) {

    let options = { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user) 
    };

    return fetch(API_URL + '/users', options);
}

function postCourse(course) {

    let options = { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(course) 
    };

    return fetch(API_URL + '/courses', options);
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
    postRound: postRound,
    putRound: putRound
};