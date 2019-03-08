// pages/h2-order/history-order/history-order.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    order_list: [{
      job: '服务员',
      company: '海润人力资源公司',
      consultant: '水君',
      date: '2019-12-29',
      period: '10:00～14:00',
      isSex: 0,
      pt_count: 10,
      pt_count_yet: 5,
      pt_count_male: 10,
      pt_count_male_yet: 5,
      pt_count_female: 10,
      pt_count_female_yet: 5
    }, {
      job: '服务员',
      company: '海润人力资源公司',
      consultant: '水君',
      date: '2019-12-29',
      period: '10:00～14:00',
      isSex: 1,
      pt_count: 10,
      pt_count_yet: 5,
      pt_count_male: 10,
      pt_count_male_yet: 5,
      pt_count_female: 10,
      pt_count_female_yet: 5
    }, ]
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

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    gql.query({
      query: `query {
        order_list(
          date: "${this.data.date}"
        ) {
          order {
            id,
            job,
            company,
            consultant,
            date,
            period,
            isSex,
            pt_count,
            pt_count_yet,
            pt_count_male,
            pt_count_male_yet,
            pt_count_female,
            pt_count_female_yet,
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
    }).catch((error) => {
      console.log('fail', error);
    });
  },

  goDetail: function() {
    wx.navigateTo({
      url: '/pages/h2-order/history-order-detail/history-order-detail',
    })
  }

})