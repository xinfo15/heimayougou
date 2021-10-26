// pages/category/main.js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    leftMenuList: [],
    rightContentList: [],
    // 右边内容的滚动高度，用于重新回到顶部
    rightContentScrollTop: 0,
    cateActiveIdx: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCacheForCateList()
  },
  // 给cateList数据设置缓存，缓存过期则重新请求接口
  setCacheForCateList() {
    let cateList = wx.getStorageSync('cate_list')
    // 如果没有缓存，就请求接口
    if (!cateList) {
      this.getCateList()
    } else {
      // 如果有缓存，检查是否过期(30s)
      // 如果过期
      if (cateList.time === undefined || Date.now() - cateList.time > 1000 * 30) {
        this.getCateList()
      } else {
        // 如果没过期
        cateList = cateList.cate_list
        const leftMenuList = cateList.map((item) => item.cat_name)
        const rightContentList = cateList[0].children

        this.setData({
          leftMenuList,
          rightContentList,
          cateList,
        })
      }
    }
  },

  // 获取分类信息
  async getCateList() {
    const {
      data: { message: cateList },
    } = await request({
      url: '/api/public/v1/categories',
    })

    // const cateList = data.message
    // 设置缓存
    wx.setStorageSync('cate_list', { time: Date.now(), cate_list: cateList })

    const leftMenuList = cateList.map((item) => item.cat_name)
    const rightContentList = cateList[0].children

    this.setData({
      leftMenuList,
      rightContentList,
      cateList,
    })
  },

  // 切换菜单高亮显示
  changeCateActive(e) {
    const { menuIdx } = e.currentTarget.dataset

    this.setData({
      cateActiveIdx: menuIdx,
      rightContentList: this.data.cateList[menuIdx].children,
      rightContentScrollTop: 0,
    })
  },
})
