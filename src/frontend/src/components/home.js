import React from 'react';
import styled from 'styled-components';
import container, {Container, Row, Col} from 'react-bootstrap';
import {checkValidity, getToken} from "../variables/auth";
const Homepage = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-column: auto;
`;

const Welcome = styled.h4`
  
`;

const DashboardTitle = styled.p`
  text-align: center;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
`;


export const Home = (props) => (
    <Homepage>
        <Welcome> Hi, Eric Smith! </Welcome>
        <h4>{typeof(getToken())}</h4>
        <Container>
            <Row>
                <Col><DashboardTitle>Position in Waiting List</DashboardTitle></Col>
                <Col><DashboardTitle>Announcements</DashboardTitle></Col>
                <Col><DashboardTitle>Upcoming Floor Events</DashboardTitle></Col>
            </Row>
        </Container>
    </Homepage>
)
