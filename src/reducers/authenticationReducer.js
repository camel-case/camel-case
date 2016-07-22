import { AUTHENTICATED } from '../actions/actions.js';
import { LOGOUT } from '../actions/actions.js';

export default function authenticationReducer(state = {authentication: false}, action) {
  console.log("authenticationReducer action.type", action.type)
  switch(action.type){
    case AUTHENTICATED:
      console.log("Anything going on in here? switch Reducer")
      return {authentication: action.payload};
    case LOGOUT:
      return {authentication: action.payload}
    default:
      return state;
  }
}

