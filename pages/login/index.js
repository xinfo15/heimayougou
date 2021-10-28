// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  // 获取用户信息
  getUserInfo(e) {
    wx.setStorageSync('userinfo', e.detail.userInfo);
    
    wx.navigateBack({
      delta: 1
    });
      
  },
})
