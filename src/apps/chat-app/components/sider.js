import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu
const { Sider } = Layout

export default class ChatSider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        const { onlines, offlines, chatWith } = this.props

        return <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user" style={{ color: '#87d068' }}/>在线好友</span>}>
            {
                onlines && onlines.map((online, i) => (
                    <Menu.Item key={i} onClick={e => chatWith(online)}>
                        {online.name}
                    </Menu.Item>
                ))
            }
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="user" />离线好友</span>}>
            {
                offlines && offlines.map((offline, i) => (
                  <Menu.Item key={`${i}-${offline.id}`}>{offline.name}</Menu.Item>
                ))
            }
          </SubMenu>
        </Menu>
      </Sider>
    }
}