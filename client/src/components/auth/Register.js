import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

// import formFeild
import TextFeildGroup from '../commonFeilds/TextFeildGroup'; 

// connect redux
import {connect} from 'react-redux'; 
import { registeruser } from "../../actions/authAction";


class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  componentDidMount(){
    if (this.props.auth.isAuthenticate){
      this.props.history.push('/dashboard')
    }
  }; 
  
  componentWillReceiveProps(nextProps){ // it's runs when our components recive new props 
   if(nextProps.errors){
    this.setState({
      errors: nextProps.errors
    })
   }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value // [e] ==>> add variable in object
    }); 
  }

  onSubmit = e => {
    e.preventDefault(); 
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password:this.state.password,
      password2:this.state.password2,
      errors: {}
    }
    
    // this is when action get's fired 
    this.props.registeruser(newUser, this.props.history); // passing user object to action

  }; 

  render() {
    const {errors} = this.state;
    console.log(errors); 
    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Student account</p>
            <form noValidate onSubmit={this.onSubmit}>

            <TextFeildGroup 
            name="name"
            placeholder="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            />

            <TextFeildGroup 
            name="email"
            placeholder="Email Address"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            info='This site uses Gravatar 
            so if you want a profile image, use a Gravatar email'
            />

            <TextFeildGroup 
            name="password"
            placeholder="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            />
            
            <TextFeildGroup 
            name="password2"
            placeholder="Confirm Password"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
            
            />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}; 

const mapStateToProp = (state) => {
  return {
    auth : state.auth,
    errors : state.errors
  }
}; // make avaiable for component by prop 


// checking the proptypes


export default connect(mapStateToProp, {registeruser})(withRouter(Register)); 