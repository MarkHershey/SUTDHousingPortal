import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {deleteDisciplinaryRecord, getDisciplinaryRecord} from "../../functions/disciplinaryrecordinfo";
import {getPersonalDisciplinaryRecordInfoJson} from "../../functions/localstorage";

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

export default class ViewIndividualDisciplinaryRecord extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleEdit() {
        this.props.history.push({
                pathname: "/admin/disciplinary_record_edit",
                state: {
                    uid: this.state.uid
                }
            }
        );
    }

    handleDelete() {
        deleteDisciplinaryRecord(this.props.location.state.uid);
        this.props.history.push("/admin/disciplinary_record_view_all");
    }

    handleChange(event) {
        const value = event.target.value;
        console.log(event);
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
        console.log(this.state);
    }


    render() {
        if (this.props.location.state === undefined)
            window.location.replace("/")
        else
            return (
                <EventDiv>
                    <h3>View Disciplinary Record</h3>
                    <EditBox>
                        <bs.Container>
                            <bs.Row>
                                <bs.Col sm={3}><Field>Student ID:</Field></bs.Col>
                                <bs.Col sm={3}>{this.state.student_id}</bs.Col>

                                <bs.Col sm={3}><Field>Record Type:</Field></bs.Col>
                                <bs.Col sm={3}>{this.state.record_type}</bs.Col>

                            </bs.Row>
                            <bs.Row>
                                <bs.Col sm={3}><Field>Description:</Field></bs.Col>
                                <bs.Col sm={9}><textarea disabled="true" id="view_disciplinary_description"
                                                         name="description" cols="100" rows="8"
                                                         value={this.state.description}/></bs.Col>
                            </bs.Row>
                            <br/>
                            <bs.Row>
                                <bs.Col sm={3}><Field>Points Deduction:</Field></bs.Col>
                                <bs.Col sm={3}>{this.state.points_deduction}</bs.Col>
                            </bs.Row>
                        </bs.Container>
                    </EditBox>
                    <EditBox>
                        <bs.Row>
                            <bs.Col>
                                <button id="delete_disciplinary_record_btn" type="submit" onClick={this.handleDelete}
                                        className="btn btn-outline-primary">Delete Disciplinary Record
                                </button>
                            </bs.Col>
                            <bs.Col>
                                <button id="edit_disciplinary_record_btn" type="submit" onClick={this.handleEdit}
                                        className="btn btn-outline-primary">Edit Disciplinary Record
                                </button>
                            </bs.Col>
                        </bs.Row>
                    </EditBox>
                </EventDiv>
            );
    }

};
