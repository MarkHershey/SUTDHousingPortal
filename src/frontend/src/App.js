import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {NavigationBar} from './components/navbar';
import {AdminNavigationBar} from './components/admin/admin_navigationBar';
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
import ApplicationStatus from "./components/application_status";
import ApplicationSummary from "./components/application_part5";
import React from 'react';
import {checkValidity, isAdmin} from "./variables/localstorage";
import LifeStyleProfileEdit from './components/lifestyle_profile_edit';
import EventEdit from './components/event_edit';
import ApplicationCreation from './components/admin/application_creation';
import ApplicationManagement from './components/admin/application_management';
import ApplicationViewing from './components/admin/application_viewing';
import AddHouseGuardian from './components/admin/add_house_guardian';
import RemoveHouseGuardian from './components/admin/remove_house_guardian';
import CreateDisciplinaryRecord from './components/admin/create_disciplinary_record';
import ViewAllDisciplinaryRecord from './components/admin/view_all_disciplinary_record';
import ViewIndividualDisciplinaryRecord from './components/admin/disciplinary_record_view_individual';
import EditDisciplinaryRecord from './components/admin/disciplinary_record_edit';
import ApplicationFour from "./components/application_part4";

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
                {isAdmin() ? <AdminNavigationBar/> : <NavigationBar/>}
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
                    <GuardedRoute path="/apply4" component={ApplicationFour}/>
                    <GuardedRoute path="/application_summary" component={ApplicationSummary}/>
                    <GuardedRoute path="/event_creation" component={EventCreation}/>
                    <GuardedRoute path="/application_status" component={ApplicationStatus}/>
                    <GuardedRoute path="/admin/application_creation" component={ApplicationCreation}/>
                    <GuardedRoute path="/admin/application_management" component={ApplicationManagement}/>
                    <GuardedRoute path="/admin/application_viewing" component={ApplicationViewing}/>
                    <GuardedRoute path="/admin/house_guardian_add" component={AddHouseGuardian}/>
                    <GuardedRoute path="/admin/house_guardian_remove" component={RemoveHouseGuardian}/>
                    <GuardedRoute path="/admin/disciplinary_record_create" component={CreateDisciplinaryRecord}/>
                    <GuardedRoute path="/admin/disciplinary_record_view_all" component={ViewAllDisciplinaryRecord}/>
                    <GuardedRoute path="/admin/disciplinary_record_view_individual" component={ViewIndividualDisciplinaryRecord}/>
                    <GuardedRoute path="/admin/disciplinary_record_edit" component={EditDisciplinaryRecord}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        </React.Fragment>

    );
}

export default App;
