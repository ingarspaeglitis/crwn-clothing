import React from 'react';

import './sign-up.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !==  confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password );

            await createUserProfileDocument(user, { displayName } );

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            
        } catch (error) {
            console.error(error);
        }       
    }

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState( { [ name ]: value});
    }

    render() {

        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>


                <form className="sign-up-form" onSubmit={ this.handleSubmit }>

                    <FormInput 
                        name="displayName" 
                        type="text" 
                        value={ displayName } 
                        label="Display Name" 
                        handleChange={ this.handleChange } 
                        required />

                    <FormInput 
                        name="email" 
                        type="email" 
                        value={ email } 
                        label="Email" 
                        handleChange={ this.handleChange } 
                        required />

                    <FormInput 
                        name="password" 
                        type="password" 
                        value={ password }
                        label="Password"  
                        handleChange={ this.handleChange } 
                        required />      

                    <FormInput 
                        name="confirmPassword" 
                        type="confirmPassword" 
                        value={ confirmPassword }
                        label="Confirm Password"  
                        handleChange={ this.handleChange } 
                        required />                    

                    
                    <CustomButton type="submit">SIGN UP</CustomButton>                     
                                      
                </form>
            </div>
        )
    }
}

export default SignUp;
