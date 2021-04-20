    import * as bs from "react-bootstrap";
import React from "react";
import {useHistory} from "react-router"
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import {getSpecificApplicationInfo} from "../../functions/applicationforminfo";
import Paper from '@material-ui/core/Paper';
import { InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {
    submitApplicationPeriod,
    getApplicationPeriodInfo,
    getAllApplicationPeriodInfo,
    deleteApplicationPeriodInfo,
    getOngoingApplicationPeriodInfo,
    
} from "../../functions/applicationperiodinfo";
import { 
    getPersonalApplicationPeriodInfoJson,
    getSpecificApplicationInfoJson,
    clearSpecificApplicationInfoJson

} from "../../functions/localstorage";
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
                <TableCell component="th" scope="row">{row}</TableCell>
                <TableCell align="left">{row}</TableCell>
                <TableCell align="left">Room Offered</TableCell>
            </TableRow>
        </React.Fragment>
    )
};

export default class ApplicationManagement extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.createUI = this.createUI.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleApplicationForms = this.handleApplicationForms.bind(this);
        
        this.state = {
            application_window_open:"",
            application_window_close:"",
            applicable_periods: ["string"],
            applicable_rooms: ["string"],
            applicable_students: ["string"],
            application_forms_map : {
                form1: {uid:"uid"}
            },
            studentData: {
                form1: {uid : "uid"}
            }
        }
    }

    componentDidMount(){
        const fetchJSON = async () =>{
            getApplicationPeriodInfo(this.props.location.state.uid).then(r=>{
                this.setState(getPersonalApplicationPeriodInfoJson());
            });
        }
        const fetchStudentData = async () => {
            //console.log(getPersonalApplicationPeriodInfoJson().application_forms_map);
            let studentApplication = [];
            let data = this.state.application_forms_map;
            for(const item in data){
                //console.log(item);
                //console.log(props[item]);
                if(data[item]!=""){
                    console.log(item);
                    if(getSpecificApplicationInfoJson()!=undefined){
                        studentApplication.push(getSpecificApplicationInfoJson());
                    }
                }
            }
            console.log(studentApplication);
            this.setState({
                studentData: studentApplication
            })
            console.log(this.state);
        }
        fetchJSON();
        fetchStudentData();
    }

    handleDelete() {
        deleteApplicationPeriodInfo(this.props.location.state.uid);
        this.props.history.push("/admin/application_viewing");
    }

    createUI(){
        return this.state.applicable_periods.map((el, i) => 
            <EventDiv key={i}>
                <bs.Container>
                    <bs.Row>
                        <bs.Col lg={3}><Field>Start Date:</Field></bs.Col>
                        <bs.Col lg={3}>
                            <input type="date" name="start_date" value={el.start_date ||''} />
                        </bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col lg={3}><Field>End Date:</Field></bs.Col>
                        <bs.Col lg={3}>
                            <input type="date" name="end_date" value={el.end_date ||''} />
                        </bs.Col>
                    </bs.Row>                    
                </bs.Container>
            </EventDiv>          
        )
    }

    handleApplicationForms(props){
        let studentApplication =[];
        /*
        for(const item in props){
            //console.log(item);
            //console.log(props[item]);
            if(props[item]!=""){
                console.log(item);
                var data =getSpecificApplicationInfo(props[item]);
                if(getSpecificApplicationInfoJson()!=undefined){
                    studentApplication.push(getSpecificApplicationInfoJson());
                }
            }
        }
        */
       for(const item in props){
           studentApplication.push(item);
       }
        console.log(studentApplication);
        console.log("HDKJFHDSFJKDSHJFKSDHFJKD");
        
        return (
            <TableBody>
                {studentApplication.map((row)=>(
                <Row key={row} row={row}/>
                ))} 
            </TableBody> 
        )
         
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
                            <bs.Col>{new Date(Date.parse(this.state.application_window_open)).toDateString()}</bs.Col>
                            <bs.Col lg={3}><Field>Application Closing Date:</Field></bs.Col>
                            <bs.Col lg={3}>{new Date(Date.parse(this.state.application_window_close)).toDateString()}</bs.Col>
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

                        </Table>
                    </TableContainer>
                </EditBox>
                <br/>
                <Apply2BtnSet>
                    <bs.Container>
                        <bs.Row> 
                            <bs.Col><button type="button" className="btn btn-outline-primary" onClick={this.handleDelete}>Delete Application Period</button></bs.Col>
                        </bs.Row>
                    </bs.Container>
                </Apply2BtnSet>
            </EventDiv>
                );
    };
}
