import React, { Component } from 'react';
import './App.css';
import LogIndex from './log-app/index'
import MonitorIndex from './monitor-app/index'
import LogSider from './log-app/components/sider'
import MonitorSider from './monitor-app/components/sider'
import { Layout, Menu } from 'antd'
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
            <Menu.Item key="1" onClick={() => this.handleAppSelect("log")}>日志分析系统</Menu.Item>
            <Menu.Item key="2" onClick={() => this.handleAppSelect("monitor")}>服务器监控系统</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px 50px 0 50px' }}>
        {
          activeApp=="log" ? <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <LogSider />
            <Content style={{ padding: '0 24px',  minHeight: "-webkit-fill-available" }}>
              <LogIndex />
            </Content>
          </Layout> : null
        }
          {
          activeApp=="monitor" ? <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <MonitorSider />
            <Content style={{ padding: '0 24px',  minHeight: "-webkit-fill-available" }}>
              <MonitorIndex />
            </Content>
          </Layout> : null
        }
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Easy Ui ©2018 Created by yzxie
        </Footer>
      </Layout>
    );
  }
}

export default App;
