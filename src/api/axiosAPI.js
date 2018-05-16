//const API = 'http://www.flatbread-api.herokuapp.com/api/v0/courses/';       /*Production*/
//const API = 'http://localhost:5000/api/v0/courses/';                        /*Development*/
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v0';

export default API;
