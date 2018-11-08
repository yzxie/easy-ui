// import axios from 'axios'
// import { hashHistory } from 'react-router'

module.exports = {
    login() {
        localStorage.setItem('isLogin', true)
    },

    getIsLogin() {
        return localStorage.getItem('isLogin')
    },

    logout() {
        localStorage.removeItem('isLogin')
    }
}