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
import axios from "axios";
import 'antd/dist/antd.css';
import "./CreateUser.css";

export default function CreateUser() {
    let navigate = useNavigate();
    const showback = () => {
        navigate('/user');
    };
    const [form] = Form.useForm();
    const location = localStorage.getItem("location")
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
        var Fspace = values.FirstName
        var Lspace = values.LastName
        const token = localStorage.getItem("token")
        if (Fspace.length < 50) {
            if (Lspace.length < 50) {
                if (Fspace.indexOf(' ') < 0) {
                    if (Lspace.trim().length !== 0) {
                        if (ngayjoinDay !== 0 && ngayjoinDay !== 6) {
                            if (ngaysinh < today) {
                                if (chenhlech1 < 0) {
                                    if (chenhlech > 0) {
                                        if (tuoi >= 18) {
                                            axios({
                                                method: 'post',
                                                url: `https://rookiesgroup4.azurewebsites.net/createuser`,
                                                data: {
                                                    FirstName: values.FirstName,
                                                    LastName: values.LastName.trim().replace(/\s+/g, " "),
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
                    } else {
                        Modal.error({
                            title: 'CREATE FAILED',
                            content: 'Lastname cannot contains white spaces'
                        })
                    }
                } else {
                    Modal.error({
                        title: 'CREATE FAILED',
                        content: 'Firstname cannot contains white spaces'
                    })
                }
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'The Lastname length should be 50 characters'
                })
            }

        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'The Firstname length should be 50 characters'
            })
        }

    };

    return (
        <Row>
            <div className="content">
                <Row style={{ marginBottom: "10px", color: "#cf2338" }} className="fontHeaderContent">
                    Create New User
                </Row>
                <Row
                    style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                >
                    <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >

                        <Form.Item label="FirstName" style={{ marginBottom: 20 }}

                            name="FirstName"
                            rules={[{ required: true }]}


                        >
                            <Input className="inputForm" />

                        </Form.Item>

                        <Form.Item label="LastName" style={{ marginBottom: 20 }}

                            name="LastName"
                            rules={[{ required: true }]}

                        >
                            <Input className="inputForm" />

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
                                style={{ display: "block", color: "black" }}
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
                                <Option style={{ color: "black" }} value="1">Staff</Option>
                                <Option value="0">Admin</Option>
                            </Select>

                        </Form.Item>

                        <Form.Item shouldUpdate>
                        {()=>(
                            <Row>
                                <Col span={3} offset={6}>
                                    <Button htmlType="submit" className="buttonSave" type="primary" danger  disabled={
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