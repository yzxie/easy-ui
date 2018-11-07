import React, { Component } from 'react'
import { Layout } from 'antd'
import MonitorSider from './components/sider'
const { Content } = Layout

export default class MonitorIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <MonitorSider />
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                    <div>
                        MonitorApp
                    </div>
                </Content>
            </Layout>
        )
    }
}