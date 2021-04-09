import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import * as bs from 'react-bootstrap';
import {

    getApplicationPeriodInfoJson,
    getToken,
    getOngoingApplicationPeriodInfoJson,
    getUserInfoJson, initAttendanceEditJson, setApplicationPeriodInfoJson
} from "../variables/localstorage";
import {
    getOngoingApplicationPeriodInfo,
    
} from "../variables/applicationperiodinfo"
import {getUsername,setPersonalApplicablePeriodUidInfoJson,setPersonalApplicablePeriodInfoJson} from "../variables/localstorage";
import axios from "axios";
import {url} from "../variables/url";
import Modal from '@material-ui/core/Modal';
import {CheckBox} from "@material-ui/icons";
import {forEach} from "react-bootstrap/ElementChildren";
import {eventHandler} from "../variables/eventinfo";
import {useHistory} from "react-router";
import "../variables/utilities"


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const Field = styled.p`
  color: #3C64B1;
  text-align: right;
`;

const EventDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  grid-column: auto;
`;
const SubTitle = styled.p`
  text-align: right;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
`;

const CenterDiv = styled.div`
    text-align: center;
`;

const ButtonDivEvent = styled.div`text-align: center;`;


Row.propTypes = {
    row: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        application_window_open: PropTypes.string.isRequired,
        application_window_close: PropTypes.string.isRequired,

    }).isRequired,
};

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function CreateUI(props,uid){
    console.log("belowww");
    console.log(props);
    let history = useHistory();
    return props.map((el, i) => 
        <EventDiv key={i}>
            <bs.Container>
                <bs.Row>
                    <bs.Col lg={2}><Field>Start Date:</Field></bs.Col>
                    <bs.Col lg={2}>
                        <input disabled="true" type="date" name="start_date" value={el.start_date ||''} />
                    </bs.Col>
                    <bs.Col lg={2}><Field>End Date:</Field></bs.Col>
                    <bs.Col lg={2}>
                        <input disabled="true" type="date" name="end_date" value={el.end_date ||''} />
                    </bs.Col>
                    <bs.Col lg={3}><Button id="next" class="btn btn-outline-primary" onClick={()=>{
                        console.log(el);
                        //store el and uid into storage
                        setApplicationPeriodInfoJson(el);
                        setPersonalApplicablePeriodUidInfoJson(uid);
                        history.push({
                            pathname: "/apply1",
                            state: {
                                applicable_period : el,
                                application_period_uid : uid
                            }
                        });
                        
                    }}>Select</Button></bs.Col>
                </bs.Row>        
            </bs.Container>
        </EventDiv>          
    )
    
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">{new Date(Date.parse(row.created_at)).toDateString()}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.application_window_open)).toDateString()}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.application_window_close)).toDateString()}</TableCell>
                <TableCell align="right">

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div" text-align="center">
                                Application Periods
                            </Typography>
                            {CreateUI(row.applicable_periods,row.uid)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}




export default class ApplicationZero extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: [{
            uid: "",
            created_at: "",
            created_by: "",
            application_window_open: "",
            application_window_close: "",
            applicable_periods: [{
                start_date:"",
                end_date : ""
            }], 
        }]};
    }


    componentDidMount() {
        const fetchJSON = async () =>{
            getOngoingApplicationPeriodInfo().then(r=>{
                this.setState({events: getOngoingApplicationPeriodInfoJson()});
                console.log("Ongoing Application Info JSON:");
                console.log(getOngoingApplicationPeriodInfoJson());
            });
        }
        fetchJSON();
    }


    render() {
        return (
            <EventDiv>
                <h3>Ongoing Application periods</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="right">Created at</TableCell>
                                <TableCell align="right">Application Window Opening</TableCell>
                                <TableCell align="right">Application Window Closing</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events.map((row) => (
                                <Row key={row.uid} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </EventDiv>
        );
    }
}