import * as actions from './actionTypes';
import axios from 'axios';

//authentication actions
export const authSuccess = (token) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token
  }
}

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
}

export const authStart = () => {
  return {
    type: actions.AUTH_START
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
}

export const login = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
      email: email,
      password: password
    }).then(res => {
      localStorage.setItem('id', res.data.user.id);
      localStorage.setItem('token', res.data.key);
      dispatch(authSuccess(res.data.key));
    }).catch(error => {
      dispatch(authFail(error));
    })
  }
}

export const signup = (username, email, password1, password2 ) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    }).then(res => {
      localStorage.setItem('id', res.data.user.id);
      localStorage.setItem('token', res.data.key);
      dispatch(authSuccess(res.data.key));
    }).catch(error => {
      dispatch(authFail(error));
    })
  }
}

//create post toggler
export const createPost = () =>{
  return{
    type: actions.CREATE_POST
  }
}