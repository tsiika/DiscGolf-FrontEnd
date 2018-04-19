import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Api from '../api/Api';

/*
*   RegisterForm - Component
*
*   Form component for user registration
*
*   TODO: Validation is not complete:
*   - Email is currently validated by default native constraint, so no domain check is done for the address.
*   - RegExp-constraint check for alphanumeric characters should be done.
*/
class RegisterForm extends Component {

    constructor(props) {

        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.onUserRegistered = this.onUserRegistered.bind(this);
        this.onUserRegisterFailure = this.onUserRegisterFailure.bind(this);

        this.state = {
            user: {
                username: '', 
                email: '', 
                password: '', 
                passwordConfirm: ''
            },
            saving: false,
            errorMessage: ''
        };
    }

    // Using onBlur and defaultValue on the input element would not be so slow...
    onInputChange(event) {
        let user = Object.assign({}, this.state.user);
        user[event.target.name] = event.target.value;
        this.setState({user});
    }

    onSubmit(event) {

        event.preventDefault();

        // At this point everything should be ok by native validation, but we have to check password confirmation manually
        if(this.state.user.password !== this.state.user.passwordConfirm) {
            // Just set input value to empty to indicate error
            // TODO: Clearly not the ideal solution (but works ok with the native validation for now...)
            event.target.elements.passwordConfirm.value = '';
        } else {
            this.setState({saving: true});
            this.registerUser(this.state.user);
        }
    }

    registerUser(user) {
        Api.postUser(user, this.onUserRegistered, this.onUserRegisterFailure);
    }

    onUserRegistered(result) {
        console.log('---onUserRegistered');
        console.log(result);
        this.setState({saving: false});
        this.props.onUserRegistered();
    }

    onUserRegisterFailure(reason) {
        console.log('---onUserRegisterFailure');
        //console.error(reason);
        
        this.setState({
            saving: false,
            errorMessage: 'Registration failed. Please try again'
        });
    }
    
    render() {
        
        let errorMessage = (this.state.errorMessage !== '') ? <span>{this.state.errorMessage}</span> : '';

        return (
            <div>
                {errorMessage}
                <form className="register-form" onSubmit={this.onSubmit}>
                    <div>
                        <TextField
                            name="username"
                            type="text"
                            hintText="At least three characters"
                            floatingLabelText="User Name"
                            floatingLabelFixed
                            minLength="3"
                            maxLength="99"
                            required
                            value={this.state.user.username}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            name="email"
                            type="email"
                            hintText="Email address"
                            floatingLabelText="Email"
                            errorText=""
                            floatingLabelFixed
                            required
                            value={this.state.user.email}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            hintText="At least four characters"
                            floatingLabelText="Password"
                            floatingLabelFixed
                            minLength="4"
                            maxLength="99"
                            required
                            value={this.state.user.password}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            hintText="At least four characters"
                            floatingLabelText="Confirm Password"
                            floatingLabelFixed
                            minLength="4"
                            maxLength="99"
                            required
                            value={this.state.user.passwordConfirm}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <RaisedButton name="submitButton" type="submit" disabled={this.state.saving} label="Create" primary style={{marginTop: '20px'}} />
                </form>
            </div>
        );
    }
}

  export default RegisterForm;