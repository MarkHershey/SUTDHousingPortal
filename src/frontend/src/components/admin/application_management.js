import * as bs from "react-bootstrap";
import React, {useState} from "react";
import {useHistory} from "react-router"
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import {
    approveApplication,
    getSpecificApplicationInfo,
    rejectApplication,
    waitlistApplication
} from "../../functions/applicationforminfo";
import Paper from '@material-ui/core/Paper';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {deleteApplicationPeriodInfo, getApplicationPeriodInfo,} from "../../functions/applicationperiodinfo";
import {getPersonalApplicationPeriodInfoJson, getSpecificApplicationInfoJson} from "../../functions/localstorage";
import {Modal} from "antd";


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


function Row(props) {
    const {row} = props;
    const classes = useRowStyles();
    let history = useHistory();
    console.log("roww");
    console.log(props);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                </TableCell>
                <TableCell component="th" scope="row">{row.student_id}</TableCell>
                <TableCell align="left">{row.internal_status}</TableCell>
                <TableCell align="left">
                    <bs.Row>
                        <bs.Col lg={4}>
                            <button type="button" className="btn btn-light" onClick={showModal}>
                                View Details
                            </button>
                            <Modal title="Application Details" visible={isModalVisible} onOk={handleOk}
                                   onCancel={handleCancel}>
                                <bs.Row>
                                    <bs.Col style={{color: "#3C64B1"}} lg={3}>
                                        Student ID:
                                    </bs.Col>
                                    <bs.Col sm={3}>
                                        {row.student_id}
                                    </bs.Col>
                                    <bs.Col style={{color: "#3C64B1"}} lg={3}>
                                        Created At:
                                    </bs.Col>
                                    <bs.Col sm={3}>
                                        {row.created_at.slice(0, 10)}
                                    </bs.Col>
                                </bs.Row>

                                <br/>

                                <bs.Row>
                                    <bs.Col style={{color: "#3C64B1"}} lg={3}>
                                        Room Type 1:
                                    </bs.Col>
                                    <bs.Col sm={3}>
                                        {row.room_profile.room_type === "SINGLE_ENSUITE" ? "ENSUITE" : row.room_profile.room_type}
                                    </bs.Col>
                                    <bs.Col style={{color: "#3C64B1"}} lg={3}>
                                        Room Type 2
                                    </bs.Col>
                                    <bs.Col sm={3}>
                                        {row.room_profile.room_type_2nd === "SINGLE_ENSUITE" ? "ENSUITE" : row.room_profile.room_type_2nd}
                                    </bs.Col>
                                </bs.Row>

                                <bs.Row>
                                    <bs.Col style={{color: "#3C64B1"}} lg={3}>
                                        Block Pref 1:
                                    </bs.Col>
                                    <bs.Col sm={3}>
                                        {row.room_profile.block}
                                    </bs.Col>
                                    <bs.Col style={{color: "#3C64B1"}} lg={3}>
                                        Block Pref 2:
                                    </bs.Col>
                                    <bs.Col sm={3}>
                                        {row.room_profile.block_2nd}
                                    </bs.Col>
                                </bs.Row>
                            </Modal>
                        </bs.Col>
                        <bs.Col lg={2}>
                            <button type="button" className="btn btn-outline-success"
                                    id={"accept_" + row.student_id} onClick={() => {
                                approveApplication(row.uid)
                            }}>Approve
                            </button>
                        </bs.Col>
                        <bs.Col lg={2}>
                            <button type="button" className="btn btn-outline-danger" id={"reject_" + row.student_id}
                                    onClick={() => {
                                        rejectApplication(row.uid)
                                    }}>Reject
                            </button>
                        </bs.Col>
                        <bs.Col lg={2}>
                            <button type="button" className="btn btn-outline-dark" id={"waitlist_" + row.student_id}
                                    onClick={() => {
                                        waitlistApplication(row.uid)
                                    }}>Waitlist
                            </button>
                        </bs.Col>
                    </bs.Row>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
};


