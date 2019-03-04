const express = require("express"); 
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport'); 


// load VALIDATION FOR PROFILE 
const validateProfileInput = require('../../validation/profile'); 
const validateExperienceInput = require('../../validation/experience'); 
const validateEducationInput = require('../../validation/education'); 


// load PROFILE model 
const Profile = require('../../models/Profile'); 


// load USER model 
const User = require('../../models/User'); 


// @route GET /api/profile/test
// @decription Test profile routes
// @access Public 

router.get("/test", (req, res)=> {
  res.json({
    msg: 'profile are here babe !'
  })
}); 



// @route GET /api/profile
// @decription  profile routes
// @access Private 

router.get('/', passport.authenticate('jwt' , {session : false}), (req, res) => {
  const errors = {}; 
  Profile.findOne({user : req.user.id})
  .populate('user', ['name', 'avatar'])
  .then((current_user)=>{
    if(!current_user){
      errors.noProfile = 'There is no profile for the user'
      res.status(404).json(errors); 
    }
    res.json(current_user); // send current_user to the client
  }).catch(error => {
    res.status(404).json(err); 
  })
} ); 



// @route GET /api/profile/all
// @decription  Get all the profile by ____
// @access public


router.get('/all' , (req ,res ) => {
  const errors = {}; 
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles){
      errors.noProfile = 'we have no profile created yet'
      res.status(404).json(errors); 
    }
    res.json(profiles)
  }).catch(error => res.status(400).json(error)); 
})


// @route GET /api/profile/handle/:handle
// @decription  Get profile by handle
// @access public

router.get('/handle/:handle', (req,res)=> {
  const errors = {}; 

  Profile.findOne({handle : req.params.handle})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile){
      errors.noProfile = 'There is no profile for this user'; 
      res.status(404).json(errors);
    }
    res.json(profile); 
  })
  .catch(error => res.status(404).json(error)); 
})


// @route GET /api/profile/user/:user_id
// @decription  Get profile by id
// @access public

router.get('/user/:user_id', (req,res)=> {
  const errors = {}; 

  Profile.findOne({user : req.params.user_id})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile){
      errors.noProfile = 'There is no profile for this user'; 
      res.status(404).json(errors);
    }
    res.json(profile); 
  })
  .catch(error => res.status(404).json({profile : 'There is not profile for this user'})); 
})



// @route POST /api/profile
// @decription  create or update user
// @access Private 

router.post('/', passport.authenticate('jwt' , {session : false}), (req, res) => {
  // bringin the validation items
  const {errors , isValid} = validateProfileInput(req.body); 
  // check the validation
  if(!isValid){
    // REturn any errors with 400 stauts 
    res.status(400).json(errors); 
    return; 
  }
  // Get fields 
  const profileFields = {};

  profileFields.user = req.user.id; 
  if(req.body.handle) profileFields.handle = req.body.handle; 
  if(req.body.company) profileFields.company = req.body.company; 
  if(req.body.website) profileFields.website = req.body.website; 
  if(req.body.location) profileFields.location = req.body.location; 
  if(req.body.status) profileFields.status = req.body.status; 
  if(req.body.bio) profileFields.bio = req.body.bio; 
  if(req.body.githubusername) profileFields.githubusername = req.body.githubusername; 

 
  // Skills => split into array
  if(req.body.skills){
    profileFields.skills = req.body.skills.split(','); 
  }
  // social 

  console.log(profileFields.skills); 
  profileFields.social = {}; 

  // if item is in the body then fill the social object with that !
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube; 
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook; 
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram; 
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter; 
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin; 

  // search the user by loged in user id 
  Profile.findOne({user : req.user}).then(profile => {
     // if we have a profile we are gonna update it 
     if(profile){
      Profile.findOneAndUpdate({user : req.user.id}, {$set:profileFields}, {new : true})  
      .then((profile) => {
        res.json(profile)
      })
     }
     // if dont we are gonna create a profile 
     else {
        // on doing that we will check if that handle already exist or not
      Profile.findOne({handle : req.body.handle}).then(profile => {
        if(profile){
          errors = {}; 
          errors.handle = 'That handle already exist';
          res.status(400).json(errors); 
        }

        // if the handle is not exist then create a new profile with the given data
        new Profile(profileFields).save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).send('some thing went wrong'))
         
      }); 
    
     }
  })

} ); 


