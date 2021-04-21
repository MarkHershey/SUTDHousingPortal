import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";
import {getApplicationPeriodInfoJson, getOngoingApplicationPeriodInfoJson} from "../../functions/localstorage";
import {getAllApplicationPeriodInfo, getOngoingApplicationPeriodInfo,} from "../../functions/applicationperiodinfo"
import {useHistory} from "react-router";
import "../../functions/utilities"


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
                <TableCell component="th" scope="row">{row.uid}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.created_at)).toDateString()}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.application_window_open)).toDateString()}</TableCell>
                <TableCell align="right">{new Date(Date.parse(row.application_window_close)).toDateString()}</TableCell>
                <TableCell align="right">
                    <button type="button" class="btn btn-outline-primary"
                            onClick = {()=>{
                                history.push({
                                    pathname: "/admin/application_management",
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


export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }


    componentDidMount() {
        const fetchJSON = async () =>{
            getAllApplicationPeriodInfo().then(r=>{
                this.setState({events: getApplicationPeriodInfoJson(), query_type: "all"});
                console.log("Application Info JSON:");
                console.log(getApplicationPeriodInfoJson());
                //console.log("my state:");
                //console.log(this.state);
            });
        }
        fetchJSON();
    }

    queryAll = () => {
        this.setState({events: getApplicationPeriodInfoJson(), query_type: "all"});
    }

    queryUpcoming = () => {
        getOngoingApplicationPeriodInfo().then(r=>{
            this.setState({events: getOngoingApplicationPeriodInfoJson(), query_type: "upcoming"})
        })
    }

    render() {
        return (
            <EventDiv>
                <h3>All Applications</h3>
                <div className= {"btn-group btn-group-toggle"} data-toggle="buttons">
                    <label className={this.state.query_type === "all"?"btn btn-secondary active":"btn btn-secondary"}>
                        <input type="radio" name="options" id="all_events" autoComplete="off" onClick={this.queryAll}/> All Application periods
                    </label>
                    <label className={this.state.query_type === "upcoming"?"btn btn-secondary active":"btn btn-secondary"}>
                        <input type="radio" name="options" id="upcoming_events" autoComplete="off" onClick={this.queryUpcoming}/> Upcoming Application periods
                    </label>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">UID</TableCell>
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
