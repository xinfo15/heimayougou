// pages/goods_detail/index.js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    gid: undefined,
    goodsDetail: {},
    // 是否收藏当前商品
    isColle: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid: parseInt(options.gid),
    })
    if (this.data.gid) this.getGoodsDetail(this.data.gid)

    this.checkIsColle()
  },

  /**
   * methods
   */
  // 获取商品详情
  async getGoodsDetail(gid) {
    const goodsDetail = await request({
      url: '/api/public/v1/goods/detail',
      data: {
        goods_id: gid,
      },
    })

    this.setData({
      goodsDetail: {
        goods_id: goodsDetail.goods_id,
        pics: goodsDetail.pics,
        goods_name: goodsDetail.goods_name,
        goods_introduce: goodsDetail.goods_introduce.replace(/\.webp/g, '.jpg'),
        goods_price: goodsDetail.goods_price,
      },
    })
  },

  // 预览轮播图图片
  previewImg(e) {
    const current = e.currentTarget.dataset.src
    const urls = this.data.goodsDetail.pics.map((item) => item.pics_mid)

    console.log(urls)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls, // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  addCart(e) {
    const gid = this.data.gid

    const cartList = wx.getStorageSync('cart') || []
    const idx = cartList.findIndex((item) => item.goods_id === gid)

    // 没找到，则加入购物车
    if (idx === -1) {
      cartList.push({
        ...this.data.goodsDetail,
        num: 1,
      })
    } else {
      // 找到了，则数量++
      cartList[idx].num++
    }

    wx.setStorageSync('cart', cartList)
    // 显示提示
    wx.showToast({
      title: '添加成功！',
      icon: 'success',
      mask: true,
    })
  },

  // 检测是否收藏当前商品
  checkIsColle() {
    const colleList = wx.getStorageSync('colle') || []

    const gid = this.data.gid
    const idx = colleList.findIndex((item) => item.goods_id === gid)
    const res = idx !== -1

    if (this.data.isColle !== res) {
      this.setData({
        isColle: res,
      })
    }

    return res
  },
  // 收藏商品
  toggleColle() {
    const colleList = wx.getStorageSync('colle') || []
    const gid = this.data.gid
    const idx = colleList.findIndex((item) => item.goods_id === gid)
    let isColle

    // 没有收藏，则收藏
    if (idx === -1) {
      colleList.push(this.data.goodsDetail)
      isColle = true
    } else {
      // 已经收藏，则取消
      colleList.splice(idx, 1)
      isColle = false
    }

    wx.setStorageSync('colle', colleList)

    this.setData({
      isColle,
    })
  },
})
