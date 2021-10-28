// pages/order/index.js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    tabList: [
      {
        id: 0,
        value: '全部',
        isActive: true,
      },
      {
        id: 1,
        value: '待付款',
        isActive: false,
      },
      {
        id: 2,
        value: '待发货',
        isActive: false,
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getOrderList()
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
   */
  // 获取订单列表
  async getOrderList() {
    const orderList = wx.getStorageSync('order') || []
    this.setData({
      orderList,
    })
  },

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
