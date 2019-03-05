import React, { Component } from 'react'
import {Link} from 'react-router-dom'; 


import '../styles/btns.css'; 
import { connect } from 'react-redux';


class Landing extends Component {
  componentDidMount(){
    if (this.props.auth.isAuthenticate){
      this.props.history.push('/dashboard')
    }
  }; 
  render() {
    return (
      <div className="landing" >
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Student Network
             </h1>
              <Link to="/register" className="btns  font-weight-bold">Sign Up</Link>
              <Link to="/login" className="btns font-weight-bold">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}; 

const mapStateToProps = state => {
  return {
    auth : state.auth
  }
}

export default connect(mapStateToProps)(Landing); 