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
import * as bs from 'react-bootstrap';
import "../functions/utilities";

import {getPersonalEventInfoJson, getUserInfoJson, getUsername} from "../functions/localstorage";
import {getPersonalEventInfo} from "../functions/eventinfo";

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

const SubTitle2 = styled.p`
  text-align: center;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
  margin: 0 0 0 0;
`;



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

function attended(attendance){
    var attended = false;
    attendance.forEach(function (item,row,array){
        console.log(item);
        if (item === getUsername()) attended = true;
    });
    return attended;
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
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.start_time)).toDateString()}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.start_time)).format("hh:mm")}</TableCell>
                <TableCell align="right">{"Block " + row.block+" Level "+row.floor}</TableCell>
                <TableCell align="right" ><div style={{color: attended(row.attendance)?"green" : "grey"}}>{attended(row.attendance)?"Attended" : "Registered"}</div></TableCell>
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
                            </bs.Container>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    componentDidMount() {
        const fetchJSON = async () =>{
            getPersonalEventInfo().then(r=>{
                this.setState({events: getPersonalEventInfoJson()});
                console.log("Personal Event Info JSON:");
                console.log(getPersonalEventInfoJson());
            });
        }
        fetchJSON();
    }

    render() {
        return (
            <EventDiv>
                <h3>My Floor Events</h3>
                <bs.Row>
                    <bs.Col><SubTitle2>Current Term: <font color = "black">Term 5</font></SubTitle2></bs.Col>
                    <bs.Col><SubTitle2>Registered Event Number: <font color = "black">{getUserInfoJson().registered_events.length}</font></SubTitle2></bs.Col>
                    <bs.Col><SubTitle2>Attended Event Number: <font color = "black">{getUserInfoJson().attended_events.length}</font></SubTitle2></bs.Col>
                </bs.Row>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Floor</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events.map((row) => (<Row key={row.uid} row={row}/>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </EventDiv>
        );
    }
}
