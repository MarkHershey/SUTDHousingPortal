import React from 'react';
import styled from 'styled-components';
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {getUserInfoJson, isAdmin} from "../variables/localstorage";
import {Card, Row, Col, Carousel} from 'antd';
import 'antd/dist/antd.css';
import {Statistic} from "antd/es";
import SUTD1 from "../SUTD1.png";
import SUTD2 from "../SUTD2.png";
import SUTD3 from "../SUTD3.png";
import SUTD4 from "../SUTD4.png";
import {AuditOutlined, ExclamationCircleOutlined, FormOutlined, ScheduleOutlined} from '@ant-design/icons';

const Homepage = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

const Welcome = styled.h4``;

const StatisticDiv = styled.div`
  padding: 2px;
  background: #ececec;
`;

const contentStyle = {
    height: '600px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {full_name: "",
            attended_events_num: 0,
            registered_events_num: 0,
            year_of_enrollment: " ",
            disciplinary_records_num: 0,};
    }

    componentDidMount() {
        const fetchJSON = async () => {
            await getCurrentStudentInfo();
            this.setState({
                full_name: getUserInfoJson().full_name,
                attended_events_num: getUserInfoJson().attended_events.length,
                registered_events_num: getUserInfoJson().registered_events.length,
                year_of_enrollment: getUserInfoJson().year_of_enrollment.toString() + " ",
                disciplinary_records_num: getUserInfoJson().disciplinary_records.length,
            });
        }
        if (isAdmin()) {
            this.setState({full_name: "Administrator",
                attended_events_num: 0,
                registered_events_num: 0,
                year_of_enrollment: "N/A",
                disciplinary_records_num: 0});
        } else {
            fetchJSON();
        }

    }


    render() {
        return (
            <Homepage>
                <Welcome> {"Hi! " + this.state.full_name} </Welcome>
                <StatisticDiv>
                    <Row gutter={2}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Attended Floor Events"
                                    value={this.state.attended_events_num}
                                    precision={0}
                                    prefix={<AuditOutlined />}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="/3"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Registered Floor Events"
                                    value={this.state.registered_events_num}
                                    precision={0}
                                    prefix={<FormOutlined />}
                                    valueStyle={{ color: '#c69f54' }}
                                    suffix=""
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Enrollment Year"
                                    value={this.state.year_of_enrollment}
                                    prefix={<ScheduleOutlined />}
                                    valueStyle={{ color: '#1368cf' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Disciplinary Records"
                                    value={this.state.disciplinary_records_num}
                                    precision={0}
                                    prefix={<ExclamationCircleOutlined />}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </StatisticDiv>
                <br/>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={SUTD1} style={{
                            display: "block",
                            width:"100%",
                            height: "600px",
                            objectFit: "cover",
                        }} alt={"SUTD1"}/>
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={SUTD2} style={{
                                display: "block",
                                width:"100%",
                                height: "600px",
                                objectFit: "cover",
                            }} alt={"SUTD1"}/>
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={SUTD3} style={{
                                display: "block",
                                width:"100%",
                                height: "600px",
                                objectFit: "cover",
                            }} alt={"SUTD1"}/>
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={SUTD4} style={{
                                display: "block",
                                width:"100%",
                                height: "600px",
                                objectFit: "cover",
                            }} alt={"SUTD1"}/>
                        </h3>
                    </div>
                </Carousel>
            </Homepage>
        )
    }
}
