// pages/feedback/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        id: 0,
        value: '体验问题',
        isActive: true,
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false,
      },
    ],
    questionList: [
      {
        id: 0,
        value: '功能建议',
        isActive: false,
      },
      {
        id: 1,
        value: '购买遇到问题',
        isActive: false,
      },
      {
        id: 2,
        value: '性能问题',
        isActive: false,
      },
      {
        id: 3,
        value: '其他',
        isActive: false,
      },
    ],
    questionDetail: '',

    filePaths: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  // 传递给父组件切换tab高亮显示
  changeTabAcitive(e) {
    const id = e.detail
    this.data.tabList.forEach((item) => {
      item.isActive = item.id === id ? true : false
    })

    this.setData({
      tabList: this.data.tabList,
    })
  },
  // 切换问题列表选中
  toggleQuestionActive(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    const questionList = this.data.questionList

    questionList.find((item) => {
      if (item.id === id) {
        item.isActive = !item.isActive
      }
    })

    this.setData({
      questionList,
    })
  },
  // 选择图片
  changeImg(e) {
    const paths = e.detail
    this.setData({
      filePaths: paths,
    })
  },
  // 保存输入的问题详情
  inputQuestionDetail(e) {
    this.setData({
      questionDetail: e.detail.value,
    })
  },
  // 点击提交
  submit() {
    let questionList = this.data.questionList
    const questionDetail = this.data.questionDetail
    const filePaths = this.data.filePaths

    questionList = questionList.filter((item) => {
      return item.isActive === true
    })

    const params = {
      questionList,
      questionDetail,
      filePaths,
    }

    wx.setStorageSync('suggest', params)

    wx.showToast({
      title: '提交成功！',
      icon: 'success',
      mask: true,
      complete: ()=> {
        this.data.questionList.forEach(item => item.isActive = false)
        this.setData({
          questionList: this.data.questionList,
          questionDetail: '',
          filePaths: [],
        })
      }
    })
  },
})
