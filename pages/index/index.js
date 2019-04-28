//index.js
//获取应用实例
// const wxIcon = require('https://at.alicdn.com/t/font_1164570_prxug9o4xbg.css')
const app = getApp()

Page({
  data: {
    showText: false,
    showRing: true,
    animatHeight: null,
    animatHeightClass: ''
  },

  onLoad: function () {
    console.log(app.globalData.systemInfo.screenHeight)
  },

  touchMoveFunc: function(e) {
    let itemHeight = 0
    const item = wx.createSelectorQuery();
    item.select('.container-board').boundingClientRect().exec(rect => {
      itemHeight = rect[0].height
    })

    this.data.pageUp = e.target.offsetTop
    this.setData({
      animatHeight: itemHeight += e.touches[0].pageY - 50 + 'px'
    })

    if (e.touches[0].pageY > (app.globalData.systemInfo.screenHeight * 3 / 4)) {
      this.setData({
        animatHeightClass: 'container-board-down',
      })

      setTimeout(() => {
        this.setData({
          showRing: false
        })
      }, 1000)
    }
  },

  touchMoveEnd: function(e) {
    if (e.target.offsetTop < (app.globalData.systemInfo.screenHeight * 3 / 4)) {
      this.setData({
        animatHeightClass: 'container-board-up',
        animatHeight: '25vh'
      })

      setTimeout(() => {
        this.setData({
          animatHeightClass: ''
        })
      }, 1000)
    }
  },

  showTextFunc: function(e) {
    console.log(e)
  }
})
