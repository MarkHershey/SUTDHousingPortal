import React from "react";
import styled from "styled-components";
import {ApplicationStep} from "./application_steps";
import "antd/dist/antd.css";
import {List} from "antd";
import ReactDragListView from "react-drag-listview";
import TestModal from "./draggable_modal.js";
import * as bs from "react-bootstrap";
import {updateLifestyleProfileInfo} from "../variables/lifestyleinfo";
import {getCurrentStudentInfo} from "../variables/studentinfo";
import {getUserInfoJson} from "../variables/localstorage";
import { StarTwoTone } from '@ant-design/icons';
const EventDiv = styled.div`
  margin: 20pt 300pt;
  padding: 20pt 20pt;
  grid-column: auto;
  text-align: center;
`;

const ProfileBox = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 100pt;
  padding: 20pt 20pt;
  border-radius: 20pt;
  text-align: center;
`;

const data = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
];

export default class ApplicationFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data};
    }
    handleSubmit() {
        if (true) {
            //Submit Data
            //this.props.history.push("/application_summary");
        }
    }
    onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return; // Ignores if outside designated area

        const items = [...this.state.data];
        const item = items.splice(fromIndex, 1)[0];
        items.splice(toIndex, 0, item);
        this.setState({data: items});
        console.log(this.state.data)
    };

    render() {
        return (
            <div>
                <ApplicationStep i={3}/>
                <EventDiv>
                    <h3>Preference Weightage</h3>
                    <p style={{color:"#3C64B1"}}>Drag & Drop, the higher the heavier</p>
                    <div>
                        <ReactDragListView
                            nodeSelector=".ant-list-item.draggble"
                            onDragEnd={this.onDragEnd}
                        >
                            <List
                                size="large"
                                bordered
                                dataSource={this.state.data}
                                renderItem={item => {
                                    const draggble = true;

                                    function getTitle(item) {
                                        if (item === 1) return " Preferred Block Location";
                                        if (item === 2) return " Preferred Level Range";
                                        if (item === 3) return " Preferred Window Location";
                                        if (item === 4) return " Preferred Lift Location";
                                        if (item === 5) return " Preferred Washroom Location";
                                        if (item === 6) return " Preferred Pantry Location";
                                        if (item === 7) return " Preferred Meeting Room Location";
                                        if (item === 8) return " Preferred Group Study Room Location";
                                        if (item === 9) return " Preferred Meeting Room Location"
                                    }

                                    return (
                                            <List.Item
                                                actions={[""]}
                                                className={"draggble"}
                                                style={{textAlign:"left"}}
                                            >
                                                <List.Item.Meta title={getTitle(item)}/>
                                                <StarTwoTone />
                                            </List.Item>
                                    );
                                }}
                            />
                        </ReactDragListView>
                    </div>
                </EventDiv>
                <ProfileBox>
                    <bs.Row>
                        <bs.Col><a href="/apply3"><button type="button" className="btn btn-outline-primary">Go Previous Step</button></a></bs.Col>
                        <bs.Col><button type="button" className="btn btn-outline-primary">Save</button></bs.Col>
                        <bs.Col><button type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary">Go to next Step</button></bs.Col>
                    </bs.Row>
                </ProfileBox>
            </div>
        );
    }
}
