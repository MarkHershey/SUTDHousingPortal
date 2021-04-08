import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {getCurrentStudentInfo} from "../../variables/studentinfo";
import {updateStudentProfileInfo} from "../../variables/studentprofileinfo";
import {getUserInfoJson, getUsername} from "../../variables/localstorage";
import {setHouseGuardian} from "../../variables/houseguardianinfo";
import {createEvent} from "../../variables/eventinfo";
import Checkbox from '@material-ui/core/Checkbox';
import {notification, Input, Button, Tooltip} from "antd";
import {CloseCircleTwoTone, PlusCircleTwoTone, SearchOutlined} from '@ant-design/icons';
import { student_id } from "../../variables/applicationforminfo";

const Field = styled.p`
  color: #3C64B1;
  text-align: center;
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

const Apply2BtnSet = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 0;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

export default class AddHouseGuardian extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeArrays = this.handleChangeArrays.bind(this);
        this.createUI = this.createUI.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.state = {
            student_ids:[{student_id:""}]
        };
    }

    handleSubmit() {
        console.log(this.state);
        var student_ids = this.state.student_ids;
        student_ids.forEach(function(item,index){
            setHouseGuardian(item.student_id);
        });
    }

    handleChangeArrays(i, e) {
        const { name, value } = e.target;
        let student_ids = [...this.state.student_ids];
        student_ids[i] = {...student_ids[i], [name]:value};
        this.setState({ student_ids });
     }

    createUI(){
        return this.state.student_ids.map((el, i) => 
            <EventDiv key={i}>
                <bs.Container >
                    <bs.Row>
                        <bs.Col lg={4}></bs.Col>
                        <bs.Col lg={4}>
                            <Input type="text" name="student_id" value={el.student_id ||''} onChange={this.handleChangeArrays.bind(this, i)} />
                        </bs.Col>
                        <bs.Col lg={1}>
                            <CloseCircleTwoTone style={{ fontSize: '30px' }} onClick={this.removeClick.bind(this, i)} twoToneColor={"#ff0000"}/>
                        </bs.Col>
                        <bs.Col lg={1}>
                                <PlusCircleTwoTone style={{ fontSize: '30px' }} onClick={this.addClick.bind(this)} twoToneColor={"#52C41A"}/>
                        </bs.Col>
                        <bs.Col lg={2}></bs.Col>
                    </bs.Row>
                </bs.Container>
                <br/>
            </EventDiv>          
        )
    }
    
    addClick(){
        this.setState(prevState => ({
            student_ids: [...prevState.student_ids, {student_id:""}]
        }))
    }

    removeClick(i){
        let student_ids = [...this.state.student_ids];
        student_ids.splice(i,1);
        this.setState({ student_ids });
    }

    render() {
        return (
            <EventDiv>
                <h3>Add House Guardians</h3>
                <Field>Student IDs of new house guardians</Field>
                <EditBox>
                    <bs.Container>
                        <bs.Row>
                            <bs.Col>{this.createUI()}</bs.Col>
                        </bs.Row>
                    </bs.Container>
                </EditBox>
                <br/>
                <Apply2BtnSet>
                    <bs.Container>
                        <bs.Row> 
                            <bs.Col><button id="add_house_guardians_btn" type="button" className="btn btn-outline-primary" onClick={this.handleSubmit}>Add House Guardians</button></bs.Col>
                        </bs.Row>
                    </bs.Container>
                </Apply2BtnSet>
            </EventDiv>
                );
    };
}
