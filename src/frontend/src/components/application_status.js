import React from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {Divider} from "@material-ui/core";
import * as bs from "react-bootstrap";

const ApplicationBox = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 100pt;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

const ApplicationDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  grid-column: auto;
`;

const SubTitle = styled.p`
  text-align: center;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
`;

const Field = styled.p`
  color: #3C64B1;
  text-align: right;
`;
export default class ApplicationStatus extends React.Component {
    render() {
        return (
            <ApplicationDiv>
                <h3>Application Status</h3>
                <ApplicationBox>
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <SubTitle>Application Details</SubTitle>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg = {3}>
                                <Field>Applied Date: </Field>
                            </Col>
                            <Col lg = {3}>{ "04/03/2021" }</Col>
                            <Col lg = {3}><Field>Estimated Success Rate:</Field></Col>
                            <Col lg = {3}>{"70%"}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg={3}><Field>Applied Room Type:</Field></Col>
                            <Col lg={3}>{"Double Room / Single Room"}</Col>
                            <Col lg={3}><Field>Applied Room Location</Field></Col>
                            <Col lg={3}>{"Blk 55 / Blk 59"}</Col>
                        </Row>
                        <br/>
                    </Container>
                    <br/>
                    <Divider />
                    <br/>
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <SubTitle>Offer Details</SubTitle>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg = {3}>
                                <Field>Offer Status: </Field>
                            </Col>
                            <Col lg = {3}>{ "Offer Issued" }</Col>
                            <Col lg = {3}><Field>Confirmation Deadline:</Field></Col>
                            <Col lg = {3}>{"01/09/2021"}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg={3}><Field>{"Offered Room Type:"}</Field></Col>
                            <Col lg={3}>{"Double Room"}</Col>
                            <Col lg={3}><Field>{"Offered Room ID:"}</Field></Col>
                            <Col lg={3}>{"59-03-25"}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg={3}><Field>{"Roommate-To-Be:"}</Field></Col>
                            <Col lg={3}>{"Ziqi Jin"}</Col>
                            <Col lg={3}><Field>{"Move-Out Date:"}</Field></Col>
                            <Col lg={3}>{"01/10/2021 11:00AM"}</Col>
                        </Row>
                    </Container>
                </ApplicationBox>
                <ApplicationBox style={{textAlign:"center"}}>
                    <Container>
                        <Row>
                            <Col><button type="button" className="btn btn-outline-success" id = "accept_btn">Accept</button></Col>
                            <Col><button type="button" className="btn btn-outline-secondary" id = "reject_btn">Apply Extension</button></Col>
                            <Col><button type="button" className="btn btn-outline-danger" id = "extension_btn">Reject</button></Col>
                        </Row>
                    </Container>
                </ApplicationBox>
            </ApplicationDiv>
        );
    }
}
