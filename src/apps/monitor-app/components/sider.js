import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu
const { Sider } = Layout

export default class MonitorSider extends Component {
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
          <SubMenu key="sub1" title={<span><Icon type="user" />CPU</span>}>
            <Menu.Item key="1">实时</Menu.Item>
            <Menu.Item key="2">峰值统计</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />内存</span>}>
            <Menu.Item key="3">实时</Menu.Item>
            <Menu.Item key="4">峰值统计</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />磁盘</span>}>
            <Menu.Item key="5">实时</Menu.Item>
            <Menu.Item key="6">峰值统计</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="notification" />IO</span>}>
            <Menu.Item key="7">实时</Menu.Item>
            <Menu.Item key="8">峰值统计</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    }
}