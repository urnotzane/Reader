Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_detail: []
  },
  //获取页面大小并设置数据
  getWH: function(){
    var res = wx.getSystemInfoSync();
    var w = res.windowWidth;
    //console.log(w)
    this.setData({
      win_w: w
    })
  },
  //本地存储
  setSto: function() {
    var that = this;
    try {
      wx.setStorageSync("bookrack", that.data.book_detail)
    } catch (e) {
      console.log(e)
    }
  },
  //获取全局变量bookrack
  getBookrack: function(){
    var app = getApp();
    var that = this;
    that.setData({
      book_detail: app.globalData.bookrack
    })
    that.setSto();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWH();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getBookrack();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})