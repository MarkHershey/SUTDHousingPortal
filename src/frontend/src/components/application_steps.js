import React from "react";
import {Steps} from "antd";
import styled from "styled-components";

const {Step} = Steps;

const StepDiv = styled.div`
  margin: 0pt 100pt;
  padding: 20pt 20pt;
`;

export function ApplicationStep(props) {
    return (
        <StepDiv>
            <Steps current={props.i}>
                <Step title="Personal Information" description="Check your personal information"/>
                <Step title="Room Preference" description="Select your room preference"/>
                <Step title="Lifestyle Preference" description="Select your lifestyle preference"/>
                <Step title="Weightage Selection" description="Select preference weightage"/>
                <Step title="Review & Submit" description="Review application & submit"/>
            </Steps>
        </StepDiv>
    );
}
