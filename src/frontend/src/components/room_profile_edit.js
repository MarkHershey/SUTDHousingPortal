import * as bs from "react-bootstrap";
import React, {useState} from "react";
import styled from "styled-components";
import { instanceOf } from "prop-types";
import { Redirect, useHistory } from "react-router";
import { getUserInfoJson } from "../variables/auth";
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
                                    value="Block 55" required/>
                                <label className="form-check-label">
                                    Block 55
                                </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block" 
                                    value="Block 57"/>
                            <label className="form-check-label">
                                Block 57
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block"
                                    value="Block 59"/>
                            <label className="form-check-label">
                                Block 59
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block"
                                    value="No Preference"/>
                                <label className="form-check-label">
                                    No Preference
                                </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd"
                                    value="Block 55" required/>
                                <label className="form-check-label">
                                    Block 55
                                </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd" 
                                    value="Block 57"/>
                            <label className="form-check-label">
                                Block 57
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd"
                                    value="Block 59"/>
                            <label className="form-check-label">
                                Block 59
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="block_2nd"
                                    value="No Preference"/>
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
                                    value="Low Level" required/>
                            <label className="form-check-label">
                                Low Level(L1 - L4)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_range"
                                    value="Medium Level"/>
                            <label className="form-check-label">
                                Medium Level(L5 - L7)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_range"
                                    value="High Level"/>
                            <label className="form-check-label">
                                High Level(L8 - L12)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_range"
                                    value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_lift"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_lift"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_lift"
                            value="No Preference"/>
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
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_pantry"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_pantry"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_washroom"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_washroom"
                            value="No"/>
                            <label className="form-check-label" onChange={(e)=>this.handleChange(e)}>
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="near_to_washroom"
                            value="No Preference"/>
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
                            value="Yes"required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_gsr"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_gsr"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_rr"
                            value="Yes"required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_rr"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_rr"
                            value="No Preference"/>
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
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_mr"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="level_has_mr"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="window_facing"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="window_facing"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="window_facing"
                            value="No Preference"/>
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
                            value="Single Room" required/>
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type"
                            value="Double Room"/>
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type"
                            value="Single Studio"/>
                            <label className="form-check-label">
                                Single Studio
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type_2nd"
                            value="Single Room"/>
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type_2nd"
                            value="Double Room"/>
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>this.handleChange(e)}>
                            <input className="form-check-input" type="radio" name="room_type_2nd"
                            value="Single Studio"/>
                            <label className="form-check-label">
                                Single Studio
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>
                
            </bs.Container>
            <br/>
            <Apply2BtnSet>
                <bs.Container>
                    <bs.Row>
                        <bs.Col><button type="button" className="btn btn-outline-primary" onClick={this.handleSubmit}>Save</button></bs.Col>
                    </bs.Row>
                </bs.Container>
            </Apply2BtnSet>
            </form>
        </EventDiv>
        )
        
    }
}