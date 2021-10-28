// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    colleList: [],
    tabList: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true,
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false,
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false,
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    const colleList = wx.getStorageSync('colle') || []
    this.setData({
      colleList,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const activeId = parseInt(options.active_id)
    if (activeId) {
      this.changeTabAcitive({ detail: activeId })
    }
  },

  /**
   * methods
   * @param {*} e
   */
  // 传递给父组件切换tab高亮显示
  changeTabAcitive(e) {
    const id = e.detail
    this.data.tabList.forEach((item) => {
      item.isActive = item.id === id ? true : false
    })

    this.setData({
      tabList: this.data.tabList,
    })
  },
})
