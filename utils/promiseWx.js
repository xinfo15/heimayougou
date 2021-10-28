/**
 * promise 版 getSetting
 * @returns
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => resolve(res),
      error: (err) => reject(err),
    })
  })
}

/**
 * promise 版 openSetting
 * @returns
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => resolve(res),
      error: (err) => reject(err),
    })
  })
}

/**
 * promise 版 chooseAddress
 * @returns
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res) => resolve(res),
      error: (err) => reject(err),
    })
  })
}

/**
 * promise 版 showModal
 * @returns
 */
export const showModal = (setting) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...setting,
      success(res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      },
    })
  })
}

/**
 * promise 版 login
 * @returns
 */
export const login = (setting) => {
  return new Promise((resolve, reject) => {
    wx.login({
      ...setting,
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * promise 版 requestPayment
 * @returns
 */
export const requestPayment = (setting) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...setting,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * promise 版 chooseImage
 * @returns
 */
 export const chooseImage = (setting) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
      
  })
}
