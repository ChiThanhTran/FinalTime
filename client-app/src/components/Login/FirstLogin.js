import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { Modal, Button, Input } from 'antd';
import { useNavigate } from "react-router";

const FirstLogin = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id")
    const [oldPass, setOldPass] = useState("");
    const [data, setData] = useState({
        password: ''
    })
    const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
    const navigate = useNavigate();

    useEffect(() => {
        axios(`https://rookiesgroup4.azurewebsites.net/getuser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => {
            setOldPass(res.data.password)
        })
    }, [token, userId])

    const submit = () => {
        if (oldPass !== data.password) {
            if (data.password.length >= 8) {
                if (mediumRegex.test(data.password)) {
                    if (data.password.indexOf(' ') < 0) {
                        axios({
                            method: 'PUT',
                            url: `https://rookiesgroup4.azurewebsites.net/firstlogin/${userId}`,
                            data: data,
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then(res => {
                                console.log(res)
                                Modal.success({
                                    title: 'CHANGE SUCCESSFULLY',
                                    content: 'Your password has been changed'
                                })
                                localStorage.setItem("firstLogin", false)
                                setIsModalVisible(false)
                                navigate("/home");
                                window.location.reload();
                            }).catch(err => console.error(err))
                    }
                    else {
                        Modal.error({
                            title: 'CHANGE FAILED',
                            content: 'Password cannot contain white space'
                        })
                    }
                }
                else {
                    Modal.error({
                        title: 'CHANGE FAILED',
                        content: 'Wrong Format Password'
                    })
                }
            }
            else {
                Modal.error({
                    title: 'CHANGE FAILED',
                    content: 'Password is at least 8 characters'
                })
            }
        }
        else {
            Modal.error({
                title: 'CHANGE FAILED',
                content: 'Your Password Invalid !!'
            })
        }
    };

    const handle = e => {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }

    return (
        <div className="App">
            <Modal title="First Login" visible={isModalVisible}
                onOk={submit}
                footer={[
                    <Button key="submit" type="primary" onClick={submit} disabled={
                        (data.password === "") ? true : false}>
                        Save
                    </Button>
                ]}
            >
                <label>This is the first time you logged in</label>
                <label>You have to change password to continue</label>
                {/* <input
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                    id="title"
                    name="password"
                    value={data.password}
                    onChange={(e) => handle(e)}
                    required
                /> */}

                <Input.Password
                    id="title"
                    name="password"
                    value={data.password}
                    onChange={(e) => handle(e)}
                />
            </Modal>
        </div>
    )
}

export default FirstLogin;