import * as bs from "react-bootstrap";
import React from "react";
import styled from "styled-components";


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
  margin: 20pt 0pt;
  padding: 20pt 20pt;
  border-radius: 20pt;
`;

export default function ApplicationTwo() {
    return (
        <EventDiv>
            <h3>Room Preference</h3>
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
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="block"
                                    />
                                <label className="form-check-label">
                                    Block 55
                                </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="block"
                                    />
                            <label className="form-check-label">
                                Block 57
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="block"
                                    />
                            <label className="form-check-label">
                                Block 59
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="block"
                                    />
                                <label className="form-check-label">
                                    No Preference
                                </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="level"
                                    />
                            <label className="form-check-label">
                                Low Level(L1 - L4)
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="level"
                                    />
                            <label className="form-check-label">
                                Medium Level(L5 - L7)
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="level"
                                    />
                            <label className="form-check-label">
                                High Level(L8 - L12)
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="level"
                                    />
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
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="pantry"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="pantry"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="pantry"
                            />
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="toilet"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="toilet"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="toilet"
                            />
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
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="gsr"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="gsr"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="gsr"
                            />
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="qsr"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="qsr"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="qsr"
                            />
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
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="mr"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="mr"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="mr"
                            />
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="rr"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="rr"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="rr"
                            />
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
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="window"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="window"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="window"
                            />
                            <label className="form-check-label">
                                No Preference
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="shutter"
                            />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="shutter"
                            />
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="shutter"
                            />
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
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="type1"
                            />
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="type1"
                            />
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="type1"
                            />
                            <label className="form-check-label">
                                Single Studio
                            </label>
                        </div>
                    </bs.Col>
                    <bs.Col>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="type2"
                            />
                            <label className="form-check-label">
                                Single Room
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="type2"
                            />
                            <label className="form-check-label">
                                Double Room
                            </label>
                        </div>
                        <div className="form-check" align="left">
                            <input className="form-check-input" type="radio" name="type2"
                            />
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
                        <bs.Col><a href="/application_summary"><button type="button" className="btn btn-outline-primary">Go to next step</button></a></bs.Col>
                    </bs.Row>
                </bs.Container>
            </Apply2BtnSet>
        </EventDiv>
    );
}