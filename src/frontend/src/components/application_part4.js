import React from "react";
import styled from "styled-components";
import {ApplicationStep} from "./application_steps";
import "antd/dist/antd.css";
import {List} from "antd";
import ReactDragListView from "react-drag-listview";
import TestModal from "./draggable_modal.js";
import * as bs from "react-bootstrap";
import {updateLifestyleProfileInfo} from "../functions/lifestyleinfo";
import {updateRoomProfileInfo} from "../functions/roomprofileinfo";
import {getCurrentStudentInfo} from "../functions/studentinfo";
import {getUserInfoJson} from "../functions/localstorage";
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

export default class ApplicationFour extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        var roomPreferences = getUserInfoJson().preference_room
        this.state = roomPreferences;
        console.log("HEREE");
        console.log(this.props.location.state.applicable_period);
    }

    handleSave(){
        updateRoomProfileInfo(this.state.room_type, this.state.room_type_2nd,
            this.state.block, this.state.block_2nd, this.state.level_range, this.state.window_facing,
            this.state.near_to_lift, this.state.near_to_washroom, this.state.level_has_pantry,
            this.state.level_has_mr, this.state.level_has_gsr, this.state.level_has_rr, this.state.weightage_order
        );
        
    }

    handleSubmit() {
        if (true) {
            updateRoomProfileInfo(this.state.room_type, this.state.room_type_2nd,
                this.state.block, this.state.block_2nd, this.state.level_range, this.state.window_facing,
                this.state.near_to_lift, this.state.near_to_washroom, this.state.level_has_pantry,
                this.state.level_has_mr, this.state.level_has_gsr, this.state.level_has_rr, this.state.weightage_order
            );
            //Submit Data
            this.props.history.push({
                pathname:"/application_summary",
                state: {
                    application_period_uid: this.props.location.state.application_period_uid,
                    applicable_period : this.props.location.state.applicable_period
                }
            });
        }
    }
    onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return; // Ignores if outside designated area

        const items = [...this.state.weightage_order];
        const item = items.splice(fromIndex, 1)[0];
        items.splice(toIndex, 0, item);
        this.setState({"weightage_order": items});
        console.log(this.state);
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
                                dataSource={this.state.weightage_order}
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
                        <bs.Col><a href="/apply3"><button id="application4_back_btn" type="button" className="btn btn-outline-primary">Go Previous Step</button></a></bs.Col>
                        <bs.Col><button id="application4_save_btn" type="button" onClick={this.handleSave} className="btn btn-outline-primary">Save</button></bs.Col>
                        <bs.Col><button id="application4_next_btn" type="submit" onClick={this.handleSubmit} className="btn btn-outline-primary">Go to next Step</button></bs.Col>
                    </bs.Row>
                </ProfileBox>
            </div>
        );
    }
}
