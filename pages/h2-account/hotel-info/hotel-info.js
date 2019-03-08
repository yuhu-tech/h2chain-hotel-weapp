// pages/h2-account/hotel-info/hotel-info.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelInfo: {
      banner: ['/images/banner.jpeg',
        '/images/banner2.jpeg',
        '/images/banner3.jpeg'
      ],
      hotel_name: '希尔顿酒店',
      location: '青岛市黄岛区嘉陵江东路1号',
      hotel_phone: '0532-123456789',
      intro: '这里是很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多的酒店简介'
    }
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
    gql.query({
      query: `query {
        me(
          email: "${this.data.email}"
        ) {
          banner,
          hotel_name,
          location,
          hotel_phone,
          intro
        }
      }`
    }).then((res) => {
      console.log('success', res);
      this.setData({
        qlInfo: res
      })
    }).catch((error) => {
      console.log('fail', error);
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
})