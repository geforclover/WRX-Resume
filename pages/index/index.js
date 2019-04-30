//index.js
//获取应用实例
// const wxIcon = require('https://at.alicdn.com/t/font_1164570_prxug9o4xbg.css')
const app = getApp()

Page({
  data: {
    showRing: true,
    boardHeight: null,
    blockHeight: 0,
    boardHeightClass: '',
    blockHeightClass: '',
    transPtNum: 120,
    transNtNum: -120,
    transPtClass: '',
    transNtClass: '',
    currentPageY: 0,
    mainTextClass: '',
    noneBorderClass: ''
  },

  onLoad: function () {
    setTimeout(() => {
      this.setData({
        noneBorderClass: 'containert-mainText-item__noneBorder'
      })
    }, 3500)
  },

  touchMoveFunc: function(e) {
    let itemHeight = 0
    const item = wx.createSelectorQuery();
    item.select('.container-board').boundingClientRect().exec(rect => {
      itemHeight = rect[0].height
    })

    this.setData({
      boardHeight: itemHeight += e.touches[0].pageY - 60 + 'px',
    })

    if ((e.touches[0].pageY - this.data.currentPageY > 0) && this.data.currentPageY !== 0) {
      this.setData({
        blockHeight: this.data.blockHeight < 20 ? this.data.blockHeight += 0.5 : 22,
        transPtNum: this.data.transPtNum > 0 ? this.data.transPtNum -= (100 / 20) : 0,
        transNtNum: this.data.transNtNum < 0 ? this.data.transNtNum += (100 / 20) : 0,
        currentPageY: e.touches[0].pageY
      })
    } else if((e.touches[0].pageY - this.data.currentPageY < 0) && this.data.currentPageY !== 0) {
      this.setData({
        blockHeight: this.data.blockHeight > 0 ? this.data.blockHeight -= .5 : 0,
        transPtNum: this.data.transPtNum < 120 ? this.data.transPtNum += (100 / 20) : 120,
        transNtNum: this.data.transNtNum > -120 ? this.data.transNtNum -= (100 / 20) : -120,
        currentPageY: e.touches[0].pageY
      })
    } else {
      this.setData({
        currentPageY: e.touches[0].pageY
      })
    }

    if (e.touches[0].pageY >= (app.globalData.systemInfo.screenHeight * 3 / 4)) {
      this.setData({
        boardHeightClass: 'container-board-down',
        mainTextClass: 'containert-mainText__color'
      })
    } else {
      this.setData({
        mainTextClass: ''
      })
    }
  },

  touchMoveEnd: function(e) {
    console.log(e.target.offsetTop, app.globalData.systemInfo.screenHeight * 3 / 4)
    if (e.target.offsetTop < (app.globalData.systemInfo.screenHeight * 3 / 4)) {
      this.setData({
        boardHeightClass: 'container-board-up',
        boardHeight: '25vh',
        blockHeight: 0,
        transPtNum: 120,
        transNtNum: -120,
        mainTextClass: ''
      })

      setTimeout(() => {
        this.setData({
          boardHeightClass: '',
          blockHeightClass: ''
        })
      }, 1000)
    } else {
      this.setData({
        blockHeight: 22,
        transPtNum: 0,
        transNtNum: 0,
        currentPageY: 0
      })
    }

    this.setData({
      blockHeightClass: 'container-block__back',
      transPtClass: 'transform-positiveRun',
      transNtClass: 'transform-negativeRun'
    })
  },

  onOverTransition: function () {
    if (this.data.boardHeightClass === 'container-board-down') {
      setTimeout(() => {
        this.setData({
          showRing: false
        })
      }, 1000)
    }
  }
})
