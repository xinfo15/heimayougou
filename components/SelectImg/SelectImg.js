// components/UploadPic/UploadPic.js
import { chooseImage } from '../../utils/promiseWx.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filePaths: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    async selectImg(e) {
      try {
        const { tempFilePaths } = await chooseImage()
        const filePaths = this.data.filePaths.concat(tempFilePaths)

        this.triggerEvent('changeimg', filePaths)
      } catch (error) {
        console.log(error)
      }
    },
    removeImg(e) {
      console.log(e)
      const idx = e.currentTarget.dataset.idx

      const filePaths = this.data.filePaths
      filePaths.splice(idx, 1)

      this.triggerEvent('changeimg', filePaths)
    },
  },
})
