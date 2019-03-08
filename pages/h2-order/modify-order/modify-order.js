// pages/h2-order/modify-order/modify-order.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '00:00',
    array: ['1 小时', '2 小时', '3 小时', '4 小时'],
    index: 1,
    items: [{
        name: '关闭',
        value: 0,
        checked: 'true'
      },
      {
        name: '开启',
        value: 1
      },
    ],
    isSex: 0
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
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      isSex: e.detail.value
    })
  },
})