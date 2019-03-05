import {combineReducers} from 'redux';


// IMPORT REDUCERS
import authReducer from './authReducer'; 
import errorReducer from "./errorReducer";
import profileReducer from './profileReducer'; 
import postReducer from './postReducer'; 


export default combineReducers({ // Combine reducers and export 
  auth : authReducer,
  errors : errorReducer,
  profile : profileReducer,
  post : postReducer
}); 