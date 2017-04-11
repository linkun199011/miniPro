// This is our App Service.
// This is our data.
var helloData = {
  name: 'WeChat'
}

// Register a Page.
Page({
  data: helloData,
  changeName: function(e) {
    // sent data change to view
    this.setData({
      name: 'MINA'  
    })
  },
  colorBattle: function(e) {
    wx.navigateTo({
      url: '../game00Color/index',
    })
  },
  scaleDemo: function(e) {
    wx.navigateTo({
      url: '../game01Scale/index',
    })
  },
  swiperDemo: function(e) {
    wx.navigateTo({
      url: '../game02Swiper/index',
    })
  },
  viewDemo: function(e) {
    wx.navigateTo({
      url: '../game03View/index',
    })
  },
  btnDemo: function(e) {
    wx.navigateTo({
      url: '../game04Button/index',
    })
  },
  dataDemo: function(e) {
    wx.navigateTo({
      url: '../game05Data/index',
    })
  }
})
