<template>
  <div :id="dom" :style="{width: '535px', height: '240px', marginLeft: '-28px'}"></div>
</template>
<script>
export default {
  name: 'Chart',
  data () {
    return {
    }
  },
  props: ['dom', 'data', 'name'],
  mounted () {
    // this.drawLine()
    console.log(parseFloat(this.data.max))
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.dom))
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
          data: ['代理', '自营', '邮银']
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
            name: this.name,
            min: 0,
            max: parseFloat(this.data.max),
            interval: parseInt((parseInt(this.data.max) / 4)),
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
            name: '代理',
            type: 'bar',
            // barWidth: 12, // 柱图宽度
            data: this.data.yzData,
            itemStyle: {
              color: {
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#0337ff' // 0% 处的颜色
                }, {
                  offset: 1, color: '#01b2ff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          {
            name: '自营',
            type: 'bar',
            // barWidth: 12, // 柱图宽度
            data: this.data.ycData,
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
            name: '邮银',
            type: 'line',
            data: this.data.yyData,
            symbolSize: 6,
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
