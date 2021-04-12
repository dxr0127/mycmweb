<template>
  <div id="container" style="background-color: #fff;"></div>
</template>
<script>
import { Chart } from '@antv/g2'
const data = [
  { name: '新增订单', time: '10:10', count: 18.9, amount: 18.9 },
  { name: '新增订单', time: '10:15', count: 28.8, amount: 28.8 },
  { name: '新增订单', time: '10:20', count: 39.3, amount: 39.3 },
  { name: '新增订单', time: '10:25', count: 81.4, amount: 81.4 },
  { name: '新增订单', time: '10:30', count: 47, amount: 47 },
  { name: '新增订单', time: '10:35', count: 20.3, amount: 20.3 },
  { name: '新增订单', time: '10:40', count: 24, amount: 24 },
  { name: '退单数', time: '10:10', count: 12.4 },
  { name: '退单数', time: '10:15', count: 23.2 },
  { name: '退单数', time: '10:20', count: 34.5 },
  { name: '退单数', time: '10:25', count: 99.7 },
  { name: '退单数', time: '10:30', count: 52.6 },
  { name: '退单数', time: '10:35', count: 35.5 },
  { name: '退单数', time: '10:40', count: 37.4 },
]
export default {
  name: 'Chart',
  data () {
    return {
    }
  },
  props: [],
  mounted () {
    const chart = new Chart({
      container: 'container',
      width: 750,
      height: 500
    })
    chart.data(data)
    chart.scale('count', {
      nice: true,
    })
    chart.tooltip({
      showMarkers: false,
      shared: true,
    })
    chart
      .interval()
      .position('time*count')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ])
    chart.line()
      .position('time*amount')
      .color('name')
      .size(3)
      .shape('smooth')
    chart.point()
      .position('time*amount')
      .color('name')
      .size(3)
      .shape('circle')
    chart.interaction('active-region')
    chart.removeInteraction('legend-filter') // 自定义图例，移除默认的分类图例筛选交互
    chart.render()
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
