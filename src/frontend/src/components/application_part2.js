import * as bs from "react-bootstrap";
import React, {useState} from "react";
import styled from "styled-components";
import { instanceOf } from "prop-types";
import { Redirect, useHistory } from "react-router";



const EventDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  grid-column: auto;
  text-align: center;
`;

const Question = styled.p`
  text-align: Left;
  color: #3C64B1;
  font-weight: bold;
  font-size: medium;
`;

const Apply2BtnSet = styled.div`
  background-color: #F3F6FA;
  margin: 20pt 0;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

export default function ApplicationTwo() {
    const history = useHistory();

    const [prefBlk, setBlock] = useState("");
    const [prefLvl, setLvl] = useState("");
    const [prefPantry, setPantry] = useState("");
    const [prefToilet, setToilet] = useState("");
    const [prefGsr, setGsr] = useState("");
    const [prefQsr, setQsr] = useState("");
    const [prefMr, setMr] = useState("");
    const [prefRr, setRr] = useState("");
    const [prefWindow, setWindow] = useState("");
    const [prefShutters, setShutters] = useState("");
    const [prefRoomType1, setRoomType1] = useState("");
    const [prefRoomType2, setRoomType2] = useState("");
    
    const requiredFields = [prefBlk,prefLvl,prefPantry,prefToilet,prefGsr,prefQsr,prefMr,prefRr,
        prefWindow,prefShutters,prefRoomType1,prefRoomType2]

    function validateForm(){
        for(let i=0; i<requiredFields.length; i++){
            if(requiredFields[i]===""){
                return false;
            }
        }
        return true;
    }

    function handleSubmit(event){
        event.preventDefault();
        if(validateForm()){
            console.log("valid");
            history.push("/apply3");
        } else {

        }
    }

    return (
        <EventDiv>
            <h3>Room Preference</h3>
            <form className="form" onSubmit={handleSubmit}>
            <bs.Container>
                <bs.Row>
                    <bs.Col><Question>Preferred Roommate</Question></bs.Col>
                    <bs.Col><Question>Blacklisted Roommate</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Student ID"
                                    aria-describedby="basic-addon1"/>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Student ID"
                                    aria-describedby="basic-addon1"/>
                        </div>
                    </bs.Col>
                </bs.Row>
                <br/>
                <bs.Row>
                    <bs.Col><Question>Preferred Block</Question></bs.Col>
                    <bs.Col><Question>Preferred Level</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setBlock(e.target.value) }>
                            <input className="form-check-input" type="radio" name="block"
                                    value="Block 55" required/>
                                <label className="form-check-label">
                                    Block 55
                                </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setBlock(e.target.value)}>
                            <input className="form-check-input" type="radio" name="block" 
                                    value="Block 57"/>
                            <label className="form-check-label">
                                Block 57
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setBlock(e.target.value)}>
                            <input className="form-check-input" type="radio" name="block"
                                    value="Block 59"/>
                            <label className="form-check-label">
                                Block 59
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setBlock(e.target.value)}>
                            <input className="form-check-input" type="radio" name="block"
                                    value="No Preference"/>
                                <label className="form-check-label">
                                    No Preference
                                </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setLvl(e.target.value)}>
                            <input className="form-check-input" type="radio" name="level"
                                    value="Low Level" required/>
                            <label className="form-check-label">
                                Low Level(L1 - L4)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setLvl(e.target.value)}>
                            <input className="form-check-input" type="radio" name="level"
                                    value="Medium Level"/>
                            <label className="form-check-label">
                                Medium Level(L5 - L7)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setLvl(e.target.value)}>
                            <input className="form-check-input" type="radio" name="level"
                                    value="High Level"/>
                            <label className="form-check-label">
                                High Level(L8 - L12)
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setLvl(e.target.value)}>
                            <input className="form-check-input" type="radio" name="level"
                                    value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Near Pantry</Question></bs.Col>
                    <bs.Col><Question>Near Toilet</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setPantry(e.target.value)}>
                            <input className="form-check-input" type="radio" name="pantry"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setPantry(e.target.value)}>
                            <input className="form-check-input" type="radio" name="pantry"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setPantry(e.target.value)}>
                            <input className="form-check-input" type="radio" name="pantry"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setToilet(e.target.value)}>
                            <input className="form-check-input" type="radio" name="toilet"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setToilet(e.target.value)}>
                            <input className="form-check-input" type="radio" name="toilet"
                            value="No"/>
                            <label className="form-check-label" onChange={(e)=>setLvl(e.target.value)}>
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setToilet(e.target.value)}>
                            <input className="form-check-input" type="radio" name="toilet"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Near Group Study Room</Question></bs.Col>
                    <bs.Col><Question>Near Quiet Study Room</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setGsr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="gsr"
                            value="Yes"required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setGsr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="gsr"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setGsr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="gsr"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setQsr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="qsr"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setQsr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="qsr"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setQsr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="qsr"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Near Meeting Room</Question></bs.Col>
                    <bs.Col><Question>Near Recreational Room</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setMr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="mr"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setMr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="mr"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setMr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="mr"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setRr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="rr"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setRr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="rr"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setRr(e.target.value)}>
                            <input className="form-check-input" type="radio" name="rr"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Facing Window</Question></bs.Col>
                    <bs.Col><Question>Have Shutters</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setWindow(e.target.value)}>
                            <input className="form-check-input" type="radio" name="window"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setWindow(e.target.value)}>
                            <input className="form-check-input" type="radio" name="window"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setWindow(e.target.value)}>
                            <input className="form-check-input" type="radio" name="window"
                            value="No Preference"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setShutters(e.target.value)}>
                            <input className="form-check-input" type="radio" name="shutter"
                            value="Yes" required/>
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setShutters(e.target.value)}>
                            <input className="form-check-input" type="radio" name="shutter"
                            value="No"/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setShutters(e.target.value)}>
                            <input className="form-check-input" type="radio" name="shutter"
                            value="No Prefence"/>
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>

                <br/>

                <bs.Row>
                    <bs.Col><Question>Room Type (1st Choice)</Question></bs.Col>
                    <bs.Col><Question>Room Type (2nd Choice)</Question></bs.Col>
                </bs.Row>
                <bs.Row>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setRoomType1(e.target.value)}>
                            <input className="form-check-input" type="radio" name="type1"
                            value="Single Room" required/>
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setRoomType1(e.target.value)}>
                            <input className="form-check-input" type="radio" name="type1"
                            value="Double Room"/>
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setRoomType1(e.target.value)}>
                            <input className="form-check-input" type="radio" name="type1"
                            value="Single Studio"/>
                            <label className="form-check-label">
                                Single Studio
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left" onChange={(e)=>setRoomType2(e.target.value)}>
                            <input className="form-check-input" type="radio" name="type2"
                            value="Single Room"/>
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setRoomType2(e.target.value)}>
                            <input className="form-check-input" type="radio" name="type2"
                            value="Double Room"/>
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left" onChange={(e)=>setRoomType2(e.target.value)}>
                            <input className="form-check-input" type="radio" name="type2"
                            value="Single Studio"/>
                            <label className="form-check-label">
                                Single Studio
                            </label>
                        </div>
                    </bs.Col>
                </bs.Row>
                
            </bs.Container>
            <br/>
            <Apply2BtnSet>
                <bs.Container>
                    <bs.Row>
                        <bs.Col><a href="/apply"><button type="button" className="btn btn-outline-primary">Go To Previous Step</button></a></bs.Col>
                        <bs.Col><button type="button" className="btn btn-outline-primary">Save</button></bs.Col>
                        <bs.Col><button type="submit" className="btn btn-outline-primary" >Go to next step</button></bs.Col>
                    </bs.Row>
                </bs.Container>
            </Apply2BtnSet>
            </form>
        </EventDiv>
    );
}
