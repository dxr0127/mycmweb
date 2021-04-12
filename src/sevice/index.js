import Axios from 'axios'
import wx from 'weixin-js-sdk'
var qs = require('qs')
// 接口地址
// let baseurl = 'http://www.jinpeiwang.cn'
let baseurl = '/apis'

// let siteurl = 'http://app2.jinpeiwang.cn'
let siteurl = '/apiurl'
// 封装ajax post
export function myPostajax (url, data) {
  // alert(data)
  return new Promise((resolve, reject) => {
    Axios.post(baseurl + url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 封装ajax get
export function myGetAjax (web, url, param) {
  // console.log(url)
  // console.log(param)
  var fullurl
  if (web === 'www') {
    fullurl = baseurl + url
  } else {
    fullurl = siteurl + url
  }
  return new Promise((resolve, reject) => {
    Axios.get(fullurl, {params: param})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

Axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response
  }
})
// 分享
const jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'chooseWXPay', 'openLocation']
export function share (title, desc, link, sharelink, imgUrl) {
  if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
    var postData = {}
    postData.url = link
    myPostajax('/Gsbx-bulletin-getWXShareSign', qs.stringify(postData)).then((res) => {
      // console.log(JSON.stringify(res))
      if (res) {
        wxconfig(title, desc, sharelink, imgUrl, res.data)
      }
    })
  }
}
function wxconfig (title, desc, sharelink, imgUrl, configData) {
  wx.config({
    debug: false,
    appId: configData.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
    timestamp: configData.timestamp, // 必填，生成签名的时间戳
    nonceStr: configData.nonceStr, // 必填，生成签名的随机串
    signature: configData.signature, // 必填，签名，见附录1
    // 需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
    jsApiList: jsApiList
  })
  wx.ready(function () {
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        // console.info('分享成功')
      }
    })
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData({
      title: title, // 分享标题
      link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 设置成功
        // console.info('分享成功')
      }
    })
  })
}
