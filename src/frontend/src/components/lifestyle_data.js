import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import { Typography, Slider, TextField } from '@material-ui/core';
import {Student} from "../variables/studentinfo";
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {getUserInfoJson} from "../variables/auth";
import { BsPrefixComponent } from "react-bootstrap/esm/helpers";


export default class LifestyleData extends React.Component{
    constructor(props){
        super(props);
        this.state = getUserInfoJson().preference_lifestyle;
        console.log(this.state);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }
    onTrigger = (event) => {
        this.props.parentCallBack(this.state);
    }
    handleChange(name,value){
        this.setState({
            ...this.state,
            [name]: value
        });
        console.log(this.state);
    }
    handleSubmit(){
        console.log("submitted")
    }

    render(){
        return(
            <bs.Container>
                <h1>Lifestyle Information</h1>
                <Typography id="socialbility-slider">
                    Socialbility
                </Typography>
                <Slider
                    name="socialbility"
                    defaultValue={0}
                    aria-labelledby="socialbility-slider"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    onChange = {(e,value) => this.handleChange("like_social",value)}
                    />

                <Typography id="cleanliness-slider">
                    Cleanliness
                </Typography>
                <Slider
                    defaultValue={0}
                    aria-labelledby="cleanliness-slider"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    onChange = {(e,value) => this.handleChange("like_clean",value)}
                    />

                <Typography id="noisiness-slider">
                    Noisiness Level
                </Typography>
                <Slider
                    defaultValue={0}
                    aria-labelledby = "noisiness-slider"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    onChange = {(e,value) => this.handleChange("like_quite",value)}
                    />

                <form noValidate>
                <TextField
                    id="time-sleep"
                    label="What time do you normally sleep?"
                    margin="normal"
                    size="medium"
                    type="time"
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
                    label="What time do you normally wake up?" 
                    margin="normal"
                    size="medium"
                    type="time"
                    defaultValue="07:00"
                    style={{width:'350px'}}
                    InputLabelProps={{
                        shrink:true,
                    }}
                    inputProps={{
                        step:300,
                    }}
                />
                </form>
            </bs.Container>
        );
    }
}