import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import axios from 'axios';
import {getToken, setToken, setUsername, setAdmin, setAdminWrite} from "../variables/localstorage";
import {url} from "../variables/url.js";
import {notification} from "antd";

export default function Login() {
    const [username, setUsernameElement] = useState("");
    const [password, setPassword] = useState("");
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    //test
    async function getDataAxios(username,password) {
        const data = JSON.stringify({"username":username,"password":password});
        const config = {
            method: 'post',
            url: url + '/api/auth/login',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data : data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setToken(response.data["token"]);
                if(response.data["is_admin"] === true){setAdmin(response.data["is_admin"])};
                if(response.data["is_admin_write"] === true){setAdminWrite(response.data["is_admin_write"])};
                setUsername(username);
                console.log("Token: ");
                console.log(getToken());
                window.location.href="/";
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: 'Log in Failed',
                    description:
                        'Either username or password is incorrect',
                });
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
                <Button id = "loginbtn" block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}
