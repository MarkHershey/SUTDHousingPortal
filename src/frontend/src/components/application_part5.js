import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import SummaryData from './summary_data';
import submitApplication from '../functions/applicationforminfo';
import {ApplicationStep} from "./application_steps";
import {
    getPersonalApplicablePeriodUidInfoJson,
    getPersonalApplicationPeriodInfoJson,
    getUserInfoJson,
    getUsername
} from "../functions/localstorage";

const EventDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  grid-column: auto;
  text-align: center;
`;


export default function ApplicationSummary(props){
    let history = useHistory();
    let data = getUserInfoJson();
    let username = getUsername();
    let applicable_period = getPersonalApplicationPeriodInfoJson();
    let application_period_uid = getPersonalApplicablePeriodUidInfoJson();
    function handleSubmit(){
        console.log(application_period_uid);
        console.log("HERE");
        console.log(getPersonalApplicationPeriodInfoJson());
        submitApplication(application_period_uid,username,
            data.preference_room,data.preference_lifestyle,applicable_period);
        history.push("/");
        
    }

    return (
        <EventDiv>
            <ApplicationStep i ={4}/>
            <h3><u>Application Summary</u></h3>
            <SummaryData/>
            <bs.Row>
                    <bs.Col><a href="/apply4"><button id="application5_back_btn" type="button" className="btn btn-outline-primary">Go to Previous Step</button></a></bs.Col>
                    <bs.Col><button id="submit_application_btn" onClick={handleSubmit} type="button" className="btn btn-outline-primary">Submit</button></bs.Col>
            </bs.Row>
            <br/>
        </EventDiv>
    );
};
