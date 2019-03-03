
import isEmpty from '../validation/isEmpty'; 
import {SET_CURRENT_USER} from '../actions/types'

const initialState = {
  isAuthenticate : false,
  user : {}
}


// reducer will take 2 argument => actions , initial state

const authReducer = (state = initialState,action) => {
  switch(action.type){ 
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticate : !isEmpty(action.payload),
        user: action.payload
      }
    default : 
      return state; 
  }
}


export default authReducer;