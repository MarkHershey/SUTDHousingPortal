import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {getUserInfoJson} from "../functions/localstorage";
import {Button, FormControl, MenuItem, Select, Slider, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const Field = styled.p`
  color: #3C64B1;
  text-align: right;
  float:left;
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
                        <bs.Col><Answer>{this.state.disciplinary_records.length}</Answer></bs.Col>
                        <bs.Col><Field>Housing Event:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.attended_events.length}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Address: </Field></bs.Col>
                        <bs.Col><Answer>{this.state.local_addr_street+'\n' + this.state.local_addr_unit}
                        , Singapore {this.state.local_addr_post_code}</Answer></bs.Col>
                        <bs.Col><Field>Current Term:</Field></bs.Col>
                        <bs.Col><Answer>Term 5</Answer></bs.Col>
                    </bs.Row>
                    <hr/>
                    <h4>Room Preference</h4>
                    <br/>
                    <bs.Row>
                        <bs.Col><Field>Preferred Block</Field></bs.Col>
                        <bs.Col><Answer>{this.state.preference_room.block == "55" ? "Block 55":
                        this.state.preference_room.block == "57" ? "Block 57":
                        this.state.preference_room.block == "59" ? "Block 59": "Any"  }</Answer></bs.Col>
                        <bs.Col><Field>Preferred Level</Field></bs.Col>
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
                    <Typography id="socialbility-slider_topo">
                    Sociability
                </Typography>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <bs.Col sm={4}><Slider
                        id="socialbility_slider"
                        name="socialbility"
                        defaultValue={this.state.preference_lifestyle.like_social}
                        aria-labelledby="socialbility-slider"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        disabled={true}
                        onChange={(e, value) => this.handleChange("like_social", value)}
                        color="primary"
                    /></bs.Col>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                <Typography id="cleanliness-slider_topo">
                    Cleanliness
                </Typography>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <bs.Col sm={4}><Slider
                        id="cleanliness_slider"
                        defaultValue={this.state.preference_lifestyle.like_clean}
                        aria-labelledby="cleanliness-slider"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        disabled={true}
                        color="primary"
                        onChange={(e, value) => this.handleChange("like_clean", value)}
                    /></bs.Col>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                <Typography id="noisiness-slider">
                    Noisiness Level
                </Typography>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <bs.Col sm={4}><Slider
                        id="noisiness_slider"
                        defaultValue={this.state.preference_lifestyle.like_quiet}
                        aria-labelledby="noisiness-slider"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        disabled={true}
                        valueLabelDisplay="auto"
                        color="primary"
                        onChange={(e, value) => this.handleChange("like_quiet", value)}
                    /></bs.Col>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                <Typography id="aircon-slider">
                    Use Aircon
                </Typography>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <bs.Col sm={4}><Slider
                        id="aircon_slider"
                        defaultValue={this.state.preference_lifestyle.use_aircon === false ? 0 : this.state.preference_lifestyle.use_aircon === true ? 1 : 0}
                        aria-labelledby="aircon-slider"
                        step={1}
                        marks
                        min={0}
                        max={1}
                        disabled={true}
                        valueLabelDisplay="off"
                        color="secondary"
                        onChange={(e, value) => this.handleChange("use_aircon", value)}
                    /></bs.Col>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                <Typography id="smokes-slider">
                    Smokes
                </Typography>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <bs.Col sm={4}><Slider
                        id="smokes_slider"
                        defaultValue={this.state.preference_lifestyle.smoking === false ? 0 : this.state.preference_lifestyle.smoking === true ? 1 : 0}
                        aria-labelledby="smokes-slider"
                        step={1}
                        marks
                        min={0}
                        max={1}
                        valueLabelDisplay="off"
                        color="secondary"
                        disabled={true}
                        onChange={(e, value) => this.handleChange("smoking", value)}
                    /></bs.Col>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <Button id="controlDropdownSleep" className={useStyles.button} onClick={()=>{
                        this.setState({
                            sleepDropDownOpen : true
                        })
                    }}>
                        Sleeping Time
                    </Button>
                    <FormControl className={useStyles.formControl}>
                        
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="selectSleep"
                        disabled={true}
                        open={this.state.sleepDropDownOpen}
                        onClose={()=>{
                            this.setState({
                                sleepDropDownOpen : false
                            })
                        }}
                        onOpen={()=>{ 
                            this.setState({
                                sleepDropDownOpen : true
                            })
                        }}
                        value={this.state.preference_lifestyle.sleep_time}
                        onChange={(e)=> this.handleChange("sleep_time",e.target.value)}
                        >
                        <MenuItem id="sleepMenuItem21" value={21}>21:00</MenuItem>
                        <MenuItem id="sleepMenuItem22" value={22}>22:00</MenuItem>
                        <MenuItem id="sleepMenuItem23" value={23}>23:00</MenuItem>
                        <MenuItem id="sleepMenuItem0" value={0}>00:00</MenuItem>
                        <MenuItem id="sleepMenuItem1" value={1}>1:00</MenuItem>
                        <MenuItem id="sleepMenuItem2" value={2}>2:00</MenuItem>
                        </Select>
                    </FormControl>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                <br/>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <Button id="controlDropdownWake" className={useStyles.button} onClick={()=>{
                        this.setState({
                            wakeUpDropDownOpen : true
                        })
                    }}>
                        Waking Up Time
                    </Button>
                    <FormControl className={useStyles.formControl}>
                        
                        <Select
                        disabled={true}
                        labelId="demo-controlled-open-select-label"
                        id="selectWake"
                        open={this.state.wakeUpDropDownOpen}
                        onClose={()=>{
                            this.setState({
                                wakeUpDropDownOpen : false
                            })
                        }}
                        onOpen={()=>{ 
                            this.setState({
                                wakeUpDropDownOpen : true
                            })
                        }}
                        value={this.state.preference_lifestyle.wakeup_time}
                        onChange={(e)=> this.handleChange("wakeup_time",e.target.value)}
                        >
                        <MenuItem id="wakeMenuItem5" value={5}>5:00</MenuItem>
                        <MenuItem id="wakeMenuItem6" value={6}>6:00</MenuItem>
                        <MenuItem id="wakeMenuItem7" value={7}>7:00</MenuItem>
                        <MenuItem id="wakeMenuItem8" value={8}>8:00</MenuItem>
                        <MenuItem id="wakeMenuItem9" value={9}>9:00</MenuItem>
                        <MenuItem id="wakeMenuItem10" value={10}>10:00</MenuItem>
                        <MenuItem id="wakeMenuItem11" value={11}>11:00</MenuItem>
                        </Select>
                    </FormControl>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                <br/>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                        <bs.Col>
                            <Field >Diet</Field>
                            <input disabled={true} id="lifestyle_diet" name="diet" placeholder={this.state.preference_lifestyle.diet}
                             onChange={(e)=>this.handleChange("diet",e.target.value)}></input>
                        </bs.Col>
                    <bs.Col sm={4}></bs.Col>
                </bs.Row>
                </bs.Container>
            </ProfileBox>
        );
    }   
}
