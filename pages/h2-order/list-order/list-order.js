// pages/h2-order/list-order/list-order.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    order_list_wait: [],
    order_list_ing: []
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
  onShow: function(options) {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    gql.query({
      query: `query{
        search(
          state:12
        ){
          state
          adviser{
            name
            companyname
          }
          originorder{
            orderid
            occupation
            datetime
            duration
            mode
            count
            male
            female
          }
          modifiedorder{
            changeddatetime
            changedduration
            changedmode
            changedcount
            changedmale
            changedfemale
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let tempWait = []
      let tempIng = []
      if (res.search.length > 0) {
        for (let item of res.search) {
          util.formatItemOrigin(item)
          if (item.modifiedorder.length > 0) {
            util.formatItemModify(item)
          }
          if (item.state === 0) {
            tempWait.push(item)
          } else {
            tempIng.push(item)
          }
        }
      }
      this.setData({
        order_list_wait: tempWait,
        order_list_ing: tempIng,
        date: ''
      })
    }).catch((error) => {
      console.log('fail', error);
      if (error.data.search === null) {
        return
      }
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
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
    wx.showNavigationBarLoading();
    gql.query({
      query: `query{
        search(
          state:12
        ){
          state
          adviser{
            name
            companyname
          }
          originorder{
            orderid
            occupation
            datetime
            duration
            mode
            count
            male
            female
          }
          modifiedorder{
            changeddatetime
            changedduration
            changedmode
            changedcount
            changedmale
            changedfemale
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let tempWait = []
      let tempIng = []
      if (res.search.length > 0) {
        for (let item of res.search) {
          util.formatItemOrigin(item)
          if (item.modifiedorder.length > 0) {
            util.formatItemModify(item)
          }
          if (item.state === 0) {
            tempWait.push(item)
          } else {
            tempIng.push(item)
          }
        }
      }
      this.setData({
        order_list_wait: tempWait,
        order_list_ing: tempIng,
        date: ''
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }).catch((error) => {
      console.log('fail', error);
      if (error.data.search === null) {
        return
      }
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    /* wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading();
    }, 2000) */
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    let timeStamp = new Date(`${this.data.date}T00:00:00`).getTime() / 1000
    gql.query({
      query: `query{
        search(
          state:12
          datetime:${Number(timeStamp)}
        ){
          state
          adviser{
            name
            companyname
          }
          originorder{
            orderid
            occupation
            datetime
            duration
            mode
            count
            male
            female
          }
          modifiedorder{
            changeddatetime
            changedduration
            changedmode
            changedcount
            changedmale
            changedfemale
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let tempWait = []
      let tempIng = []
      if (res.search.length > 0) {
        for (let item of res.search) {
          util.formatItemOrigin(item)
          if (item.modifiedorder.length > 0) {
            util.formatItemModify(item)
          }
          if (item.state === 0) {
            tempWait.push(item)
          } else {
            tempIng.push(item)
          }
        }
      }
      this.setData({
        order_list_wait: tempWait,
        order_list_ing: tempIng
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
  },

  goDetail: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/list-order-detail/list-order-detail?orderid=${e.currentTarget.dataset.orderid}`,
    })
  }

})