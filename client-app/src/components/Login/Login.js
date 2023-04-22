import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import authService from "../../services/auth.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Form, Input, Button } from 'antd';

const Login = () => {
    const [username, setUsername] = useState("");
    
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        try {
            await authService.login(username, password).then(
                (response) => {
                    console.log(response)
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("role", response.role);
                    localStorage.setItem("firstLogin", response.firstLogin);
                    localStorage.setItem("username", response.username);
                    localStorage.setItem("location", response.location);
                    localStorage.setItem("id", response.id);
                    if (localStorage.getItem("role") === "Admin") { navigate("/home") }
                    else if (localStorage.getItem("role") === "Staff") { navigate("/homestaff") }
                    window.location.reload();
                },
                (error) => {
                    if (error?.response.status === 400) { setErrMessage("Username or password is incorrect. Please try again?") }
                }
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="App">
            {localStorage.getItem("token") ?
                (<div>You're Login</div>) :
                (<Form
                    name="basic"
                    labelCol={{
                        span: 9,
                    }}
                    wrapperCol={{
                        span: 6,
                    }}
                    onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                        <Input.Password  onCopy={(e) => {
                            e.preventDefault()
                            return false;
                        }} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 9,
                            span: 6,
                        }}
                    >
                        <Button type="primary" htmlType="submit" disabled={
                            (password === "" || username === "" || password.match(/^ *$/) !== null 
                            || username.match(/^ *$/) !== null) ? true : false}>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 9,
                            span: 6,
                        }}
                    ><label className="err-msg">{errMessage}</label></Form.Item>
                </Form>)
            }
        </div>
    )
}
export default Login;