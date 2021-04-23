import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
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
    addAttendanceADDJson,
    addAttendanceDELJson,
    deleteAttendanceADDJson,
    deleteAttendanceDELJson,
    getEventInfoJson,
    getUpcomingEventInfoJson,
    getUsername,
    initAttendanceEditJson,
    isHG
} from "../functions/localstorage";
import {
    deleteEvent,
    eventHandler,
    getEventInfo,
    getUpcomingEventInfo,
    quitEventHandler,
    updateAttendance
} from "../functions/eventinfo";
import Modal from '@material-ui/core/Modal';
import {useHistory} from "react-router";
import "../functions/utilities"
import {DatePicker} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";

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


function joined(row) {
    var signed_up = false;
    row.signups.forEach(function (item) {
        if (item.toString() === getUsername()) signed_up = true;
    });
    return signed_up
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
        block: PropTypes.string.isRequired,
        signups: PropTypes.array.isRequired,
        attendance: PropTypes.array.isRequired,
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
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    let history = useHistory();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}
                                id={row.title + "-drop-down"}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.start_time)).toDateString()}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.start_time)).format("hh:mm")}</TableCell>
                <TableCell align="right">{"Block " + row.block + " Level " + row.floor}</TableCell>
                <TableCell align="right">
                    <button type="button" class="btn btn-outline-primary"
                            onClick={async () => {
                                await eventHandler(row.uid);
                                history.push("/");
                                history.push("/event")
                            }}
                            disabled={joined(row)}
                            id={row.title + "-join-status"}>{joined(row) ? "Signed Up" : "Join Now!"}</button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div" text-align="center">
                                Details
                            </Typography>
                            <bs.Container>
                                <bs.Row>
                                    <bs.Col sm={3}><SubTitle>Description:</SubTitle></bs.Col>
                                    <bs.Col sm={9} id={row.title + "-description-text"}>{row.description}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col sm={3}><SubTitle>Event Duration:</SubTitle></bs.Col>
                                    <bs.Col sm={3} id={row.title + "-duration"}>{row.duration_mins + "mins"}</bs.Col>
                                    <bs.Col sm={3}><SubTitle>Meetup Location:</SubTitle></bs.Col>
                                    <bs.Col sm={3} id={row.title + "-location"}>{row.meetup_location}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col sm={3}><SubTitle>Max Signups:</SubTitle></bs.Col>
                                    <bs.Col sm={3} id={row.title + "-signup-limit"}>{row.signup_limit}</bs.Col>
                                    <bs.Col sm={3}><SubTitle>Remaining Slots:</SubTitle></bs.Col>
                                    <bs.Col sm={3}
                                            id={row.title + "-remaining-slots"}>{row.signup_limit - row.signups.length}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col sm={3}><SubTitle>Signup Deadline:</SubTitle></bs.Col>
                                    <bs.Col sm={3}
                                            id={row.title + "-signup-ddl"}>{new Date(Date.parse(row.signup_ddl)).format("dd/MM/yyyy hh:mm:ss")}</bs.Col>
                                    <bs.Col sm={3}><SubTitle>Event Held by:</SubTitle></bs.Col>
                                    <bs.Col sm={3} id={row.title + "-held-by"}>{row.created_by}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col sm={3}><SubTitle>Count Attendance:</SubTitle></bs.Col>
                                    <bs.Col sm={3}
                                            id={row.title + "-count-attendance"}>{row.count_attendance ? "Yes" : "No"}</bs.Col>
                                    <bs.Col sm={3}><SubTitle>Enrollment Status</SubTitle></bs.Col>
                                    <bs.Col sm={3}>{joined(row) ? "Signed Up" : "Not Joined"}</bs.Col>
                                </bs.Row>
                            </bs.Container>
                            <Typography variant="h6" gutterBottom component="div" text-align="center">
                                Operations
                            </Typography>
                            <bs.Row>
                                <bs.Col><ButtonDivEvent>
                                    <button type="button" className="btn btn-outline-dark" id={row.title + "-quit"}
                                            onClick={async () => {
                                                await quitEventHandler(row.uid);
                                                history.push("/");
                                                history.push("/event")
                                            }}
                                            disabled={!joined(row)}>Quit Event
                                    </button>
                                </ButtonDivEvent></bs.Col>

                                <bs.Col><ButtonDivEvent>
                                    <button type="button" className="btn btn-outline-dark"
                                            id={row.title + "-edit-event"}
                                            onClick={() => {
                                                history.push({
                                                    pathname: "/event_edit",
                                                    state: {
                                                        uid: row.uid,
                                                        title: row.title,
                                                        event_type: row.event_type,
                                                        meetup_location: row.meetup_location,
                                                        block: row.block,
                                                        floor: row.floor,
                                                        duration_mins: row.duration_mins,
                                                        signup_ddl: row.signup_ddl,
                                                        description: row.description,
                                                        count_attendance: row.count_attendance,
                                                        created_by: row.created_by,
                                                        start_time: row.start_time,
                                                        signup_limit: row.signup_limit
                                                    }
                                                });
                                            }}
                                            disabled={!isHG() || (row.created_by !== getUsername())}>Edit Event
                                    </button>
                                </ButtonDivEvent></bs.Col>

                                <bs.Col><ButtonDivEvent>
                                    <SimpleModal row={row}/>
                                </ButtonDivEvent></bs.Col>
                                <bs.Col><ButtonDivEvent>
                                    <button type="button" className="btn btn-outline-dark"
                                            onClick={async () => {
                                                await deleteEvent(row.uid)
                                            }}
                                            disabled={!isHG() || (row.created_by !== getUsername())}
                                            id={row.title + "-delete-event"}>
                                        Delete Event
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
        initAttendanceEditJson()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const attended = (id) => {
        let result = false;
        props.row.attendance.forEach(function (item) {
            if (item === id) result = true;
        });
        console.log(result);
        return result;
    }

    const IdList = (props) => {
        const [checked, setChecked] = React.useState(props.attended);
        const handleClick = () => {
            setChecked(!checked);
            console.log(checked);
            const realChecked = !checked;
            if (props.attended && realChecked) deleteAttendanceDELJson(props.id);
            if (props.attended && !realChecked) addAttendanceDELJson(props.id);
            if (!props.attended && realChecked) addAttendanceADDJson(props.id);
            if (!props.attended && !realChecked) deleteAttendanceADDJson(props.id);
        }
        return (
            <bs.Container>
                <bs.Row>
                    <bs.Col sm={4}></bs.Col>
                    <bs.Col sm={1}><input type={"checkbox"} checked={checked} onChange={handleClick}
                                          id={props.id + "-mark"}/></bs.Col>
                    <bs.Col sm={3}><p>{props.id}</p></bs.Col>
                    <bs.Col sm={4}></bs.Col>
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
                    {props.row.signups.map((id) => (<IdList id={id} attended={attended(id)}/>))}
                </div>
                <Button variant="outline-dark" onClick={async () => {
                    await updateAttendance(props.row.uid);
                    handleClose();
                    window.location.reload(false);
                }}
                        id={props.row.title + "update-attendance"}>Update!</Button>
            </CenterDiv>
        </div>
    );

    return (
        <div>
            <button type="button" className="btn btn-outline-dark"
                    onClick={handleOpen}
                    disabled={!isHG()}
                    id={props.row.title + "-take-attendance"}>Take Attendance
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
        this.state = {events: [], origin: [], query_type: "all",reverse: true};
    }


    componentDidMount() {
        const fetchJSON = async () => {
            getEventInfo().then(r => {
                this.setState({events: getEventInfoJson(), query_type: "all", origin: getEventInfoJson(),});
                console.log("Event Info JSON:");
                console.log(getEventInfoJson());
            });
        }
        fetchJSON();
    }

    queryAll = () => {
        this.setState({events: getEventInfoJson(), query_type: "all",origin: getEventInfoJson(),reverse: true});
    }

    queryUpcoming = () => {
        getUpcomingEventInfo().then(r => {
            this.setState({events: getUpcomingEventInfoJson(), query_type: "upcoming", origin: getUpcomingEventInfoJson(),reverse: true})
        })
    }

    dateReverse = () => {
        this.setState({events:this.state.events.reverse(), reverse: !this.state.reverse})
    }

    getQuery = (date, dateString) => {
        console.log(dateString);
        if (dateString === "") {
            this.setState({events: this.state.origin})
        } else{
            const result = [];
            this.state.origin.forEach((item,itemIndex) => {
                if(new Date(item.start_time).getFullYear().toString() === dateString) result.push(item);
            });
            this.setState({events: result})
        }
    }

    render() {
        return (
            <EventDiv>
                <h3>Floor Events</h3>
                <div className={"btn-group btn-group-toggle"} data-toggle="buttons">
                    <label
                        className={this.state.query_type === "all" ? "btn btn-secondary active" : "btn btn-secondary"}>
                        <input type="radio" name="options" id="all_events" autoComplete="off"
                               onClick={this.queryAll}/> All Floor Events
                    </label>
                    <label
                        className={this.state.query_type === "upcoming" ? "btn btn-secondary active" : "btn btn-secondary"}>
                        <input type="radio" name="options" id="upcoming_events" autoComplete="off"
                               onClick={this.queryUpcoming}/> Upcoming Floor Events
                    </label>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left" style={{color:"#3C64B1"}}>Name</TableCell>
                                <TableCell align="right" style={{color:"#3C64B1"}}>
                                    <DatePicker style={{width: "75px",display:"inline-block"}} onChange={this.getQuery} picker="year" placeholder="Year"/>
                                    {" Date "}
                                    <a onClick={this.dateReverse}>{ this.state.reverse?<DownOutlined style={{display:"inline-block"}}/> : <UpOutlined style={{display:"inline-block"}}/>}</a>
                                </TableCell>
                                <TableCell align="right" style={{color:"#3C64B1"}}>Time</TableCell>
                                <TableCell align="right" style={{color:"#3C64B1"}}>Floor</TableCell>
                                <TableCell align="right" style={{color:"#3C64B1"}}>Join!</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events.reverse().map((row) => (
                                <Row key={row.uid} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </EventDiv>
        );
    }
}
