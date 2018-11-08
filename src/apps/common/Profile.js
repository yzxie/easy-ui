import React, { Component } from 'react'
import { Layout } from 'antd'
import axios from 'axios'
const { Content } = Layout

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {}
        }
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: '/user/xieyizun',
            data: {}
        }).then(res => {
            const { data } = res.data
            console.log('profile: ', data)
            this.setState({
                userInfo: data.userInfo
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render () {
        const { userInfo } = this.state || {}

        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Content style={{ padding: '0 24px', minHeight: "-webkit-fill-available" }}>
                    { userInfo ? <div>
                        name: {userInfo.name}
                        email: {userInfo.email}
                    </div> : null }
                </Content>
            </Layout>
        )
    }
}