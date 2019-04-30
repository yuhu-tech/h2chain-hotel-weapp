// pages/h2-order/list-order-detail/list-order-detail.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    order_info: '',
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
    if (options.orderid) {
      this.setData({
        orderid: options.orderid
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
          orderid: "${this.data.orderid}"
        ) {
          state
          adviser{
            name
            phone
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
          pt{
            ptid
            ptorderstate
            name
            idnumber
            gender
            wechatname
            phonenumber
            worktimes
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let temp_list = []
      let temp_ing = []
      let temp_wait = []
      util.formatItemOrigin(res.search[0])
      if (res.search[0].modifiedorder && res.search[0].modifiedorder.length > 0) {
        util.formatItemModify(res.search[0])
      }
      if (res.search[0].pt && res.search[0].pt.length > 0) {
        for (let item of res.search[0].pt) {
          if (item.ptorderstate === 4) {
            temp_wait.push(item)
          } else if (item.ptorderstate === 3) {
            temp_ing.push(item)
          } else if (item.ptorderstate === 1) {
            temp_list.push(item)
          }
        }
      }
      if (temp_list.length === 0 && temp_ing.length === 0 && temp_wait.length === 0) {
        wx.showToast({
          title: '还没有人报名',
          icon: 'none'
        })
      }
      this.setData({
        order_info: res.search[0],
        pt_list: temp_list,
        pt_list_wait: temp_wait,
        pt_list_ing: temp_ing
      })
    }).catch((error) => {
      console.log('fail', error);
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
      phoneNumber: this.data.order_info.adviser.phone,
    })
  },

  search: function() {
    console.log('do search')
  },

  goModifyOrder: function() {
    wx.showModal({
      title: '提示',
      content: '确认修改订单吗？您只能修改一次。',
      success: res => {
        if (res.confirm) {
          wx.navigateTo({
            url: `/pages/h2-order/modify-order/modify-order?orderid=${this.data.order_info.originorder.orderid}`,
          })
        }
      }
    })
  },

  doCloseOrder: function() {
    wx.showModal({
      title: '提示',
      content: '是否要关闭订单？',
      success: res => {
        if (res.confirm) {
          gql.mutate({
            mutation: `mutation{
              closeorder(
                orderid:"${this.data.order_info.originorder.orderid}"
              ){
                orderid
                error
              }
            }`
          }).then((res) => {
            console.log('success', res);
            wx.showToast({
              title: '订单已关闭',
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
      }
    })
  },

  goPtInfo: function() {
    wx.navigateTo({
      url: '/pages/h2-order/pt-info/pt-info',
    })
  }
})