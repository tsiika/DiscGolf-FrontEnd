const API_URL = 'http://localhost:5000';

function fetchUsers() {

    //headers: {'content-type': 'application/json'}
    let options = { method: 'GET'};
    return fetch(API_URL + '/users', options);
}

function fetchCourses() {
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

module.exports = {
    fetchUsers: fetchUsers,
    fetchCourses: fetchCourses,
    postUser: postUser
};