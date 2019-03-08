// pages/h2-order/new-order/new-order.js
var gql = require('../../../utils/graphql.js')
import {
  $wuxToptips
} from '../../../miniprogram_npm/wux-weapp/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobArray: ['纯阳', '万花', '天策', '藏剑', '七秀', '少林', '唐门'],
    value_job: '',
    value_date: '',
    multiArray: [
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '30']
    ],
    multiIndex: [9, 0],
    value_start: '',
    periodArray: ['1 小时', '2 小时', '3 小时', '4 小时'],
    value_period: '',
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
    pt_count: '',
    pt_count_male: '',
    pt_count_female: '',
    isSex: 0,
    consultant_list: [{
      name: '一碗乌冬面',
      phone: '1111111',
      company: '纯阳'
    }, {
      name: '一支蘸水笔',
      phone: '2222222',
      company: '万花'
    }, {
      name: '一柄朱骨扇',
      phone: '3333333',
      company: '七秀'
    }, ],
    consultant: ''
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
        login(
          email: "${this.data.email}"
        ) {
          job_list,
          consultants {
            name,
            phone,
            company
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      this.setData({
        jobList: res.job_list,
      })
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

  /* 招募职位 */
  bindPickerChangeJob(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value_job: this.data.jobArray[e.detail.value]
    })
  },

  /* 用人日期 */
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value_date: e.detail.value
    })
  },

  /* 开始时间 */
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let start_time = `${this.data.multiArray[0][e.detail.value[0]]}:${this.data.multiArray[1][e.detail.value[1]]}`
    this.setData({
      value_start: start_time
    })
  },

  /* 用人时长 */
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value_period: this.data.periodArray[e.detail.value]
    })
  },

  /* 性别自定义 */
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      isSex: e.detail.value
    })
  },

  /* 用人人数 */
  iptPtCount: function(e) {
    console.log(e)
    this.setData({
      pt_count: e.detail.value
    })
  },

  iptPtCountMale: function(e) {
    this.setData({
      pt_count_male: e.detail.value
    })
  },

  iptPtCountFemale: function(e) {
    this.setData({
      pt_count_female: e.detail.value
    })
  },

  /* 选择顾问 */
  radioChangeCons(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      consultant: e.detail.value
    })
  },

  /* 联系顾问 */
  doCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },

  /* 发布 */
  doPublish: function() {
    /* 计算用人人数 */
    let count = 0
    if (this.data.isSex === 0) {
      count = this.data.pt_count
    } else {
      count = Number(this.data.pt_count_male) + Number(this.data.pt_count_female)
    }
    /* 非空检查 */
    if (!this.data.value_job) {
      this.showToptips('请选择招募职位')
      return
    }
    if (!this.data.value_date) {
      this.showToptips('请选择用人日期')
      return
    }
    if (!this.data.value_start) {
      this.showToptips('请选择开始时间')
      return
    }
    if (!this.data.value_period) {
      this.showToptips('请选择用人时长')
      return
    }
    if (!count) {
      this.showToptips('请输入用人人数')
      return
    }
    if (!this.data.consultant) {
      this.showToptips('请选择顾问')
      return
    }
    /* gql.mutate({
      mutation: `mutation {
        publish(
          job: "${this.data.value_job}",
          date:"${this.data.value_date}",
          start_time:"${this.data.value_time}",
          period:"${this.data.value_period}",
          pt_count:"${count}",
          consultant:"${this.data.consultant}"
        ) {
            success/err
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      this.setData({
        jobList: res.job_list,
      })
    }).catch((error) => {
      console.log('fail', error);
    }); */
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

})