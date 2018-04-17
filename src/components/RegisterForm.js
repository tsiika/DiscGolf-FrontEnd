import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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

        this.state = { 
            username: '', 
            email: '', 
            password: '', 
            passwordConfirm: '' 
        };
    }

    // Using onBlur and defaultValue on the input element would not be so slow...
    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('--- onSubmit ---');
    
        // At this point everything should be ok by native validation, but we have to check password confirmation manually
        if(this.state.password !== this.state.passwordConfirm) {
            console.log('Password NOT ok');
            // Just set input value to empty to indicate error
            // TODO: Clearly not the ideal solution (but works ok with the native validation for now...)
            event.target.elements.passwordConfirm.value = '';
        } else {
            console.log('Pass OK -> Submit');
        }
        
    }

    render() {
        
        return (
        <div>
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
                        value={this.state.username}
                        onChange={this.onInputChange}
                    />
                </div>
                <div>
                    <TextField
                        name="email"
                        type="email"
                        hintText="Valid email address"
                        floatingLabelText="Email"
                        errorText=""
                        floatingLabelFixed
                        required
                        value={this.state.email}
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
                        value={this.state.password}
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
                        value={this.state.passwordConfirm}
                        onChange={this.onInputChange}
                    />
                </div>
                <RaisedButton type="submit" label="Create" primary style={{marginTop: '20px'}} />
            </form>
        </div>

        );
    }
}

  export default RegisterForm;