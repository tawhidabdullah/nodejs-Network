import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      if (Object.keys(profile).length > 0) {
        //TODO: DISPLAY THE PROFILE
        dashboardContents = <h1>Diplay Profiles</h1>;
      } else {
        dashboardContents = (
          <div>
            <p class="lead text-muted">Wecome {user.name}</p>
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
  { getCurrentProfile }
)(Dashbord);
