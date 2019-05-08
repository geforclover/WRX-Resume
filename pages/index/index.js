//index.js
//获取应用实例
// const wxIcon = require('https://at.alicdn.com/t/font_1164570_prxug9o4xbg.css')
const app = getApp()

Page({
  data: {
    menuItem: [
      { title: 'INFORMATION', count: 4 },
      { title: 'EXPERIENCE', count: 5 },
      { title: 'PROJECT', count: 5 },
      { title: 'CONTACT', count: 1 }
    ],
    current: 0,
    initTrans: 14,
    currentCount: 1,
    nextCount: 0,
    maxCount: 0,
    fstCountClass: '__count-prev',
    secCountClass: '__count-current',
    trdCountClass: '__count-next'
  },

  countClassList: ['__count-prev', '__count-current', '__count-next'],

  onLoad: function () {
    this.setData({
      maxCount: this.data.menuItem[0].count
    })
  },

  clickMenuItem: function (e) {
    let _dataset = e.target.dataset,
      currentTrans = this.data.initTrans + (this.data.current - _dataset.index) * 26

    this.countClassList = ['__count-prev', '__count-current', '__count-next'],
    this.setData({
      current: _dataset.index,
      maxCount: _dataset.item.count,
      initTrans: currentTrans,
      currentCount: 1,
      fstCountClass: '__count-prev',
      secCountClass: '__count-current',
      trdCountClass: '__count-next'
    })
  },

  nextContent: function () {
    let _item = this.countClassList.pop()

    this.countClassList.unshift(_item)

    this.setData({
      fstCountClass: this.countClassList[0],
      secCountClass: this.countClassList[1],
      trdCountClass: this.countClassList[2],
      nextCount: this.data.currentCount += 1
    }, () => {
      this.setData({
        currentCount: this.data.nextCount
      })
    })

    
  },
})
