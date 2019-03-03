import {combineReducers} from 'redux';


// IMPORT REDUCERS
import authReducer from './authReducer'; 
import errorReducer from "./errorReducer";
import profileReducer from './profileReducer'; 



export default combineReducers({ // Combine reducers and export 
  auth: authReducer,
  errors : errorReducer,
  profile : profileReducer
}); 