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
    Divider,
    Typography,
    Space
} from "antd";
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons';
import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from 'react';
const { TextArea } = Input;



export default function CreateAsset() {
    const [items, setItems] = useState(['']);
    const [itemsAS, setItemsAS] = useState(['']);
    const [form] = Form.useForm();
    const location = localStorage.getItem("location")
    let navigate = useNavigate();
    const showback = () => {
        navigate('/asset');
    };
    const format = new RegExp(".*?[^0-9].*")
    const formatX = new RegExp("^[a-zA-Z0-9 ]+$")
    const token = localStorage.getItem("token");
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
        axios.get(`https://rookiesgroup4.azurewebsites.net/getallcategories`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setItems(response.data)
            })

    }, [token]);
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

    const [classbox, setClassBox] = useState('d-none')
    const [disapear, setDisapearBox] = useState('')
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newCategoryPrefix, setNewCategoryPrefix] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')
    const showbox = () => {
        setClassBox('')
        setDisapearBox('d-none')
    }
    const closebox = () => {
        setClassBox('d-none')
        setDisapearBox('')
    }
    const SaveCategory = (e) => {
        var count = 0;
        var count1 = 0;
        console.log(e)
        items.forEach(i => {
            if (e.CategoryName === i.categoryName)
                count++
        })
        items.forEach(i => {
            if (e.CategoryPrefix === i.categoryPrefix)
                count1++
        })

        if (count === 0) {
            if (count1 === 0) {
                fetch('https://rookiesgroup4.azurewebsites.net/addcategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        categoryName: newCategoryName,
                        categoryPrefix: newCategoryPrefix
                    })
                }).then(() => {
                    Modal.success({
                        title: 'CREATE SUCCESSFULLY',
                        content: 'Your category has been create',
                        onOk() { window.location.reload() }
                    })

                })
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'Category Prefix is already existed. Please enter a different category prefix'
                })
            }
        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'Category Name is already existed. Please enter a different category name'
            })
        }

    }
    const handleNewCaName = (e) => {
        setNewCategoryName(e.target.value)
    }
    const handleNewCaPre = (e) => {
        setNewCategoryPrefix(e.target.value)
    }
    const handleChange = (e) => {
        console.log(e)
        setNewCategoryId(e)
    }
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
                                            method: 'post',
                                            url: `https://rookiesgroup4.azurewebsites.net/createasset`,
                                            data: {
                                                AssetName: values.AssetName.trim().replace(/\s+/g, " "),
                                                CategoryId: newCategoryId,
                                                Specification: values.Specification.trim().replace(/\s+/g, " "),
                                                InstalledDate: values.InstalledDate,
                                                State: values.State,
                                                Location: values.Location,
                                                AssetCode: '',
                                                CategoryName: ''

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
                    <Row style={{ marginBottom: "10px", color: "#cf2338" }} className="fontHeaderContent">
                        Create New Asset
                    </Row>
                    <Row
                        style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                    >
                        <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >

                            <Form.Item label="Name" style={{ marginBottom: 20 }}

                                name="AssetName"
                                rules={[{ required: true }]}


                            >
                                <Input className="inputForm" />

                            </Form.Item>
                            <Form.Item label="Category" style={{ marginBottom: 20 }}

                                name="Category"
                                rules={[{ required: true }]}

                            >
                                <Select
                                    placeholder="Category"
                                    onChange={handleChange}
                                    dropdownRender={menu => (
                                        <>

                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space align="center" style={{ marginTop: "10px", marginLeft: "5px", display: "block" }} rules={[{ required: true }]} >
                                                <Typography.Link style={{ whiteSpace: 'nowrap' }} onClick={showbox} className={disapear} >
                                                    Create new Category
                                                </Typography.Link>
                                                <Form onFinish={SaveCategory} >
                                                    <Form.Item className={classbox}
                                                        rules={[{ required: true }]}
                                                        name="CategoryName"
                                                    >
                                                        <Input

                                                            placeholder="Enter Category Name"
                                                            value={newCategoryName}
                                                            onChange={handleNewCaName}
                                                        />

                                                    </Form.Item>
                                                    <Form.Item className={classbox}
                                                        rules={[{ required: true }]}
                                                        name="CategoryPrefix"
                                                    >
                                                        <Input placeholder="Enter Category Prefix" value={newCategoryPrefix} onChange={handleNewCaPre} />

                                                    </Form.Item>
                                                    <Button style={{ whiteSpace: 'nowrap' }} htmlType="submit" className={classbox} type="primary" >
                                                        <PlusOutlined /> Add item
                                                    </Button>
                                                    <Button style={{ whiteSpace: 'nowrap' }} className={classbox} onClick={closebox} type="danger">
                                                        <CloseOutlined /> Close
                                                    </Button>
                                                </Form>
                                            </Space>
                                        </>
                                    )}
                                >
                                    {items.map(item => (
                                        <Option value={item.id} key={item.id} className="option--category__select">{item.categoryName}</Option>
                                    ))}

                                </Select>

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
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value="0">Availabale</Radio>
                                        <Radio value="1">Not Availabale</Radio>
                                    </Space >
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