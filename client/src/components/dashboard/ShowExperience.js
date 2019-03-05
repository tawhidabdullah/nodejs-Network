import React, { Component } from "react";
import Moment from "react-moment";
import {connect} from 'react-redux'; 

// IMPORT PROFILE ACTION 
import {deleteExperience} from '../../actions/profileAction'



class ShowExperience extends Component {

  onClickRemoveExperience(expId){
    this.props.deleteExperience(expId); 
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>{" "}&rarr;{" "}
         {exp.to === null ? ('now') : (<Moment format="YYYY/MM/DD">{exp.to === null ? ('now') : exp.to} </Moment>)} 
        </td>
        <td>
          <button
            className="btn btn-dark"
            onClick={this.onClickRemoveExperience.bind(this, exp._id)}
          >
            Remove
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4>Experience Credientials </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(null,{deleteExperience})(ShowExperience);
