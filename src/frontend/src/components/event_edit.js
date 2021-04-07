import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {updateStudentProfileInfo} from "../variables/studentprofileinfo";
import {getUserInfoJson, getUsername} from "../variables/localstorage";
import {editEvent} from "../variables/eventinfo";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "react-bootstrap/Button";
import {notification} from "antd";

const Field = styled.p`
  color: #3C64B1;
  text-align: right;
`;

const EditBox = styled.div`
  background-color: #F3F6FA;
  margin: 10pt 10pt;
  padding: 10pt 10pt;
  border-radius: 20pt;
`;

const EventDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  grid-column: auto;
  text-align: center;
`;

export default class EventEdit extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
       this.state=this.props.location.state;
       console.log(this.state);
    }

    handleSubmit() {
        console.log("event edited submit");
        if (this.state.title === "" ||
            this.state.event_type === "" ||
            this.state.meetup_location === "" ||
            this.state.block === "" ||
            this.state.floor === "" ||
            this.state.description === "" ||
            this.state.start_time === "" ||
            this.state.signup_limit === "") {
            notification.error({
                message: 'Event Edition Failed',
                description:
                    'Please do not keep certain field empty',
            });
            return;
        }
        editEvent(this.state.uid,this.state.title,this.state.event_type,
            this.state.meetup_location,this.state.block,this.state.floor,
            this.state.description,this.state.start_time,this.state.duration_mins,
            this.state.count_attendance,this.state.signup_limit);
        this.props.history.push("/event");
    }

    handleChange(event) {
        const value = event.target.value;
        console.log(event);
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
        console.log(this.state);
    }

    handleButtonChange() {
        this.setState({
            ...this.state,
            count_attendance: !this.state.count_attendance,
        });
        console.log(this.state);
    }

    render(){
        return(
            <EventDiv>
                <h3>Edit Event</h3>
                <EditBox>
                    <bs.Container>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Name:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_title" name="title" type="text" placeholder={this.state.title} onChange={e => this.handleChange(e)} /></bs.Col>
                            <bs.Col lg={3}><Field>Event Type:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_type" name="event_type" type="text" placeholder={this.state.event_type} onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>

                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Duration:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_duration" name="duration_mins" type="number" placeholder={this.state.duration_mins} onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col lg={3}><Field>Signup Limit:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_signup_limit" name="signup_limit" type="number" placeholder={this.state.signup_limit} onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>

                        <bs.Row>
                            <bs.Col lg={3}><Field>Applicable Block:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_applicable_block" name="block" type="text" placeholder={this.state.block} onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col lg={3}><Field>Applicable Floor:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_applicable_floor" name="floor" type="text" placeholder={this.state.floor} onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>

                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Location:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_location" name="meetup_location" type="text" placeholder={this.state.meetup_location} onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col lg={3}><Field>Event Start Time:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_start_time" name="start_time" type="datetime-local" defaultValue={this.state.start_time} onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>

                        <bs.Row>
                            <bs.Col lg={3}><Field>Count Attendance:</Field></bs.Col>
                            <bs.Col lg={3}><Button id = "event_count_attendance" name="count_attendance" placeholder={this.state.count_attendance} className="btn btn-outline-light" onClick={this.handleButtonChange}>{this.state.count_attendance?"Yes":"No"}</Button></bs.Col>
                            <bs.Col lg={3}><Field>Signup Deadline:</Field></bs.Col>
                            <bs.Col lg={3}><input id="event_signup_deadline" name="signup_ddl" type="datetime-local" defaultValue={this.state.signup_ddl} onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Description:</Field></bs.Col>
                            <bs.Col lg={6}><textarea id="event_description" name="description" cols="55" rows="5" placeholder={this.state.description} onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                    </bs.Container>
                </EditBox>
                <EditBox>
                    <bs.Col><button id = "edit_event_btn" type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary" >Edit Event</button></bs.Col>
                </EditBox>
            </EventDiv>
        );
    }

};
