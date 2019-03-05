import React, { Component } from "react";
import {connect} from 'react-redux'; 
import { Link } from 'react-router-dom';
import Spinner from '../commonFeilds/Spinner';
// IMPORT ACTION FOR GETTING PROFILE BY ACTION
import {getProfileByHandle} from '../../actions/profileAction'; 




// import PROFILE'S ELEMENTS
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCredientials from "./ProfileCredientials";
import ProfileGithub from "./ProfileGithub";


class Profile extends Component {
  
  componentDidMount(){
    if(this.props.match.params.handle){
      this.props.getProfileByHandle(this.props.match.params.handle); 
    }; 
  }; 
  render() {
    const {profile ,loading} = this.props.profile; 

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCredientials
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
    );
  }
}; 


const mapStateToProp = (state) => {
  return {
    profile : state.profile
  }
}

export default connect(mapStateToProp,{getProfileByHandle})(Profile);
