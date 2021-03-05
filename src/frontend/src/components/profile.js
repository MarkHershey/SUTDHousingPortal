import React from 'react';
import styled from 'styled-components';
import avatar from "../avatar.png";
import * as bs from 'react-bootstrap';
import ProfileData from "./profile_data";

const ProfileBox = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 100pt;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

export default function Profile() {
    return (
        <div align="center">
            <br/>
            <img src={avatar} alt="No Avatar" width="150px"/>
            <br/>
            <br/>
            <h4>Eric Smith</h4>
            <ProfileData/>
            <ProfileBox>
                <bs.Container>
                    <bs.Row>
                        <bs.Col><button type="button" className="btn btn-outline-primary">Edit Room Preference</button></bs.Col>
                        <bs.Col><button type="button" className="btn btn-outline-primary">Edit Personal Profile</button></bs.Col>
                        <bs.Col><button type="button" className="btn btn-outline-primary">Edit Lifestyle Profile</button></bs.Col>
                    </bs.Row>
                </bs.Container>
            </ProfileBox>
        </div>
    );
};
