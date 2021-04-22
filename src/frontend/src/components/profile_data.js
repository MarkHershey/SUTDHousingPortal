import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {getUserInfoJson} from "../functions/localstorage";

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

export default class ProfileData extends React.Component{
    constructor(props) {
        super(props);
        this.state = getUserInfoJson();
    }

    render(){
        return(
            <ProfileBox>
                <bs.Container>
                    <bs.Row>
                        <bs.Col><Field>Student ID:</Field></bs.Col>
                        <bs.Col><Answer id="ppl_prof_student_id_display">{this.state.student_id}</Answer></bs.Col>
                        <bs.Col><Field>Gender:</Field></bs.Col>
                        <bs.Col><Answer id="ppl_prof_gender_display">{this.state.gender}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Enrollment Year:</Field></bs.Col>
                        <bs.Col><Answer id="ppl_prof_enrollment_year_display">{this.state.year_of_enrollment}</Answer></bs.Col>
                        <bs.Col><Field>Type of Enrollment:</Field></bs.Col>
                        <bs.Col><Answer id="ppl_prof_enrollment_type_display">{this.state.enrollment_type}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Mobile Number:</Field></bs.Col>
                        <bs.Col><Answer id = "ppl_prof_phone_number_display">{this.state.phone_number}</Answer></bs.Col>
                        <bs.Col><Field>Nationality:</Field></bs.Col>
                        <bs.Col><Answer id="ppl_prof_nationality_display">{this.state.nationality}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Disciplinary Rec:</Field></bs.Col>
                        <bs.Col><Answer>{this.state.disciplinary_records.length}</Answer></bs.Col>
                        <bs.Col><Field>Event Rec:</Field></bs.Col>
                        <bs.Col><Answer id="ppl_prof_disciplinary_display">{this.state.attended_events.length}</Answer></bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col><Field>Address: </Field></bs.Col>
                        <bs.Col><Answer id = "ppl_prof_address_display">{this.state.local_addr_street+" "+this.state.local_addr_unit+" "+this.state.local_addr_post_code}</Answer></bs.Col>
                        <bs.Col><Field>Current Term:</Field></bs.Col>
                        <bs.Col><Answer>Term 5</Answer></bs.Col>
                    </bs.Row>
                </bs.Container>
            </ProfileBox>
        );
    }
}
