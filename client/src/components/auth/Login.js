import React, { Component } from 'react';
import TextFeildGroup from '../commonFeilds/TextFeildGroup'; 

import {connect} from 'react-redux'; 
import {loginUser} from '../../actions/authAction'; 


class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount(){
    if (this.props.auth.isAuthenticate){
      this.props.history.push('/dashboard')
    }
  }; 

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value // [e] ==>> add variable in object
    }); 
  }

  componentWillReceiveProps(nextProps){ // it's runs when our components recive new props 
  if (nextProps.auth.isAuthenticate){
    this.props.history.push('/dashboard')
  }
  if(nextProps.errors){
   this.setState({ // set nextProps.errors to local state 
     errors: nextProps.errors
   }); 
  }; 
 }

  onSubmit = e => {
    e.preventDefault(); 
    const userData = {
      email: this.state.email,
      password: this.state.password,
      errors: {}
    }

    console.log(userData); // print on console the userData

    this.props.loginUser(userData); // fired the loginUser action with passing current user
  }



  render() {
  const {errors} = this.state; 
    return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your StudentNetwork account</p>
            <form onSubmit={this.onSubmit}>

             <TextFeildGroup 
             name="email"
             placeholder="Email"
             type="email"
             value={this.state.email}
             onChange={this.onChange}
             error={errors.email}
             />

             <TextFeildGroup 
             name="password"
             placeholder="password"
             type="password"
             value={this.state.password}
             onChange={this.onChange}
             error={errors.password}
             />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    auth : state.auth,
    errors : state.errors
  }
}



export default connect(mapStateToProps, {loginUser})(Login); 