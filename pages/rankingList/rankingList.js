Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //获取数据
  getJson: function () {
    var that = this
    wx.request({
      url: 'https://www.qidian.com/rank/collect?style=1&chn=21&page=1',
      data: {
        classname: ""
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        var arr = res.data.split("<ul>");
        var arrQd;
        for (var i = 0; i < arr.length; i++) {
          arrQd = arr[i].split("data-rid");
          var num = arrQd.length;
          if (num == 0) {
            arr.splice(i, 1)
          }
        }
        //console.log(arr[5])
        var str = arr[5].split("data-rid");
        console.log(str[1]);
        //str = str.replace(/<[^>]*>|/g, "");
        //str = str.replace(/[a-zA-Z]/g, "");
        //str = str.split("&#");
        for (var i = 1; i < str.length; i++) {
          var id, name, counts
          id = "book_id" + i;
          name = str[i].replace(/[0-9]/ig, "").replace(/[\;]/g, "")
          counts = str[i].split(";")[1].replace(/[^0-9]/ig, "");
          // console.log("分类ID：" + id)
          // console.log("分类名称：" + name)
          // console.log("书籍数量：" + counts)
          var index = i - 1;
          var param = {}
          param["id"] = id;
          param["name"] = name;
          param["counts"] = counts;
          //that.data.novelClass[index] = param;
          //that.setData({
           // novelClass: that.data.novelClass
          //})
        }

       
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getJson();
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