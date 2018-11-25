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
            logTypeWithApps: [],
            appsLogs: {},
            activeLogType: null,
            activeLogApp: null
        }
    }

    componentWillMount() {
        axios.get("/log/list-apps").then(res => {
            let resData = res.data
            if (resData.ret == 0) {
                let data = resData.data
                this.setState({
                    logTypeWithApps: data
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleLogMessage = msg => {
        let serverAppsLogs = msg.data || null
        if (serverAppsLogs) {
            // logType-appId: logs
            let appsLogs = {}
            for (let index in serverAppsLogs) {
                let item = serverAppsLogs[index]
                let key = item.logType + '-' + item.app
                let value = item.data
                appsLogs[key] = value
            }
            this.setState({
                appsLogs: appsLogs
            })
            console.log('appLogs: ', this.state.appsLogs)
        }
    }

    changeActiveLogTypeAndApp = (logType, appId) => {
        this.setState({
            activeLogType: logType,
            activeLogApp: appId
        })
    }

    activeDisplayLogs = () => {
        const { appsLogs, activeLogType, activeLogApp } = this.state
        let key = activeLogType + '-' + activeLogApp
        return appsLogs ? appsLogs[key] : null
    }

    render() {
        const { logTypeWithApps, activeLogType, activeLogApp } = this.state
        const displayLogs = this.activeDisplayLogs()

        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <LogSider logTypeWithApps={logTypeWithApps} 
                    changeActiveLogTypeAndApp={this.changeActiveLogTypeAndApp} />
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                {
                    activeLogType && activeLogApp && <div>
                        <div>日志类型：{activeLogType}, 应用: {activeLogApp}</div>
                        { displayLogs ? <SecondFlowChart logs={displayLogs} /> : 'No data' }
                    </div>
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