import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginForm from './containers/login';
import SignupForm from './containers/signup';
import PostDetail from './containers/postdetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducers';

const tokenState = {
  token: localStorage.getItem('token')
}
const store = createStore(reducer, tokenState, compose(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <div>
          <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={SignupForm} />
              <Route exact path="/posts/:postID" component={PostDetail} />
          </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
