import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu
const { Sider } = Layout

export default class LogSider extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      const { logTypeWithApps, changeActiveLogTypeAndApp } = this.props
      
      return <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
        {
          logTypeWithApps && logTypeWithApps.map((logTypeApps, i) => (
            <SubMenu key={i} title={<span><Icon type="user" />{logTypeApps.logType}</span>}>
            {
              logTypeApps.apps.map((app, j) => (
                <Menu.Item key={j} 
                  onClick={e => changeActiveLogTypeAndApp(logTypeApps.logType, app)}>
                  {app}
                </Menu.Item>
              ))
            }
            </SubMenu>
          ))
        }
          {/* <SubMenu key="sub2" title={<span><Icon type="notification" />热点股票</span>}>
            <Menu.Item key="3">美股</Menu.Item>
            <Menu.Item key="4">港股</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="laptop" />客户端统计</span>}>
            <Menu.Item key="5">Web</Menu.Item>
            <Menu.Item key="6">IOS</Menu.Item>
            <Menu.Item key="7">Android</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
    }
}