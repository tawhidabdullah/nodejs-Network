const mongoose = require('mongoose'); 

// first bringing the mongoose 
// take out the Schema from mongoose 
// after that create a schema with that 

const {Schema} = mongoose; 


const postSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref : 'users'
  },
  text : {
    type : String,
    required : true
  },
  name : {
    type: String
  },
  avatar : {
    type: String
  },
  date : {
    type: Date,
    default : Date.now
  },
  likes : [
    {
      user : {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments : [
    {
      user : {
        type: Schema.Types.ObjectId,
        ref : 'users'
      },
      text : {
        type : String,
        required : true
      },
      name : {
        type: String
      },
      avatar : {
        type: String
      },
      date : {
        type: Date,
        default : Date.now
      },
    }
  ]
}); 



// after that crete a post model by postSchema 
// then create class collection with that model 
const Post = mongoose.model('posts' , postSchema); 

module.exports  = Post; 