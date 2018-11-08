import React, { Component } from 'react';
import { Router, Link, Route, hashHistory, IndexRoute } from 'react-router';
import './App.css';
import App from './App'
import LogIndex from './log-app/index'
import MonitorIndex from './monitor-app/index'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './common/Profile'
import { getIsLogin } from '../auth'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }

    componentWillMount() {
        this.setState({isLogin: getIsLogin()})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({isLogin: getIsLogin()})
    }

    requiredLogin = () => {
        const { isLogin } = this.state || {}
        if (isLogin) {
            return true
        } else {
            // 先再读取一次
            if (getIsLogin()) {
                this.setState({isLogin: true})
                return true
            }
            hashHistory.push('/login')
        }
    }

    requiredNotLogin = () => {
        const { isLogin } = this.state || {}
        if (isLogin) {
            hashHistory.push('/')
        } else {
            return true
        }
    }

    render() {
        return (
            <Router history={hashHistory}>
              <Route path="/" component={App}>
                  <Route path="/log" component={LogIndex} onEnter={this.requiredLogin}></Route>
                  <Route path="/monitor" component={MonitorIndex} onEnter={this.requiredLogin}></Route>
                  <Route path="/profile" component={Profile} onEnter={this.requiredLogin}></Route>
                  
                  <Route path='/login' component={Login} onEnter={this.requiredNotLogin}></Route>
                  <Route path='/register' component={Register} onEnter={this.requiredNotLogin}></Route>
              </Route>       
            </Router>
          );
    }
}

export default Index;
