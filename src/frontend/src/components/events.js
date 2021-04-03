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
import {getEventInfoJson, getToken, getUpcomingEventInfoJson, getUserInfoJson} from "../variables/localstorage";
import {deleteEvent, getEventInfo, getUpcomingEventInfo} from "../variables/eventinfo";
import {getUsername} from "../variables/localstorage";
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



function joined(row){
    var signed_up = false;
    row.signups.forEach(function (item){
        if (item.toString() === getUsername()) signed_up = true;
    });
    return signed_up
}

async function quitEventHandler(event_id){
    const data = JSON.stringify([getUsername()]);

    const config = {
        method: 'delete',
        url: url + '/api/events/' + event_id +'/signup',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            window.location.reload(true);
        })
        .catch(function (error) {
            console.log(error);
        });
}


Row.propTypes = {
    row: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        event_type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        start_time: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        count: PropTypes.bool.isRequired,
        floor: PropTypes.number.isRequired,
        block:PropTypes.string.isRequired,
        signups:PropTypes.array.isRequired,
        attendance:PropTypes.array.isRequired,
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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    let history = useHistory();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.start_time)).toDateString()}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.start_time)).format("hh:mm")}</TableCell>
                <TableCell align="right">{"Block " + row.block+" Level "+row.floor}</TableCell>
                <TableCell align="right">
                    <button type="button" class="btn btn-outline-primary"
                            onClick = {async() => {await eventHandler(row.uid)}}
                            disabled={joined(row)}>{joined(row)? "Signed Up" : "Join Now!" }</button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div" text-align="center">
                                Details
                            </Typography>
                            <bs.Container>
                                <bs.Row>
                                    <bs.Col lg={3}><SubTitle>Description:</SubTitle></bs.Col>
                                    <bs.Col lg={9}>{row.description}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col lg={3}><SubTitle>Event Duration:</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{row.duration_mins + "mins"}</bs.Col>
                                    <bs.Col lg={3}><SubTitle>Meetup Location:</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{row.meetup_location}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col lg={3}><SubTitle>Max Signups:</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{row.signup_limit}</bs.Col>
                                    <bs.Col lg={3}><SubTitle>Remaining Slots:</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{row.signup_limit - row.signups.length}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col lg={3}><SubTitle>Signup Deadline:</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{new Date(Date.parse(row.signup_ddl)).format("dd/MM/yyyy hh:mm:ss")}</bs.Col>
                                    <bs.Col lg={3}><SubTitle>Event Held by:</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{row.created_by}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col lg={3}><SubTitle>Count Attendance:</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{row.count_attendance?"Yes":"No"}</bs.Col>
                                    <bs.Col lg={3}><SubTitle>Enrollment Status</SubTitle></bs.Col>
                                    <bs.Col lg={3}>{joined(row)?"Signed Up":"Not Joined"}</bs.Col>
                                </bs.Row>
                            </bs.Container>
                            <Typography variant="h6" gutterBottom component="div" text-align="center">
                                Operations
                            </Typography>
                            <bs.Row>
                                <bs.Col><ButtonDivEvent><button type="button" className="btn btn-outline-dark"
                                                       onClick={async () => {await quitEventHandler(row.uid)}}
                                                       disabled={!joined(row)}>{"Quit Event"}</button></ButtonDivEvent></bs.Col>

                                <bs.Col><ButtonDivEvent><button type="button" className="btn btn-outline-dark"
                                                                  onClick={()=>{
                                                                      history.push({
                                                                          pathname:"/event_edit",
                                                                          state: {
                                                                              uid:row.uid,
                                                                              title:row.title,
                                                                              event_type: row.event_type,
                                                                              meetup_location: row.meetup_location,
                                                                              block:row.block,
                                                                              floor:row.floor,
                                                                              duration_mins:row.duration_mins,
                                                                              signup_ddl: row.signup_ddl,
                                                                              description:row.description,
                                                                              count_attendance:row.count_attendance,
                                                                              created_by:row.created_by,
                                                                              start_time:row.start_time,
                                                                              signup_limit:row.signup_limit
                                                                            }
                                                                      });
                                                                  }}
                                                                  disabled={!getUserInfoJson().is_house_guardian}>{"Edit Event"}</button></ButtonDivEvent></bs.Col>

                                <bs.Col><ButtonDivEvent>
                                    <SimpleModal row = {row}/>
                                </ButtonDivEvent></bs.Col>
                                <bs.Col><ButtonDivEvent>
                                    <button type="button" className="btn btn-outline-dark"
                                            onClick={async () => {await deleteEvent(row.uid)}}
                                            disabled={!getUserInfoJson().is_house_guardian || (row.created_by !==getUsername())}>
                                        {"Delete Event"}
                                    </button>
                                </ButtonDivEvent></bs.Col>

                            </bs.Row>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [attendances, setAttendances] = React.useState(props.row.attendance);

    const handleOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const attended = (id) => {
        let result = false;
        props.row.attendance.forEach(function (item){if (item === id) result = true;});
        return result;
    }

    const IdList = (props) =>{
        const [checked, setChecked] = React.useState(props.attended);
        const handleClick = () =>{
            setChecked(!checked);
            console.log(checked);
            const realChecked = !checked
            var attendanceEdited;
            if (realChecked);
        }
        return (
            <bs.Container>
                <bs.Row>
                    <bs.Col lg = {4}></bs.Col>
                    <bs.Col lg = {1}><input type={"checkbox"} checked={checked} onChange={handleClick}/></bs.Col>
                    <bs.Col lg = {3}><p>{props.id}</p></bs.Col>
                    <bs.Col lg = {4}></bs.Col>
                </bs.Row>
            </bs.Container>
        );
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <CenterDiv>
                <h3>Attendance</h3>
                <h6>
                    {props.row.title}
                </h6>
                <br/>
                <div>
                    {props.row.signups.map((id) => (
                        <IdList id={id} attended={attended(id)}/>
                    ))}
                </div>
                <Button variant="outline-dark">Update!</Button>
            </CenterDiv>
        </div>
    );

    return (
        <div>
            <button type="button" className="btn btn-outline-dark"
                    onClick={handleOpen}
                    disabled={!getUserInfoJson().is_house_guardian}>{"Take Attendance"}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }


    componentDidMount() {
        const fetchJSON = async () =>{
            getEventInfo().then(r=>{
                this.setState({events: getEventInfoJson(), query_type: "all"});
                console.log("Event Info JSON:");
                console.log(getEventInfoJson());
            });
        }
        fetchJSON();
        //window.location.reload(false)
    }

    queryAll = () => {
        this.setState({events: getEventInfoJson(), query_type: "all"});
    }

    queryUpcoming = () => {
        getUpcomingEventInfo().then(r=>{
            this.setState({events: getUpcomingEventInfoJson(), query_type: "upcoming"})
        })
    }

    render() {
        return (
            <EventDiv>
                <h3>Floor Events</h3>
                <div className= {"btn-group btn-group-toggle"} data-toggle="buttons">
                    <label className={this.state.query_type === "all"?"btn btn-secondary active":"btn btn-secondary"}>
                        <input type="radio" name="options" id="all_events" autoComplete="off" onClick={this.queryAll}/> All Floor Events
                    </label>
                    <label className={this.state.query_type === "upcoming"?"btn btn-secondary active":"btn btn-secondary"}>
                        <input type="radio" name="options" id="upcoming_events" autoComplete="off" onClick={this.queryUpcoming}/> Upcoming Floor Events
                    </label>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Floor</TableCell>
                                <TableCell align="right">Join!</TableCell>
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
