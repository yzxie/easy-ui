import React, { Component } from 'react'
import './css/index.css'
import { Layout, Button } from 'antd'
import LogSider from './components/sider'
const { Content } = Layout

export default class LogIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <LogSider />
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                    <div>Log app</div>
                </Content>
            </Layout>
        )
    }
}