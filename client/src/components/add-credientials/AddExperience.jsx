import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// IMPORT ACTIONS
import { addExperience } from "../../actions/profileAction";

// import Form groups
import TextFeildGroup from "../commonFeilds/TextFeildGroup";
import TextAreaFeildGroup from "../commonFeilds/TextAreaFeildGroup";

class AddExperience extends Component {
  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const experienceData = {};

    experienceData.title = this.state.title;
    experienceData.company = this.state.company;
    experienceData.location = this.state.location;
    experienceData.from = this.state.from;
    experienceData.to = this.state.to;
    experienceData.current = this.state.current;
    experienceData.description = this.state.description;

    this.props.addExperience(experienceData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link className="btn btn-outline-secondary" to="/dashboard">
                {" "}
                <i className="fa fa-arrow-left"> Go To Dashboard</i>
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any kind of Occupation experience you have done before .
              </p>
              <small className="d-block p-3">## ==> required feild</small>
              <form onSubmit={this.onSubmit}>
                <TextFeildGroup
                  name="company"
                  placeholder="## Company"
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                />
                <TextFeildGroup
                  name="title"
                  placeholder="## title"
                  value={this.state.title}
                  onChange={this.onChange}
                  errors={errors.title}
                />
                <TextFeildGroup
                  name="location"
                  placeholder="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                />
                <h6>From Date</h6>
                <TextFeildGroup
                  name="from"
                  type="date"
                  placeholder="## from"
                  value={this.state.from}
                  onChange={this.onChange}
                  errors={errors.from}
                />
                <h6>To Date</h6>
                <TextFeildGroup
                  name="to"
                  type="date"
                  placeholder="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  errors={errors.to}
                  disable={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4 ">
                  <input
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    onChange={this.onCheck}
                    checked={this.state.current}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    {" "}
                    &nbsp; Current job
                  </label>
                </div>
                <TextAreaFeildGroup
                  name="description"
                  placeholder="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={errors.description}
                />
                <input
                  type="submit"
                  className="btn btn-dark btn-block"
                  value="Submit"
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
  { addExperience }
)(withRouter(AddExperience));
