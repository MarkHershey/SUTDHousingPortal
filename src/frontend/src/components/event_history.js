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
import Event from '../variables/eventinfo';
import Student from '../variables/studentinfo'


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
  text-align: left;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
  margin: 0 0 0 0;
`;
/*
function createData(name, date, time, floor, summary, preparation,status) {
    return {
        name,
        date,
        time,
        floor,
        summary,
        preparation,
        status
    };
}
*/
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
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.start_time+" "+row.getEnd_time()}</TableCell>
                <TableCell align="right">{row.block+" Lvl "+row.floor}</TableCell>
                <TableCell align="right"><button type="button" class="btn btn-outline-primary">Join Now!</button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <bs.Container>
                                <bs.Row>
                                    <bs.Col lg={3}><SubTitle>Description:</SubTitle></bs.Col>
                                    <bs.Col lg={9}>{row.description}</bs.Col>
                                </bs.Row>
                            </bs.Container>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        tite: PropTypes.string.isRequired,
        event_type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        start_time: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        count: PropTypes.bool.isRequired,
        floor: PropTypes.number.isRequired,
        block:PropTypes.string.isRequired,
        signups:PropTypes.array.isRequired,
        attendence:PropTypes.array.isRequired,
    }).isRequired,
};

var event1 = new Event("uid","Paper Work DIY!","Interest based event","This is a workshop session in which we will do paper works together. Be creative! 3 A4 white paper",
"3-4-2021-17:00",120,true,9,"Block 55",[],[]);
var event2 = new Event("uid2","LEGO ARTIST","Interest based event","This is a workshop session in which we will assemble LEGO together. Be creative!, 2 DAISO LEGO Blocks",
"4-4-2021-20:00",120,true,9,"Block 55",[],[]);
var event3 = new Event("uid3","E-GAME ONLINE!","Inter block","BOOST with SUTD gamers! We will play Valorant and CSGO together ,A good computer",
"5-4-2021:20:00",120,false,9,"Block 55",[],[]);
var event4 = new Event("uid4","Basketball is fun!","Inter block","Play 3V3 basketball game in groups and win!!,Nothing",
"5-4-2021",120,true,9,"Block 55",[],[]);
var event5 = new Event("uid5","Zen Zen Zen","Floor event","Sit together quietly, Nothing","7-4-2021",120,false,
9,"Block 55",[],[]);

const eventsArr = [event1,event2,event3,event4,event5];
/*
const rows = [
    createData('Paper Work DIY!', "3-4-2021", "17:00-19:00", "All",
        "This is a workshop session in which we will do paper works together. Be creative!", "3 A4 white paper", "Signed Up"),
    createData('LEGO ARTIST', "4-4-2021", "20:00-22:00", "59L11",
        "This is a workshop session in which we will assemble LEGO together. Be creative!", "2 DAISO LEGO Blocks","Completed"),
    createData('E-GAME ONLINE!', "5-4-2021", "14:00-16:00", "59L11",
        "BOOST with SUTD gamers! We will play Valorant and CSGO together", "A good computer","Completed"),
];
*/
export default function EventHistory() {
    return (
        <EventDiv>
            <h3>Floor Event History</h3>
            <SubTitle2>Current Term: <font color = "black">Term 5</font></SubTitle2>
            <SubTitle2>Attended Event Number: <font color = "black">2</font></SubTitle2>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Floor</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventsArr.map((row) => (
                            <Row key={row.uid} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </EventDiv>
    );
}
