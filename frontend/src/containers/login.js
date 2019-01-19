import React, { Component } from 'react';
import {
  Container, Col, Form, Alert,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback, 
} from 'reactstrap';
import '../App.css';
import Header from '../components/header';
import PostModal from '../components/postmodal';
import * as actions from '../actions/actionCreators';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
      email: '',
      password: '',
      submitted: false,
      validate: {
        emailState: '',
      },
    }
    this.handleChrange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;
    this.setState({
      [ name ]: value,
    });
  }

  submitForm(event) {
    event.preventDefault();

    const {email, password} = this.state;
    this.props.login(email, password);
    this.setState({submitted: true});
  }

  render() {
    if(this.props.auth) return <Redirect to=''/>

    const { email, password } = this.state;
    return (
      <Container>
        <Header auth = {this.props.auth}/>
        {
          this.state.submitted && !this.props.isError ?

          <Alert color="success">
          Succesfully logged in.
          </Alert>

          :

          this.props.isError &&
          <Alert color="danger">
          Unable to log in. Please check your credentials.
          </Alert>

        }
          <Container className="App">
          <h2>Sign In</h2>
          <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="username"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                  value={ email }
                  valid={ this.state.validate.emailState === 'has-success' }
                  invalid={ this.state.validate.emailState === 'has-danger' }
                  onChange={ (e) => {
                              this.validateEmail(e)
                              this.handleChange(e)
                            } }
                />
                <FormFeedback valid>
                  That's a tasty looking email you've got there.
                </FormFeedback>
                <FormFeedback>
                  Uh oh! Looks like there is an issue with your email. Please input a correct email.
                </FormFeedback>
                <FormText>Your username is most likely your email.</FormText>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                  value={ password }
                  onChange={ (e) => this.handleChange(e) }
              />
              </FormGroup>
            </Col>
            <Button>Submit</Button>
        </Form>
        </Container>
        <PostModal/>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token !== null,
    isError: state.error !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(actions.login(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);