import React from 'react';
import styled from 'styled-components';
import container, {Container, Row, Col} from 'react-bootstrap';
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {getUserInfoJson} from "../variables/localstorage";
import { Card } from 'antd';
import 'antd/dist/antd.css';

const Homepage = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-column: auto;
`;

const Welcome = styled.h4`
  
`;

const DashboardTitle = styled.p`
  text-align: center;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
`;

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {full_name: "",};
    }

    componentDidMount() {
        const fetchJSON = async () =>{
            await getCurrentStudentInfo();
            this.setState({full_name:getUserInfoJson().full_name,});
        }
        fetchJSON();
    }


    render(){
        return(
            <Homepage>
                <Welcome> {"Hi! " + this.state.full_name} </Welcome>
                <Container>
                    <Row>
                        <Col><DashboardTitle>Application Status</DashboardTitle></Col>
                        <Col><DashboardTitle>Announcements</DashboardTitle></Col>
                        <Col><DashboardTitle>Upcoming Floor Events</DashboardTitle></Col>
                    </Row>
                    <Row>
                        <Card title={"Floor Event Participation"}>
                            ha
                        </Card>
                    </Row>
                </Container>
            </Homepage>
        )
    }
}
