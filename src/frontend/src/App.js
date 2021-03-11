import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {NavigationBar} from './components/navbar';
import Login from './components/login';
import ApplicationOne from './components/application_part1';
import ApplicationTwo from "./components/application_part2";
import {Home} from './components/home';
import Events from './components/events';
import Profile from "./components/profile";
import EventHistory from "./components/event_history";
import {EventCreation} from "./components/event_creation";
import {ApplicationStatus} from "./components/application_status";
import ApplicationSummary from "./components/application_summary";
import React from 'react';
import {checkValidity} from "./variables/auth";

function App() {
    const GuardedRoute = ({component: Component, auth, ...rest}) => (
        <Route {...rest} render={(props) => (
            checkValidity()
                ? <Component {...props} />
                : <Redirect to='/logout'/>
        )}/>
    )
    return (
        <React.Fragment>
            <Router>
                <NavigationBar/>
                <Switch>
                    <GuardedRoute exact path="/" component={Home}/>
                    <GuardedRoute path="/profile" component={Profile}/>
                    <GuardedRoute path="/event" component={Events}/>
                    <GuardedRoute path="/event_history" component={EventHistory}/>
                    <GuardedRoute path="/apply" component={ApplicationOne}/>
                    <GuardedRoute path="/apply2" component={ApplicationTwo}/>
                    <GuardedRoute path="/application_summary" component={ApplicationSummary}/>
                    <GuardedRoute path="/event_creation" component={EventCreation}/>
                    <GuardedRoute path="/application_status" component={ApplicationStatus}/>
                    <GuardedRoute path="/profile" component={Profile} auth={checkValidity()}/>
                    <Route path="/logout" component={Login}/>
                </Switch>
            </Router>
        </React.Fragment>

    );
}

export default App;
