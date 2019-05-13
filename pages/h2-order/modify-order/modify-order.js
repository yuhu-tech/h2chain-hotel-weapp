// pages/h2-order/modify-order/modify-order.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: 'default',
    date: '',
    multiArray: [
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '30']
    ],
    multiIndex: [9, 0],
    value_start: '',
    array: ['1 小时', '2 小时', '3 小时', '4 小时'],
    index: 0,
    items: [{
        name: '关闭',
        value: 0
      },
      {
        name: '开启',
        value: 1
      },
    ],
    adviser: '',
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.orderid) {
      this.setData({
        order_id: options.orderid
      })
    }
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
            search(
              orderid: "${this.data.order_id}"
            ) {
              originorder {
                orderid
                occupation
                datetime
                duration
                mode
                count
                male
                female
              }
              adviser {
                name
                phone
                companyname
              }
            }
          }`
    }).then((res) => {
      console.log('success', res);
      let temp = new Date(res.search[0].originorder.datetime * 1000)
      let tempdate = `${util.formatTime(temp).slice(0, 10)}`
      let tempTime = `${util.formatTime(temp).slice(11,16)}`
      console.log(util.formatTime(temp))
      res.search[0].originorder.datetime = util.formatTime(temp)

      this.setData({
        date: tempdate,
        value_start: tempTime,
        index: res.search[0].originorder.duration - 1,
        [`items[${res.search[0].originorder.mode}].checked`]: true,
        adviser: res.search[0].adviser,
        order: res.search[0].originorder
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

  doCall: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.adviser.phone,
    })
  },

  /* 开始时间 */
  bindMultiPickerChange(e) {
    let start_time = `${this.data.multiArray[0][e.detail.value[0]]}:${this.data.multiArray[1][e.detail.value[1]]}`
    this.setData({
      value_start: start_time
    })
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      ['order.duration']: Number(e.detail.value) + 1
    })
  },

  radioChange(e) {
    this.setData({
      ['order.mode']: e.detail.value
    })
  },

  /* 用人人数 */
  iptCount: function(e) {
    this.setData({
      ['order.count']: e.detail.value
    })
  },

  iptMale: function(e) {
    this.setData({
      ['order.male']: e.detail.value
    })
    console.log(this.data.order.male)
  },

  iptFemale: function(e) {
    this.setData({
      ['order.female']: e.detail.value
    })
    console.log(this.data.order.female)
  },

  modifyOrder: function(e) {
    let order = this.data.order
    let timestamp = new Date(`${this.data.date} ${this.data.value_start}:00`.replace(/-/g, '/')).getTime() / 1000
    if (Number(order.mode) === 1) {
      order.count = Number(order.male) + Number(order.female)
    }

    gql.mutate({
      mutation: `mutation {
        modifyorder(
          formid:"${e.detail.formId}"
          modifiedorder: {
            orderid:"${order.orderid}"
            changeddatetime:${Number(timestamp)}
            changedduration:${Number(order.duration)}
            changedmode:${Number(order.mode)}
            changedcount: ${Number(order.count)}
            changedmale: ${Number(order.male)}
            changedfemale: ${Number(order.female)}
          }
        ){
          orderid
          error
        }
      }`
    }).then((res) => {
      console.log('success', res);
      wx.showToast({
        title: '修改成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/h2-order/list-order/list-order',
        })
      }, 1000)
    }).catch((error) => {
      console.log('fail', error);
    });
  }

})