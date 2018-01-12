Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_info: []
  },
  //获取数据
  getJson: function () {
    var that = this  
    wx.request({
      url: 'https://www.qidian.com/rank/collect?style=1&chn=21&page=1',
      data: {},
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
        //console.log(str[19]);
        for(var j = 1;j < str.length;j++) {
         // str = str[j].split("//");
          var book_list = str[j].split("//");
          //console.log(book_list)
          var book_href = book_list[1].split("\"")[0];   //书籍详情地址
          var data_bid = book_list[1].split("\"")[6];    //应该是书籍的数据库id吧
          var img_src = book_list[2].split("\"")[0];    //封面图片地址
          //用正则表达式去掉所有符号和字母
          var book_name = book_list[3].replace(/[^\u4e00-\u9fa5|\I|\X|\L|\V]/g, "");
          var book_author = book_list[5].replace(/[^\u4e00-\u9fa5]/g, "")
          var book_classify = book_list[6].split("span")[0].replace(/[^\u4e00-\u9fa5]/g, "");
          var book_chara = book_list[6].split("span")[1].replace(/[^\u4e00-\u9fa5]/g, "");    //书籍更新类型
          var book_intro = book_list[6].split("span")[2].replace(/[^\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b|\……]/g, "");   //书籍简介 
          var book_update = book_list[8].split(";")[0].replace(/[^\u4e00-\u9fa5\s+]/g, "");    //最新更新
          var update_time = book_list[8].split(";")[1].replace(/[^0-9|\-|\:|\s+]/ig, "").substring(0, 18)   //获取更新时间
          var collect_num = book_list[8].split("span")[3].replace(/[^0-9]/g, "");
          //console.log(data_bid);
          //console.log(collect_num);
          var index = j - 1;
          var param = {}
          param["book_href"] = "https://" + book_href;
           param["data_bid"] = data_bid;
           param["img_src"] = "https://" + img_src;
           param["book_name"] = book_name;
           param["book_author"] = book_author;
           param["book_classify"] = book_classify;
           param["book_chara"] = book_chara;
           param["book_intro"] = book_intro;
           param["book_update"] = book_update;
           param["update_time"] = update_time;
           param["collect_num"] = collect_num;
          //console.log(that.data.book_info)
           that.data.book_info.push(param);
           that.setData({
             book_info: that.data.book_info
           })
        }
        //console.log(that.data.book_info)
      }
    })
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