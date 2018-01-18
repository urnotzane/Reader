//app.js
App({
  globalData:{
    bookrack: []
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },
  //  获取本地存储,并传递给全局变量
  getStoYesOrNo: function() {
    var that = this;
    wx.getStorage({
      key: "bookrack",
      success: function(res) {
        that.globalData.bookrack = res.data;
        that.globalData.bookrack = that.globalData.bookrack;
        //console.log(res.data)
      },
      fail: function(res){
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    this.getStoYesOrNo();
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

