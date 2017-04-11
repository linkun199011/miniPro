//index.js  
//获取应用实例  
var app = getApp()  
Page({  
  data: {  
    info: app.data.info,  
    infofromindex: '来自index.js的信息',  
    infofrominput: ''  
  },  
  onLoad: function () {  
  },  
  //跳转到新页面  
  gotonewpage: function () {  
    wx.navigateTo({  
      url: "./newPage?infofromindex=" + this.data.infofromindex,  
    });  
  },  
  //获取输入值  
  searchInputEvent: function (e) {  
    console.log(e.detail.value)  
    this.setData({ infofrominput: e.detail.value })  
  },  
  //保存参数  
  saveinput: function () {  
    try {  
      wx.setStorageSync('infofrominput', this.data.infofrominput)  
    } catch (e) {  
    }  
  }  
})  