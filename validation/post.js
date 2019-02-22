const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validatePostInput(data) { // export validateRegister function 
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : ''; // 
  data.password = !isEmpty(data.password) ? data.password : ''; // 



  if (validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  if (!validator.isLength(data.text, {
      min: 6,
      max: 300
    })) {
    errors.text = 'text must be atleast 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}; 