import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {updateStudentProfileInfo} from "../variables/studentprofileinfo";
import {getUserInfoJson, getUsername} from "../variables/localstorage";
import {createEvent} from "../variables/eventinfo";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "react-bootstrap/Button";
import {notification, Input, Switch} from "antd";
import {icons} from "antd/es/image/PreviewGroup";
const {  CloseOutlined, CheckOutlined  } = icons;
const { TextArea } = Input;
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

export default class EventCreation extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.state = {
            title: "",
            event_type: "",
            meetup_location: "",
            block: "",
            floor: "",
            description: "",
            start_time: "",
            duration_mins: 60,
            count_attendance: true,
            signups: [], //
            attendance: [], //
            signup_limit: 20,
            signup_ddl: ""
        };
    }

    handleSubmit() {
        console.log("new event submit");
        if (this.state.title === "" ||
            this.state.event_type === "" ||
            this.state.meetup_location === "" ||
            this.state.block === "" ||
            this.state.floor === "" ||
            this.state.description === "" ||
            this.state.start_time === "" ||
            this.state.signup_limit === "" ||
            this.state.signup_limit <= 0 ||
            this.state.duration_mins === "" ||
            this.state.duration_mins <= 0) {
            notification.error({
                message: 'Invalid Form',
                description: 'Fill in all the fields and retry'
            });
            return;
        }
        createEvent(this.state);
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
                <h3>Create Event</h3>
                <EditBox>
                    <bs.Container>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Name:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_name" name="title" type="text" onChange={e => this.handleChange(e)} /></bs.Col>
                            <bs.Col lg={3}><Field>Event Type:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_type" name="event_type" type="text" onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>

                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Duration:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_duration" name="duration_mins" type="number" placeholder="minutes" onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col lg={3}><Field>Signup Limit:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_signup_limit" name="signup_limit" type="number" onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>

                        <bs.Row>
                            <bs.Col lg={3}><Field>Applicable Block:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_block" name="block" type="text" onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col lg={3}><Field>Applicable Floor:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_floor" name="floor" type="text" onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>

                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Location:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_location" name="meetup_location" type="text" onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col lg={3}><Field>Event Start Time:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_start_time" name="start_time" type="datetime-local" onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Count Attendance:</Field></bs.Col>
                            <bs.Col lg={3} style = {{textAlign:"left"}}>
                                <Switch checkedChildren="Yes" id = "event_count_attendance" unCheckedChildren="No" onClick={this.handleButtonChange} defaultChecked/>
                            </bs.Col>
                            <bs.Col lg={3}><Field>Signup Deadline:</Field></bs.Col>
                            <bs.Col lg={3}><Input id="create_event_signup_deadline" name="signup_ddl" type="datetime-local" onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                        <br/>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Event Description:</Field></bs.Col>
                            <bs.Col lg={9}><TextArea id="create_event_description" name="description" cols="55" rows="5" onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                    </bs.Container>
                </EditBox>
                <EditBox>
                    <bs.Col><button id = "create_event_btn" type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary" >Create Event</button></bs.Col>
                </EditBox>
            </EventDiv>
        );
    }

};
