import axios from 'axios'; 
import {GET_PROFILE, GET_ERRORS , PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from './types'; 



export const getCurrentProfile = () => dispatch => { // Get current profile
  dispatch(setProfileLoading( )); 
  axios.get('/api/profiles').then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    }); 
  })
  .catch(error => dispatch({
    type: GET_PROFILE,
    payload: {}
  }))
 }


 // Set Profile loading function 
 export const setProfileLoading = () => {
   return {
     type: PROFILE_LOADING
   }; 
 }; 

  // clear clearCurrentProfile function 
  export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    }
  }; 