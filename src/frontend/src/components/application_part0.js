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
    getOngoingApplicationPeriodInfoJson,
    setPersonalApplicablePeriodUidInfoJson,
    setPersonalApplicationPeriodInfoJson
} from "../functions/localstorage";
import {getOngoingApplicationPeriodInfo,} from "../functions/applicationperiodinfo"
import {useHistory} from "react-router";
import "../functions/utilities"


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

Row.propTypes = {
    row: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        application_window_open: PropTypes.string.isRequired,
        application_window_close: PropTypes.string.isRequired,

    }).isRequired,
};


function CreateUI(props,uid, id){
    console.log("belowww");
    console.log(props);
    let history = useHistory();
    return props.map((el, i) => 
        <EventDiv key={i}>
            <bs.Container>
                <bs.Row>
                    <bs.Col sm={2}><Field>Start Date:</Field></bs.Col>
                    <bs.Col sm={2}>
                        <input disabled="true" type="date" name="start_date" value={el.start_date ||''} />
                    </bs.Col>
                    <bs.Col sm={2}><Field>End Date:</Field></bs.Col>
                    <bs.Col sm={2}>
                        <input disabled="true" type="date" name="end_date" value={el.end_date ||''} />
                    </bs.Col>
                    <bs.Col sm={3}><Button id={"next"+id +"_"+ i} class="btn btn-outline-primary" style={{padding: "0px 10px",margin:"0px 20px"}} onClick={()=>{
                        console.log(el);
                        //store el and uid into storage
                        setPersonalApplicationPeriodInfoJson(el);
                        setPersonalApplicablePeriodUidInfoJson(uid);
                        history.push({
                            pathname: "/apply1"
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
                    <IconButton id={"expand_row_button"+row.application_window_open+row.application_window_close} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
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
                            {CreateUI(row.applicable_periods,row.uid, row.application_window_open+row.application_window_close)}
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
