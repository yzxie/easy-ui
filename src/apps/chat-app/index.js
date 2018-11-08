import React, { Component } from 'react'
import { Layout, Button, Input, Row, Col, Avatar } from 'antd'
import ChatSider from './components/sider'
//https://www.npmjs.com/package/react-stomp
import SockJsClient from 'react-stomp'

const { TextArea } = Input
const { Content } = Layout

export default class ChatApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onlines: [{ name: 'xieyizun', id: 1 }],
            offlines: [{ name: 'liyu', id: 2 }],
            chatTo: null,
            groupMessage: null
        }
    }

    handleGroupMessageReceived = msg => {
        this.setState({
            groupMessageReceived: msg.content
        })
    }

    handleChatReceived = msg => {
        this.setState({
            p2pChatMessageReceived: msg.content
        })
    }

    sendGroupMessage = () => {
        const { groupMessage } = this.state
        if (groupMessage) {
            let data = JSON.stringify({ content: groupMessage })
            this.gropClientRef.sendMessage('/app/groupMessage', data, {})
        }
    }

    sendP2pChatMessage = content => {
        const { chatTo } = this.state
        if (chatTo.content) {
            let msg = { content: chatTo.content, userName: chatTo.name }
            this.p2pChatClientRef.sendMessage('/app/chat', JSON.stringify(msg))
        }
    }

    chatWith = user => {
        this.setState({
            chatTo: user
        })
    }

    inputP2pChatMessage = e => {
        let { chatTo } = this.state
        chatTo['content'] = e.target.value
        this.setState({chatTo: chatTo})
    }

    inputGroupMessage = e => {
        this.setState({groupMessage: e.target.value})
    }

    render() {
        const { groupMessageReceived, p2pChatMessageReceived, offlines, onlines, chatTo } = this.state
        
        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <ChatSider
                    onlines={onlines}
                    offlines={offlines}
                    chatWith={this.chatWith}
                />
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                    <div>
                        <Row gutter={16}>
                            { chatTo ? <Col span={12}>
                                <div>
                                    正在与{chatTo.name}聊天中
                                </div>
                                <TextArea 
                                    placeholder="输入聊天信息" 
                                    autosize={{ minRows: 6, maxRows: 10 }}
                                    onChange={this.inputP2pChatMessage} />
                                <Button 
                                    onClick={this.sendP2pChatMessage} 
                                    style={{ color: '#87d068', margin: '10px 0' }}>发送</Button>
                                <div>聊天信息: {p2pChatMessageReceived}</div>

                                <SockJsClient
                                    url="http://localhost:8088/p2pEndPoint"
                                    topics={['/user/queue/chat']}
                                    onMessage={this.handleChatReceived}
                                    ref={client => { this.p2pChatClientRef = client }}
                                />
                            </Col> : null }
                            <Col span={12}>
                                <div>群聊中</div>
                                <TextArea 
                                    placeholder="输入群聊信息" 
                                    autosize={{ minRows: 6, maxRows: 10 }}
                                    onChange={this.inputGroupMessage} />
                                <Button 
                                    onClick={this.sendGroupMessage} 
                                    style={{ color: '#87d068', margin: '10px 0' }}>群聊</Button>
                                <div>群聊消息: {groupMessageReceived}</div>

                                <SockJsClient
                                    url='http://localhost:8088/broadcastEndPoint'
                                    topics={['/topic/broadcastMessage']}
                                    onMessage={this.handleGroupMessageReceived}
                                    ref={client => { this.gropClientRef = client }} />
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }
}