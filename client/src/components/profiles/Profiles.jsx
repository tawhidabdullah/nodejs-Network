import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import Spinner from '../commonFeilds/Spinner'; 


// import PROFILEiTEMS 
import ProfileItems from './ProfileItems'; 

// IMPORT ACTIONS HERE 
import {getProfiles} from '../../actions/profileAction'; 


class Profiles extends Component {

  componentDidMount(){
    this.props.getProfiles(); 
  }


  render() { 
    const {profiles, loading} = this.props.profile; 

    let profilesContent; 
    if(profiles === null || loading){
      profilesContent = <Spinner />; 
    }else{
      if(profiles.length > 0){
        profilesContent = profiles.map(profile => {
          return <ProfileItems key={profile._id} profile={profile} />
        })
      }
      else {
        profilesContent = <h1>Profile has been created yet.. (yet)</h1>
      }
    }


    return ( 
      <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className='display-4 text-center'>Students Profiles</h1>
                <p className='lead text-center'>Take benifits from your mates!</p>
                {profilesContent}
              </div>
            </div>
          </div>
      </div>
     );
  }
}


const mapStateToProps = (state) => {
  return {
    profile : state.profile
  }
}

 
export default connect(mapStateToProps, {getProfiles})(Profiles);