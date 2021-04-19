import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {getCurrentStudentInfo} from "../../variables/studentinfo";
import {getDisciplinaryRecord, updateDisciplinaryRecord} from "../../variables/disciplinaryrecordinfo";
import {getPersonalDisciplinaryRecordInfoJson, getUserInfoJson, getUsername} from "../../variables/localstorage";
import {createEvent} from "../../variables/eventinfo";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "react-bootstrap/Button";
import {Input, notification} from "antd";
import TextArea from "antd/es/input/TextArea";

const Field = styled.p`
  color: #3C64B1;
  text-align: right;
`;

const EditBox = styled.div`
  background-color: #F3F6FA;
  margin: 10pt 10pt;
  padding: 10pt 10pt;
  border-radius: 20pt;
`;

const EventDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  grid-column: auto;
  text-align: center;
`;

export default class EditDisciplinaryRecord extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            student_id: "",
            record_type: "",
            description: "",
            points_deduction: 0
        };
    }

    componentDidMount() {
        const fetchJSON = async () => {
            getDisciplinaryRecord(this.props.location.state.uid).then(r => {
                this.setState(getPersonalDisciplinaryRecordInfoJson());
                console.log("current disciplinary record info json");
                console.log(getPersonalDisciplinaryRecordInfoJson());
            });
        }
        fetchJSON();
    }

    handleUpdate() {
        console.log("new event submit");
        if (this.state.student_id === "" ||
            this.state.record_type === "" ||
            this.state.description === "" ||
            this.state.points_deduction == 0
        ) {
            notification.error({
                message: 'Invalid Form',
                description: 'Fill in all the fields and retry'
            });
            return;
        }
        updateDisciplinaryRecord(this.props.location.state.uid, this.state.description,
            this.state.points_deduction);
        this.props.history.push({
                pathname: "/",
            }
        );
    }

    handleChange(event) {
        let value = event.target.value;
        if (event.target.name == "points_deduction") {
            value = parseInt(value);
        }
        console.log(event);
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
        console.log(this.state);
    }


    render() {
        return (
            <EventDiv>
                <h3>Edit Disciplinary Record</h3>
                <EditBox>
                    <bs.Container>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Student ID:</Field></bs.Col>
                            <bs.Col lg={3}><Input disabled="true" value={this.state.student_id}
                                                  id="edit_disciplinary_record_id" name="student_id" type="text"
                                                  onChange={e => this.handleChange(e)}/></bs.Col>
                            <bs.Col lg={3}><Field>Record Type:</Field></bs.Col>
                            <bs.Col lg={3}><Input disabled="true" value={this.state.record_type}
                                                  id="edit_disciplinary_record_type" name="record_type" type="text"
                                                  onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Description:</Field></bs.Col>
                            <bs.Col lg={9}><TextArea value={this.state.description} id="edit_disciplinary_record_description"
                                                     name="description" cols="55" rows="5"
                                                     onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                        <br/>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Points Deduction</Field></bs.Col>
                            <bs.Col lg={3}><Input value={this.state.points_deduction}
                                                  id="edit_disciplinary_record_points_deduction" name="points_deduction"
                                                  type="number" onChange={e => this.handleChange(e)}/></bs.Col>
                        </bs.Row>
                    </bs.Container>
                </EditBox>
                <EditBox>
                    <bs.Col>
                        <button id="edit_disciplinary_record_btn" type="submit" onClick={this.handleUpdate}
                                className="btn btn-outline-primary">Update
                        </button>
                    </bs.Col>
                </EditBox>
            </EventDiv>
        );
    }

};
