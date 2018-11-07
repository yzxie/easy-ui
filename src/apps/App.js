import React, { Component, PropTypes } from 'react';
import { Router, Link, Route, hashHistory } from 'react-router';
import './App.css';
import LogIndex from './log-app/index'
import MonitorIndex from './monitor-app/index'
import Login from './components/Login'

import { Layout, Menu, Dropdown, Icon } from 'antd'
const { Header, Content, Footer } = Layout

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeApp: 'log'
    }
  }

  handleAppSelect = (activeApp) => {
    this.setState({
      activeApp: activeApp
    })
  }

  render() {
    const { activeApp } = this.state
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/login">登录</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/register">注册</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/logout">退出</Link>
        </Menu.Item>
      </Menu>
    );

    return (
          <Layout>
            <Header className="header">
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1" onClick={() => this.handleAppSelect("log")}>
                  <Link to='/'>日志分析系统</Link>
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.handleAppSelect("monitor")}>
                  <Link to='/monitor'>服务器监控系统</Link>
                </Menu.Item>

                <Menu.Item key="3" style={{ float: 'right' }}>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                      账户 <Icon type="down" />
                    </a>
                  </Dropdown>
                </Menu.Item>
              </Menu>
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
