// pages/goods_list/index.js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsTotalPageNum: 1,
    goodsList: [],
    tabList: [
      {
        id: 0,
        value: '综合',
        isActive: true,
      },
      {
        id: 1,
        value: '销量',
        isActive: false,
      },
      {
        id: 2,
        value: '价格',
        isActive: false,
      },
    ],
  },

  // goodsList接口传参
  // 因为不被用于渲染页面所以放在外面
  queryParams: {
    pagenum: 1,
    pagesize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.query) {
      this.queryParams.query = options.query
      this.getGoodsList(this.queryParams.pagenum)
    }

    if (options.cid) {
      this.queryParams.cid = options.cid
      this.getGoodsList(this.queryParams.pagenum)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 上拉刷新goodsList重置为第一页
    this.getGoodsList(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉触底加载更多
    this.getGoodsList(this.queryParams.pagenum + 1)
  },

  /**
   * methods
   */
  // 获取商品列表
  async getGoodsList(page) {
    // 如果请求页数，超过最大页数，就提示
    if (page > this.data.goodsTotalPageNum) {
      wx.showToast({
        title: '已经到最后一页',
      })
      return
    }
    
    // 改变页数
    this.queryParams.pagenum = page
    
    const res = await request({
      url: '/api/public/v1/goods/search',
      data: this.queryParams,
    })
    
    let goodsList = res.goods
    // 总页数
    const goodsTotalPageNum = Math.ceil(res.total / this.queryParams.pagesize)
    
    // 如果从第一页重新开始，则直接覆盖goodsList
    // 如果不是从第一页开始，就拼接goodsList
    if (this.queryParams.pagenum !== 1) {
      goodsList = this.data.goodsList.concat(goodsList)
    }

    this.setData({
      goodsList,
      goodsTotalPageNum,
    })

    // 刷新完毕，关闭下拉刷新loading
    wx.stopPullDownRefresh()
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
