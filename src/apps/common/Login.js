import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router'
import axios from 'axios'
import { login } from '../../auth'
import './Login.css'
const FormItem = Form.Item

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                axios({
                    method: 'post',
                    url: '/login',
                    data: values
                }).then(response => {
                    console.log(response)
                    login()
                    hashHistory.push('/')
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="components-form-normal-login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入用户名或邮箱' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名或密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                    </Button>
                        或 <Link to='/register'>注册</Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)
export default WrappedNormalLoginForm
