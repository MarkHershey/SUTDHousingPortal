import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {Typography, Slider, TextField, Checkbox } from '@material-ui/core';
import {Student} from "../functions/studentinfo";
import {getCurrentStudentInfo} from "../functions/studentinfo";
import {getUserInfoJson} from "../functions/localstorage";
import {BsPrefixComponent} from "react-bootstrap/esm/helpers";


export default class LifestyleData extends React.Component {
    constructor(props) {
        super(props);
        this.state = getUserInfoJson().preference_lifestyle;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name, value) {
        if(value==1 && (name=="like_social" || name=="like_clean")){
            value=true;
        } else {
            value=false;
        }
        this.setState({
            ...this.state,
            [name]: value
        });
        var data = this.state;
        this.props.parentCallBack(data);
    }


    render() {
        return (
            <bs.Container>
                <h3>Lifestyle Information</h3>
                <br/>
                <Typography id="socialbility-slider_topo">
                    Sociability
                </Typography>
                <bs.Row>
                    <bs.Col lg={4}></bs.Col>
                    <bs.Col lg={4}><Slider
                        id="socialbility_slider"
                        name="socialbility"
                        defaultValue={this.state.like_social == true ? 1:0}
                        aria-labelledby="socialbility-slider"
                        step={1}
                        marks
                        min={0}
                        max={1}
                        onChange={(e, value) => this.handleChange("like_social", value)}
                        color="secondary"
                    /></bs.Col>
                    <bs.Col lg={4}></bs.Col>
                </bs.Row>
                <Typography id="cleanliness-slider_topo">
                    Cleanliness
                </Typography>
                <bs.Row>
                    <bs.Col lg={4}></bs.Col>
                    <bs.Col lg={4}><Slider
                        id="cleanliness_slider"
                        defaultValue={this.state.like_clean==true ? 1:0}
                        aria-labelledby="cleanliness-slider"
                        step={1}
                        marks
                        min={0}
                        max={1}
                        color="primary"
                        onChange={(e, value) => this.handleChange("like_clean", value)}
                    /></bs.Col>
                    <bs.Col lg={4}></bs.Col>
                </bs.Row>
                {/*
                <Typography id="noisiness-slider">
                    Noisiness Level
                </Typography>
                <bs.Row>
                    <bs.Col lg={4}></bs.Col>
                    <bs.Col lg={4}><Slider
                        id="noisiness_slider"
                        defaultValue={this.state.like_quite}
                        aria-labelledby="noisiness-slider"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        valueLabelDisplay="auto"
                        color="secondary"
                        onChange={(e, value) => this.handleChange("like_quite", value)}
                    /></bs.Col>
                    <bs.Col lg={4}></bs.Col>
                </bs.Row>
                */}
                <form noValidate>
                    <TextField
                        id="time-sleep"
                        label="What time do you normally sleep?"
                        margin="normal"
                        size="medium"
                        type="time"
                        onChange={(e) => {
                            this.handleChange("bedtime", e.target.value)
                        }}
                        defaultValue={this.state.bedtime}
                        style={{width: '350px'}}
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
                        onChange={(e) => this.handleChange("wakeup_time", e.target.value)}
                        defaultValue={this.state.wakeup_time}
                        style={{width: '350px'}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300,
                        }}
                    />
                </form>
            </bs.Container>
        );
    }
}
