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
    getAllDisciplinaryRecordsInfoJson,
    getToken,
    getUserInfoJson, initAttendanceEditJson
} from "../../variables/localstorage";
import {
    getAllDisciplinaryRecords,
} from "../../variables/disciplinaryrecordinfo"
import {useHistory} from "react-router";
import "../../variables/utilities"


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


Row.propTypes = {
    row: PropTypes.shape({
        student_id: PropTypes.string.isRequired,
        record_type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        points_deduction: PropTypes.number.isRequired,

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
                </TableCell>
                <TableCell id={row.student_id+row.description} component="th" scope="row">{row.student_id}</TableCell>
                <TableCell id={row.student_id+row.description+"_record_type"} align="right">{row.record_type}</TableCell>
                <TableCell id={row.student_id+row.description+"_description"} align="right">{row.description}</TableCell>
                <TableCell id={row.student_id+row.description+"_points_deduction"}align="right">{row.points_deduction}</TableCell>
                <TableCell id={row.student_id+row.description+"_view_individual_btn"} align="right">
                    <button type="button" class="btn btn-outline-primary"
                            onClick = {()=>{
                                history.push({
                                    pathname: "/admin/disciplinary_record_view_individual",
                                    state: {
                                        uid: row.uid
                                    }
                                }
                                )
                            }}
                            >View</button>
                </TableCell>
            </TableRow>
            
        </React.Fragment>
    );
}


export default class ViewADisciplinaryRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: [{
                student_id: "",
                record_type: "",
                description: "",
                points_deduction: "",
            }]};
    }


    componentDidMount() {
        const fetchJSON = async () =>{
            getAllDisciplinaryRecords().then(r=>{
                this.setState({events: getAllDisciplinaryRecordsInfoJson()});
                console.log("Disciplinary Info JSON:");
                console.log(getAllDisciplinaryRecordsInfoJson());
            });
        }
        fetchJSON();
    }


    render() {
        return (
            <EventDiv>
                <h3>All Disciplinary Records</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">Student ID</TableCell>
                                <TableCell align="right">Record Type</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Points Deduction</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events.map((row) => (
                                <Row key={row.student_id} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </EventDiv>
        );
    }
}