export default class ApplicationManagement extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.createUI = this.createUI.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleApplicationForms = this.handleApplicationForms.bind(this);
        this.checkState = this.checkState.bind(this);
        this.state = {
            application_window_open: "",
            application_window_close: "",
            applicable_periods: [""],
            applicable_rooms: [""],
            applicable_students: [""],
            application_forms_map: {
                form1: {uid: ""}
            },
            student_data: [],
            update: false
        }
    }

    checkState() {
        console.log(this.state);
    }

    componentDidMount() {
        const fetchJSON = async () => {
            getApplicationPeriodInfo(this.props.location.state.uid).then(r => {
                this.setState(getPersonalApplicationPeriodInfoJson());
                this.handleApplicationForms(this.state.application_forms_map).then(r => {
                    console.log("Student Data:");
                    console.log(getSpecificApplicationInfoJson());
                    this.setState({student_data: getSpecificApplicationInfoJson()});
                })
            });
        }
        console.log(this.props)
        if (this.props.location.state !== undefined)
            fetchJSON();
    }

    handleDelete() {
        deleteApplicationPeriodInfo(this.props.location.state.uid);
        this.props.history.push("/admin/application_viewing");
    }

    createUI() {
        return this.state.applicable_periods.map((el, i) =>
            <EventDiv key={i}>
                <bs.Container>
                    <bs.Row>
                        <bs.Col sm={3}><Field>Start Date:</Field></bs.Col>
                        <bs.Col sm={3}>
                            <input type="date" name="start_date" value={el.start_date || ''}/>
                        </bs.Col>
                    </bs.Row>
                    <bs.Row>
                        <bs.Col sm={3}><Field>End Date:</Field></bs.Col>
                        <bs.Col sm={3}>
                            <input type="date" name="end_date" value={el.end_date || ''}/>
                        </bs.Col>
                    </bs.Row>
                </bs.Container>
            </EventDiv>
        )
    }


    async handleApplicationForms(e) {
        let props = this.state.application_forms_map;
        await getSpecificApplicationInfo(props);
        this.setState({
            studentData: getPersonalApplicationPeriodInfoJson(),
            update: true
        })
    }


    handleDropdown(event) {
        const name = event.target.name;
        this.state.title = name;
        console.log(this.state);
    }

    render() {
        if (this.props.location.state === undefined)
            window.location.replace("/")
        else
            return (
                <EventDiv>
                    <h3>Manage Application Window</h3>
                    <EditBox>
                        <bs.Container>
                            <bs.Row>
                                <bs.Col sm={3}><Field>Application Opening Date:</Field></bs.Col>
                                <bs.Col>{new Date(Date.parse(this.state.application_window_open)).toDateString()}</bs.Col>
                                <bs.Col sm={3}><Field>Application Closing Date:</Field></bs.Col>
                                <bs.Col
                                    lg={3}>{new Date(Date.parse(this.state.application_window_close)).toDateString()}</bs.Col>
                            </bs.Row>
                            <bs.Row>
                                <bs.Col sm={3}><Field>Applicable periods:</Field></bs.Col>
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
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.student_data.map((row) => (
                                        <Row key={row.student_id} row={row}/>
                                    ))}
                                </TableBody>
                                {/*
                            {console.log("hiuhih")}
                            <StudentAppData appData={this.state.application_forms_map}/>
                            

                            {this.state.studentData.map((e)=>(
                                console.log(e)
                            ))}
                            
                            */
                                }


                            </Table>
                        </TableContainer>
                    </EditBox>
                    <br/>
                    <Apply2BtnSet>
                        <bs.Container>
                            <bs.Row>
                                {/*
                            <bs.Col><button type="button" onClick={this.checkState}>check state</button></bs.Col>
                            */
                                }

                                <bs.Col>
                                    <button type="button" className="btn btn-outline-primary"
                                            onClick={this.handleDelete}>Delete Application Period
                                    </button>
                                </bs.Col>
                            </bs.Row>
                        </bs.Container>
                    </Apply2BtnSet>
                </EventDiv>
            );
    };
}
