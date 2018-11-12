import React, { Component } from 'react'
import './css/index.css'
import { Layout, Button } from 'antd'
import LogSider from './components/sider'
//https://www.npmjs.com/package/react-stomp
import SockJsClient from 'react-stomp'

const { Content } = Layout

export default class LogIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logContent: ''
        }
    }

    handleLogMessage = msg => {
        console.log('log content', msg.logContent)
        this.setState({
            logContent: msg.logContent.log
        })
    }

    render() {
        const { logContent } = this.state

        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <LogSider />
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                    <div>Log app</div>
                    <div>Log content: {logContent}</div>
                </Content>
                <SockJsClient
                    url='http://localhost:8088/broadcastEndPoint'
                    topics={['/topic/logMessage']}
                    onMessage={this.handleLogMessage}
                    ref={client => { this.gropClientRef = client }} />
            </Layout>
        )
    }
}