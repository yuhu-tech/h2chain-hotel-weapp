// pages/h2-order/list-order-detail/list-order-detail.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info: {
      id: '1',
      job: '服务员',
      date: '2019/1/9',
      period: '10:00～14:00',
      isSex: 0,
      pt_count: 10,
      pt_count_yet: 5,
      pt_count_male: 10,
      pt_count_male_yet: 5,
      pt_count_female: 10,
      pt_count_female_yet: 5,
      company: '海润人力资源有限公司',
      consultant: '水君',
      phone: 1234567890
    },
    pt_list_confirm: [{
      id: '1',
      avatar: '/images/pic.jpg',
      name: '姓名',
      gender: '女',
      nickName: '微信昵称'
    }],
    pt_list_notConfirm: [{
      id: '2',
      avatar: '/images/pic.jpg',
      name: '姓名',
      gender: '女',
      nickName: '微信昵称'
    }]
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
    /* gql.query({
      query: `query {
        order_detail(
          order_id: "${param}"
        ) {
          order_info {
            job,
            date,
            period,
            isSex,
            pt_count,
            pt_count_yet,
            pt_count_male,
            pt_count_male_yet,
            pt_count_female,
            pt_count_female_yet,
            company,
            consultant,
            phone
          }
          pt_list_confirm {

          }
          pt_list_notConfirm {

          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
    }).catch((error) => {
      console.log('fail', error);
    }); */
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

  search: function() {
    console.log('do search')
  },

  goModifyOrder: function() {
    wx.showModal({
      title: '提示',
      content: '是否要修改订单？',
      success: res => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/h2-order/modify-order/modify-order',
          })
        }
      }
    })
  },

  doCloseOrder: function() {
    wx.showModal({
      title: '提示',
      content: '是否要修改订单？',
      success: res => {
        if (res.confirm) {

          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  goPtInfo: function() {
    wx.navigateTo({
      url: '/pages/h2-order/pt-info/pt-info',
    })
  }
})