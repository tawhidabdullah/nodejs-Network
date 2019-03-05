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

// IMPORT EDIT PROFILE COMPONENTS
import EditProfile from './components/editProfile/EditProfile'; 

// ADD CREDIENTIALS (add-experience , add-education)

import AddExperience from './components/add-credientials/AddExperience'; 
import AddEducation from './components/add-credientials/AddEducation';


// IMPORT PROFILES 
import Profiles from './components/profiles/Profiles'; 


// IMPORT GETPROFILE BY ID ===>> PROFILE 
import Profile from './components/profile/Profile'; 


// IMPORT POSTS
import Posts from './components/posts/Posts'; 


// IMPORT POST
import Post from './components/post/Post'; 





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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
           <Switch >
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
           </Switch>
            <Switch >
              <PrivateRoute exact path="/createProfile" component={CreateProfile} />
            </Switch>
            <Switch >
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch >
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch >
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
            <Switch >
            <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch >
            <PrivateRoute exact path="/post/:id" component={Post} />
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