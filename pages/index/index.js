import { request } from '../../request/index.js'

//Page Object
Page({
  data: {
    // 轮播图图片
    swiperList: [],
    // 导航图片
    navigatorList: [],
    // 楼层图片
    floorList: [],
  },
  // 当对象刚建立完毕类似created
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavgatorList()
    this.getFloorList()
  },

  // 获取轮播图图片
  getSwiperList() {
    request({
      url: '/api/public/v1/home/swiperdata',
      method: 'GET',
    }).then((result) => {
      this.setData({
        swiperList: result,
      })
    })
  },

  // 获取导航图片
  getNavgatorList() {
    request({
      method: 'GET',
      url: '/api/public/v1/home/catitems',
    }).then((res) => {
      this.setData({
        navigatorList: res,
      })
    })
  },

  // 获取图片楼层
  getFloorList() {
    request({
      url: '/api/public/v1/home/floordata',
      method: 'GET',
    }).then((res) => {
      const floorList = res
      
      // 返回的接口中只有goods_list，没有goods_list/index 自己加上
      for (const floorItem of floorList) {
        for (const productItem of floorItem.product_list) {
          productItem.navigator_url = productItem.navigator_url.replace('goods_list?', 'goods_list/index?')
        }
      }

      this.setData({
        floorList: floorList,
      })
    })
  },
})
