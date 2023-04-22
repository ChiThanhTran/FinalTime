import "antd/dist/antd.min.css";
import "../assets/UserList.css"
import axios from "axios";
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Modal, Select, Space, Table } from "antd";
import { CloseCircleTwoTone, EditTwoTone, FilterFilled } from "@ant-design/icons";

const { Search } = Input;

const StaffUsersList = () => {

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUser, setTotalUser] = useState();
    const [searchText, setSearchText] = useState("");

    const [detail, setDetail] = useState([]);
    const [isVisible, setIsVisible] = useState(false)

    const token = localStorage.getItem("token");
    const location = localStorage.getItem("location");

    const handleCancel = () => {
        setIsVisible(false)
    };


    const showModal = (id) => {
        fetch(`https://rookiesgroup4.azurewebsites.net/getuser/${id}`,
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
            },
            sortDirections: ["descend", "ascend"]
        },
        {
            key: "2",
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
            },
            sortDirections: ["descend", "ascend"]
        },
        {
            key: "3",
            title: "Username",
            dataIndex: "username"
        },
        {
            key: "4",
            title: "Joined Date",
            dataIndex: "joinedDate",
            render: (joinedDate) => {
                return <span>{new Date(joinedDate).toLocaleDateString("en-GB")}</span>
            },
            sorter: (a, b) => {
                if (a.joinedDate > b.joinedDate) {
                    return -1;
                }
                if (b.joinedDate > a.joinedDate) {
                    return 1;
                }
                return 0;
            },
            sortDirections: ["descend", "ascend"]
        },
        {
            key: "5",
            title: "Type",
            dataIndex: "type",
            render: (type) => {
                return <span>{type === 0 ? "Admin" : "Staff"}</span>
            },
            sorter: (a, b) => {
                if (a.type > b.type) {
                    return -1;
                }
                if (b.type > a.type) {
                    return 1;
                }
                return 0;
            },
            sortDirections: ["descend", "ascend"]
        },
        {
            key: "6",
            title: "",
            width: "15%",
            dataIndex: "id",
            render: (id) => (
                <Space>
                    <EditTwoTone twoToneColor="#52cbff" />
                    <CloseCircleTwoTone twoToneColor="#d42a2a" />
                </Space>
            )
        },
    ];

    const [selectedValues, setSelectedValues] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const handleFilter = (value) => {
        console.log(value);
        setFilterValue(value);
        setSelectedValues(value);
    }


    const dataFiltered = (filterValue === undefined || filterValue === "")
        // eslint-disable-next-line array-callback-return
        ? (dataSource.filter((user) => (
            user.fullName.toLowerCase().includes(searchText.toLowerCase())
            || user.username.toLowerCase().includes(searchText.toLowerCase())
            || user.staffCode.toLowerCase().includes(searchText.toLowerCase())
        )
        ))
        :
        (dataSource.filter((user) =>
            ((user.type === 0 ? "Admin" : "Staff").toLowerCase().includes(selectedValues))));
    // dataSource;

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }


    const onSearch = value => console.log(value);


    return (
        !localStorage.getItem("token") ? window.location.reload()
            :
            <>
                <article>
                    <h3 className="title">
                        User List
                    </h3>

                    {dataSource?.length
                        ? (
                            <div>
                                <div className="extension">
                                    <div className="filter">
                                        <Select
                                            mode="multiple"
                                            placeholder="Type"
                                            suffixIcon={<FilterFilled />}
                                            showArrow
                                            value={selectedValues}
                                            onChange={handleFilter}
                                            style={{ width: "200px" }}
                                        >
                                            <Select.Option key={0} value={"admin"}>
                                                Admin
                                            </Select.Option>
                                            <Select.Option key={1} value={"staff"}>
                                                Staff
                                            </Select.Option>
                                        </Select>
                                    </div>
                                    <div className="search">
                                        <Space direction="vertical">
                                            <Search
                                                allowClear
                                                onSearch={onSearch}
                                                value={searchText}
                                                onChange={evt => setSearchText(evt.target.value)}
                                                style={{ width: 200 }}
                                            />
                                        </Space>
                                    </div>
                                </div>
                                <div className="table-responsive-sm">
                                    <Table
                                        loading={loading}
                                        columns={columns}
                                        dataSource={dataFiltered}
                                        pagination={{
                                            showSizeChanger: true,
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
                                        onRow={(user) => ({
                                            onClick: () => (showModal(user.id))
                                        })}
                                    >
                                    </Table>
                                </div>
                            </div>
                        ) : <p>No user to display</p>
                    }
                </article>
                <Modal
                    visible={isVisible}
                    title="User Detail"
                    onCancel={handleCancel}
                    footer={[
                    ]}
                >
                    <p className="view_Detail">Full name : {detail.firstName + " " + detail.lastName}</p>
                    <p className="view_Detail">Date Of Birth : {new Date(detail.dateOfBirth).toLocaleDateString("en-GB")} </p>
                    <p className="view_Detail">Joined Date : {new Date(detail.joinedDate).toLocaleDateString("en-GB")}</p>
                    <p className="view_Detail">Gender : {detail.gender === 0 ? "Male" : "Female"}</p>
                    <p className="view_Detail">Type : {detail.type === 0 ? "Admin" : "Staff"}</p>
                    <p className="view_Detail">Username : {detail.username}</p>
                    <p className="view_Detail">Staff Code : {detail.staffCode}</p>
                    <p className="view_Detail">Location : {detail.location}</p>
                </Modal>
            </>
    );
}

export default StaffUsersList;