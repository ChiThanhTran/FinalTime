import "antd/dist/antd.min.css";
import "../assets/UserList.css"
import axios from "axios";
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Space, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faRotateLeft } from "@fortawesome/free-solid-svg-icons"

const AdminHome = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalAssignment, setTotalAssignment] = useState();
    const [detail, setDetail] = useState([]);
    const [isVisible, setIsVisible] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnReturnDisabled, setBtnReturnDisabled] = useState(false);

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const handleCancel = () => {
        setIsVisible(false);
        localStorage.removeItem("returnId");
        setAcceptedModal(false);
    };

    const showModal = (id) => ({
        onDoubleClick: (e) => {
            fetch(`https://rookiesgroup4.azurewebsites.net/getassignment/${id}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    setDetail(json);

                })

            setIsVisible(true)
        }
    });

    useEffect(() => {
        setLoading(true);

        axios.get(`https://rookiesgroup4.azurewebsites.net/viewownassignment?username=${username}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDataSource(response.data);
                setTotalAssignment(response.data.length)
                dataSource.map(assignment => (
                    assignment.assignmentState === 0 ? setBtnDisabled(true) : setBtnReturnDisabled(true)
                ));
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [token, username, dataSource]);


    const columns = [
        {
            key: "1",
            title: "No.",
            dataIndex: "id",
            sorter: (a, b) => {
                if (a.id > b.id) {
                    return -1;
                }
                if (b.id > a.id) {
                    return 1;
                }
                return 0;
            }
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
            title: "Assigned To",
            dataIndex: "assignedToUserName",
            sorter: (a, b) => {
                if (a.assignedToUserName > b.assignedToUserName) {
                    return -1;
                }
                if (b.assignedToUserName > a.assignedToUserName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "5",
            title: "Assigned By",
            dataIndex: "assignedByUserName",
            sorter: (a, b) => {
                if (a.assignedByUserName > b.assignedByUserName) {
                    return -1;
                }
                if (b.assignedByUserName > a.assignedByUserName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "6",
            title: "Assigned Date",
            dataIndex: "assignedDate",
            render: (assignedDate) => {
                return <span>{new Date(assignedDate).toLocaleDateString("en-GB")}</span>
            },
            sorter: (a, b) => {
                if (a.assignedDate > b.assignedDate) {
                    return -1;
                }
                if (b.assignedDate > a.assignedDate) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "7",
            title: "State",
            dataIndex: "assignmentState",
            render: (assignmentState) => {
                return <span>{assignmentState === 0 ? "Accepted" : assignmentState === 1 ? "Declined" : "Waiting For Acceptance"}</span>
            },
            sorter: (a, b) => {
                if (a.assignmentState > b.assignmentState) {
                    return -1;
                }
                if (b.assignmentState > a.assignmentState) {
                    return 1;
                }
                return 0;
            }
        },
        {
            width: "15%",
            dataIndex: "id",
            render: (id) => (
                <Space>
                    <Button type="text" className="btn--action__noborder" disabled={btnDisabled} >
                        <FontAwesomeIcon
                            icon={faCheck} size="2x"
                            style={{ color: "#d42a2a" }}
                            onClick={() => showAcceptModal(id)}
                            className="svg--check"
                        />
                    </Button>
                    <Button type="text" className="btn--action__noborder" disabled={btnDisabled} >
                        <FontAwesomeIcon
                            icon={faXmark} size="2x"
                            onClick={(id) => alert("bbb")}
                            className="svg--xmark"
                        />
                    </Button>
                    <Button type="text" className="btn--action__noborder" disabled={btnReturnDisabled} >
                        <FontAwesomeIcon
                            icon={faRotateLeft} size="xl"
                            style={{ color: "#2352eb" }}
                            onClick={(id) => alert("ccc")}
                            className="svg--rotate"
                        />
                    </Button>
                </Space>
            )
        },
    ];

    const [acceptedModal, setAcceptedModal] = useState(false);

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    const showAcceptModal = (id) => {
        localStorage.setItem("returnId", id);
        console.log(id)
        setAcceptedModal(true);
    }

    const handleAccepted = () => {
        const returnId = localStorage.getItem("returnId");
        console.log(returnId)
        fetch(`https://rookiesgroup4.azurewebsites.net/respondassignment/accept/${returnId}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json());

        setAcceptedModal(false)
    };

    return (
        <>
            <article>
                <h3 className="title">
                    My Assignment
                </h3>

                {dataSource?.length
                    ? (
                        <div>
                            <div className="table-responsive-sm">
                                <Table
                                    loading={loading}
                                    columns={columns}
                                    dataSource={dataSource}
                                    rowKey="id"
                                    pagination={{
                                        showSizeChanger: true,
                                        total: totalAssignment,
                                        current: page,
                                        pageSize: pageSize,
                                        pageSizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                                        itemRender: itemRender,
                                        onChange: (page, pageSize) => {
                                            setPage(page);
                                            setPageSize(pageSize)
                                        }
                                    }}
                                    onRow={(asset) => (showModal(asset.id))}
                                >
                                </Table>
                            </div>
                        </div>
                    ) : <p>No assignment to display</p>}
            </article>
            <Modal
                visible={isVisible}
                title="Detail Assignment Information"
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <p className="view_Detail">Asset Code : {detail.assetCode}</p>
                <p className="view_Detail">Asset Name : {detail.assetName} </p>
                <p className="view_Detail">Specification : {detail.specification} </p>
                <p className="view_Detail">Assigned to : {detail.assignedToUserName} </p>
                <p className="view_Detail">Assigned by : {detail.assignedByUserName} </p>
                <p className="view_Detail">Assigned Date : {new Date(detail.assignedDate).toLocaleDateString("en-GB")}</p>
                <p className="view_Detail">State : {detail.assignmentState === 0 ? "Accepted" : detail.assignmentState === 1 ? "Declined" : "Waiting For Acceptance"}</p>
                <p className="view_Detail">Note : {detail.note} </p>
            </Modal>
            <Modal
                visible={acceptedModal}
                title="Are you sure?"
                onOk={handleAccepted}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleAccepted}
                        danger
                    >
                        Accept
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}
            >
                <p>Do you want to accept this assignment?</p>
            </Modal>
        </>
    );
}

export default AdminHome;