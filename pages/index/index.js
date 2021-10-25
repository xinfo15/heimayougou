//Page Object
Page({
  data: {
    swiperList: [],
  },
  //options(Object)
  onLoad: function (options) {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      complete: (res) => {},
      fail: (res) => {},
      method: 'GET',
      success: (result) => {
        const {
          data: { message: data }
        } = result
        this.setData({
          swiperList: data
        });

        console.log(this.data.swiperList);
      },
    })
  },
  onShow: function () {},
  onReady: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
})
