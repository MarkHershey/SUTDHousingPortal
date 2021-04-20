import React from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {Divider} from "@material-ui/core";
import * as bs from "react-bootstrap";
import {getEventInfo} from "../functions/eventinfo";
import {getApplicationStatusJson, getEventInfoJson} from "../functions/localstorage";
import {accept, getApplicationInfo} from "../functions/applicationstatusinfo";

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
    constructor(props) {
        super(props);
        this.state = {application: {
                uid: "",
                created_at: "",
                room_profile: {
                    room_type: "",
                    room_type_2nd:"",
                    block: "",
                    block_2nd: "",
                },
                visible_status:"",
                stay_period: {start_date: "", end_date: ""},

            }};
    }

    componentDidMount() {
        const fetchJSON = async () =>{
            getApplicationInfo().then(r=>{
                this.setState({application: getApplicationStatusJson()});
            });
        }
        fetchJSON();
    }

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
                            <Col lg = {3}>{ this.state.application.created_at.slice(0,10)}</Col>
                            <Col lg = {3}><Field>Estimated Success Rate:</Field></Col>
                            <Col lg = {3}>{"70%"}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg={3}><Field>Applied Room Type:</Field></Col>
                            <Col lg={3}>{this.state.application.room_profile.room_type + " / " + this.state.application.room_profile.room_type_2nd + " Room"}</Col>
                            <Col lg={3}><Field>Applied Room Location</Field></Col>
                            <Col lg={3}>{"Blk "+ this.state.application.room_profile.block +" / Blk " + this.state.application.room_profile.block_2nd}</Col>
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
                            <Col lg = {3}>{ "Offer " + this.state.application.visible_status }</Col>
                            <Col lg = {3}><Field>Estimate Period:</Field></Col>
                            <Col lg = {3}>{this.state.application.stay_period.start_date + "~" + this.state.application.stay_period.end_date}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg={3}><Field>{"Offered Room Type:"}</Field></Col>
                            <Col lg={3}>{this.state.application.visible_status === "submitted"? "NA":"Double Room"}</Col>
                            <Col lg={3}><Field>{"Offered Room ID:"}</Field></Col>
                            <Col lg={3}>{this.state.application.visible_status === "submitted"? "NA":"59-03-25"}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg={3}><Field>{"Roommate-To-Be:"}</Field></Col>
                            <Col lg={3}>{this.state.application.visible_status === "submitted"? "NA":"Ziqi Jin"}</Col>
                            <Col lg={3}><Field>{"Move-Out Date:"}</Field></Col>
                            <Col lg={3}>{this.state.application.visible_status === "submitted"? "NA":"01/10/2021 11:00AM"}</Col>
                        </Row>
                    </Container>
                </ApplicationBox>
                <ApplicationBox style={{textAlign:"center"}}>
                    <Container>
                        <Row>
                            <Col><button type="button" className="btn btn-outline-success" id = "accept_btn" disabled={this.state.application.visible_status !== "offered"} onClick={async ()=> await accept(true,this.state.application.uid)}>Accept</button></Col>
                            <Col><button type="button" className="btn btn-outline-secondary" id = "reject_btn">Apply Extension</button></Col>
                            <Col><button type="button" className="btn btn-outline-danger" id = "extension_btn" disabled={this.state.application.visible_status !== "offered"} onClick={async ()=> await accept(false,this.state.application.uid)}>Reject</button></Col>
                        </Row>
                    </Container>
                </ApplicationBox>
            </ApplicationDiv>
        );
    }
}
