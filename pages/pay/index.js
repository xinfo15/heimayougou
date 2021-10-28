// pages/pay/index.js
import { request } from '../../request/index.js'
import { requestPayment } from '../../utils/promiseWx.js'
import dateFormat from '../../utils/dateformat.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.transStorageToData()
  },

  /**
   * methods
   */

  // 将缓存中的数据转换为data中的数据
  transStorageToData() {
    // 读取缓存中的地址
    let cartList = wx.getStorageSync('cart') ?? []
    let totalPrice = 0
    let totalNum = 0
    let allChecked = false

    cartList = cartList.filter((item) => {
      if (item.isSelected === true) {
        totalPrice += item.goods_price * item.num
        totalNum++
      }
      return item.isSelected === true
    })

    this.setData({
      address: wx.getStorageSync('address') ?? {},
      cartList: cartList,
      totalPrice,
      totalNum,
    })
  },

  // 点击支付
  async tapPay() {
    try {
      if (!wx.getStorageSync('token')) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
      const token = wx.getStorageSync('token')
      if (!token) throw Error('没有token')

      const cartList = this.data.cartList
      cartList.forEach((item) => (item.goods_number = item.num))

      // 1 创建订单
      const { order_number, create_time } = await request({
        url: '/api/public/v1/my/orders/create',
        method: 'POST',
        header: { Authorization: token },
        data: {
          order_price: this.data.totalPrice,
          consignee_addr: this.data.address.full,
          goods: cartList,
        },
      })
      if (!order_number) throw Error('创建订单失败')

      // 2 获取预支付参数
      const { pay } = await request({
        url: '/api/public/v1/my/orders/req_unifiedorder',
        method: 'POST',
        data: { order_number },
      })

      // 3 微信支付
      try {
        await requestPayment(pay)
      } catch (error) {
        console.log(error)
      }

      // 4 查询订单状态
      const res = await request({
        url: '/api/public/v1/my/orders/chkOrder',
        method: 'post',
        data: { order_number },
      })

      // 5 保存订单列表
      const orderList = wx.getStorageSync('order')

      cartList.forEach((item) => {
        item.order_number = order_number
        item.create_time = dateFormat(create_time * 1000, 'yyyy/mm/dd HH:MM:ss')
      })
      wx.setStorageSync('order', orderList.concat(cartList))

      // 6 在原来的购物车中删除
      const oldCartList = wx.getStorageSync('cart')
      cartList.forEach((item) => {
        const idx = oldCartList.findIndex((oldItem) => oldItem.goods_id === item.goods_id)
        if (idx !== -1) oldCartList.splice(idx, 1)
      })
      wx.setStorageSync('cart', oldCartList)

      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (error) {
      console.log(error)
      wx.showToast({
        title: '支付失败',
        icon: 'error',
        mask: true,
      })
    }
  },
})
