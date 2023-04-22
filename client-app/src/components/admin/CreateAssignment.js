import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Modal,
    DatePicker,
    Radio,
    Table
} from "antd";
import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from 'react';
const { TextArea } = Input;
const { Search } = Input;

export default function CreateAssignment() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const location = localStorage.getItem("location")
    const id = localStorage.getItem("id")
    const username = localStorage.getItem("username")
    let navigate = useNavigate();
    const showback = () => {
        navigate('/assignment');
    };
    const token = localStorage.getItem("token");
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };
    //Modal User
    const [isVisible, setIsVisible] = useState(false)
    const [dataSource, setDataSource] = useState([]);
    const [totalUser, setTotalUser] = useState();
    const [searchText, setSearchText] = useState("");
    const handleCancel = () => {
        setIsVisible(false)
    };
    const showModal = () => {
        setIsVisible(true)
    }
    useEffect(() => {
        setLoading(true);

        axios.get(`https://rookiesgroup4.azurewebsites.net/getallusers?PageNumber=${page}&PageSize=${pageSize}&location=${location}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDataSource(response.data);
                setTotalUser(response.headers["user-pagination"]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [token, page, pageSize, location]);
    const columns = [
        {
            key: "1",
            title: "",
            dataIndex: "id",
            render: (id) => (
                <Radio onChange={() => onChangeStaff(id)} value={id}></Radio>
            )
        },
        {
            key: "2",
            title: "Staff Code",
            dataIndex: "staffCode",
            sorter: (a, b) => {
                if (a.staffCode > b.staffCode) {
                    return -1;
                }
                if (b.staffCode > a.staffCode) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "3",
            title: "Full Name",
            dataIndex: "fullName",
            sorter: (a, b) => {
                if (a.fullName > b.fullName) {
                    return -1;
                }
                if (b.fullName > a.fullName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "4",
            title: "Type",
            dataIndex: "type",
            render: (type) => {
                return <p>{type === 0 ? "Admin" : "Staff"}</p>
            },
            sorter: (a, b) => {
                if (a.type > b.type) {
                    return -1;
                }
                if (b.type > a.type) {
                    return 1;
                }
                return 0;
            }
        },
    ];
    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }
    const dataFiltered = (dataSource.filter((user) => (
        user.fullName.toLowerCase().includes(searchText.toLowerCase())
        || user.username.toLowerCase().includes(searchText.toLowerCase())
        || user.staffCode.toLowerCase().includes(searchText.toLowerCase())
    )
    ))
    const onSearch = value => console.log(value);
    const [changeStaff, setChangeStaff] = useState()
    const onChangeStaff = (id) => {
        setChangeStaff(id)
    }
    const [userDataInput, setUserDataInput] = useState({})
    const pickdata = () => {
        var array = {
            User: dataSource.find(x => x.id === parseInt(changeStaff)).staffCode + ' - ' + dataSource.find(x => x.id === parseInt(changeStaff)).fullName,
            ID: dataSource.find(x => x.id === parseInt(changeStaff)).id,
            Name: dataSource.find(x => x.id === parseInt(changeStaff)).username,
        }
        setUserDataInput(array)
        setIsVisible(false)
    }


    //Modal Asset
    const [isVisible2, setIsVisible2] = useState(false)
    const [dataSource2, setDataSource2] = useState([]);
    const [totalUser2, setTotalUser2] = useState();
    const [searchText2, setSearchText2] = useState("");
    const handleCancel2 = () => {
        setIsVisible2(false)
    };
    const showModal2 = () => {
        setIsVisible2(true)
    }
    useEffect(() => {
        setLoading(true);

        axios.get(`https://rookiesgroup4.azurewebsites.net/getallassets?PageNumber=${page}&PageSize=${pageSize}&location=${location}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDataSource2(response.data);
                setTotalUser2(response.headers["asset-pagination"]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [token, page, pageSize, location]);
    const columns2 = [
        {
            key: "1",
            title: "",
            dataIndex: "id",
            render: (id) => (
                <Radio onChange={() => onChangeStaff2(id)} value={id}></Radio>
            )
        },
        {
            key: "2",
            title: "Asset Code",
            dataIndex: "assetCode",
            sorter: (a, b) => {
                if (a.assetCode > b.assetCode) {
                    return -1;
                }
                if (b.assetCode > a.assetCode) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "3",
            title: "Asset Name",
            dataIndex: "assetName",
            sorter: (a, b) => {
                if (a.assetName > b.assetName) {
                    return -1;
                }
                if (b.assetName > a.assetName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "4",
            title: "Category",
            dataIndex: "categoryName",
            sorter: (a, b) => {
                if (a.categoryName > b.categoryName) {
                    return -1;
                }
                if (b.categoryName > a.categoryName) {
                    return 1;
                }
                return 0;
            }
        },
    ];
    const itemRender2 = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }
    const dataFiltered2 = (dataSource2.filter((asset) => (
        asset.assetName.toLowerCase().includes(searchText2.toLowerCase())
        || asset.assetCode.toLowerCase().includes(searchText2.toLowerCase())
        || asset.categoryName.toLowerCase().includes(searchText2.toLowerCase())
    )
    ))
    const onSearch2 = value2 => console.log(value2);
    const [changeStaff2, setChangeStaff2] = useState()
    const onChangeStaff2 = (id) => {
        setChangeStaff2(id)
    }
    const [assetDataInput, setAssetDataInput] = useState({})
    const pickdata2 = () => {
        var array = {
            Asset: dataSource2.find(x => x.id === parseInt(changeStaff2)).assetCode + ' - ' + dataSource2.find(x => x.id === parseInt(changeStaff2)).assetName,
            ID: dataSource2.find(x => x.id === parseInt(changeStaff2)).id,
            Code: dataSource2.find(x => x.id === parseInt(changeStaff2)).assetCode,
            Name: dataSource2.find(x => x.id === parseInt(changeStaff2)).assetName,
        }
        setAssetDataInput(array)
        setIsVisible2(false)
    }

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            AssignedDate: fieldsValue["AssignedDate"].format("YYYY-MM-DD"),
            Location: location,
            AssignedByUserId: id,
            AssignedByUserName: username,
        };
        var today = new Date()
        var ngaynhap = new Date(values.AssignedDate)
        var Nspace = values.Note
        if (ngaynhap > today - 1) {
            if (Nspace.trim().length !== 0) {
                axios({
                    method: 'post',
                    url: `https://rookiesgroup4.azurewebsites.net/createassignment`,
                    data: {
                        AssetId: assetDataInput.ID,
                        AssetCode: assetDataInput.Code,
                        AssetName: assetDataInput.Name,
                        AssignedToUserId: userDataInput.ID,
                        AssignedToUserName: userDataInput.Name,
                        AssignedByUserId: values.AssignedByUserId,
                        AssignedByUserName: values.AssignedByUserName,
                        AssignedDate: values.AssignedDate,
                        Note: values.Note.trim().replace(/\s+/g, " "),
                        AssignmentState: 2,
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
                    content: 'Note cannot input only white spaces'
                })
            }
        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'Assigned Date can not be a date in the past'
            })
        }
    };

    return (
        <>
            <Row>
                <div className="content">
                    <Row style={{ marginBottom: "10px" ,color: "#cf2338"}} className="fontHeaderContent">
                        Create New Assignment
                    </Row>
                    <Row
                        style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                    >
                        <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >

                            <Form.Item label="User" style={{ marginBottom: 0 }} >
                                <Form.Item
                                    // name="User"
                                    rules={[{ required: true }]}
                                    style={{ display: "block" }}
                                >
                                    <Search name="User" value={userDataInput.User} readOnly enterButton onSearch={showModal} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Asset" style={{ marginBottom: 0 }} >
                                <Form.Item
                                    // name="Asset"
                                    rules={[{ required: true }]}
                                    style={{ display: "block" }}

                                >
                                    <Search name="Asset" value={assetDataInput.Asset} readOnly enterButton onSearch={showModal2} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Assigned Date" style={{ marginBottom: 20 }}
                                
                                    name="AssignedDate"
                                    rules={[{ required: true }]}
                                    
                                >
                                    <DatePicker
                                        style={{ display: "block" }}
                                        format="DD-MM-YYYY"
                                        placeholder=""
                                        className="inputForm"
                                    />
                                
                            </Form.Item>
                            <Form.Item label="Note" style={{ marginBottom: 20 }}>
                                <Form.Item
                                    name="Note"
                                    
                                    style={{ display: "block" }}
                                >
                                    <TextArea autoSize={{ minRows: 5, maxRows: 7 }} />
                                </Form.Item>
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
            <Modal
                visible={isVisible}
                title="Select User"
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={pickdata} >
                        Save
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}
            >
                <Search
                    allowClear
                    onSearch={onSearch}
                    value={searchText}
                    onChange={evt => setSearchText(evt.target.value)}
                    style={{ width: 200 }}
                />
                <Radio.Group>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={dataFiltered}
                        pagination={{
                            total: totalUser,
                            current: page,
                            pageSize: pageSize,
                            pageSizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                            itemRender: itemRender,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize)
                            }
                        }}
                    >
                    </Table>
                </Radio.Group>
            </Modal>
            <Modal
                visible={isVisible2}
                title="Select Asset"
                onCancel={handleCancel2}
                footer={[
                    <Button key="submit" type="primary" onClick={pickdata2} >
                        Save
                    </Button>,
                    <Button key="back" onClick={handleCancel2}>
                        Cancel
                    </Button>
                ]}
            >
                <Search
                    allowClear
                    onSearch={onSearch2}
                    value={searchText2}
                    onChange={evt => setSearchText2(evt.target.value)}
                    style={{ width: 200 }}
                />
                <Radio.Group>
                    <Table
                        loading={loading}
                        columns={columns2}
                        dataSource={dataFiltered2}
                        pagination={{
                            total: totalUser2,
                            current: page,
                            pageSize: pageSize,
                            pageSizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                            itemRender2: itemRender2,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize)
                            }
                        }}
                    >
                    </Table>
                </Radio.Group>
            </Modal>
        </>
    );
} 