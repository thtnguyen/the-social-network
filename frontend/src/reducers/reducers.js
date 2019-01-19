import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  loading: false,
  error: null,
  modalOpen: false
}

const startReducer = (state, action) => {
  return {
    ...state,
    loading: true,
  }
}

const successReducer = (state, action) => {
  return {
    ...state,
    token: action.token,
    loading: false
  }
}

const failReducer = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const logoutReducer = (state, action) => {
  return {
    ...state,
    token: null
  }
}

const toggleReducer = (state, action) => {
  return{
    ...state,
    modalOpen: !state.modalOpen
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START: return startReducer(state, action); 
    case actionTypes.AUTH_SUCCESS: return successReducer(state, action); 
    case actionTypes.AUTH_FAIL: return failReducer(state, action); 
    case actionTypes.LOGOUT: return logoutReducer(state, action); 
    case actionTypes.CREATE_POST: return toggleReducer(state, action); 
    default: return state;
  }
}

export default reducer;