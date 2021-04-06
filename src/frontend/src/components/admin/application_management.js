import * as bs from "react-bootstrap";
import React from "react";
import {useHistory} from "react-router"
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {
    submitApplicationPeriod,
    getApplicationPeriodInfo,
    getAllApplicationPeriodInfo,
    deleteApplicationPeriodInfo,
    getOngoingApplicationPeriodInfo,
    
} from "../../variables/applicationperiodinfo"
import { 
    getPersonalApplicationPeriodInfoJson,

} from "../../variables/localstorage";

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

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props){
    const {row} = props;
    const classes = useRowStyles();
    let history = useHistory();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                </TableCell>
                <TableCell component="th" scope="row">{row.created_by}</TableCell>
                <TableCell align="right">Application status</TableCell>
                <TableCell align="right">Room Offered</TableCell>
            </TableRow>
        </React.Fragment>
    )
};

export default class ApplicationManagement extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeArrays = this.handleChangeArrays.bind(this);
        this.createUI = this.createUI.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.state = {
            application_window_open:"",
            application_window_close:"",
            applicable_periods: ["string"],
            applicable_rooms: ["string"],
            applicable_students: ["string"],

        }
    }

    componentDidMount(){
        const fetchJSON = async () =>{
            getApplicationPeriodInfo(this.props.location.state.uid).then(r=>{
                this.setState(getPersonalApplicationPeriodInfoJson());
                console.log("Current Application Period Info JSON");
                console.log(getPersonalApplicationPeriodInfoJson());
                
            });

        }
        fetchJSON();
    }

    handleSubmit() {
        console.log("new event submit");
        if (this.state.application_window_open === "" ||
            this.state.application_window_close === "" ||
            this.state.applicable_periods === "" 
            //this.state.applicable_rooms === "" ||
            //this.state.applicable_students === ""
            ) {
            alert("Invalid Form!")
            return;
        }
        submitApplicationPeriod(this.state.application_window_open,this.state.application_window_close,
            this.state.applicable_periods,this.state.applicable_rooms,this.state.applicable_students);
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
                        <bs.Col lg={3}><Field>Start Date:</Field></bs.Col>
                        <bs.Col lg={3}>
                            <input type="date" name="start_date" value={el.start_date ||''} onChange={this.handleChangeArrays.bind(this, i)} />
                        </bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col lg={3}><Field>End Date:</Field></bs.Col>
                        <bs.Col lg={3}>
                            <input type="date" name="end_date" value={el.end_date ||''} onChange={this.handleChangeArrays.bind(this, i)} />
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

    handleDropdown(event){
        const name = event.target.name;
        this.state.title = name;
        console.log(this.state);
    }

    render() {
        return (
            <EventDiv>
                <h3>Manage Application Window</h3>
                <EditBox>
                    <bs.Container>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Application Opening Date:</Field></bs.Col>
                            <bs.Col><Field>{new Date(Date.parse(this.state.application_window_open)).toDateString()}</Field></bs.Col>
                            <bs.Col lg={3}><Field>Application Closing Date:</Field></bs.Col>
                            <bs.Col lg={3}><Field>{new Date(Date.parse(this.state.application_window_close)).toDateString()}</Field></bs.Col>
                        </bs.Row>
                        <bs.Row>
                            <bs.Col lg={3}><Field>Applicable periods:</Field></bs.Col>
                            
                        </bs.Row>
                        {this.createUI()}
                    </bs.Container>

                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell align="left">Student name</TableCell>
                                    <TableCell align="left">Application Status</TableCell>
                                    <TableCell align="left">Room Offered</TableCell>
                                </TableRow>
                            </TableHead>
                            {/*
                            <TableBody>
                                {this.state.application_forms_map.map((row)=>(
                                    <Row key={row.id} row={row}/>
                                ))}
                            </TableBody>
                                */}
                        </Table>
                    </TableContainer>
                </EditBox>
                <br/>
                <Apply2BtnSet>
                    <bs.Container>
                        <bs.Row> 
                            <bs.Col><button type="button" className="btn btn-outline-primary" onClick={this.handleSubmit}>Edit Application Period</button></bs.Col>
                        </bs.Row>
                    </bs.Container>
                </Apply2BtnSet>
            </EventDiv>
                );
    };
}