//newpage.js  
//获取应用实例  
var app = getApp()  
Page({  
    data: {  
        infofromapp: app.data.infofromapp,  
        infofromindex: '',  
        infofromstorage: '',  
    },  
    onLoad: function (options) {  
        var _this = this;  
        var infofromindex = options.infofromindex;  
        this.setData({  
            infofromindex: infofromindex  
        })  
        //获取  
        wx.getStorage({  
            key: 'infofrominput',  
            success: function (res) {  
                _this.setData({  
                    infofromstorage: res.data,  
                })  
            }  
        })  
    }  
}) 