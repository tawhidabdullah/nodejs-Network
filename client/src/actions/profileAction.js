import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_ERRORS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from './types';



export const getCurrentProfile = () => dispatch => { // Get current profile
  dispatch(setProfileLoading());
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


// GET PROFILE BY HANDLE 
export const getProfileByHandle = (handle) => dispatch => { // Get current profile
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`).then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => dispatch({
      type: GET_PROFILE,
      payload: null
    }))
};



export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};



export const addExperience = (experienceData, history) => dispatch => {
  axios.post('/api/profile/experience' , experienceData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const addEducation = (educationData, history) => dispatch => {
  axios.post('/api/profile/education' , educationData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}; 

export const deleteExperience = (experienceId) => dispatch => {
  axios.delete(`/api/profile/experience/${experienceId}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  })); 
}; 



export const deleteEducation = (educationId) => dispatch => {
  axios.delete(`/api/profile/education/${educationId}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}; 

export const deleteProfile = (history) => dispatch => {
  axios.delete('/api/profile')
    .then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}; 

export const getProfiles = () => dispatch => {
  axios.get('api/profile/all')
  .then(res => {
    dispatch(setProfileLoading()); 
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  })
  .catch(err => dispatch({ // if anything get's wrong 
    type: GET_PROFILES,
    payload: null
  }))
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