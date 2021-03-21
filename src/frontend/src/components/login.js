import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import axios from 'axios';
import {getToken, setToken, setUsername} from "../variables/auth";

export default function Login() {
    const [username, setUsernameElement] = useState("");
    const [password, setPassword] = useState("");
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function getDataAxios(username,password) {
        var data = JSON.stringify({"username":username,"password":password});
        var config = {
            method: 'post',
            url: 'http://esc.dev.markhh.com/api/auth/login',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setToken(response.data["token"]);
                setUsername(username);
                console.log("Token: ");
                console.log(getToken());
                window.location.href="/";
            })
            .catch(function (error) {
                console.log(error);
                alert("Wrong ID or password!")
            });
    }


    function handleSubmit(event) {
        event.preventDefault();
        getDataAxios(username, password);
    }

    return (
        <div className="Login">
            <h3 align="center"> SUTD Housing Portal </h3>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsernameElement(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}
