const baseUrl = 'https://api-hmugo-web.itheima.net'

export const request = (params) => {
  params.url = baseUrl + params.url;
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (result) => {
        resolve(result);
      },
      fail: (res) => {
        reject(res);
      }
    })
  })
}