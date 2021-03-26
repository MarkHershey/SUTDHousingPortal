import React from 'react';
import styled from 'styled-components';
import avatar from "../avatar.png";
import * as bs from 'react-bootstrap';
import ProfileData from "./profile_data";
import {getUserInfoJson} from "../variables/localstorage";

const ProfileBox = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 100pt;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

export default class Profile extends React.Component{
    render() {
        return (
            <div align="center">
                <br/>
                <img src={avatar} alt="No Avatar" width="150px"/>
                <br/>
                <br/>
                <h4>{getUserInfoJson().full_name}</h4>
                <ProfileData/>
                <ProfileBox>
                    <bs.Container>
                        <bs.Row>
                            <bs.Col><a href="/room_profile_edit"><button type="button" className="btn btn-outline-primary" id = "edit_room_profile_btn">Edit Room Preference</button></a></bs.Col>
                            <bs.Col><a href="/profile_edit"><button type="button" className="btn btn-outline-primary" id = "edit_personal_profile_btn">Edit Personal Profile</button></a></bs.Col>
                            <bs.Col><a href="/lifestyle_profile_edit"><button type="button" className="btn btn-outline-primary" id = "edit_lifestyle_profile_btn">Edit Lifestyle Profile</button></a></bs.Col>
                        </bs.Row>
                    </bs.Container>
                </ProfileBox>
            </div>
        );
    }
}
