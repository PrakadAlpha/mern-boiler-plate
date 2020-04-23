import React from 'react';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import LandingPage from './components/pages/LandingPage'
import Navbar from './components/partials/Navbar'
import Alerts from './components/partials/Alerts'


if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
   <Router>
     <Navbar />
     <div className="container">
     <Alerts />
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <PrivateRoute exact path='/home' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
     </div>     
   </Router>
   </>
  );
}

export default App;
