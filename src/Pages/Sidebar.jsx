import React from "react";
import {
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined 
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import '../Nav.css'
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ userEmail }) => {
    const navigate = useNavigate();

    const homePage = () => {
        navigate('/');
    }

    const moviesPage = () => {
        navigate('/overviews');
    }

    const profilePage = () => {
        navigate(`/profile/${userEmail}`);
    }

    return (
        <div className="sidebar" style={{ width: '130px' }}>
            <Sider style={{ width: '130px' }}>
                <Menu defaultSelectedKeys={['1']} style={{ width: '130px' }}>
                    <div onClick={homePage}>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Home
                        </Menu.Item>
                    </div>
                    <div onClick={moviesPage}>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            Movies
                        </Menu.Item>
                    </div>
                    <div onClick={profilePage}>
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            Profile
                        </Menu.Item>
                    </div>
                </Menu>
            </Sider>
        </div>
    );
};

export default Sidebar;
