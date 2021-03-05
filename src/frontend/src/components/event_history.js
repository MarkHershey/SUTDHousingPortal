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
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.floor}</TableCell>
                <TableCell align="right"><font color={(row.status==="Completed")?"#3C64B1":"Grey"}>{row.status}</font></TableCell>
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
                                    <bs.Col lg={3}><SubTitle>Summary:</SubTitle></bs.Col>
                                    <bs.Col lg={9}>{row.summary}</bs.Col>
                                </bs.Row>
                                <bs.Row>
                                    <bs.Col lg={3}><SubTitle>Preparation:</SubTitle></bs.Col>
                                    <bs.Col lg={9}>{row.preparation}</bs.Col>
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
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        floor: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        preparation: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

const rows = [
    createData('Paper Work DIY!', "3-4-2021", "17:00-19:00", "All",
        "This is a workshop session in which we will do paper works together. Be creative!", "3 A4 white paper", "Signed Up"),
    createData('LEGO ARTIST', "4-4-2021", "20:00-22:00", "59L11",
        "This is a workshop session in which we will assemble LEGO together. Be creative!", "2 DAISO LEGO Blocks","Completed"),
    createData('E-GAME ONLINE!', "5-4-2021", "14:00-16:00", "59L11",
        "BOOST with SUTD gamers! We will play Valorant and CSGO together", "A good computer","Completed"),
];

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
                        {rows.map((row) => (
                            <Row key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </EventDiv>
    );
}
