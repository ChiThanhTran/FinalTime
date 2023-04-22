import { Button, Menu, Modal, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Content from "../Content";
import { useState } from "react";
import "./Sidebar.css";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import ChangePassword from "../ChangePassword";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    const content = (
        <div className="user--dropdown">
            <ChangePassword />
            <Button
                onClick={showModal}
                icon={<PoweroffOutlined />}
                danger>
                Logout
            </Button>
        </div>
    );

    return (
        <div>
            <div className="navbar">
                {
                    localStorage.getItem("token")
                        ? (
                            <>
                                <Popover placement="bottomRight" content={content} trigger="hover">
                                    <Button
                                        className="nav--btn"
                                        icon={<UserOutlined />}
                                        shape="round"
                                    // danger
                                    >
                                        {localStorage.getItem("username")}
                                    </Button>
                                </Popover>
                                <Modal
                                    title="Warning!"
                                    visible={isModalVisible}
                                    cancelButtonProps={{
                                        className: "ant-btn-dangerous"
                                    }}
                                    okButtonProps={{
                                        className: "ant-btn-dangerous"
                                    }}
                                    onOk={handleLogout}
                                    onCancel={handleCancel}>
                                    <p>Do you want to Logout ?</p>
                                </Modal>
                            </>
                        )
                        : <Link to={"/"} className="nav-link"></Link>
                }
            </div>
            <div className="body d-flex flex-row">
                <div className="sidebar">
                    <div className="logo">
                        <p>
                            Online Asset Management
                        </p>
                    </div>
                    <div className="sidebar--link">
                        <Menu
                            mode="vertical"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1">
                                <Link to="/home">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/user">Manage User</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/asset">Manage Asset</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/assignment">Manage Assignment</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/request">Request for Returning</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/report">Report</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="content">
                    <Content />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;