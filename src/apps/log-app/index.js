import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import './css/index.css'
import { Layout } from 'antd'
import LogSider from './components/sider'
import SecondFlowChart from './components/secondFlowChart'
//https://www.npmjs.com/package/react-stomp
import SockJsClient from '../../lib/sockJsClient'
import axios from 'axios'
import { logout, handleLogout } from '../../auth'

const { Content } = Layout

export default class LogIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appsLogs: []
        }
    }

    handleLogMessage = msg => {
        console.log('log content', msg.logContent)
        let serverAppsLogs = msg.logContent || {}
        let appsLogs = []
        for (let appId in serverAppsLogs) {
            appsLogs.push({appId: appId, logs: serverAppsLogs[appId]})
        }
        this.setState({
            appsLogs: appsLogs
        })
    }

    render() {
        const { appsLogs } = this.state

        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <LogSider />
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                { 
                    appsLogs ? appsLogs.map((appLogs, i) => (
                        <div key={i}>
                            <div>应用: {appLogs.appId}</div>
                            <SecondFlowChart logs={appLogs.logs} />
                        </div>
                    )) : null
                }
                </Content>
                <SockJsClient
                    url='http://localhost:8088/broadcastEndPoint'
                    topics={['/topic/logMessage']}
                    onDisconnect={() => console.log("ws disconnect")}
                    handleLogout={handleLogout}
                    onMessage={this.handleLogMessage}
                    ref={client => { this.gropClientRef = client }} />
            </Layout>
        )
    }
}