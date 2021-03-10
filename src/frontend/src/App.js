import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/navbar';
import Login from './components/login';
import ApplicationOne from './components/application_part1';
import ApplicationTwo from "./components/application_part2";
import { Home } from './components/home';
import Events from './components/events';
import Profile from "./components/profile";
import EventHistory from "./components/event_history";
import { EventCreation } from "./components/event_creation";
import { ApplicationStatus } from "./components/application_status";
import ApplicationSummary from "./components/application_summary";

import React from 'react'

function App() {
  return (
      <React.Fragment>
          <Router>
              <NavigationBar/>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/event" component={Events}/>
                  <Route path="/event_history" component={EventHistory}/>
                  <Route path="/apply" component={ApplicationOne}/>
                  <Route path="/apply2" component={ApplicationTwo}/>
                  <Route path="/application_summary" component={ApplicationSummary}/>
                  <Route path="/event_creation" component={EventCreation}/>
                  <Route path="application_status" component={ApplicationStatus}/>
                  <Route path="/logout" component={Login}/>
                  <Route path="/profile" component={Profile}/>
              </Switch>
          </Router>
      </React.Fragment>

  );
}

export default App;
