import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import LifestyleData from "./lifestyle_data";
import {updateLifestyleProfileInfo} from "../functions/lifestyleinfo";
import {getUserInfoJson} from "../functions/localstorage";
import {getCurrentStudentInfo} from "../functions/studentinfo";

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
        this.checkValidation = this.checkValidation.bind(this);
    }
    lifestyleCallback(childData){
        this.state = childData;
        console.log(this.state);
    }
    checkValidation(){
        var stateNames = Object.keys(this.state);
        var stateValues = Object.values(this.state);
        for(var i=0;i<stateNames.length;i++){
            if(stateValues==""){
                console.log("ffailed");
                return false;
            }
        }
        return true;
    }
    handleSubmit(){
        if(this.checkValidation()){
            console.log("submitted");
            console.log(this.state);
            updateLifestyleProfileInfo(this.state.sleep_time,this.state.wakeup_time,this.state.like_social,
                this.state.like_quiet,this.state.like_clean,this.state.diet,this.state.use_aircon,this.state.smoking);
            getCurrentStudentInfo();
            this.state = getUserInfoJson().preference_lifestyle;
            this.props.history.push("/profile");
        } else {
            console.log("invalid");
        }
        
    }
    render(){
    return (
        <EventDiv>
            <bs.Container>
                <LifestyleData parentCallBack={this.lifestyleCallback} parentState={this.state}/>
                <br/>
                < ProfileBox>
                    <bs.Row>
                        <bs.Col><button id="lifestyle_save_btn" type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary">Save</button></bs.Col>
                    </bs.Row>
                </ProfileBox>                    
            </bs.Container>
        </EventDiv>
        );
    }
}
