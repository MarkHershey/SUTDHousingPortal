import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import ApplicationOne from './application_part1';
import SummaryData from './summary_data';

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
    return (
        <EventDiv>
            <h3><u>Application Summary</u></h3>
            <SummaryData/>
            <bs.Row>
                    <bs.Col><a href="/apply2"><button type="button" className="btn btn-outline-primary">Go to Previous Step</button></a></bs.Col>
                    <bs.Col><a href="/"><button type="button" className="btn btn-outline-primary">Submit</button></a></bs.Col>
            </bs.Row>
            <br/>
        </EventDiv>
    );
};