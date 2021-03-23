import * as bs from "react-bootstrap";
import React, {useState} from "react";
import styled from "styled-components";
import { instanceOf } from "prop-types";
import { Redirect, useHistory } from "react-router";
import LifestyleData from "./lifestyle_data";

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

export default function ApplicationThree(){

    const history = useHistory();
    
    function handleSubmit(event){
        lifestyleCallback()
        //history.push("/application_summary")
    }
    function lifestyleCallback(e){
        console.log(e);
    }

    return (
        <EventDiv>
            <bs.Container>
                <LifestyleData parentCallBack={lifestyleCallback}/>
                <br/>
                < ProfileBox>
                    <bs.Row>
                            <bs.Col><a href="/apply2"><button type="button" className="btn btn-outline-primary">Go Previous Step</button></a></bs.Col>
                            <bs.Col><button type="button" className="btn btn-outline-primary">Save</button></bs.Col>
                            <bs.Col><button type="submit" onClick={handleSubmit} className="btn btn-outline-primary">Go to next Step</button></bs.Col>
                    </bs.Row>
                </ProfileBox>
                
            </bs.Container>
        </EventDiv>
        
    );
}