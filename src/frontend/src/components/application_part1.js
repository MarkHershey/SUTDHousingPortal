import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import ProfileData from "./profile_data";
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

export default function ApplicationOne() {
    return(
        <EventDiv>
            <ApplicationStep i ={0}/>
            <h3>Personal Information</h3>
            <ProfileData />
            <ProfileBox>
                <bs.Container>
                    <bs.Row>
                        <bs.Col><a href="/profile_edit"><button id="application1_edit_personal_btn" type="button" className="btn btn-outline-primary">Edit Personal Profile</button></a></bs.Col>
                        <bs.Col><a href="/apply2"><button id="application1_next_btn" type="button" className="btn btn-outline-primary">Go To Next Step</button></a></bs.Col>
                    </bs.Row>
                </bs.Container>
            </ProfileBox>
        </EventDiv>
    );
};
