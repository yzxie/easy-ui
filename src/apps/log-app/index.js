import React, { Component } from 'react'
import './css/index.css'
//https://www.npmjs.com/package/react-stomp
import SockJsClient from 'react-stomp'
import { Layout, Button } from 'antd'
import LogSider from './components/sider'
const { Content } = Layout

export default class LogIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageReceived: ""
        }
    }

    handleLogContentReceived = (msg) => {
        console.log('receive from server: ', msg)
        this.setState({
            messageReceived: msg.content
        })
    }

    handleChatReceived = (msg) => {
        console.log("chat message: ", msg.content)
        this.setState({
            chatMessageReceived: msg.content
        })
    }

    sendMessage = (msg) => {
        // 发送消息到服务端，对应服务端的@MessageMapping
        this.clientRef.sendMessage('/app/acceptMessage', msg, {});
    }

    sendChatMessage = (content) => {
        let msg = { content: content, toUser: 'xieyizun' }
        this.chatClientRef.sendMessage('/app/chat', JSON.stringify(msg))
    }

    render() {
        const { messageReceived, chatMessageReceived } = this.state

        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <LogSider />
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                    <div>
                        <div>服务端推送过来消息: {messageReceived}</div>
                        <Button onClick={e => { this.sendMessage("hello, i am react.") }}>推送消息给服务端</Button>
                        {/* <SockJsClient 
                    url='http://localhost:8088/broadcastEndPoint' 
                    topics={['/topic/realLog']}
                    onMessage={msg => { this.handleLogContentReceived(msg) }}
                    ref={ client => { this.clientRef = client }} />
                <br />
                <Button onClick={e => this.sendChatMessage("hello, chat now.")}>发送p2p聊天信息</Button>
                <SockJsClient 
                    url="http://localhost:8088/p2pEndPoint"
                    topics={['/user/queue/chat']}
                    onMessage={msg => { this.handleChatReceived(msg) }}
                    ref={ client => { this.chatClientRef = client }}
                /> */}
                        <div>接收到的P2P聊天信息: {chatMessageReceived}</div>
                    </div>
                </Content>
            </Layout>
        )
    }
}