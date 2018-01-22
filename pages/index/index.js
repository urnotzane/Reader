Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_detail: [],
    hidden: true
  },
  //获取页面大小并设置数据
  getWH: function(){
    var res = wx.getSystemInfoSync();
    var w = res.windowWidth;
    var yushu = (w-40)%75;
    var num = (w-40-yushu)/75;
    var listpadding = yushu/num/2;
    //console.log(w)
    this.setData({
      win_w: w,
      listpadding: listpadding
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
  //书籍管理选项显示
  bookManaOpt: function() {
    var that = this;
    var app = getApp();
    var bookrack = app.globalData.bookrack;
    if(that.data.hidden == true){
      that.setData({
        hidden: false
      })
    }else{
      that.setData({
        hidden: true
      })
    }
    //还原所有icon颜色
    for(var i = 0;i < bookrack.length;i++) {
      bookrack[i].iconcol = "#ffffff";
    }
    app.globalData.bookrack = bookrack;
    that.setData({
      book_detail: app.globalData.bookrack
    })
  },
  //封面点击，如果hidden=true，打开书籍，如果等于false当前icon颜色为红
  bookTapAnimation: function(option) {
    var that = this;
    var app = getApp();
    if(that.data.hidden == false) {
      var bookrack = app.globalData.bookrack;
      var chanid = option.currentTarget.dataset.chanid;
      for(var i = 0;i < bookrack.length;i++) {
        if(bookrack[i].id == chanid){
          if (bookrack[i].iconcol =="#ffffff"){
            bookrack[i].iconcol = "#ff6666";
          }else{
            bookrack[i].iconcol = "#ffffff";
          }
          //console.log(bookrack[i].iconcol)
        }
      }
      app.globalData.bookrack = bookrack;
      that.setData({
        book_detail: bookrack
      })
    }else{
      wx.showToast({
        title: '暂未开放',
      })
    }
  },
  //全选选项，如果所有icon颜色全红设为白 如果不全为红设为全红
  selectAll: function(){
    var that = this;
    var app = getApp();
    var dotcount = 0;
    var bookrack = app.globalData.bookrack;
    for (var i = 0; i < bookrack.length; i++) {
      if(bookrack[i].iconcol == "#ff6666") {
        dotcount++;
      }
      bookrack[i].iconcol = "#ff6666";
    }
    //如果color为红的icon和书架书籍数量相等，所有白点设为白
    if(dotcount == bookrack.length){
      for (var i = 0; i < bookrack.length; i++) {
        bookrack[i].iconcol = "#ffffff";
      }
    }
    app.globalData.bookrack = bookrack;
    that.setData({
      book_detail: app.globalData.bookrack
    })
  },
  //删除按钮
  selectDelete: function() {
    var that = this;
    var app = getApp();
    var dotcount = 0;
    var bookrack = app.globalData.bookrack;
    for (var i = 0; i < bookrack.length; i++) {
      if (bookrack[i].iconcol == "#ffffff") {
        dotcount++;
      }
    }
    //如果白色未选中数量等于数组长度，则提示进行选中
    if(dotcount == bookrack.length) {
      wx.showModal({
        title: '提示',
        content: '请选中要删除的书籍',
      })
    }else{
      //删除提示框
      var that = this;
      wx.showModal({
        title: '请确认',
        content: '是否确认删除选选中的书籍',
        success: function (res) {
          if (res.confirm) {
            for (var i = 0; i < bookrack.length; i++) {
              if (bookrack[i].iconcol == "#ff6666") {
                bookrack.splice(i, 1);
                i--;
              }
            }
            app.globalData.bookrack = bookrack;
            that.setData({
              book_detail: bookrack
            })
            that.setSto();
            console.log(app.globalData.bookrack)
          } else {
            console.log("已取消删除");
          }
        }
      })   
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWH();
    var h = this.data.win_w
    console.log(((h-40)%73)/2)
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