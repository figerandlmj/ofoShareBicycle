Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0
  },

  bindcontroltap: function(e){
    // console.log(e);
    switch (e.controlId){
      case 1:
        this.movetoCenter();
        break;
      case 2:
        if(this.timer) {
          wx.navigateBack({
            delta:1
          });
        }else{
          wx.scanCode({
            success: () => {
              console.log(111);
              wx.showLoading({
                title: '正在获取密码',
              });
              wx.request({
                url: 'https://www.easy-mock.com/mock/5ae430622bfb1a7e1d60f6ce/ofo/password',
                success: (res) => {
                  console.log(res);
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanResult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                    success: () => {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                }
              });
            },
            fail: () => {
              console.log(222);
            }
          })
        }
        break;
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../my/index',
        })
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    console.log(this);
    this.timer = options.timer;
    // var self = this;
    wx.getLocation({
      success: (res) => {
        // console.log(res);
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
    });
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls:[{
            id:1,
            iconPath:'/images/location.png',
            position:{
              width:50,
              height:50,
              top: res.windowHeight - 80,
              left:20
            },
            clickable:true
          },
          {
            id:2,
            iconPath:'/images/use.png',
            position:{
              width:90,
              height:90,
              top:res.windowHeight - 100,
              left:res.windowWidth / 2 - 45
            },
            clickable:true
            },
            {
              id: 3,
              iconPath: '/images/warn.png',
              position: {
                width: 50,
                height: 50,
                top: res.windowHeight - 80,
                left: res.windowWidth - 70
              },
              clickable: true
          },
          {
            id: 4,
            iconPath: '/images/avatar.png',
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 155,
              left: res.windowWidth - 70
            },
            clickable: true
          },
          {
            id: 5,
            iconPath: '/images/marker.png',
            position: {
              width: 30,
              height: 50,
              top: res.windowHeight / 2 - 25,
              left: res.windowWidth / 2 - 15
            }
          }]
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  movetoCenter: function(){
    this.mapctx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    this.mapctx = wx.createMapContext('ofo-map');
    this.movetoCenter();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage');
  }
})