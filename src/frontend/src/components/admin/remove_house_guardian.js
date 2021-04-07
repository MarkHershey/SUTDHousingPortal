import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import {getCurrentStudentInfo} from "../../variables/studentinfo";
import {updateStudentProfileInfo} from "../../variables/studentprofileinfo";
import {getUserInfoJson, getUsername} from "../../variables/localstorage";
import {setHouseGuardian} from "../../variables/houseguardianinfo";
import {createEvent} from "../../variables/eventinfo";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "react-bootstrap/Button";
import {notification} from "antd";

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

const Apply2BtnSet = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 0;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

export default class RemoveHouseGuardian extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeArrays = this.handleChangeArrays.bind(this);
        this.createUI = this.createUI.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.state = {
            student_ids:[]
        };
    }

    handleSubmit(id) {
        setHouseGuardian(id);
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

    handleChangeArrays(i, e) {
        const { name, value } = e.target;
        let applicable_periods = [...this.state.applicable_periods];
        applicable_periods[i] = {...applicable_periods[i], [name]: value};
        this.setState({ applicable_periods });
     }

    createUI(){
        return this.state.applicable_periods.map((el, i) => 
            <EventDiv key={i}>
                <bs.Container>
                    <bs.Row>
                        <bs.Col lg={3}><Field>Student ID:</Field></bs.Col>
                        <bs.Col lg={3}>
                            <input type="text" name="student_id" value={el.student_id ||''} onChange={this.handleChangeArrays.bind(this, i)} />
                        </bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col lg={3}></bs.Col>
                        <bs.Col lg={3}>
                            <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
                            <input type='button' value='add more' onClick={this.addClick.bind(this)}/>    
                        </bs.Col>   
                    </bs.Row>                    
                </bs.Container>
            </EventDiv>          
        )
    }
    
    addClick(){
        this.setState(prevState => ({
            applicable_periods: [...prevState.applicable_periods, {start_date:"",end_date:""}]
        }))
    }

    removeClick(i){
        let applicable_periods = [...this.state.applicable_periods];
        applicable_periods.splice(i,1);
        this.setState({ applicable_periods });
    }

    render() {
        return (
            <EventDiv>
                <h3>Create Application Window</h3>
                <EditBox>
                    <bs.Container>
                        <Field>Student IDs of new house guardians</Field>
                        {this.createUI()}
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
