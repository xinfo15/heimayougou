// pages/category/main.js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContentList: [],
    cateActiveIdx: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList()
  },

  // 获取分类信息
  getCateList() {
    request({
      url: '/api/public/v1/categories',
    }).then((res) => {
      const cateList = res.data.message

      const leftMenuList = cateList.map((item) => item.cat_name)
      const rightContentList = cateList[0].children

      this.setData({
        leftMenuList,
        rightContentList
      })
    })
  },
})
