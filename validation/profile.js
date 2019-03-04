const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateProfileInput(data) { // export validateRegister function 
  let errors = {};

  // convert undefined to ==>> string for handle, status , skills
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  // convert undefined to ==>> string for website
  data.website = !isEmpty(data.website) ? data.website : '';


  //convert undefined to==>>string for website facebook, instagram , twitter, youtube,linkedin
  data.facebook = !isEmpty(data.facebook) ? data.facebook : '';
  data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
  data.instagram = !isEmpty(data.instagram) ? data.instagram : '';
  data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';



  if (!validator.isLength(data.handle, {
      min: 3,
      max: 30
    })) {
    errors.handle = 'Handle must be between 3 and 30 characters';
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile  handle is required';
  }
  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  // FIRST check if that the url field is not empty
  // then check if wheather the url is valid or not 

  // if (!validator.isEmpty(data.website)) {
  //   if (validator.isURL(data.website)) {
  //     errors.website = 'Not a valid url'
  //   }
  // }

  if (!validator.isEmpty(data.youtube)) {
    if (validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid url'
    }
  }


  if (!validator.isEmpty(data.twitter)) {  
    if (validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid url'
    }
  }


  if (!validator.isEmpty(data.facebook)) {
    if (validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid url'
    }
  }


  if (!validator.isEmpty(data.linkedin)) {
    if (validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid url'
    }
  }


  if (!validator.isEmpty(data.instagram)) {
    if (validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid url'
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}