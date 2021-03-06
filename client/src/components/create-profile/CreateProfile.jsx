import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import FormGroup FORM COMMON fEILDS
import TextFeildGroup from "../commonFeilds/TextFeildGroup";
import TextAreaFeildGroup from "../commonFeilds/TextAreaFeildGroup";
import SelectListGroup from "../commonFeilds/SelectListGroup";
import InputGroup from "../commonFeilds/InputGroup";

// IMPORT ACTIONS
import { createProfile } from "../../actions/profileAction";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    location: "",
    website: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    errors: {}
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmitFiredAction = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      location: this.state.location,
      website: this.state.website,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history); //fired createprofile action
  };

  render() {
    // Select Options for status
    const options = [
      { label: "Select professinal status", value: 0 },
      { label: "Students", value: "Students" },
      { label: "Teacher", value: "Teacher" }
    ];

    const { errors, displaySocialInputs } = this.state;

    let socialInputs;
    // conditional rendering
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fa fa-twitter"
            value={this.state.twitter}
            onChange={this.onInputChange}
            errors={errors.twitter}
          />
          <InputGroup
            placeholder="youtube Profile URL"
            name="youtube"
            icon="fa fa-youtube"
            value={this.state.youtube}
            onChange={this.onInputChange}
            errors={errors.youtube}
          />
          <InputGroup
            placeholder="facebook Profile URL"
            name="facebook"
            icon="fa fa-facebook"
            value={this.state.facebook}
            onChange={this.onInputChange}
            errors={errors.facebook}
          />
          <InputGroup
            placeholder="instagram Profile URL"
            name="instagram"
            icon="fa fa-instagram"
            value={this.state.instagram}
            onChange={this.onInputChange}
            errors={errors.instagram}
          />
          <InputGroup
            placeholder="linkedin Profile URL"
            name="linkedin"
            icon="fa fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onInputChange}
            errors={errors.linkedin}
          />
        </div>
      );
    }
    return (
      <div className="create-Profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Tell us everything you know about your self
              </p>
              <small className="d-block  pb-3">## ==> Required feilds</small>
              <form onSubmit={this.onSubmitFiredAction}>
                <TextFeildGroup
                  placeholder="## Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onInputChange}
                  errors={errors.handle}
                  info="A unique hanfle for your profile URL, Consider your full name, company name etc"
                />
                <TextAreaFeildGroup
                  placeholder="bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onInputChange}
                  errors={errors.bio}
                  info="Type you bio here.."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onInputChange}
                  options={options}
                  errors={errors.status}
                  info="Tell us bit about career"
                />
                <TextFeildGroup
                  placeholder="  company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onInputChange}
                  errors={errors.company}
                  info="Tell us about your company"
                />
                <TextFeildGroup
                  placeholder="## location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onInputChange}
                  errors={errors.location}
                  info="Tell Where do you live"
                />
                <TextFeildGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onInputChange}
                  errors={errors.website}
                  info="Enter your website link, if you hav one"
                />
                <TextFeildGroup
                  placeholder="githubusername"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onInputChange}
                  errors={errors.githubusername}
                  info="Enter you github user name,"
                />
                <TextFeildGroup
                  placeholder="skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onInputChange}
                  errors={errors.skills}
                  info="Please user comma separatd value like => html,css,javascript,nodejs"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState(previousState => ({
                        displaySocialInputs: !previousState.displaySocialInputs
                      }));
                    }}
                  >
                    Social Media Links
                    <i className="fa fa-clock ml-2" />
                  </button>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-dark btn-block mt-4"
                  onSubmit={this.onSubmitFiredAction}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(
  mapStateToProp,
  { createProfile }
)(withRouter(CreateProfile));
