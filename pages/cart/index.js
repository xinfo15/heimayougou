// pages/cart/index.js
import { request } from '../../request/index.js'
import { getSetting, openSetting, chooseAddress, showModal } from '../../utils/promiseWx.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    totalNum: 0,
    allChecked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow: function (options) {
    this.transStorageToData()
  },

  /**
   * methods
   */

  // 将缓存中的数据转换为data中的数据
  transStorageToData() {
    // 读取缓存中的地址
    const cartList = wx.getStorageSync('cart') ?? []
    let totalPrice = 0
    let totalNum = 0
    let allChecked = false
    cartList.forEach((item) => {
      // 加个属性 isSelected
      if (item.isSelected === undefined) item.isSelected = false
      if (item.isSelected === true) {
        totalPrice += item.goods_price * item.num
        totalNum++
      }
    })
    // 全选，为空的时候，不全选
    if (cartList.length !== 0 && totalNum === cartList.length) allChecked = true

    const address = wx.getStorageSync('address') ?? {}

    this.setData({
      address,
      cartList: cartList,
      totalPrice,
      totalNum,
      allChecked,
    })
  },

  // 获取收货地址
  async getAddress() {
    try {
      const res = await getSetting()
      // 如果用户第一次拒绝了授权收货地址
      if (res.authSetting['scope.address'] === false) {
        await openSetting()
        // 如果在打开的设置里面，授权了收货地址
      }
      // 如果用户第一次授权了收货地址
      const address = await chooseAddress()
      // 将选中的地址缓存
      address.full = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  // 选中购物车中的商品
  selectTheGoods(e) {
    const cartIdx = e.currentTarget.dataset.idx
    const cartList = this.data.cartList
    let totalPrice = this.data.totalPrice
    let totalNum = this.data.totalNum
    let allChecked = this.data.allChecked

    cartList[cartIdx].isSelected = !cartList[cartIdx].isSelected

    // 更改购物车选中数量，总价，总选中数，是否全选
    if (cartList[cartIdx].isSelected === true) {
      totalNum++
      totalPrice += cartList[cartIdx].goods_price * cartList[cartIdx].num
      if (totalNum === cartList.length) allChecked = true
    } else {
      totalNum--
      totalPrice -= cartList[cartIdx].goods_price * cartList[cartIdx].num
      if (totalNum !== cartList.length) allChecked = false
    }

    this.setData({
      cartList,
      totalNum,
      allChecked,
      totalPrice,
    })
    wx.setStorageSync('cart', cartList)
  },
  // 增加商品数量
  addNum(e) {
    const cartIdx = e.currentTarget.dataset.idx
    const cartList = this.data.cartList
    let totalPrice = this.data.totalPrice

    cartList[cartIdx].num++

    // 如果商品被选中，则需要加入总价中
    if (cartList[cartIdx].isSelected === true) {
      totalPrice += cartList[cartIdx].goods_price
    }

    this.setData({
      cartList,
      totalPrice,
    })
    wx.setStorageSync('cart', cartList)
  },
  // 减少商品数量
  async minusNum(e) {
    const cartList = this.data.cartList
    const cartIdx = e.currentTarget.dataset.idx
    let totalPrice = this.data.totalPrice
    let totalNum = this.data.totalNum
    let allChecked = this.data.allChecked
    // 要从总价中减去的价格
    let minusPrice = cartList[cartIdx].goods_price
    let isSelected = cartList[cartIdx].isSelected

    // 如果等于1件后，还减就删除，并减去一个选中
    if (cartList[cartIdx].num === 1) {
      try {
        const res = await showModal({
          title: '提示',
          content: '确认要删除吗？',
        })
        // 确认删除，提前保存要减去的价格

        // 如果商品被选中，则需要减去选中的个数
        if (isSelected === true) {
          totalNum -= 1
        }

        cartList.splice(cartIdx, 1)

        // 改变全选状态
        if (totalNum !== cartList.length || cartList.length === 0) allChecked = false
        else allChecked = true
      } catch (error) {
        // 报错，表示取消删除
        return
      }
    } else {
      // 大于1件
      cartList[cartIdx].num--
    }

    // 如果商品被选中，则需要减去总价中
    if (isSelected === true) {
      totalPrice -= minusPrice
    }

    this.setData({
      cartList,
      totalPrice,
      totalNum,
      allChecked,
    })
    wx.setStorageSync('cart', cartList)
  },
  // 点击全选
  tapAllChecked() {
    const cartList = this.data.cartList
    let totalPrice = this.data.totalPrice
    let totalNum = this.data.totalNum
    let allChecked = this.data.allChecked

    // 全选
    if (totalNum !== cartList.length) {
      cartList.forEach((item) => {
        if (item.isSelected === false) {
          totalPrice += item.goods_price * item.num
          totalNum++
          item.isSelected = true
        }
      })
      allChecked = true
    } else {
      // 全不选
      cartList.forEach((item) => {
        if (item.isSelected === true) {
          totalPrice -= item.goods_price
          totalNum--
          item.isSelected = false
        }
      })
      allChecked = false
    }

    this.setData({
      cartList,
      totalPrice,
      totalNum,
      allChecked,
    })
  },
  // 点击结算
  tapPay() {
    const address = wx.getStorageSync('address')

    if (address.errMsg !== 'chooseAddress:ok') {
      wx.showToast({
        title: '请选择收货地址！',
        icon: 'error',
      })
      return
    }

    if (this.data.totalNum <= 0) {
      wx.showToast({
        title: '至少选一样商品！',
        icon: 'error',
      })
      return
    }

    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
})
