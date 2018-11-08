import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
import './Register.css'

const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
const residences = [{
    value: 'guangdong',
    label: '广东',
    children: [{
        value: 'guangzhou',
        label: '广州',
        children: [{
            value: 'tianhe',
            label: '天河',
        }],
    }],
}, {
    value: 'jiangsu',
    label: '江苏',
    children: [{
        value: 'nanjing',
        label: '南京',
        children: [{
            value: 'zhonghuamen',
            label: '中华门',
        }],
    }],
}]

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
        }
        this.setState({ autoCompleteResult })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { autoCompleteResult } = this.state

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        )

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ))

        return (
            <div className="components-form-normal-register">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                用户名
                            </span>
                        )}
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '请输入用户名', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '邮箱不合法',
                            }, {
                                required: true, message: '请输入邮箱',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认密码',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="所在地"
                    >
                        {getFieldDecorator('residence', {
                            initialValue: ['广东', '广州', '天河'],
                            rules: [{ type: 'array', required: true, message: '请选择所在地' }],
                        })(
                            <Cascader options={residences} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号码"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号码' }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                个人网站
                                 <Tooltip title="也可以是个人github">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('website', {
                            rules: [{ required: true, message: '请输入个人网站' }],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="网址"
                            >
                                <Input />
                            </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="校验码"
                        extra="确认非机器人操作"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入校验码' }],
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={12}>
                                <Button>获取校验码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>我已经阅读过 <a href="">用户须知</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">注册</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm)
export default WrappedRegistrationForm
