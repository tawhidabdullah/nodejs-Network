import React, { Component } from 'react'
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux'; 






// ACTIONS 
import {logoutUser} from '../../actions/authAction' ; 
import {clearCurrentProfile} from '../../actions/profileAction'; 


class Navbar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault(); 
    this.props.clearCurrentProfile(); // clearing the profile before logout
    this.props.logoutUser(); // firing the action here 
  }


  render() {

    const {isAuthenticate, user} = this.props.auth;

    const logedInUserLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
      <Link className="nav-link"  to="/feed"> PostsFeed </Link>
    </li>
      <li className="nav-item">
        <Link className="nav-link"  to="/dashboard"> Dashboard </Link>
      </li>
      <li className="nav-item">
          <a href="#" onClick={this.onLogoutClick} className="nav-link"> 
            <img src={user.avatar}  
            alt={user.name} 
            className="rounded-circle"
            style={{
              width: '25px',
              marginRight: '5px'
            }}
            title="you must have a Gravatar connect to your email for displaying image"/>
            Logout
          </a>
      </li>
    </ul>
    ); 
    const newUserLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
        <Link className='nav-link'  to=''/>
      </li>
    </ul>
    ); 

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">DevConnector</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles"> Students
            </Link>
          </li>
        </ul>

          {isAuthenticate ? logedInUserLinks : newUserLinks} {/* Conditional rendering */}

      </div>
    </div>
  </nav>
    )
  }
}; 


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Navbar); 