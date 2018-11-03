import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu
const { Sider } = Layout

export default class LogSider extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user" />核心服务</span>}>
            <Menu.Item key="1">行情服务</Menu.Item>
            <Menu.Item key="2">交易服务</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="notification" />热点股票</span>}>
            <Menu.Item key="3">美股</Menu.Item>
            <Menu.Item key="4">港股</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="laptop" />客户端统计</span>}>
            <Menu.Item key="5">Web</Menu.Item>
            <Menu.Item key="6">IOS</Menu.Item>
            <Menu.Item key="7">Android</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    }
}