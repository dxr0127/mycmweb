const menuList = [{
  key: '0',
  title: '概况',
  url: '/home',
  icon: 'icon-gaikuang',
  children: []
}, {
  key: '1',
  title: '商品',
  url: '/goods/list',
  icon: 'icon-shangpin',
  children: [{
    name: '1-1',
    info: '商品管理',
    children: [{
      name: '1-1-1',
      title: '全部商品',
      url: '/goods/list'
    }, {
      name: '1-1-2',
      title: '商品分类',
      url: '/goods/classify'
    }, {
      name: '1-1-3',
      title: '商品参数',
      url: '/goods/param'
    }, {
      name: '1-1-4',
      title: '商品属性',
      url: '/goods/unit'
    }, {
      name: '1-1-5',
      title: '品牌管理',
      url: '/goods/brand'
    }]
  }]
}, {
  key: '2',
  title: '订单',
  url: '/order/list',
  icon: 'icon-dingdan',
  children: [{
    name: '2-1',
    info: '交易查询',
    children: [{
      name: '2-1-1',
      title: '商品订单',
      url: '/order/list'
    }]
  }, {
    name: '2-2',
    info: '订单管理',
    children: [{
      name: '2-2-1',
      title: '发货管理',
      url: '/order/deliver'
    }, {
      name: '2-2-2',
      title: '服务管理',
      url: '/order/serve'
    }]
  }, {
    name: '2-3',
    info: '维权管理',
    children: [{
      name: '2-3-1',
      title: '维权订单',
      url: '/order/rights'
    }]
  }]
}]
const menuinfo = {
  '0': '概况',
  '1': '商品管理',
  '2': '订单管理'
}
const menuurl = {
  '1-1-1': '/goods/list',
  '1-1-2': '/goods/classify',
  '1-1-3': '/goods/param',
  '1-1-4': '/goods/unit',
  '1-1-5': '/goods/brand',
  '2-1-1': '/order/list',
  '2-2-1': '/order/deliver',
  '2-2-2': '/order/serve',
  '2-3-1': '/order/rights'
}
export {menuList, menuinfo, menuurl}
