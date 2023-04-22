import "antd/dist/antd.min.css";
import "../assets/UserList.css"
import axios from "axios";
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Modal, Select, Space, Table } from "antd";
import { CloseCircleTwoTone, EditTwoTone, FilterFilled } from "@ant-design/icons";

const StaffAsset = () => {

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUser, setTotalUser] = useState();

    const [detail, setDetail] = useState([]);
    const [isVisible, setIsVisible] = useState(false)

    const token = localStorage.getItem("token");
    const location = localStorage.getItem("location");

    const handleCancel = () => {
        setIsVisible(false)
    };

    const [categories, setCategories] = useState([]);

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
                setCategories(response.data)
                console.log(response.data)
            })
    }, [token]);

    const showModal = (id) => {
        fetch(`https://rookiesgroup4.azurewebsites.net/getasset/${id}`,
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

        axios.get(`https://rookiesgroup4.azurewebsites.net/getallassets?PageNumber=${page}&PageSize=${pageSize}&location=${location}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDataSource(response.data);
                setTotalUser(response.headers["asset-pagination"]);
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
            key: "2",
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
            key: "3",
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
        {
            key: "4",
            title: "State",
            dataIndex: "state",
            render: (state) => {
                return <span>{state === 0 ? "Available" : state === 1 ? "Not available" : state === 2 ? "Waiting" : state === 3 ? "Assigned" : "Recycled"}</span>
            },
            sorter: (a, b) => {
                if (a.state > b.state) {
                    return -1;
                }
                if (b.state > a.state) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "5",
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

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    const [searchText, setSearchText] = useState("");
    const [selectedValues, setSelectedValues] = useState([]);
    const [secondSelectedValues, setSecondSelectedValues] = useState([]);

    const handleFilter = (value) => {
        console.log(value);
        setSelectedValues(value);
    }

    const secondHandleFilter = (value) => {
        console.log(value);
        setSecondSelectedValues(value);
    }

    const dataFiltered =
        (dataSource.filter((asset) => (
            asset.assetName.toLowerCase().includes(searchText.toLowerCase())
            || asset.assetCode.toLowerCase().includes(searchText.toLowerCase())
        )
            &&
            (asset.state === 0 ? "Available" : asset.state === 1 ? "Not available" : asset.state === 2 ? "Waiting" : asset.state === 3 ? "Assigned" : "Recycled").toLowerCase().startsWith(selectedValues)
            &&
            asset.categoryName.toLowerCase().includes(secondSelectedValues)
        ))

    const onSearch = value => console.log(value);

    return (
        <>
            <article>
                <h3 className="title">
                    Asset List
                </h3>

                {dataSource?.length
                    ? (
                        <div>
                            <div className="extension">
                                <div className="filter">
                                    <Select
                                        mode="multiple"
                                        placeholder="State"
                                        suffixIcon={<FilterFilled />}
                                        showArrow
                                        value={selectedValues}
                                        onChange={handleFilter}
                                        style={{ width: "200px" }}
                                    >
                                        <Select.Option key={0} value={"available"}>
                                            Available
                                        </Select.Option>
                                        <Select.Option key={1} value={"not available"}>
                                            Not Available
                                        </Select.Option>
                                        <Select.Option key={2} value={"waiting"}>
                                            Waiting
                                        </Select.Option>
                                        <Select.Option key={3} value={"assigned"}>
                                            Assigned
                                        </Select.Option>
                                        <Select.Option key={4} value={"recycled"}>
                                            Recycled
                                        </Select.Option>
                                    </Select>
                                    <Select
                                        mode="multiple"
                                        placeholder="State"
                                        suffixIcon={<FilterFilled />}
                                        showArrow
                                        value={secondSelectedValues}
                                        onChange={secondHandleFilter}
                                        style={{ width: "200px", marginLeft: "50px" }}
                                    >
                                        {categories.map(category => (
                                            <Select.Option key={category.id} value={category.categoryName.toLowerCase()}>
                                                {category.categoryName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="search">
                                    <Space direction="vertical">
                                        <Input.Search
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
                                    onRow={(asset) => ({
                                        onClick: () => (showModal(asset.id))
                                    })}
                                >
                                </Table>
                            </div>
                        </div>
                    ) : <p>No asset to display</p>
                }
            </article>
            <Modal
                visible={isVisible}
                title="Asset Detail"
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <p className="view_Detail">Asset Code : {detail.assetCode}</p>
                <p className="view_Detail">Asset Name : {detail.assetName} </p>
                <p className="view_Detail">Specification : {detail.specification} </p>
                <p className="view_Detail">State : {detail.state === 0 ? "Available" : detail.state === 1 ? "Not available" : detail.state === 2 ? "Waiting" : detail.state === 3 ? "Assigned" : "Recycled"}</p>
                <p className="view_Detail">Installed Date : {new Date(detail.installedDate).toLocaleDateString("en-GB")}</p>
                <p className="view_Detail">Category : {detail.categoryName}</p>
                <p className="view_Detail">Location : {detail.location}</p>
            </Modal>
        </>
    );
}

export default StaffAsset;