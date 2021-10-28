// pages/user/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.setData({
      userinfo: wx.getStorageSync('userinfo') || {}
    })
  },

  
})