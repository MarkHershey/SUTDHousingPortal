import React from 'react';
import styled from 'styled-components';
import avatar from "../avatar.png";
import * as bs from 'react-bootstrap';
import ProfileData from "./profile_data";
import Student from "../variables/studentinfo";
import {getCurrentStudentInfo} from "../variables/studentinfo";

const ProfileBox = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 100pt;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

/*var mockStudent = new Student("1005515","Eric Smith","Male","Undergraduate","2021",false,
false,"Singaporean",98765432,"sutd@email.com","smith@gmail.com","500100","8 Somapah Rd",
"#06-88",[],[],1004445,"Prefered Room OBJ","lifestyle OBJ",false,100);*/





export default function Profile() {
    return (
        <div align="center">
            <br/>
            <img src={avatar} alt="No Avatar" width="150px"/>
            <br/>
            <br/>
            <h4>Eric Smith</h4>
            <ProfileData userData={getCurrentStudentInfo()}/>
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
