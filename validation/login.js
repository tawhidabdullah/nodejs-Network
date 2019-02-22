const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateLoginInput(data) { // export validateRegister function 
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : ''; // 
  data.password = !isEmpty(data.password) ? data.password : ''; // 


 // EMAILS/////////////////
 
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }


  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }


  // PASSWORD/////////////////
  if (validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if (!validator.isLength(data.password, {
      min: 6,
      max: 13
    })) {
    errors.password = 'password must be atleast 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}