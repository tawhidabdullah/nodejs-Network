import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";

// IMPORT PROFILE ACTION
import { deleteEducation } from "../../actions/profileAction";

class ShowEducation extends Component {
  onClickRemoveEducation(eduId) {
    this.props.deleteEducation(eduId);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>{" "}&rarr;{" "}
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        </td>
        <td>
          <button
            className="btn btn-dark"
            onClick={this.onClickRemoveEducation.bind(this, edu._id)}
          >
            Remove
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4>Education Credientials </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Insititute</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(ShowEducation);