// @route POST /api/profile/experience
// @decription  add experience
// @access Private 

router.post('/experience' ,passport.authenticate('jwt', {session : false}),(req,res)=> {

 // bringin the validation items
 const {errors , isValid} = validateExperienceInput(req.body); 
 // check the validation
 if(!isValid){
   // REturn any errors with 400 stauts 
   res.status(400).json(errors); 
 }

// first get the current's data by passport's user id from the profile model in database
  Profile.findOne({user : req.user.id})
  .then(profile => {
    if(!profile){
      errors.noProfile = 'Profile is not found'
      res.status(404).json(errors); 
    }
    // create an empty experience objects
    const exp = {}; 
      
  // fill that up with req.body's data
    exp.title = req.body.title;
    exp.company = req.body.company;
    exp.location = req.body.location;
    exp.from = req.body.from;
    exp.to = req.body.to;
    exp.current = req.body.current;
    exp.description = req.body.description; 

     //then unsift that experince to the database ,in the profile's experience object
     profile.experience.unshift(exp); 

    // then finally save the experice to the database 
    profile.save().then(profile => {
      console.log(profile); 
      res.json(profile)
    }); 
  })
}  )




// @route POST /api/profile/education
// @decription  add education
// @access Private 

router.post('/education' ,passport.authenticate('jwt', {session : false}),(req,res)=> {

  // bringin the validation items
  const {errors , isValid} = validateEducationInput(req.body); 
  // check the validation
  if(!isValid){
    // REturn any errors with 400 stauts 
    res.status(400).json(errors); 
  }
 
 // first get the current's data by passport's user id from the profile model in database
   Profile.findOne({user : req.user.id})
   .then(profile => {
     if(!profile){
       errors.noProfile = 'Profile is not found'
       res.status(404).json(errors); 
     }
     // create an empty experience objects
     const edu = {}; 
       
   // fill that up with req.body's data
     edu.school = req.body.school;
     edu.degree = req.body.degree;
     edu.fieldOfStudy = req.body.fieldOfStudy;
     edu.from = req.body.from;
     edu.to = req.body.to;
     edu.current = req.body.current;
     edu.description = req.body.description; 
 
      //then unsift that experince to the database ,in the profile's education object
      profile.education.unshift(edu); 
 
     // then finally save the education to the database 
     profile.save().then(profile => res.json(profile)); 
   })
 }  )


 
// @route DELETE /api/profile/experience/:user_id
// @decription  delete experience
// @access Private 

router.delete('/experience/:exp_id' ,
passport.authenticate('jwt', {session : false}),
(req,res)=> {
 // first get the current's data by passport's user id from the profile model in database
   Profile.findOne({user : req.user.id})
   .then(profile => {
    // find out the index of the current user's experients objects that user wants to delete;
    const superIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id); 

    // with superIndex splice tht experience item from the profile 
    profile.experience.splice(superIndex, 1); 
    // after that just save profile with the deleted oboshai 
    profile.save().then(profile => res.json(profile)); 
   })
   .catch(err => res.status(404).json(err)); 

 }  ); 


 // @route DELETE /api/profile/education/:user_id
// @decription  delete education
// @access Private 

router.delete('/education/:exp_id' ,
passport.authenticate('jwt', {session : false}),
(req,res)=> {
 // first get the current's data by passport's user id from the profile model in database
   Profile.findOne({user : req.user.id})
   .then(profile => {
    // find out the index of the current user's experients objects that user wants to delete;
    const superIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id); 

    // with superIndex splice tht experience item from the profile 
    profile.education.splice(superIndex, 1); 
    // after that just save profile with the deleted oboshai 
    profile.save().then(profile => res.json(profile)); 
   })
   .catch(err => res.status(404).json(err)); 

 }  ); 



 
 // @route DELETE /api/profile
// @decription  delete  user and profile 
// @access Private 

router.delete('/' ,
passport.authenticate('jwt', {session : false}),
(req,res)=> {
 Profile.findOneAndRemove({user : req.user.id})
 .then(()=> {
  User.findOneAndRemove({_id : req.user.id})
  .then((() => res.json({profileAndUserIsDelete : true}))); 
 })

 }  ); 


module.exports = router; 