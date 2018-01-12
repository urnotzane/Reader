// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novelClass: [],
    width: "666px"

  },
  //获取页面大小并设置数据
  getWH: function () {
    var res = wx.getSystemInfoSync();
    var w = res.windowWidth;
    //console.log(w)
    this.setData({
      win_w: w
    })
  },
  //获取数据
  getJson: function() {
    var that = this
    wx.request({
      url: 'https://www.qidian.com',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var arr = res.data.split("<dl>");
        var arrQd;        
        for (var i = 0; i < arr.length; i++) {
          arrQd = arr[i].split("cite");
          var num = arrQd.length;
          if (num == 0) {
            arr.splice(i, 1)
          }
        }
        //console.log(arr)
        var str = arr[1].split("</dl>")[0];
        str = str.replace(/<[^>]*>|/g, "");
        str = str.replace(/[a-zA-Z]/g, "");
        str = str.split("&#");
        //存储女生网的索引
        var num;
        for (var i = 1; i < str.length; i++) {
          var id, name, counts
          id = "book_id" + i;
          name = str[i].replace(/[0-9]/ig, "").replace(/[\;]/g, "")
          counts = str[i].split(";")[1].replace(/[^0-9]/ig, "");
          // console.log("分类ID：" + id)
          // console.log("分类名称：" + name)
          // console.log("书籍数量：" + counts）
          
          if(name == "女生网") {
            num = i - 1;
          } 
          var index = i - 1;
          var param = {}
          //param["id"] = id;
          param["name"] = name;
          param["counts"] = counts;
          //将数组添加至data内的数组
          that.data.novelClass[index] = param;
          //调用setData更新数据
          that.setData({
            novelClass: that.data.novelClass
          }) 
        }
        //删除女生网数据
        that.data.novelClass.splice(num,1)
        that.setData({
          novelClass: that.data.novelClass
        })
        //console.log(that.data.novelClass)
      }
    })
  },
  //获取分类排行地址
  getDataChanId: function() {
    var that = this
    wx.request({
      url: 'https://www.qidian.com/rank',
      data: {
        classname: ""
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var arr = res.data.split("<p>");
        var arrQd;
        var str = arr[14].split("</p>")[0];
        str = str.split("data-chanid")
        //console.log(str)
        for(var i = 2;i < str.length;i++) {
          var id = str[i].substring(1,5)
          //console.log(id)
          id = id.replace(/[\"]/g,"");
          //console.log(id)
          var index = i-2;
          var param = {};
          var string = "novelClass["+index+"].id"
          param[string] = id;
          that.setData(param)
          that.setData({
            novelClass: that.data.novelClass
          })
        }
      }
    })
  },
  showRanklist: function(e) {
    // var id = e.currentTarget.dataset.chanid;
    // wx.navigateTo({
    //   url: '../rankingList/rankingList',
    // })
    //  wx.showToast({
    //    title: id,
    //  })
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
    this.getWH();
    this.getDataChanId();
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
