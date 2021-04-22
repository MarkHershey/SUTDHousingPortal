import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import LifestyleData from "./lifestyle_data";
import {updateLifestyleProfileInfo} from "../functions/lifestyleinfo";
import {getUserInfoJson} from "../functions/localstorage";
import {getCurrentStudentInfo} from "../functions/studentinfo";
import {ApplicationStep} from "./application_steps";

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

export default class ApplicationThree extends React.Component{
    constructor(props){
        super(props);
        this.state = getUserInfoJson().preference_lifestyle;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.lifestyleCallback = this.lifestyleCallback.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
    }

    lifestyleCallback(childData){
        this.state = childData;
    }
    checkValidation(){
        var stateNames = Object.keys(this.state);
        var stateValues = Object.values(this.state);
        for(var i=0;i<stateNames.length;i++){
            if(stateValues==""){
                console.log("failed");
                return false;
            }
        }
        return true;
    }

    handlePrev(){
        this.props.history.push({
            pathname: "/apply2"
        });
    }

    handleSave(){
        if(this.checkValidation()){
            console.log("saved");
            console.log("submitted");
            updateLifestyleProfileInfo(this.state.sleep_time,this.state.wakeup_time,this.state.like_social,
                this.state.like_quiet,this.state.like_clean,this.state.diet,this.state.use_aircon,this.state.smoking);
            getCurrentStudentInfo();
            this.state = getUserInfoJson().preference_lifestyle;
        }
    }

    handleSubmit(){
        if(this.checkValidation()){
            console.log("submitted");
            updateLifestyleProfileInfo(this.state.sleep_time,this.state.wakeup_time,this.state.like_social,
                this.state.like_quiet,this.state.like_clean,this.state.diet,this.state.use_aircon,this.state.smoking);
            getCurrentStudentInfo();
            this.state = getUserInfoJson().preference_lifestyle;
            //const history = useHistory();
            this.props.history.push({
                pathname: "/apply4"
            });
        }

    }
    render(){
        return (
            <EventDiv>
                <ApplicationStep i = {2}/>
                <bs.Container>
                    <LifestyleData parentCallBack={this.lifestyleCallback} parentState={this.state}/>
                    <br/>
                    <ProfileBox>
                        <bs.Row>
                                <bs.Col><button onClick={this.handlePrev} id="application3_back_btn" type="button" className="btn btn-outline-primary">Go Previous Step</button></bs.Col>
                                <bs.Col><button id="application3_save_btn" type="button" onClick={this.handleSave} className="btn btn-outline-primary">Save</button></bs.Col>
                                <bs.Col><button id="application3_next_btn" type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary">Go to next Step</button></bs.Col>
                        </bs.Row>
                    </ProfileBox>                    
                </bs.Container>
            </EventDiv>
        );
    }
    
}
