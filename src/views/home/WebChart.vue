<template>
  <div id="chart" :style="{width: '840px', height: '360px'}"></div>
</template>
<script>
export default {
  name: 'WebChart',
  data () {
    return {
    }
  },
  props: ['data'],
  mounted () {
    // this.drawLine()
    // console.log(this.data)
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
          // axisPointer: {
          //   type: 'cross',
          //   crossStyle: {
          //     color: '#000'
          //   }
          // }
        },
        legend: {
          // x: '490px',
          y: '20px',
          textStyle: {
            color: '#fff'
          },
          data: ['蓄客人数', '意向定金']
        },
        xAxis: [
          {
            type: 'category',
            data: this.data.time,
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e93c4e'],
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数',
            min: 0,
            max: parseFloat(this.data.xkmax + 50),
            interval: parseInt((parseInt(this.data.xkmax + 50) / 4)),
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e93c4e'],
                width: 1,
                type: 'solid'
              }
            }
          },
          {
            type: 'value',
            name: '金额（万元）',
            min: 0,
            max: parseFloat(this.data.feemax + 100),
            interval: parseInt((parseInt(this.data.feemax + 100) / 4)),
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e93c4e'],
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '意向定金',
            type: 'bar',
            barWidth: 16, // 柱图宽度
            yAxisIndex: 1,
            data: this.data.feeData,
            itemStyle: {
              color: {
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#ff5e1f' // 0% 处的颜色
                }, {
                  offset: 1, color: '#ffbf1f' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          {
            name: '蓄客人数',
            type: 'line',
            data: this.data.xkData,
            symbolSize: 8,
            yAxisIndex: 0,
            itemStyle: {
              color: '#44f0ff'
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
</style>
