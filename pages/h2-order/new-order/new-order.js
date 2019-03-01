// pages/h2-order/new-order/new-order.js
import {
  $wuxSelect,
  $wuxCalendar
} from '../../../miniprogram_npm/wux-weapp/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value_job: '',
    title_job: '',
    value_date: [],
    time: '',
    array: ['1 小时', '2 小时', '3 小时', '4 小时'],
    index: -1,
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
    isSex: 0,
    cons: [{
      name: '一号顾问',
      value: 1,
      checked: 'true'
    }, {
      name: '二号顾问',
      value: 2
    }, {
      name: '三号顾问',
      value: 3
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
  onClick_job() {
    $wuxSelect('#select_job').open({
      value: this.data.value_job,
      options: [
        '法官',
        '医生',
        '猎人',
        '学生',
        '记者',
        '其他',
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            value_job: value,
            title_job: options[index],
          })
        }
      },
    })
  },
  openCalendar_date() {
    $wuxCalendar('#calendar_date').open({
      value: this.data.value_date,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          value_date: displayValues,
        })
      },
    })
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
  radioChangeCons(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})