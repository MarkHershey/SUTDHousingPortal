import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";


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

 
export default function ProfileData(props) {
    return(
        <ProfileBox>
            <bs.Container>
                <bs.Row>
                    <bs.Col><Field>Student ID:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.student_id}</Answer></bs.Col>
                    <bs.Col><Field>Gender:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.gender}</Answer></bs.Col>
                </bs.Row>

                <bs.Row>
                    <bs.Col><Field>Enrollment Year:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.year_of_enrollment}</Answer></bs.Col>
                    <bs.Col><Field>Type of Enrollment:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.enrollment_type}</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Mobile:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.phone_number}</Answer></bs.Col>
                    <bs.Col><Field>Nationality:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.nationality}</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Disciplinary Record:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.disciplinary_records}</Answer></bs.Col>
                    <bs.Col><Field>Housing Event:</Field></bs.Col>
                    <bs.Col><Answer>{props.userData.attended_events}</Answer></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col><Field>Address: </Field></bs.Col>
                    <bs.Col><Answer>{props.userData.local_addr_street+" "+props.userData.local_addr_unit+
                    +" "+props.userData.local_addr_post_code}</Answer></bs.Col>
                    <bs.Col><Field>Current Term:</Field></bs.Col>
                    <bs.Col><Answer>Term 5</Answer></bs.Col>
                </bs.Row>
            </bs.Container>
        </ProfileBox>
    );
};
