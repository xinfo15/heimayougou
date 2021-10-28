const baseUrl = 'https://api-hmugo-web.itheima.net'

// 同时调用请求的个数
let requestCnt = 0

export const request = (params) => {
  // 调用一次加一次
  requestCnt++
  // 显示loading提示
  wx.showLoading({
    title: '加载中...',
    mask: true,
  })

  // 如果路径中有 /my/ 则带上token
  if (/\/my\//.test(params.url)) {
    params.header = { ...params.header }
    params.header['Authorization'] = wx.getStorageSync('token')
  }

  // 拼接baseUrl
  params.url = baseUrl + params.url

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (result) => {
        const {
          data: { message: res },
        } = result
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      },
      complete: () => {
        // 请求返回一次减一次
        requestCnt--
        // 请求都返回完成后，关闭loading提示
        if (requestCnt === 0) wx.hideLoading()
      },
    })
  })
}
