import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {NavigationBar} from './components/navbar';
import Login from './components/login';
import ApplicationOne from './components/application_part1';
import ApplicationTwo from "./components/application_part2";
import ApplicationThree from "./components/application_part3";
import Home from './components/home';
import Events from './components/events';
import Profile from "./components/profile";
import PersonalDataEdit from "./components/personal_profile_edit";
import RoomProfileEdit from "./components/room_profile_edit";
import EventHistory from "./components/event_history";
import EventCreation from "./components/event_creation";
import {ApplicationStatus} from "./components/application_status";
import ApplicationSummary from "./components/application_summary";
import React from 'react';
import {checkValidity} from "./variables/localstorage";
import LifeStyleProfileEdit from './components/lifestyle_profile_edit';
import EventEdit from './components/event_edit';

function App() {
    const GuardedRoute = ({component: Component, auth, ...rest}) => (
        <Route {...rest} render={(props) => (
            checkValidity()
                ? <Component {...props} />
                : <Redirect to='/login'/>
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
                    <GuardedRoute path="/event_edit" component={EventEdit}/>
                    <GuardedRoute path="/profile_edit" component={PersonalDataEdit}/>
                    <GuardedRoute path="/room_profile_edit" component={RoomProfileEdit}/>
                    <GuardedRoute path="/lifestyle_profile_edit" component={LifeStyleProfileEdit}/>
                    <GuardedRoute path="/apply" component={ApplicationOne}/>
                    <GuardedRoute path="/apply2" component={ApplicationTwo}/>
                    <GuardedRoute path="/apply3" component={ApplicationThree}/>
                    <GuardedRoute path="/application_summary" component={ApplicationSummary}/>
                    <GuardedRoute path="/event_creation" component={EventCreation}/>
                    <GuardedRoute path="/application_status" component={ApplicationStatus}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        </React.Fragment>

    );
}

export default App;
