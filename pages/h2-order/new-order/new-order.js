// pages/h2-order/new-order/new-order.js
var gql = require('../../../utils/graphql.js')
import {
  $inToptip
} from '../../../components/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobArray: [],
    value_job: '',
    value_date: '',
    multiArray: [
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '30']
    ],
    multiIndex: [9, 0],
    value_start: '',
    durationArray: ['1 小时', '2 小时', '3 小时', '4 小时'],
    value_duration: '',
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
    pt_count: 0,
    pt_count_male: 0,
    pt_count_female: 0,
    isSex: 0,
    consultant_list: [],
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
    gql.query({
      query: `query {
        need {
          occupations
          advisers {
            name
            phone
            companyname
          }
        }
      }`
    }).then((res) => {
      console.log('success', res.need);
      this.setData({
        jobArray: res.need.occupations,
        consultant_list: res.need.advisers
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

  /* 招募职位 */
  bindPickerChangeJob(e) {
    console.log()
    this.setData({
      value_job: this.data.jobArray[e.detail.value]
    })
  },

  /* 用人日期 */
  bindDateChange(e) {
    this.setData({
      value_date: e.detail.value
    })
  },

  /* 开始时间 */
  bindMultiPickerChange(e) {
    let start_time = `${this.data.multiArray[0][e.detail.value[0]]}:${this.data.multiArray[1][e.detail.value[1]]}`
    this.setData({
      value_start: start_time
    })
  },

  /* 用人时长 */
  bindPickerChange(e) {
    this.setData({
      value_duration: e.detail.value
    })
    console.log(e.detail.value)
  },

  /* 性别自定义 */
  radioChange(e) {
    this.setData({
      isSex: e.detail.value
    })
  },

  /* 用人人数 */
  iptPtCount: function(e) {
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
      $inToptip().show('请选择招募职位')
      return
    }
    if (!this.data.value_date) {
      $inToptip().show('请选择用人日期')
      return
    }
    if (!this.data.value_start) {
      $inToptip().show('请选择开始时间')
      return
    }
    if (!this.data.value_duration) {
      $inToptip().show('请选择用人时长')
      return
    }
    if (Number(this.data.isSex) === 0) {
      if (!count) {
        $inToptip().show('请输入用人人数')
        return
      }
    } else {
      if (!this.data.pt_count_male || !this.data.pt_count_female) {
        $inToptip().show('请输入男/女人数')
        return
      }
    }
    if (!this.data.consultant) {
      $inToptip().show('请选择顾问')
      return
    }
    var timestamp = new Date(`${this.data.value_date} ${this.data.value_start}:00`.replace(/-/g, '/')).getTime() / 1000;
    gql.mutate({
      mutation: `mutation {
        createorder(
          createorder: {
            occupation: "${this.data.value_job}",
            datetime: ${timestamp},
            duration: ${Number(this.data.value_duration) + 1},
            mode: ${Number(this.data.isSex)},
            count: ${Number(this.data.pt_count)},
            male: ${Number(this.data.pt_count_male)},
            female: ${Number(this.data.pt_count_female)},
            advisername: "${this.data.consultant}"
          }
        ) {
          orderid
          error
        }
      }`
    }).then((res) => {
      console.log('success', res);
      wx.navigateTo({
        url: '/pages/h2-order/prompt-success/prompt-success',
      })
    }).catch((error) => {
      console.log('fail', error);
    });
  }

})