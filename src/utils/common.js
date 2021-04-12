//  文档高度
export function getDocumentTop () {
  var scrollTop = 0
  var bodyScrollTop = 0
  var documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}
// 获取url传参
export const GetQueryString = name => {
  var url = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var newUrl = window.location.search.substr(1).match(url)
  if (newUrl != null) {
    return decodeURI(newUrl[2])
  } else {
    return false
  }
}
// 获取链接中的参数
export function GetUrlParam (paraName, url) {
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&')
    var arr
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}
export function GetUrl (url) {
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[0].split('/')
    if (arrPara.length !== 0) {
      return arrPara[arrPara.length - 1]
    } else {
      return ''
    }
  } else {
    return ''
  }
}
