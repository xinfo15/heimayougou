// pages/auth/index.js

import { login } from '../../utils/promiseWx.js'
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  async getUserInfo(e) {
    const userinfo = e.detail

    // 1 微信登录获取code
    const { code } = await login(userinfo)

    // 后台申请接口获取token，因为没有授权，所以不可能成功
    const res = await request({
      url: '/api/public/v1/users/wxlogin',
      method: 'POST',
      data: {
        ...userinfo,
        code,
      },
    })

    // 自己设置一个token代替
    wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')

    wx.navigateBack({
      delta: 1
    });
  },
})
