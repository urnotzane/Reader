Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_detail: [
      {
        id: 0,
        name: "我与地坛"
      },
      {
        id: 1,
        name: "小王子"
      },
      {
        id: 2,
        name: "追风筝的人"
      },
      {
        id: 3,
        name: "JavaScript高级程序设计"
      },
      {
        id: 4,
        name: "计算机组成原理"
      },
      {
        id: 5,
        name: "数据结构"
      },
      {
        id: 6,
        name: "朝花夕拾"
      },
      {
        id: 7,
        name: "世界简史"
      }
    ]
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