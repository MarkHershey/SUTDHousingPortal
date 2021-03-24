import * as bs from "react-bootstrap";
import React, {useState} from "react";
import styled from "styled-components";
import { instanceOf } from "prop-types";
import { Redirect, useHistory } from "react-router";
import LifestyleData from "./lifestyle_data";
import {updateLifestyleProfileInfo} from "../variables/lifestyleinfo";
import { getUserInfoJson } from "../variables/localstorage";
import {getCurrentStudentInfo} from "../variables/studentinfo";

const EventDiv = styled.div`
display: grid;
grid-gap: 20px;
margin-top: 1em;
margin-left: 2em;
margin-right: 2em;
grid-column: auto;
text-align: center;
`;

const ProfileBox = styled.div`
background-color: #F3F6FA;
margin: 20pt 100pt;
padding: 20pt 20pt;
border-radius: 20pt;
`;

export default class LifeStyleProfileEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = getUserInfoJson().preference_lifestyle;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.lifestyleCallback = this.lifestyleCallback.bind(this);
    }
    lifestyleCallback(childData){
        this.state = childData;
    }
    handleSubmit(){
        console.log("submitted")
        updateLifestyleProfileInfo(this.state.bedtime,this.state.wakeup_time,this.state.like_social,
            this.state.like_clean,this.state.like_quite);
        getCurrentStudentInfo();
        this.state = getUserInfoJson().preference_lifestyle;
    }
    render(){
    return (
        <EventDiv>
            <bs.Container>
                <LifestyleData parentCallBack={this.lifestyleCallback} parentState={this.state}/>
                <br/>
                < ProfileBox>
                    <bs.Row>
                        <bs.Col><button type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary">Save</button></bs.Col>
                    </bs.Row>
                </ProfileBox>                    
            </bs.Container>
        </EventDiv>
        );
    }
}