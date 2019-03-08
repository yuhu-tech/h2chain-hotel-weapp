// pages/h2Account/home/home.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    qlInfo: {
      phone: 1234567890,
      hotel_name: '希尔顿酒店',
      job: 'HR'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
        selected: 2
      })
    }
    wx.getUserInfo({
      success: res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
    /* ql */
    try {
      let email = wx.getStorageSync('email')
      if (email) {
        /* gql.mutate({
              mutation: `mutation {
                me(
                  email: "${this.data.email}"
                ) {
                  phone,
                  hotel_name,
                  job
                }
              }`
            }).then((res) => {
              console.log('success', res);
              this.setData({
                qlInfo: res
              })
            }).catch((error) => {
              console.log('fail', error);
            }); */
      }
    } catch (e) {
      wx.showToast({
        title: '获取账号失败',
        icon: 'none'
      })
      console.log(e)
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

  doLogout: function() {
    wx.showModal({
      title: '确认退出账号？',
      success: res => {
        if (res.confirm) {
          wx.clearStorage()
          wx.reLaunch({
            url: '/pages/h2-account/login/login',
          })
        }
      }
    })
  }

})