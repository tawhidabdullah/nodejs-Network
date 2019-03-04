import axios from 'axios'; 
import {GET_PROFILE, GET_ERRORS , PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from './types'; 



export const getCurrentProfile = () => dispatch => { // Get current profile
  dispatch(setProfileLoading( )); 
  axios.get('/api/profile').then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    }); 
  })
  .catch(error => dispatch({
    type: GET_PROFILE,
    payload: {}
  }))
 }; 

 export const createProfile = (profileData, history) => dispatch => {
   axios.post('/api/profile' , profileData)
   .then(res => history.push('/dashboard'))
   .catch(err => dispatch({
     type: GET_ERRORS,
     payload: err.response.data
   })); 
 }; 


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