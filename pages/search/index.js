// pages/search/index.js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 把原函数交给防抖函数，生成防抖原函数后返回赋值
    this.search = this.debounce(this.search, 500)
  },
  /**
   * methods
   */
  // 搜索，防抖优化
  async search(e) {
    const query = e.detail.value

    const res = await request({
      url: '/api/public/v1/goods/qsearch',
      data: { query },
    })

    this.setData({
      searchList: res
    })
  },
  // 防抖函数
  debounce(callback, delay) {
    let timer
    return (e) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback(e)
      }, delay)
    }
  },
  // 取消按钮
  cancel() {
    this.setData({
      inputValue: '',
      searchList: []
    })
  }
})
