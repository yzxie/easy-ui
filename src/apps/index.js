import React, { Component, PropTypes } from 'react';
import { Router, Link, Route, hashHistory, IndexRoute } from 'react-router';
import './App.css';
import App from './App'
import LogIndex from './log-app/index'
import MonitorIndex from './monitor-app/index'
import Login from './components/Login'

import { Layout, Menu, Dropdown, Icon } from 'antd'
const { Header, Content, Footer } = Layout

class Index extends Component {

    render() {
        return (
            <Router history={hashHistory}>
              <Route path="/" component={App}>
                  <IndexRoute component={LogIndex}></IndexRoute>
                  <Route path="/monitor" component={MonitorIndex}></Route>
                  <Route path='/login' component={Login}></Route>
              </Route>       
            </Router>
          );
    }
}

export default Index;
