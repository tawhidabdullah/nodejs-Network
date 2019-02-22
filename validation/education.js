const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateEducationInput(data) { // export validateRegister function 
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : ''; 
  data.degree = !isEmpty(data.degree) ? data.degree : ''; 
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : ''; 
  data.from = !isEmpty(data.from) ? data.from : ''; 
  data.to = !isEmpty(data.to) ? data.to : ''; 
  data.current = !isEmpty(data.current) ? data.current : ''; 
  data.description = !isEmpty(data.description) ? data.description : ''; 


 
  if (validator.isEmpty(data.school)) {
    errors.school = 'school field is required';
  }
  
  if (validator.isEmpty(data.degree)) {
    errors.degree = 'degree field is required';
  }
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'fieldOfStudy field is required';
  }
  
  if (validator.isEmpty(data.from)) {
    errors.from = 'from field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}