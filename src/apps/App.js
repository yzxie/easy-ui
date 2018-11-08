import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import './App.css';
import { getIsLogin } from '../auth'
import { Layout, Menu, Dropdown, Icon } from 'antd'
import axios from 'axios'
import { logout } from '../auth'

const { Header, Content, Footer } = Layout

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }

    componentWillMount() {
        this.setState({ isLogin: getIsLogin() })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ isLogin: getIsLogin() })
    }

    handleLogout = () => {
        axios({
            method: 'get',
            url: '/doLogout'
        })
        .then(res => {
            logout()
            hashHistory.push('/login')   
        }).catch(err => {
            console.log('logout err ', err)
        })
    }

    render() {
        const { isLogin } = this.state
        const accountMenu = isLogin ? (
            <Menu>
                <Menu.Item>
                    <Link to="/profile">个人资料</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/" onClick={this.handleLogout}>退出</Link>
                </Menu.Item>
            </Menu>
        ) :
            (
                <Menu>
                    <Menu.Item>
                        <Link to="/login">登录</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/register">注册</Link>
                    </Menu.Item>
                </Menu>
            )

        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    {isLogin ?
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to='/log'>日志分析系统</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/monitor'>服务器监控系统</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/chat">聊天系统</Link>
                            </Menu.Item>
                            <Menu.Item key="4" style={{ float: 'right' }}>
                                <Dropdown overlay={accountMenu}>
                                    <a className="ant-dropdown-link" href="#">
                                        账户 <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </Menu.Item>
                        </Menu>
                        :
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="3" style={{ float: 'right' }}>
                                <Dropdown overlay={accountMenu}>
                                    <a className="ant-dropdown-link" href="#">
                                        账户 <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </Menu.Item>
                        </Menu>
                    }

                </Header>
                <Content style={{ padding: '50px 50px 0 50px' }}>
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Easy Ui ©2018 Created by yzxie
            </Footer>
            </Layout>
        );
    }
}

export default App;
