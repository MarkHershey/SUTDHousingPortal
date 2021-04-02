import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {Student} from "../variables/studentinfo";
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {updateStudentProfileInfo} from "../variables/studentprofileinfo";
import {getUserInfoJson, getUsername} from "../variables/localstorage";
import { Typography, Slider, TextField } from '@material-ui/core';

const Field = styled.p`
  color: #3C64B1;
  text-align: right;
`;

const Answer = styled.p`
  color: Grey;
  text-align: left;
`;

const ProfileBox = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 100pt;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

const Apply2BtnSet = styled.div`
  background-color: #F3F6FA;
  margin-left: 2em;
  margin-right: 2em;
  padding: 20pt 20pt;
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

export default class PersonalDataEdit extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = getUserInfoJson();
    }

    handleSubmit(event) {
        console.log("clicked submit");
        console.log(this.state.phone_number);
        updateStudentProfileInfo(this.state.phone_number,
        this.state.email_personal,this.state.local_addr_post_code,this.state.local_addr_street,
        this.state.local_addr_unit,this.state.preference_roommate)
        this.props.history.push("/");
    }

    handleChange(event) {
        const value = event.target.value;
        //console.log("value: "+value);
        //console.log("target: "+event.target.name);
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
        console.log(this.state);
      }
    
    render(){
        return(
            <EventDiv>
                <h3>Edit Personal Profile</h3>
                <ProfileBox>
                    <bs.Container>
                        <bs.Row>
                            <bs.Col><Field>Personal Email:</Field></bs.Col>
                            <bs.Col><input name="email_personal" type="email" placeholder={this.state.email_personal} onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col><Field>Preferred Roommate</Field></bs.Col>
                            <bs.Col><input name="preference_roommate" type="text" placeholder={this.state.preference_roommate}/></bs.Col>
                        </bs.Row>
    
                        <bs.Row>
                            <bs.Col><Field>Phone Number:</Field></bs.Col>
                            <bs.Col><input name="phone_number"type="number" placeholder={this.state.phone_number} onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col><Field>Local Address Street</Field></bs.Col>
                            <bs.Col><input name="local_addr_street" type="text" placeholder={this.state.local_addr_street} onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                        <bs.Row>
                            <bs.Col><Field>Local Address Unit Number:</Field></bs.Col>
                            <bs.Col><input name="local_addr_unit" type="text" placeholder={this.state.local_addr_unit} onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col><Field>Local Address Postal Code:</Field></bs.Col>
                            <bs.Col><input name="local_addr_post_code" type="text" placeholder={this.state.local_addr_post_code} onChange={e => this.handleChange(e)}/></bs.Col>

                        </bs.Row>
                    </bs.Container>
                </ProfileBox>
                <ProfileBox>
                    <bs.Col><button type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary" >Save Changes</button></bs.Col>
                </ProfileBox>
            </EventDiv>
        );
    }
    
};
