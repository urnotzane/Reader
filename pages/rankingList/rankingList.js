Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_info: [],
    pageid: 1
  },
  //获取数据
  getJson: function () {
    var that = this  
    var chanid = that.data.chanid;
    var pageid = that.data.pageid;
    wx.request({
      url: 'https://www.qidian.com/rank/collect?style=1&chn='+chanid+'&page=' + pageid ,
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
        try{
          var str = arr[5].split("data-rid");
          //console.log(str[19]);
          for (var j = 1; j < str.length; j++) {
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
            //var book_update1 = book_list[8].split(";")[0].indexOf(/[^\u4e00-\u9fa5]/g);
            //console.log(data_bid);
            //console.log(book_update1);
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
        }catch(err) {
          wx.showToast({
            title: "请退出重试~",
            icon: "success",
            duration: 3000
          })
        } 
      },
      fail: function (res) {
        console.log(res.errMsg);
        wx.showToast({
          title: "服务器在开小差，请稍后再试~",
          icon: "loading",
          duration: 3000
        })
      }
      //console.log(that.data.book_info)
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
  //滚动到底部触发事件
  lower: function() {
    var that = this;
    that.setData({
      pageid: that.data.pageid+1
    })
    this.getJson();
  },
  //底部弹出框
  setBookrack: function(e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    var src = e.currentTarget.dataset.src;
    var id = e.currentTarget.dataset.bid;
    var icontype = "";
    wx.showActionSheet({
      itemList: ["加入书架"],
      success: function(res) {
        //console.log(res.tapIndex)
        // wx.navigateTo({
        //   url: "../index/index?name=name&&src=src"
        // })
        if (!res.cancle) {
          var app = getApp();
          var mes = "添加成功";
          var param = {};
          param["id"] = id;
          param["name"] = name;
          param["src"] = src;
          param["iconcol"] = "#ffffff";
          //console.log(id)
          var bookrack = app.globalData.bookrack;
          //如果id值相等count加1
          if(bookrack.length > 0) {
            var count = 0;
            for(var i = 0;i < bookrack.length; i++) {
              if(bookrack[i].id == id){
                count++;
              }
            }
            //判断是否有相等的id值 如果count为0则push
            //若过程出现错误 输出添加失败，若count不等于0则输出已添加过，否则输出添加成功
            try{
              if (count == 0) {
                app.globalData.bookrack.push(param);
                app.globalData.bookrack = app.globalData.bookrack;
              }else{
                mes = "已添加过该书籍"
              }
            }catch(err) {
              mes = "添加失败"
            }finally{
              wx.showToast({
                title: mes,
                icon: "success",
                duration: 1000
              })
            }
            //console.log(bookrack)
            //console.log("You are so clever!")
          }else{
            try{
              bookrack.push(param)
            //console.log(bookrack)
            }catch(err) {
              mes = "添加失败"
            } finally {
              wx.showToast({
                title: mes,
                icon: "success",
                duration: 1000
              })
            }
          }
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWH();
    //获取传入的值并参入data
    this.setData({
      chanid: options.chanid
    })
    //设置页面导航标题
    wx.setNavigationBarTitle({
      title: options.title + "排行"
    })
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