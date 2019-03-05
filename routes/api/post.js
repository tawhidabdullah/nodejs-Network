const express = require("express");
const router = express.Router();
const passport = require('passport');


// load PROFILE MODEL 
const Profile = require('../../models/Profile');

// load POST MODEL
const Post = require('../../models/Post');

// VALIDATION
const validatePostInput = require('../../validation/post');




// @route GET /api/posts/test
// @decription Test Post routes
// @access Public 

router.get("/test", (req, res) => {
  res.json({
    msg: 'posts are here babe !'
  })
})

// @route POST /api/posts/
// @decription  create post  / add post 
// @access Private


router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  // bringing the validations : error , isValid
  const {
    errors,
    isValid
  } = validatePostInput(req.body);

  // if input is not valid then send and error response
  if (!isValid) {
    res.status(400).json(errors);
  }
  // create a new post by Post classs / post model
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(newPost => res.json(newPost));

}); 




// @route GET /api/posts/
// @decription  Get all the post
// @access Private

router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({
      noPostFound: 'no post found'
    }));
});


// @route GET /api/posts/:post_id
// @decription  Get a specific post by id 
// @access Private

router.get('/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Post.findOne({
      _id: req.params.post_id
    })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({
      noPostFound: 'no post found with the given id '
    }));
});




// @route DELETE /api/posts/:post_id
// @decription  DELETE a specific post by id
// @access Private

router.delete('/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.post_id).then(post => {
        // check for POST owneer 
        if (post.user.toString() !== req.user.id) {
          res.status(401).json({
            notAuthorize: 'User not authorize'
          });
        };


        // delete
        post.remove().then(() => res.json({
          successfullRemove: 'post hasbeen successfully remove'
        }));
      })
      .catch(error => res.json(error));
  })
})



// @route POST /api/posts/like/:post_id
// @decription like post 
// @access Private

router.post('/like/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    console.log(profile)
    Post.findById(req.params.post_id).then(post => {
        console.log(post);
        // check if the user already has liked the post
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({
            alreadyLiked: "User already liked this post"
          });
        }

        // add user id to likes array
        post.likes.unshift({
          user: req.user.id
        });
        post.save().then(post => res.json({
          post
        }));

      })
      .catch(error => res.json(error));
  })
})



// @route POST /api/posts/unlike/:post_id
// @decription Unlike post 
// @access Private

router.post('/unlike/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.post_id).then(post => {

        // check if the user inalready liked or not 
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({
            notLiked: "you have not yet liked this post"
          });
        }

        // get the remove index ;
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
        // splice the like for remove index
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json({
          post
        }));

      })
      .catch(error => res.json(error));
  })
})



// @route POST /api/posts/comment/:post_id
// @decription Add commment
// @access Private

router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}),
 (req, res) => {

   // bringing the validations : error , isValid

   const { errors,isValid} = validatePostInput(req.body);

  // if input is not valid then send and error response
  if (!isValid) {
    res.status(400).json(errors);
  }

  Post.findById(req.params.post_id).then(post => {
    if (!post) {
      res.status(404).json({
        postnotfound: 'post not found'
      });
    };
    // create a new comment 
    const newComment = {};
    newComment.text = req.body.text;
    newComment.name = req.body.name;
    newComment.avatar = req.body.avatar;
    newComment.user = req.user.id;

    // add newComment to the start of comments array
    post.comments.unshift(newComment); 

    // then save the post with new comment 
    post.save().then(post => res.json(post)); 
  }).catch(error => res.status(404).json(error)); 
})



// @route DELETE /api/posts/rmcomment/:post_id
// @decription remove commment
// @access Private

router.delete('/comment/:post_id/:rmcomment_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Post.findById(req.params.post_id).then(post => {
   if(post.comments.filter(comment =>comment._id
    .toString() === req.params.rmcomment_id).length ===0){

    res.status(404).json({commentnofound : 'comment does not exist'}); 
   }

    // find out the removeIndex on the comment array
    const removeIndex = post.comments.map(comment => comment._id.toString())
    .indexOf(req.params.rmcomment_id);

   // then delete that comment from database 
    post.comments.splice(removeIndex , 1); 
    // then save the post with new comment 
    post.save().then(post => res.json(post)); 
  }).catch(error => res.status(404).json(error)); 
})











module.exports = router;