import React, { Component } from "react";
import { connect } from "react-redux";
import { Link , withRouter } from "react-router-dom";
import Spinner from "../commonFeilds/Spinner";
import ProfileActions from "./ProfileActions";



// import ACTIONS
import { getCurrentProfile , deleteProfile } from "../../actions/profileAction";



// IMPORT ShowExperience and ShowEducation
import ShowExperience from './ShowExperience'; 
import ShowEducation from './ShowEducation'; 





class Dashbord extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(); // fired the getCurrentUser action
  }

  onClickDeleteAccount = () => {
    this.props.deleteProfile(this.props.history)
  }

  render() {
    let dashboardContents;

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    if (profile === null || loading) {
      dashboardContents = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        //TODO: DISPLAY THE PROFILE
        dashboardContents = (
          <div>
            <p className="lead text-muted">
              {" "}
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}> {user.name} </Link>
            </p>
            <ProfileActions />
            {/* TODO: experience and education */}
            <ShowExperience  experience={profile.experience} />
            <ShowEducation education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              className="btn btn-outline-danger"
              onClick={this.onClickDeleteAccount}
            >
            Delete Account
            </button>
          </div>
        );
      } else {
        dashboardContents = (
          <div>
            <p className="lead text-muted">Wecome {user.name}</p>
            <p>Seems like you have'nt setup you profile, Go and SETUP!</p>
            <Link to="/createProfile" className="btn btn-lg btn-outline-info">
              create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">DashBoard</h1>
              {dashboardContents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProp,
  { getCurrentProfile , deleteProfile }
)(withRouter(Dashbord));
