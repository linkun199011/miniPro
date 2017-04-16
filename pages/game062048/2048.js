var app = getApp();

var Grid = require('./grid.js');
var Tile = require('./tile.js');
var GameManager = require('./game_manager.js');

var config = {
    data: {
        hidden: false,

        // 游戏数据可以通过参数控制
        grids: [],
        over: false,
        win: false,
        score: 0,
        highscore: 0,
        overMsg: '游戏结束'
    },
    onLoad: function () {
        this.GameManager = new GameManager(4);
        var savedGrid = wx.getStorageSync('2048grids');
        // 保存的内容为空
        if (savedGrid === undefined) {
            console.log("=== savedGrid is undefined====");
            this.setData({
                grids: this.GameManager.setup(),
                score: 0
            });
        } 
        // 保存内容有东西
        else {
            console.log("=== savedGrid detected! ====");
            this.setData({
                grids: this.GameManager.setup(),
                highscore: wx.getStorageSync('highscore') || 0,
                over: wx.getStorageSync('2048over') || false,
                won: wx.getStorageSync('2048won') || false,
                score: wx.getStorageSync('2048score') || 0
            });
        }
        // grids = wx.getStorageSync('2048grids')

    },
    onReady: function () {
        var that = this;

        // 页面渲染完毕隐藏loading
        that.setData({
            hidden: true
        });
    },
    onShow: function () {
        console.log("===onshow ====");
        // 页面展示
    },
    onHide: function () {
        // 页面隐藏
        console.log("===onHide ====");
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
        console.log("===onUnload ====");
    },

    // 更新视图数据
    updateView: function (data) {
        // 游戏结束
        if (data.over) {
            data.overMsg = '游戏结束';
        }

        // 获胜
        if (data.win) {
            data.overMsg = '恭喜';
        }

        this.setData(data);
    },

    // 重新开始
    restart: function () {
        this.updateView({
            grids: this.GameManager.restart(),
            over: false,
            won: false,
            score: 0
        });
    },

    touchStartClienX: 0,
    touchStartClientY: 0,
    touchEndClientX: 0,
    touchEndClientY: 0,
    isMultiple: false, // 多手指操作

    touchStart: function (events) {

        // 多指操作
        this.isMultiple = events.touches.length > 1;
        if (this.isMultiple) {
            return;
        }

        var touch = events.touches[0];

        this.touchStartClientX = touch.clientX;
        this.touchStartClientY = touch.clientY;

    },

    touchMove: function (events) {
        var touch = events.touches[0];
        this.touchEndClientX = touch.clientX;
        this.touchEndClientY = touch.clientY;
    },

    touchEnd: function (events) {
        if (this.isMultiple) {
            return;
        }

        var dx = this.touchEndClientX - this.touchStartClientX;
        var absDx = Math.abs(dx);
        var dy = this.touchEndClientY - this.touchStartClientY;
        var absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 10) {
            var direction = absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);

            var data = this.GameManager.move(direction) || {
                grids: this.data.grids,
                over: this.data.over,
                won: this.data.won,
                score: this.data.score
            };

            var highscore = wx.getStorageSync('highscore') || 0;
            if (data.score > highscore) {
                wx.setStorageSync('highscore', data.score);
            }

            this.updateView({
                grids: data.grids,
                over: data.over,
                won: data.won,
                score: data.score,
                highscore: Math.max(highscore, data.score)
            });
            // wx.setStorageSync('2048grids', data.grids);
            wx.setStorageSync('2048over', data.over);
            wx.setStorageSync('2048won', data.won);
            wx.setStorageSync('2048score', data.score);
            wx.setStorageSync('2048highscore', data.highscore);
            console.log("===data saved ====");
        }

    }
};

Page(config);
