import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import ApplicationOne from './application_part1';
import ApplicationTwo from "./application_part2";

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
        <div>
            <ApplicationOne isSummary="true"/>
            <ApplicationTwo isSummary="true"/>
        </div>
    );
};