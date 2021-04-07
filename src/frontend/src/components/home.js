import React from 'react';
import styled from 'styled-components';
import container, {Container} from 'react-bootstrap';
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {getUserInfoJson, isAdmin} from "../variables/localstorage";
import {Card, Row, Col, Carousel} from 'antd';
import 'antd/dist/antd.css';
import {icons} from "antd/es/image/PreviewGroup";
import {Statistic} from "antd/es";
const {ArrowUpOutlined, ArrowDownOutlined} = icons;

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

const DashboardTitle = styled.p`
  text-align: center;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
`;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {full_name: "",};
    }

    componentDidMount() {
        const fetchJSON = async () => {
            await getCurrentStudentInfo();
            this.setState({full_name: getUserInfoJson().full_name,});
        }
        if (isAdmin()) {
            this.setState({full_name: "Admin"});
            console.log(isAdmin());
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
                                    value={getUserInfoJson().attended_events.length}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="/3"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Registered Floor Events"
                                    value={getUserInfoJson().registered_events.length}
                                    precision={0}
                                    valueStyle={{ color: '#c69f54' }}
                                    suffix=""
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Enrollment Year"
                                    value={getUserInfoJson().year_of_enrollment.toString() + " "}
                                    valueStyle={{ color: '#1368cf' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Disciplinary Records"
                                    value={getUserInfoJson().disciplinary_records.length}
                                    precision={0}
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
                            <img src="../SUTD1.png" style={{
                            display: "block",
                            width:"100%",
                            height: "6.917rem",
                            objectFit: "cover",
                        }} alt={"SUTD1"}/>
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Homepage>
        )
    }
}
