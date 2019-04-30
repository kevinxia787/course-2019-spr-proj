import React, { Component } from 'react';
import {  BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Visualizations from './Visualizations/Visualizations';
import Team from './Team/Team';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import NavLink from 'react-bootstrap/NavLink';

class App extends Component {  
  render() {    
    return (  
      <Router>
        <div>
          <Navbar bg="light">
            <Navbar.Brand>CS504 Dashboard</Navbar.Brand>
            <Nav>
              <LinkContainer to="/">
                <NavLink>Home</NavLink>
              </LinkContainer>
              <LinkContainer to="/visualizations">
                <NavLink>Visualizations</NavLink>
              </LinkContainer>
              <LinkContainer to="Team">
                <NavLink>Team</NavLink>
              </LinkContainer>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/visualizations' component={Visualizations}/>
            <Route path='/team' component={Team}/>
          </Switch>
        </div> 
      </Router>
      
      );  
    }
}

export default App;