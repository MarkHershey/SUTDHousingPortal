import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import ApplicationTwo from './application_part2';
import SummaryData from './summary_data';
import submitApplication from '../variables/applicationforminfo';
import {ApplicationStep} from "./application_steps";

const EventDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  grid-column: auto;
  text-align: center;
`;







export default function ApplicationSummary(){
    let history = useHistory();
    function handleSubmit(){
        submitApplication();
        history.push("/");
    }

    return (
        <EventDiv>
            <ApplicationStep i ={4}/>
            <h3><u>Application Summary</u></h3>
            <SummaryData/>
            <bs.Row>
                    <bs.Col><a href="/apply3"><button type="button" className="btn btn-outline-primary">Go to Previous Step</button></a></bs.Col>
                    <bs.Col><button onClick={handleSubmit} type="button" className="btn btn-outline-primary">Submit</button></bs.Col>
            </bs.Row>
            <br/>
        </EventDiv>
    );
};
