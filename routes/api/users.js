const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// relative file import 
const keys = require('../../config/keys');


// load input register  validation
const validateRegisterInput = require('../../validation/registration');

// load input login validation
const validateLoginInput = require('../../validation/login');

// initializing router middleware
const router = express.Router();


// load the user model 
const User = require('../../models/User');


// @route GET /api/users/test
// @decription Test users routes
// @access Public 

router.get("/test", (req, res) => {
  res.json({
    msg: 'user are here babe !'
  })
})


// @route GET /api/users/register
// @decription Register user
// @access Public  

router.post("/register", (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body)

  // check validation of client and sever // REGISTER FORM 
  if (!isValid) {
    res.status(400).json(errors);
  }

  // check if the user has already an account or not 
  // if has return error
  // other wise create a new user in the database
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        errors.email = 'Email already exist';
        return res.status(400).json(errors);
      } else {
        const {
          name,
          email,
          password
        } = req.body;
        const avatar = gravatar.url(req.body.email, { // decleare the avatar or setting the avatar
          s: '200', // size
          r: 'pg', // rating
          d: 'mm' // default 
        });

        const newUser = new User({ // create new user in the data base document
          name,
          email,
          avatar,
          password,
        });


        // in bcrypt first we will pass our normal password as first argument
        // then in the seconde argument we will specifiedn how many times the bcrypt we will 
        // be hash 
        // then => after that it will return a call back fucntion 
        // on that call back function thkbe either error or our hash password

        bcrypt.hash(newUser.password, 12, (err, hash) => {
          // if error then =>>
          if (err) {
            return res.status(500).json({
              message: 'Server Error occurd'
            })
          }

          // other wise => 
          newUser.password = hash; // setting hash to our password

          // save the user to database and send the response 
          newUser.save().then(user => res.json(user)).catch(err => res.json(err));

        })
      }
    })
})



// @route GET /api/users/login
// @decription login user / Returns jwt Token 
// @access Public  

router.post('/login', (req, res) => {

  // VALIDATE EMAIL AND PASSWORD


  // returns erros objects and isvalid boolea /////////////////
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
    return; 
  }

  const {
    email,
    password
  } = req.body; // get the password and email

  
  // find the user by EMAIL 
  User.findOne({
    email
  }).then((user) => {
    // check for user wheather user is in the database or not 
    if (!user) {
      errors.email = 'User not found'
      // send not found user as a response
      return res.status(404).json(errors);
    }

    // if user exist in the database then CHECK FOR PASSWORD
    // CHECK FOR PASSWORD
    bcrypt.compare(password, user.password) // compare will return us a true of false value
      .then(isMatch => {
        // if password matches ==>> send "success"
        if (isMatch) {

          //User MATCH
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar // CREATE JWT PAYLOAD 
          }

          // ASIGN THE TOKEN 
          jwt.sign(payload,
            keys.secretOrKey, {
              expiresIn: 100009
            },
            (err, token) => {

              res.json({
                loginSuccess: true,
                token: "Bearer " + token
              })

            });
        } else {
          errors.password = 'Password incorrect'
          res.status(400).json(errors);
        }
      }).catch(() => {})
  })
});



// @route GET /api/users/currentUser
// @decription return current user
// @access Private  

router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;




// token authentication login ======//////////////////////////////////////==>>> 

// first when a user get's loged in , we asign a token to then by ===>>> jwt ;
// so 
// because when a user try to access in a private routes, they have show us that token ,
// and we will validate , if they has any token or not 
// and we will do that authenticate by ===>> passport , passport-jwt strategy 



// on the example , we can see that when a user send a request to current / route , 
// which is a private routes, because it is a private route so ,,
// we told passport to authenticate that request by == jwt strategy