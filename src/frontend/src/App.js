import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {NavigationBar} from './components/navbar';
import {AdminNavigationBar} from './components/admin/admin_navigationBar';
import Login from './components/login';
import ApplicationZero from './components/application_part0';
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
import {checkValidity, isAdmin} from "./functions/localstorage";
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
import {Button, Result} from "antd";

function App() {
    const GuardedRoute = ({component: Component, auth, ...rest}) => (
        <Route {...rest} render={(props) => (
            checkValidity()
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
    )
    const GuardedRouteStudentOnly = ({component: Component, auth, ...rest}) => (
        <Route {...rest} render={(props) => (
            checkValidity()
                ? (!isAdmin() ? <Component {...props} /> : <Redirect to='/'/>)
                : <Redirect to='/login'/>
        )}/>
    )
    const GuardedRouteAdminOnly = ({component: Component, auth, ...rest}) => (
        <Route {...rest} render={(props) => (
            checkValidity()
                ? (isAdmin() ? <Component {...props} /> : <Redirect to='/'/>)
                : <Redirect to='/login'/>
        )}/>
    )

    function NotFoundPage() {
        return(
            <div>
                <br/>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" href="/">Back Home</Button>}
                />
            </div>
        );
    }


    return (
        <React.Fragment>
            <Router>
                {isAdmin() ? <AdminNavigationBar/> : <NavigationBar/>}
                <Switch>
                    <GuardedRoute exact path="/" component={Home}/>
                    <GuardedRoute path="/event" component={Events}/>
                    <GuardedRouteStudentOnly path="/event_edit" component={EventEdit}/>
                    <GuardedRouteStudentOnly path="/profile" component={Profile}/>
                    <GuardedRouteStudentOnly path="/event_history" component={EventHistory}/>
                    <GuardedRouteStudentOnly path="/profile_edit" component={PersonalDataEdit}/>
                    <GuardedRouteStudentOnly path="/room_profile_edit" component={RoomProfileEdit}/>
                    <GuardedRouteStudentOnly path="/lifestyle_profile_edit" component={LifeStyleProfileEdit}/>
                    <GuardedRouteStudentOnly path="/apply0" component={ApplicationZero}/>
                    <GuardedRouteStudentOnly path="/apply1" component={ApplicationOne}/>
                    <GuardedRouteStudentOnly path="/apply2" component={ApplicationTwo}/>
                    <GuardedRouteStudentOnly path="/apply3" component={ApplicationThree}/>
                    <GuardedRouteStudentOnly path="/apply4" component={ApplicationFour}/>
                    <GuardedRouteStudentOnly path="/application_summary" component={ApplicationSummary}/>
                    <GuardedRouteStudentOnly path="/event_creation" component={EventCreation}/>
                    <GuardedRouteStudentOnly path="/application_status" component={ApplicationStatus}/>
                    <GuardedRouteAdminOnly path="/admin/application_creation" component={ApplicationCreation}/>
                    <GuardedRouteAdminOnly path="/admin/application_management" component={ApplicationManagement}/>
                    <GuardedRouteAdminOnly path="/admin/application_viewing" component={ApplicationViewing}/>
                    <GuardedRouteAdminOnly path="/admin/house_guardian_add" component={AddHouseGuardian}/>
                    <GuardedRouteAdminOnly path="/admin/house_guardian_remove" component={RemoveHouseGuardian}/>
                    <GuardedRouteAdminOnly path="/admin/disciplinary_record_create" component={CreateDisciplinaryRecord}/>
                    <GuardedRouteAdminOnly path="/admin/disciplinary_record_view_all" component={ViewAllDisciplinaryRecord}/>
                    <GuardedRouteAdminOnly path="/admin/disciplinary_record_view_individual" component={ViewIndividualDisciplinaryRecord}/>
                    <GuardedRouteAdminOnly path="/admin/disciplinary_record_edit" component={EditDisciplinaryRecord}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/404" component={NotFoundPage} />
                    <Redirect to="/404"/>
                </Switch>
            </Router>
        </React.Fragment>

    );
}

export default App;
