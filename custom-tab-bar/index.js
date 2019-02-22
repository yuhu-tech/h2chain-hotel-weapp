// tabBarComponent/tabBar.js
const app = getApp();

Component({
  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.includes("iPhone X"),
    selected: 2,
    backgroundColor: "#fef9ed",
    color: "#979795",
    selectedColor: "#ffb342",
    list: [{
        pagePath: "/pages/h2Account/login/login",
        iconPath: "icon/icon_home.png",
        selectedIconPath: "icon/icon_home_HL.png",
        text: "订单列表"
      },
      {
        pagePath: "/pages/h2Account/test/test",
        iconPath: "icon/add.png",
        isSpecial: true,
        text: "发布订单"
      },
      {
        pagePath: "/pages/h2Account/home/home",
        iconPath: "icon/icon_mine.png",
        selectedIconPath: "icon/icon_mine_HL.png",
        text: "个人中心"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      console.log(e)
      const data = e.currentTarget.dataset
      this.setData({
        selected: data.index
      })
    }
  }
})