import {
    Row,
    Col,
    Form,
    Input,
    Button,
    DatePicker,
    Radio,
    Space,
    Modal
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from 'react';
import { useParams } from "react-router";
const { TextArea } = Input;

export default function CreateAsset() {
    const location = localStorage.getItem("location")
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const [Category, setCategory] = useState('');
    const [CategoryId, setCategoryId] = useState('');
    const [AssetCode, setAssetCode] = useState('');
    const [itemsAS, setItemsAS] = useState(['']);
    const format = new RegExp(".*?[^0-9].*")
    const formatX = new RegExp("^[a-zA-Z0-9 ]+$")
    let navigate = useNavigate();
    const showback = () => {
        navigate('/asset');
    };
    const id = useParams().id;
    useEffect(() => {
        fetch(`https://rookiesgroup4.azurewebsites.net/getasset/${id}`, {
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
            setCategory(json.categoryName);
            setCategoryId(json.categoryId);
            setAssetCode(json.assetCode)
          })
    }, [id, token]);
    console.log(CategoryId);
    useEffect(() => {
        axios.get(`https://rookiesgroup4.azurewebsites.net/getallassets?location=${location}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setItemsAS(response.data)
                console.log(response.data)
            })

    }, [token, location]);
   
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
            State: parseInt(fieldsValue["State"]),
            InstalledDate: fieldsValue["InstalledDate"].format("YYYY-MM-DD"),
            Location: location,
        };

        var Aspace = values.AssetName
        var Sspace = values.Specification
        var today = new Date()
        var ngaynhap = new Date(values.InstalledDate)
        var count = 0;
        console.log(Aspace)
        itemsAS.forEach(i => {
            if (Aspace === i.assetName)
                count++
        })
        if (count === 0) {
            if (ngaynhap < today) {
                if (Aspace.length < 50) {
                    if (Aspace.trim().length !== 0) {
                        if (formatX.test(Aspace)) {
                            if (format.test(Aspace)) {
                                if (Sspace.length < 500) {
                                    if (Sspace.trim().length !== 0) {
                                        axios({
                                            method: 'put',
                                            url: `https://rookiesgroup4.azurewebsites.net/updateasset/${id}`,
                                            data: {
                                                AssetName: values.AssetName.trim().replace(/\s+/g, " "),
                                                Specification: values.Specification.trim().replace(/\s+/g, " "),
                                                InstalledDate: values.InstalledDate,
                                                State: values.State,
                                                Location: values.Location,
                                                CategoryName: Category,
                                                AssetCode: AssetCode,
                                                CategoryId: CategoryId,

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
                                            content: 'Specification cannot input only white spaces'
                                        })
                                    }
                                } else {
                                    Modal.error({
                                        title: 'CREATE FAILED',
                                        content: 'Spectification length should be under 500 charaters'
                                    })
                                }
                            } else {
                                Modal.error({
                                    title: 'CREATE FAILED',
                                    content: 'Asset Name cannot input only number'
                                })
                            }
                        } else {
                            Modal.error({
                                title: 'CREATE FAILED',
                                content: 'Asset Name cannot input special characters'
                            })
                        }
                    } else {
                        Modal.error({
                            title: 'CREATE FAILED',
                            content: 'Asset Name cannot input only white spaces'
                        })
                    }
                } else {
                    Modal.error({
                        title: 'CREATE FAILED',
                        content: 'The Assets Name length should be  under 50 characters'
                    })
                }
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'Installed Date can not be a date in the future'
                })
            }
        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'Asset Name must be unique'
            })
        }
    };
    
    return (
        <>
            <Row>

                <div className="content">
                    <Row style={{ marginBottom: "10px" }} className="fontHeaderContent">
                        Edit Asset
                    </Row>
                    <Row
                        style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                    >
                        <Form name="complex-form"  form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >

                            <Form.Item label="Name" style={{ marginBottom: 20 }} 
                                
                                    name="AssetName"
                                    rules={[{ required: true }]}
                                    

                                >
                                    <Input className="inputForm" />
                                
                            </Form.Item>
                            <Form.Item label="Category" style={{ marginBottom: 20 }} >
                            <Form.Item
                                    
                                    rules={[{ required: true }]}
                                    style={{ display: "block" }}

                                >
                                    <Input name="Category" value={Category} readOnly className="inputForm" />
                                </Form.Item>
                                
                            </Form.Item>
                            <Form.Item label="Specification" style={{ marginBottom: 20 }}
                                
                                    name="Specification"
                                    rules={[{ required: true }]}
                                   
                                >
                                    <TextArea autoSize={{ minRows: 5, maxRows: 7 }} />
                                
                            </Form.Item>
                            <Form.Item label="Installed Date" style={{ marginBottom: 20 }}
                                
                                    name="InstalledDate"
                                    rules={[{ required: true }]}
                                    
                                >
                                    <DatePicker
                                        style={{ display: "block" }}
                                        format="DD-MM-YYYY"
                                        placeholder=""
                                        className="inputForm"
                                    />
                                
                            </Form.Item>
                            <Form.Item label="State" style={{ marginBottom: 20 }}
                                 name="State" rules={[{ required: true }]}>
                                    <Radio.Group >
                                        <Space direction="vertical">
                                            <Radio value="0">Availabale</Radio>
                                            <Radio value="1">Not Availabale</Radio>
                                            <Radio value="2">Waiting for recycling</Radio>
                                            <Radio value="3">Recycled</Radio>
                                        </Space>
                                    </Radio.Group>
                                
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
        </>
    );
}