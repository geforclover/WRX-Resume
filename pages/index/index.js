//index.js
//获取应用实例
const wxIcon = require('https://at.alicdn.com/t/font_1164570_prxug9o4xbg.css')
const app = getApp()

Page({
  data: {
    motto: '点我',
    showText: false,
    userInfo: {},
    status: 'index',
    hasUserInfo: false,
    animationData: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  touchMoveFunc: function(e) {
    console.log(e)
  },

  showTextFunc: function(e) {
    this.setData({
      showText: true,
    })
  },

  backImageFadeOut: function() {
    let animationFst = null,
        animationSec = null
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    animationFst = animation
    animationSec = animation

    animationFst.opacity(0).step()
    animationSec.opacity(1).step()

    this.setData({
      animationFstData: animationFst,
      animationSecData: animationSec
    })
  },
})
