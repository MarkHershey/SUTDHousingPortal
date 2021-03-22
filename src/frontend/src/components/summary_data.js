import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
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

export default function SummaryData(){
    return(
        <ProfileBox>
            <bs.Container>
                <h4>Personal Details</h4>
                <br/>
                <bs.Row>
                    <bs.Col><Field>Student ID:</Field></bs.Col>
                    <bs.Col><Answer>1005555</Answer></bs.Col>
                    <bs.Col><Field>Gender:</Field></bs.Col>
                    <bs.Col><Answer>Male</Answer></bs.Col>
                </bs.Row>

                <bs.Row>
                    <bs.Col><Field>Enrollment Year:</Field></bs.Col>
                    <bs.Col><Answer>2021</Answer></bs.Col>
                    <bs.Col><Field>Type of Enrollment:</Field></bs.Col>
                    <bs.Col><Answer>Undergraduate</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Mobile:</Field></bs.Col>
                    <bs.Col><Answer>98765432</Answer></bs.Col>
                    <bs.Col><Field>Nationality:</Field></bs.Col>
                    <bs.Col><Answer>Singaporean</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Disciplinary Record:</Field></bs.Col>
                    <bs.Col><Answer>0</Answer></bs.Col>
                    <bs.Col><Field>Housing Event:</Field></bs.Col>
                    <bs.Col><Answer>1/2</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Address: </Field></bs.Col>
                    <bs.Col><Answer>8 Somapah Rd, Singapore 487372</Answer></bs.Col>
                    <bs.Col><Field>Current Term:</Field></bs.Col>
                    <bs.Col><Answer>Term 5</Answer></bs.Col>
                </bs.Row>
                <hr/>
                <h4>Room Preference</h4>
                <br/>
                <bs.Row>
                    <bs.Col><Field>Prefered Block</Field></bs.Col>
                    <bs.Col><Answer>Block 55</Answer></bs.Col>
                    <bs.Col><Field>Prefered Level</Field></bs.Col>
                    <bs.Col><Answer>Low Level(L1-L4)</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Near Pantry</Field></bs.Col>
                    <bs.Col><Answer>Yes</Answer></bs.Col>
                    <bs.Col><Field>Near Toilet</Field></bs.Col>
                    <bs.Col><Answer>No</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Near Group Study Room</Field></bs.Col>
                    <bs.Col><Answer>No</Answer></bs.Col>
                    <bs.Col><Field>Near Quiet Study Room</Field></bs.Col>
                    <bs.Col><Answer>No Preference</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Near Meeting Room</Field></bs.Col>
                    <bs.Col><Answer>Yes</Answer></bs.Col>
                    <bs.Col><Field>Near Recreational Room</Field></bs.Col>
                    <bs.Col><Answer>No</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Facing Window</Field></bs.Col>
                    <bs.Col><Answer>Yes</Answer></bs.Col>
                    <bs.Col><Field>Have Shutters</Field></bs.Col>
                    <bs.Col><Answer>No</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Room Type(1st Choice)</Field></bs.Col>
                    <bs.Col><Answer>Single Room</Answer></bs.Col>
                    <bs.Col><Field>Room Type(2nd Choice)</Field></bs.Col>
                    <bs.Col><Answer>Double Room</Answer></bs.Col>
                </bs.Row>
                <hr/>
                <h4>Lifestyle Preferences</h4>
                <br/>
                <Typography id="socialbility-slider">
                    Socialbility
                </Typography>
                <Slider
                    defaultValue={5}
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
                    defaultValue={4}
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
                    defaultValue={3}
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
                    defaultValue="22:00"
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
                    defaultValue="07:00"
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
};