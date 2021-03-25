import * as bs from "react-bootstrap";
import React, {useState} from "react";
import styled from "styled-components";
import { instanceOf } from "prop-types";
import { Redirect, useHistory } from "react-router";
import { getUserInfoJson } from "../variables/localstorage";
import {updateRoomProfileInfo} from "../variables/roomprofileinfo";


const EventDiv = styled.div`
display: grid;
grid-gap: 20px;
margin-top: 1em;
margin-left: 2em;
margin-right: 2em;
grid-column: auto;
text-align: center;
`;

const Question = styled.p`
text-align: Left;
color: #3C64B1;
font-weight: bold;
font-size: medium;
`;

const Apply2BtnSet = styled.div`
background-color: #F3F6FA;
margin: 20pt 0pt;
padding: 20pt 20pt;
border-radius: 20pt;
`;

export default class RoomProfileEdit extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        var roomPreferences = getUserInfoJson().preference_room
        this.state = roomPreferences;
    }

    handleChange(event) {
        const value = event.target.value;
        console.log(event.target.name);
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        console.log("clicked submit");
        updateRoomProfileInfo(this.state.room_type,this.state.room_type_2nd,
            this.state.block,this.state.block_2nd,
            this.state.level_range,this.state.window_facing,this.state.near_to_lift,
            this.state.near_to_washroom,this.state.level_has_pantry,this.state.level_has_mr,
            this.state.level_has_gsr,this.state.level_has_rr,this.state.weightage_order
            );

    }

    render() {
        return (
            <EventDiv>
            <h3>Room Preference</h3>
            <form className="form" onSubmit={this.handleSubmit}>
            <bs.Container>
                <bs.Row>
                    <bs.Col><Question>Preferred Roommate</Question></bs.Col>
                    <bs.Col><Question>Blacklisted Roommate</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Student ID"
                                    aria-describedby="basic-addon1" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Student ID"
                                    aria-describedby="basic-addon1" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                    </bs.Col>
                </bs.Row>
                <br/>
                
                <bs.Row>
                    <bs.Col><Question>Preferred Block</Question></bs.Col>
                    <bs.Col><Question>Preferred Block 2nd Choice</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block"
                                    value="55" required defaultChecked={this.state.block === "Block 55" ? true:false}/>
                                <label className="form-check-label">
                                    Block 55
                                </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block" 
                                    value="57" defaultChecked={this.state.block==="Block 57" ? true:false}/>
                            <label className="form-check-label">
                                Block 57
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block"
                                    value="59" defaultChecked={this.state.block==="Block 59" ? true:false}/>
                            <label className="form-check-label">
                                Block 59
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block"
                                    value="ANY" defaultChecked={this.state.block==="No Preference" ? true:false}/>
                                <label className="form-check-label">
                                    No Preference
                                </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd"
                                    value="B55" required defaultChecked={this.state.block_2nd==="Block 55" ? true:false}/>
                                <label className="form-check-label">
                                    Block 55
                                </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd" 
                                    value="57" defaultChecked={this.state.block_2nd==="Block 57" ? true:false}/>
                            <label className="form-check-label">
                                Block 57
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd"
                                    value="59" defaultChecked={this.state.block_2nd==="Block 59" ? true:false}/>
                            <label className="form-check-label">
                                Block 59
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd"
                                    value="ANY" defaultChecked={this.state.block_2nd==="No Preference" ? true:false}/>
                                <label className="form-check-label">
                                    No Preference
                                </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Preferred Level</Question></bs.Col>
                    <bs.Col><Question>Near Lift</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_range"
                                    value="LOWER" required defaultChecked={this.state.level_range==="Low Level" ? true:false}/>
                            <label className="form-check-label">
                                Low Level(L1 - L4)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_range"
                                    value="MIDDLE" defaultChecked={this.state.level_range==="Medium Level" ? true:false}/>
                            <label className="form-check-label">
                                Medium Level(L5 - L7)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_range"
                                    value="UPPER" defaultChecked={this.state.level_range==="High Level" ? true:false}/>
                            <label className="form-check-label">
                                High Level(L8 - L12)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_range"
                                    value="ANY" defaultChecked={this.state.level_range==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_lift"
                            value={true} required defaultChecked={this.state.near_to_lift==="Yes" ? true:false}/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_lift"
                            value={false} defaultChecked={this.state.near_to_lift==="No" ? true:false}/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_lift"
                            value={null} defaultChecked={this.state.near_to_lift==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Near Pantry</Question></bs.Col>
                    <bs.Col><Question>Near Toilet</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_pantry"
                            value={true} required defaultChecked={this.state.level_has_pantry==="Yes" ? true:false}/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_pantry"
                            value={false} defaultChecked={this.state.level_has_pantry==="No" ? true:false}/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_pantry"
                            value={null} defaultChecked={this.state.level_has_pantry==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_washroom"
                            value={true} required defaultChecked={this.state.near_to_washroom==="Yes" ? true:false}/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_washroom"
                            value={false} defaultChecked={this.state.near_to_washroom==="No" ? true:false}/>
                            <label className="form-check-label" onChange={(e)=>this.handleChange(e)}>
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_washroom"
                            value={null} defaultChecked={this.state.near_to_washroom==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Near Group Study Room</Question></bs.Col>
                    <bs.Col><Question>Near Recreational Room</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_gsr"
                            value={true} required defaultChecked={this.state.level_has_gsr==="Yes" ? true:false}/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_gsr"
                            value={false} defaultChecked={this.state.level_has_gsr==="No" ? true:false}/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_gsr"
                            value={null} defaultChecked={this.state.level_has_gsr==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_rr"
                            value={true} required defaultChecked={this.state.level_has_rr==="Yes" ? true:false}/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_rr"
                            value={false} defaultChecked={this.state.level_has_rr==="No" ? true:false}/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_rr"
                            value={null} defaultChecked={this.state.level_has_rr==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Near Meeting Room</Question></bs.Col>
                    <bs.Col><Question>Facing Window</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_mr"
                            value="CAMPUS" required defaultChecked={this.state.level_has_mr==="Yes" ? true:false}/>
                            <label className="form-check-label">
                                Campus
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_mr"
                            value="AIRPORT" defaultChecked={this.state.level_has_mr==="No" ? true:false}/>
                            <label className="form-check-label">
                                Airport
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_mr"
                            value="BUILDING" defaultChecked={this.state.level_has_mr==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                Building
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_mr"
                            value="ANY" defaultChecked={this.state.level_has_mr==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="window_facing"
                            value={true} required defaultChecked={this.state.window_facing==="Yes" ? true:false}/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="window_facing"
                            value={false} defaultChecked={this.state.window_facing==="No" ? true:false}/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="window_facing"
                            value={null} defaultChecked={this.state.window_facing==="No Preference" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Room Type (1st Choice)</Question></bs.Col>
                    <bs.Col><Question>Room Type (2nd Choice)</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type"
                            value="SINGLE" required defaultChecked={this.state.room_type==="Single Room" ? true:false}/>
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type"
                            value="DOUBLE" defaultChecked={this.state.room_type==="Double Room" ? true:false}/>
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type"
                            value="SINGLE ENSUITE" defaultChecked={this.state.room_type==="Single Studio" ? true:false}/>
                            <label className="form-check-label">
                                Single Ensuite
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type"
                            value="ANY" defaultChecked={this.state.room_type==="Single Studio" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type_2nd"
                            value="SINGLE" defaultChecked={this.state.room_type_2nd==="Single Room" ? true:false}/>
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type_2nd"
                            value="DOUBLE" defaultChecked={this.state.room_type_2nd==="Double Room" ? true:false}/>
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type_2nd"
                            value="SINGLE ENSUITE" defaultChecked={this.state.room_type_2nd==="Single Studio" ? true:false}/>
                            <label className="form-check-label">
                                Single Ensuite
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type_2nd"
                            value="ANY" defaultChecked={this.state.room_type_2nd==="Single Studio" ? true:false}/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>
                
            </bs.Container>
            <br/>
            <Apply2BtnSet>
                <bs.Container>
                    <bs.Row>
                        <bs.Col><button type="submit" className="btn btn-outline-primary" onSubmit={this.handleSubmit}>Save</button></bs.Col>
                    </bs.Row>
                </bs.Container>
            </Apply2BtnSet>
            </form>
        </EventDiv>
        )
        
    }
}
