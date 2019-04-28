import React, {Component} from 'react';
import './signin.css';
import FormField from '../FormFields/formFields';
import {Route, Redirect} from 'react-router-dom';

import {connect } from 'react-redux';
import { loginDetail } from '../actions'
import { bindActionCreators} from 'redux';

import db from '../db.json';

class SignIn extends Component{


    state = {
        registerError: '',
        loading: false,
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your Password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email': null}`;
            error = !valid ? [valid, message] : error;
        }
        if(element.validation.password){
            const valid = element.value.length  >= 5;
            const message = `${!valid ? 'Must be greater than 5': null}`;
            error = !valid ? [valid, message] : error;
        }
        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required': null}`;
            error = !valid ? [valid, message] : error;
        }
        return error;
    }
    updateForm = (element) =>{

        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;

        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        // console.log(newFormdata);
        this.setState({
            formdata:newFormdata
        })
    }

    submitForm = (event,type) => {
        event.preventDefault();
        if (type !== null) {
            let dataToSubmit = {};
            let formIsValid = true;
            for (let key in this.state.formdata) {
                dataToSubmit[key] = this.state.formdata[key].value;
            }
            for (let key in this.state.formdata) {
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }
            if (formIsValid) {
                this.setState({
                    registerError: '',
                    loading: true
                })

                if(db.Login[0].username == dataToSubmit.email && db.Login[0].password == dataToSubmit.password){
                    this.props.loginDetail(true);
                    this.props.history.push('/');
                }
                else{
                    this.setState({
                        registerError: 'Username and Password does not match',
                        loading: false
                    })
                }
            }
        }
    }

    submitButton = () => (
        this.state.loading ?
            'loading...'
            :
            <>
            <button onClick={(event) => {this.submitForm(event, true)}}> Log In</button>
            </>
    )

    showError = () =>(
        this.state.registerError !== '' ?
            <div className={"error"}>{this.state.registerError}</div>
            : ''
    )
    ////////////////////////////////////

    render(){
        return(
            <div className={"logContainer"}>
                <form onSubmit={(event) => this.submitForm(event, null)}>
                    <h2> Log In</h2>
                    <FormField
                        id = {'email'}
                        formdata = {this.state.formdata.email}
                        change = {(element) => this.updateForm(element)}
                    />
                    <FormField
                        id = {'password'}
                        formdata = {this.state.formdata.password}
                        change = {(element) => this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}
                    </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        data: state.login
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        loginDetail
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);