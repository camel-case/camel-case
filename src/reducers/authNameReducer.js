import { AUTHNAME } from '../actions/actions';

export default function authNameReducer(state = [], action) {
  switch(action.type){
    case AUTHNAME:
      return action.payload;
      }
      return state;
}
