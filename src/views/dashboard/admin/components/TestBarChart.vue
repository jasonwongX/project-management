<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '420px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        // color: ['#91d5ff', '#40a9ff', '#096dd9'],
        color: ['#bae7ff', '#69c0ff', '#1890ff'],
        // color: ['#6E9D4E', '#EDDB4F', '#F7923A'],
        title: {
          text: '项目缺陷数分布',
          x: '2%',
          y: '1%',
          barWidth: '20%',
          textStyle: {
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }
          }
        },
        legend: {
          data: ['平均功能点缺陷数', '平均测试用例缺陷数', '千行代码平均缺陷数'],
          align: 'right',
          right: '1%',
          top: '3%',
          textStyle: {
            fontSize: '12'
          }
        },
        grid: {
          left: '3%',
          right: '%',
          top: '15%',

          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              // color: '#bae7ff'
            }
          },
          data: ['0-10个', '10-20个', '20-30个', '30-40个', '40-50个', '50个以上'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        }],
        series: [{
          name: '平均功能点缺陷数',
          type: 'bar',
          data: [60, 110, 180, 100, 130, 140]
        }, {
          name: '平均测试用例缺陷数',
          type: 'bar',
          data: [90, 130, 170, 130, 150, 160]
        }, {
          name: '千行代码平均缺陷数',
          type: 'bar',
          data: [120, 160, 140, 160, 170, 180]
        }],
        animationDuration
      })
    }
  }
}
</script>
