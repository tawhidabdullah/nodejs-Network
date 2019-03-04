import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import {Provider} from 'react-redux';   
import jwt_decode from 'jwt-decode'; 
import setAuthorizationToken from './utilities/setAuthorizationToken'; 




// ACTIONS IMPORT 
import {setCurrentUser, logoutUser} from './actions/authAction'; 
import {clearCurrentProfile} from './actions/profileAction'; 


// IMPORT REDUX STORE 
import store from './store'; 


// CSS  
import './App.css';



// LAYOUT COMPONENTS
import Navbar from './components/layout/Navbar'; 
import Footer from './components/layout/Footer'; 
import Landing from './components/layout/Landing'; 


// AUTH COMPONENTS 
import Register from './components/auth/Register'; 
import Login from './components/auth/Login'; 


// DASHBOARD COMPONENT
import Dashboard from './components/dashboard/Dashboard'; 

// CREATE PROFILE COMPONENTS
import CreateProfile from './components/create-profile/CreateProfile'; 


// IMPORT PRIVATE ROUTE
import PrivateRoute from './components/commonFeilds/privateRoute'; 



// CHECK FOR TOKEN 
if (localStorage.jwttoken){
  // set auth token to header Authorization
  setAuthorizationToken(localStorage.jwttoken); 
  // decode token and get user info and expression 
  const decoded = jwt_decode(localStorage.jwttoken); 
  // set user and isAuthenticated 
  store.dispatch(setCurrentUser(decoded));  // fired the action and set the user into state

  
/////////// MAKE LOGOUT THE USER BASED on expired  tIme

const currentTime = Date.now() / 1000; 

if (decoded.exp < currentTime) {
  store.dispatch(logoutUser()); // logout user

  // TODO: clear the current profile 
  store.dispatch(clearCurrentProfile());
  window.location.href = '/login' // redirect to login page 
}

}



class App extends Component {
  render() {
    return (
     <Provider store={ store }>
        <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Landing}/>
          <div className="container">
            <Route exact  path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
           <Switch >
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
           </Switch>
            <Switch >
              <PrivateRoute exact path="/createProfile" component={CreateProfile} />
            </Switch>
           </div>
          <Footer />
        </div>
       </Router>
      </Provider>
    );
  }
}

export default App;






/* 

1. store
2.provider
3.Containers
4.Components
5.actions
6.Reducers




when a action get's fired ====>>>

then a dispatch inform that to reducers ==>>

then that reducers get called and see which actions has fired ===>>


and then on top of that reducers update the store Ok ?



















*/