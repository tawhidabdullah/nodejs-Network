import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../commonFeilds/Spinner";

// import ACTIONS
import { getCurrentProfile } from "../../actions/profileAction";

class Dashbord extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(); // fired the getCurrentUser action
  }
  render() {
    let dashboardContents;

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    if (profile === null || loading) {
      dashboardContents = <Spinner />;
    } else {
      if (Object.create(profile).length > 0) {
        //TODO: DISPLAY THE PROFILE
        dashboardContents = <h1>Diplay Profiles</h1>;
      } else {
        dashboardContents = (
          <div>
            <p class="lead text-muted">Wecome {user.name}</p>
            <p>Seems like you have'nt setup you profile, Go and SETUP!</p>
            <button className="btn btn-lg btn-outline-info">
              create profile
            </button>
          </div>
        );
      }
    }

    return (
      <div class="dashboard">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4">DashBoard</h1>
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
  { getCurrentProfile }
)(Dashbord);
