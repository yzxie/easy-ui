var axios = require('axios')
var hashHistory = require('react-router').hashHistory
module.exports = {
    
    login() {
        localStorage.setItem('isLogin', true)
    },

    getIsLogin() {
        return localStorage.getItem('isLogin')
    },

    logout() {
        localStorage.removeItem('isLogin')
    },

    handleLogout()  {
        axios({
            method: 'get',
            url: '/doLogout'
        })
        .then(res => {
            localStorage.removeItem('isLogin')
            hashHistory.push('/login')   
        }).catch(err => {
            console.log('logout err ', err)
            localStorage.removeItem('isLogin')
            hashHistory.push('/login')
        })
    }
}