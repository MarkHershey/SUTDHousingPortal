import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import { Typography, Slider, TextField } from '@material-ui/core';
import { getUserInfoJson } from "../variables/localstorage";

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

export default class SummaryData extends React.Component{
    constructor(props){
        super(props);
        this.state = getUserInfoJson();
    }
    render(){
        return(
            <ProfileBox>
                <bs.Container>
                    <h4>Personal Details</h4>
                    <br/>
                    <bs.Row>
                        <bs.Col><Field>Student ID:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.student_id}</Answer></bs.Col>
                        <bs.Col><Field>Gender:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.gender}</Answer></bs.Col>
                    </bs.Row>
    
                    <bs.Row>
                        <bs.Col><Field>Enrollment Year:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.year_of_enrollment}</Answer></bs.Col>
                        <bs.Col><Field>Type of Enrollment:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.enrollment_type}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Mobile:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.phone_number}</Answer></bs.Col>
                        <bs.Col><Field>Nationality:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.nationality}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Disciplinary Record:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.disciplinary_records}</Answer></bs.Col>
                        <bs.Col><Field>Housing Event:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.attended_events}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Address: </Field></bs.Col>
                        <bs.Col><Answer>{this.state.local_addr_street+'\n'}+{this.state.local_addr_unit}
                        , Singapore {this.state.local_addr_post_code}</Answer></bs.Col>
                        <bs.Col><Field>Current Term:</Field></bs.Col>
                        <bs.Col><Answer>Term 5</Answer></bs.Col>
                    </bs.Row>
                    <hr/>
                    <h4>Room Preference</h4>
                    <br/>
                    <bs.Row>
                        <bs.Col><Field>Prefered Block</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.block == "55" ? "Block 55":
                        this.state.preference_room.block == "57" ? "Block 57":
                        this.state.preference_room.block == "59" ? "Block 59": "Any"  }</Answer></bs.Col>
                        <bs.Col><Field>Prefered Level</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.level_range == "LOWER" ? "Low Level(L1-L4)":
                        this.state.preference_room.level_range == "MIDDLE" ? "Medium Level(L5-L7)":
                        this.state.preference_room.level_range == "UPPER" ? "High Level(L8-L12)": "Any" }</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Near Pantry</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.level_has_pantry ==true ? "Yes" :
                         this.state.preference_room.level_has_pantry ==false ? "No" : "Any"}</Answer></bs.Col>
                        <bs.Col><Field>Near Toilet</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.near_to_washroom ==true ? "Yes" :
                         this.state.preference_room.near_to_washroom ==false ? "No" : "Any"}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Near Group Study Room</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.level_has_gsr ==true ? "Yes" :
                         this.state.preference_room.level_has_gsr ==false ? "No" : "Any"}</Answer></bs.Col>
                        <bs.Col><Field>Facing Window</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.window_facing =="CAMPUS" ? "Campus" :
                         this.state.preference_room.windown_facing =="AIRPORT" ? "Airport" :
                         this.state.preference_room.window_facing == "BUILDING" ? "Building" : "Any"}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Near Meeting Room</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.level_has_mr ==true ? "Yes" :
                         this.state.preference_room.level_has_mr ==false ? "No" : "Any"}</Answer></bs.Col>
                        <bs.Col><Field>Near Recreational Room</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.level_has_rr ==true ? "Yes" :
                         this.state.preference_room.level_has_rr ==false ? "No" : "Any"}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Room Type(1st Choice)</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.room_type =="SINGLE" ? "Single Room":
                        this.state.preference_room.room_type == "DOUBLE" ? "Double Room" :
                        this.state.preference_room.room_type == "SINGLE_ENSUITE" ? "Single Ensuite Room" : "Any"}</Answer></bs.Col>
                        <bs.Col><Field>Room Type(2nd Choice)</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.room_type_2nd =="SINGLE" ? "Single Room":
                        this.state.preference_room.room_type_2nd == "DOUBLE" ? "Double Room" :
                        this.state.preference_room.room_type_2nd == "SINGLE_ENSUITE" ? "Single Ensuite Room" : "Any"}</Answer></bs.Col>
                    </bs.Row>
                    <hr/>
                    <h4>Lifestyle Preferences</h4>
                    <br/>
                    <Typography id="socialbility-slider">
                        Socialbility
                    </Typography>
                    <Slider
                        defaultValue={this.state.preference_lifestyle.like_social}
                        aria-labelledby="socialbility-slider"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        disabled={true}
                        valueLabelDisplay="auto"
                        />
    
                    <Typography id="cleanliness-slider">
                        Cleanliness
                    </Typography>
                    <Slider
                        defaultValue={this.state.preference_lifestyle.like_clean}
                        aria-labelledby="cleanliness-slider"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        disabled={true}
                        valueLabelDisplay="auto"
                        />
    
                    <Typography id="noisiness-slider">
                        Noisiness Level
                    </Typography>
                    <Slider
                        defaultValue={this.state.preference_lifestyle.like_quite}
                        aria-labelledby = "noisiness-slider"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        disabled={true}
                        valueLabelDisplay="auto"
                        />
    
                    <TextField
                        id="time-sleep"
                        label="Sleeping time"
                        margin="normal"
                        size="medium"
                        type="time"
                        disabled = {true}
                        defaultValue={this.state.preference_lifestyle.bedtime}
                        style={{width:'350px'}}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    <br/>
                    <TextField
                        id="time-wake"
                        label="Wake up time?"
                        margin="normal"
                        size="medium"
                        type="time"
                        disabled={true}
                        defaultValue={this.state.preference_lifestyle.wakeup_time}
                        style={{width:'350px'}}
                        InputLabelProps={{
                            shrink:true,
                        }}
                        inputProps={{
                            step:300,
                        }}
                    />
    
                </bs.Container>
            </ProfileBox>
        );
    }   
}