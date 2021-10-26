// pages/goods_list/index.js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.cid) this.getGoodsList(options.cid)
  },
  async getGoodsList(cid) {
    const {
      data: { message: goodsList },
    } = await request({
      url: '/api/public/v1/goods/search',
      params: {
        cid,
      },
    })
    console.log(goodsList)
  },
})
