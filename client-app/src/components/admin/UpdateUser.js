import {
    Row,
    Col,
    Form,
    Input,
    Select,
    Button,
    Modal,
    DatePicker,
    Radio,
} from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import axios from "axios";
import "./CreateUser.css";

export default function UpdateUser() {
    const [FirstName, setFisrtName] = useState('')
    const [LastName, setLastName] = useState('')
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const showback = () => {
        navigate('/user');
    };
    const location = localStorage.getItem("location")
    const token = localStorage.getItem("token")
    const id = useParams().id;
    const { Option } = Select;
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };
    useEffect(() => {
        fetch(`https://rookiesgroup4.azurewebsites.net/getuser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log(json.firstName);
                setFisrtName(json.firstName);
                setLastName(json.lastName);
            })
    }, [id, token]);
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            Gender: parseInt(fieldsValue["Gender"]),
            Type: parseInt(fieldsValue["Type"]),
            DateOfBirth: fieldsValue["DateOfBirth"].format("YYYY-MM-DD"),
            JoinedDate: fieldsValue["JoinedDate"].format("YYYY-MM-DD"),
            Location: location,

        };
        var today = new Date()
        var ngaysinh = new Date(values.DateOfBirth)
        var tuoi = Math.abs(today - ngaysinh) / (1000 * 60 * 60 * 24) / 365
        var ngayjoin = new Date(values.JoinedDate)
        var ngayjoinDay = ngayjoin.getDay()
        var chenhlech = ngayjoin - ngaysinh
        var chenhlech1 = ngayjoin - today
        const token = localStorage.getItem("token")

        if (ngayjoinDay !== 0 && ngayjoinDay !== 6) {
            if (ngaysinh < today) {
                if (chenhlech1 < 0) {
                    if (chenhlech > 0) {
                        if (tuoi >= 18) {
                            axios({
                                method: 'put',
                                url: `https://rookiesgroup4.azurewebsites.net/updateuser/${id}`,
                                data: {
                                    FirstName: FirstName,
                                    LastName: LastName,
                                    DateOfBirth: values.DateOfBirth,
                                    JoinedDate: values.JoinedDate,
                                    Gender: values.Gender,
                                    Type: values.Type,
                                    Location: values.Location
                                },
                                headers: { Authorization: `Bearer ${token}` }
                            })

                                .then(response => {
                                    console.log(response.data)
                                    Modal.success({
                                        title: 'SAVE SUCCESSFULLY',
                                        content: 'You have done this very well',
                                        onOk: () => { showback() }
                                    })
                                })
                                .catch(e => {
                                    Modal.error({
                                        title: 'CHANGE FAILED',
                                        content: e
                                    })
                                });
                        } else {
                            Modal.error({
                                title: 'CREATE FAILED',
                                content: 'User is under 18 age. Please select a different date'
                            })
                        }
                    } else {
                        Modal.error({
                            title: 'CREATE FAILED',
                            content: 'You must join after you born'
                        })
                    }
                } else {
                    Modal.error({
                        title: 'CREATE FAILED',
                        content: 'Joined Date can not be in a future'
                    })
                }
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'Birthday can not be a date in the future'
                })
            }

        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'You cannot join on Saturday or Sunday'
            })
        }

    };

    return (
        <Row>
            <div className="content">
                <Row style={{ marginBottom: "10px", color: "#cf2338" }} className="fontHeaderContent">
                    Edit User
                </Row>
                <Row
                    style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                >
                    <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >

                        <Form.Item label="FirstName" style={{ marginBottom: 20 }}


                            rules={[{ required: true }]}

                        >
                            <Input name="FirstName" value={FirstName} readOnly className="inputForm" />

                        </Form.Item>
                        <Form.Item label="LastName" style={{ marginBottom: 20 }}


                            rules={[{ required: true }]}

                        >
                            <Input name="LastName" value={LastName} readOnly className="inputForm" />

                        </Form.Item>
                        <Form.Item label="Date of Birth" style={{ marginBottom: 20 }}

                            name="DateOfBirth"
                            rules={[{ required: true }]}

                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD/MM/YYYY"
                                placeholder=""
                                className="inputForm"
                            />

                        </Form.Item>
                        <Form.Item label="Joined Date" style={{ marginBottom: 20 }}

                            name="JoinedDate"
                            rules={[{ required: true }]}

                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD/MM/YYYY"
                                placeholder=""
                                className="inputForm"
                            />

                        </Form.Item>
                        <Form.Item label="Gender" style={{ marginBottom: 20 }}
                            name="Gender" rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="1">Female</Radio>
                                <Radio value="0">Male</Radio>
                            </Radio.Group>

                        </Form.Item>
                        <Form.Item label="Type"

                            name="Type"
                            rules={[{ required: true }]}

                        >
                            <Select
                                showSearch
                                className="inputForm"
                                style={{ display: "block" }}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children
                                        .toLowerCase()
                                        .localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Staff</Option>
                                <Option value="0">Admin</Option>
                            </Select>

                        </Form.Item>

                        <Form.Item shouldUpdate>
                        {() => (
                            <Row>
                                <Col span={3} offset={6}>
                                    <Button htmlType="submit" className="buttonSave" type="primary" danger disabled={
                                        !form.isFieldsTouched(true) ||
                                        form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                                    }>
                                        Save
                                    </Button>
                                </Col>
                                <Col span={3} offset={6}>
                                    <Button className="buttonCancle" onClick={showback}>Cancel</Button>
                                </Col>
                            </Row>
                            )}
                        </Form.Item>
                    </Form>
                </Row>
            </div>
        </Row>
    );
}