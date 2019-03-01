// pages/h2Account/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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

  iptUsername: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  iptPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  bindGetUserInfo: function(e) {
    wx.login({
      success: (res) => {
        console.log(res)
      }
    })
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
      }
    })
    wx.checkSession({
      success: (res) => {
        console.log(res)
      }
    })
    wx.getStorageInfo({
      success: (res) => {
        console.log(res)
      },
    })
  }
})