// pages/h2Account/login/login.js
var gql = require('../../../utils/graphql.js')
import {
  $wuxToptips
} from 'wux-weapp/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.getStorage({
      key: 'email',
      success: res => {
        this.setData({
          email: res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  doCall: function() {
    wx.makePhoneCall({
      phoneNumber: '1234567890',
    })
  },

  iptEmail: function(e) {
    this.setData({
      email: e.detail.value
    })
  },

  clearEmail: function(e) {
    this.setData({
      email: ''
    })
  },

  iptPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  clearPassword: function(e) {
    this.setData({
      password: ''
    })
  },

  showToptips(message) {
    $wuxToptips().error({
      icon: 'cancel',
      hidden: false,
      text: message,
      duration: 3000,
      success() {},
    })
  },

  doLogin: function(e) {
    if (!this.data.email) {
      this.showToptips('请输入您的账号')
      return
    }
    if (!this.data.password) {
      this.showToptips('请输入您的密码')
      return
    }
    wx.showToast({
      title: '正在登录',
      icon: 'loading',
      duration: 10000
    })
    gql.mutate({
      mutation: `mutation {
        login(
          email: "${this.data.email}"
          password: "${this.data.password}"
        ) {
          token
        }
      }`
    }).then((res) => {
      console.log('success', res);
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      try {
        wx.setStorageSync('email', this.data.email)
        wx.setStorageSync('token', res.login.token)
      } catch (err) {
        console.log('setStorage failed')
        console.log(err)
      }
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.switchTab({
              url: '/pages/h2-order/list-order/list-order',
            })
          } else {
            wx.navigateTo({
              url: '/pages/h2-account/auth/auth',
            })
          }
        }
      })
    }).catch((error) => {
      console.log('fail', error);
      if (error.errors[0].message === 'Invalid password') {
        this.showToptips('密码不正确！')
      } else if (error.errors[0].message === "Cannot read property 'password' of undefined") {
        this.showToptips('账户不正确！')
      } else {
        this.showToptips('登录失败')
      }
    });
  },

})