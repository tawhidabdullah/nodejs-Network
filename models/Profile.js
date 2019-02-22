// PROFILE MODEL

// To create a  model 
// we will  have bring in mongoose ;
// then from that we will take a Schema classs
// with that schema we will create a scheama , for specific profileSchema 


const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // make relation with user
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: { 
    type: String
  },
  experience: [ // experience 
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: String,
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [ // experience 
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model('profile', profileSchema); // creat model


module.exports = Profile;