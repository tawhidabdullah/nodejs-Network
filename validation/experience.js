const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateExperienceInput(data) { // export validateRegister function 
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : ''; 
  data.company = !isEmpty(data.company) ? data.company : ''; 
  data.location = !isEmpty(data.location) ? data.location : ''; 
  data.from = !isEmpty(data.from) ? data.from : ''; 
  data.to = !isEmpty(data.to) ? data.to : ''; 
  data.current = !isEmpty(data.current) ? data.current : ''; 
  data.description = !isEmpty(data.description) ? data.description : ''; 


 
  if (validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }
  
  if (validator.isEmpty(data.company)) {
    errors.company = 'company field is required';
  }
  
  if (validator.isEmpty(data.from)) {
    errors.from = 'from field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}