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
