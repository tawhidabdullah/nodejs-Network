import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// IMPORT ACTIONS
import { addEducation } from "../../actions/profileAction";

// import Form groups
import TextFeildGroup from "../commonFeilds/TextFeildGroup";
import TextAreaFeildGroup from "../commonFeilds/TextAreaFeildGroup";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    disabled: false,
    description: "",
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
    const EducationData = {};

    EducationData.school = this.state.school;
    EducationData.degree = this.state.degree;
    EducationData.fieldOfStudy = this.state.fieldOfStudy;
    EducationData.from = this.state.from;
    EducationData.to = this.state.to;
    EducationData.current = this.state.current;
    EducationData.description = this.state.description;

    this.props.addEducation(EducationData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link className="btn btn-outline-secondary" to="/dashboard">
                {" "}
                <i className="fa fa-arrow-left"> Go To Dashboard</i>
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any kind of education experience you have before .
              </p>
              <small className="d-block p-3">## ==> required feild</small>
              <form onSubmit={this.onSubmit}>
                <TextFeildGroup
                  name="school"
                  placeholder="## school"
                  value={this.state.school}
                  onChange={this.onChange}
                  errors={errors.school}
                />
                <TextFeildGroup
                  name="degree"
                  placeholder="## degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  errors={errors.degree}
                />
                <TextFeildGroup
                  name="fieldOfStudy"
                  placeholder="## fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  errors={errors.fieldOfStudy}
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
                    &nbsp; Currently Studing
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
  { addEducation }
)(withRouter(AddEducation));
