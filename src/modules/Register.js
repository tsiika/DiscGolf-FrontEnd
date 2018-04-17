import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';

//import '../App.css';

/*
*   Register - Module
*
*/
class Register extends Component {

    render() {
        return(
            <div>
                <h3>Create account</h3>
                <RegisterForm />
            </div>
        );
    }
}


export default Register;