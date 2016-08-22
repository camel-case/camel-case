import { combineReducers } from 'redux';

import fetchArticlesReducer from './fetchArticlesReducer';
import fetchSectionsReducer from './fetchSectionsReducer';
import authenticationReducer from './authenticationReducer';
import authNameReducer from './authNameReducer';


const rootReducer = combineReducers({
  fetchArticlesReducer,
  fetchSectionsReducer,
  authenticationReducer,
  authNameReducer
})

export default rootReducer;
