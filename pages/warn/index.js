// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemsValue: [
      {
        value:'私锁私用',
        checked:false,
        color:'#b9dd08'
      },
      {
        value: '车牌缺损',
        checked: false,
        color: '#b9dd08'
      },
      {
        value: '轮胎坏了',
        checked: false,
        color: '#b9dd08'
      },
      {
        value: '车锁坏了',
        checked: false,
        color: '#b9dd08'
      },
      {
        value: '违规乱停',
        checked: false,
        color: '#b9dd08'
      },
      {
        value: '密码不对',
        checked: false,
        color: '#b9dd08'
      },
      {
        value: '刹车坏了',
        checked: false,
        color: '#b9dd08'
      },
      {
        value: '其他故障',
        checked: false,
        color: '#b9dd08'
      }
    ],
    picUrls:[],
    checkboxValue:[],
    inputValue:{
      num:0,
      desc:''
    },
    btnColor:'#f2f2f2',
    actionText:'拍摄/相册'
  },

  changeCheckbox:function(e) {
    let value = e.detail.value;
    if(value.length == 0) {
      this.setData({
        btnColor:'#f2f2f2',
        checkboxValue:[]
      })
    }else {
      this.setData({
        btnColor: '#b9dd08',
        checkboxValue: value
      })
    } 
  },

  clickPhoto:function() {
    wx.chooseImage({
      success: (res) => {
        console.log(res);
        let picUrls = this.data.picUrls;
        let tempFilePaths = res.tempFilePaths;
        this.setData({
          picUrls: picUrls.concat(tempFilePaths),
          actionText: tempFilePaths.length > 0 ? '+' : '拍摄/相册'
        })
      },
    })
  },

  delPic: function(e){
    console.log(e);
    let index = e.target.dataset.index;
    let picUrls = this.data.picUrls;
    picUrls.splice(index, 1);
    this.setData({
      picUrls: picUrls,
      actionText: picUrls.length > 0 ? '+' : '拍摄/相册'
    })
  },

  changeNumber:function(e) {
    this.setData({
      inputValue: {
        num: e.detail.value,
        desc: this.data.inputValue.desc
      }
    })
    // console.log(this.data.inputValue)
  },

  changeDesc:function(e){
    this.setData({
      inputValue: {
        num: this.data.inputValue.num,
        desc: e.detail.value
      }
    })
    // console.log(this.data.inputValue)
  },

  submit:function() {
    if (this.data.checkboxValue.length > 0 && this.data.picUrls.length > 0) {
      wx.request({
        url: 'https://www.easy-mock.com/mock/5ae430622bfb1a7e1d60f6ce/ofo/submitSuccess',
        success:(res) => {
          console.log(res);
          wx.showToast({
            title: '提交成功',
            icon:'success'
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请填写完整的反馈信息',
        confirmText:'确定',
        cancelText:'返回首页',
        success:(res) => {
          if(!res.confirm) {
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    }
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