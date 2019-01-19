import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback, Alert
} from 'reactstrap';
import Header from '../components/header';
import '../App.css';
import * as actions from '../actions/actionCreators';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    submitted: false,
    validate: {
      emailState: '',
      passwordState: ''
    },
  }
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(event) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRegex.test(event.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  validatePasswords(event) {
    const {validate, password1} = this.state
    if (password1 !== event.target.value){
      validate.passwordState = 'has-danger'
    } else {
      validate.passwordState = 'has-success'
    }
    this.setState({validate})
  }

  handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    this.setState({
      [ name ]: target.value,
    });
  }

  submitForm(event) {
    event.preventDefault();
    console.log(this.state);
    const {emailState, passwordState} = this.state.validate;
    if(emailState && passwordState ){
      const {username, email, password1, password2} = this.state;
      this.props.register(username, email, password1, password2);
      this.setState({submitted: true});
    }
    else
      alert('One or more fields are invalid!');
  }

  render() {
    if(this.props.auth) return <Redirect to = ''/>

    const { email, password1, password2 } = this.state;
    return (
      <Container>
        <Header auth = {this.props.auth}/>
        {
          this.state.submitted &&

          <Alert color="success">
          Succesfully registered and logged in.
          </Alert> 

        }
        <Container className="App">
          <h2>Register</h2>
          <Form className="form" onSubmit={ (event) => this.submitForm(event) }>
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={ (event) => this.handleChange(event) }
              />
              </FormGroup>
            </Col>

            <Col>
                <FormGroup>
                  <Label>E-Mail</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="myemail@email.com"
                    value={ email }
                    valid={ this.state.validate.emailState === 'has-success' }
                    invalid={ this.state.validate.emailState === 'has-danger' }
                    onChange={ (event) => {
                                this.validateEmail(event)
                                this.handleChange(event)
                              } }
                  />
                  <FormFeedback valid>
                    That's a tasty looking email you've got there.
                  </FormFeedback>
                  <FormFeedback>
                    Uh oh! Looks like there is an issue with your email. Please input a correct email.
                  </FormFeedback>
              </FormGroup>
            </Col>

            <Col>
            <FormGroup>
              <Label for="Password1">Password</Label>
              <Input
                type="password"
                name="password1"
                id="Password1"
                placeholder="********"
                value={ password1 }
                onChange={ (event) => this.handleChange(event) }
            />
            </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="password2"
                  id="Password2"
                  placeholder="********"
                  value={ password2 }
                  valid={ this.state.validate.passwordState === 'has-success' }
                  invalid={ this.state.validate.passwordState === 'has-danger' }
                  onChange={ (event) => {
                    this.validatePasswords(event)
                    this.handleChange(event)
                  } }
              />
                <FormFeedback valid>
                  Looks good!
                </FormFeedback>
                <FormFeedback>
                  Uh oh! Looks like your passwords aren't matching.
                </FormFeedback>
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (username, email, password1, password2) => dispatch(actions.signup(username, email, password1, password2))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);