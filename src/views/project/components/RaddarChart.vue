<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getRiskScoreStatistics } from '@/api/riskScore'
const animationDuration = 3000

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
      default: '260px'
    }
  },
  data() {
    return {
      chart: null,
      list: [],
      stander: [],
      max: 0
    }
  },
  mounted() {
    this.fetchData()
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
    fetchData() {
      getRiskScoreStatistics().then(response => {
        const that = this
        this.list = response.data.actual_value
        this.stander = response.data.stander_value
        this.max = response.data.total
        this.label = this.list.map(function(value, index) {
          return {
            'name': value['name'],
            'max': that.max
          }
        })
        console.log(this.label)
        this.listValue = this.list.map(function(value, index) {
          return value['value']
        })
        console.log(this.listValue)
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        color: ['red', '#69c0ff'],
        title: {
          show: false,
          text: '项目健指数',
          x: 'center',
          y: 'top',
          textStyle: {
            fontSize: 16,
            color: '#666',
            fontStyle: 'bolder',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '50%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 0.6,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: this.label
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: [
          //   {
          //   name: '可控基线',
          //   areaStyle: { // 图例项的文本样式。
          //     backgroundColor: 'red'
          //   }
          // },
            // {
            //   name: '风险值',
            //   areaStyle: {
            //     backgroundColor: '#69c0ff'

            //   }
            // }
          ]
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          // areaStyle: {
          //   normal: {
          //     shadowBlur: 13,
          //     shadowColor: 'rgba(0,0,0,.2)',
          //     shadowOffsetX: 0,
          //     shadowOffsetY: 10
          //   }
          // },
          data: [
            // {
            //   value: this.stander,
            //   name: '可控基线',
            //   symbolSize: 2,
            //   // areaStyle: {
            //   //   opacity: 0.7
            //   // }
            //   lineStyle: {
            //     color: 'red',
            //     type: 'dotted' // 'dotted'虚线 'solid'实线
            //   }
            // },
            {
              value: this.listValue,
              name: '风险值',
              areaStyle: {
                opacity: 0.7,
                color: '#69c0ff'
              },
              lineStyle: {
                color: 'rgba(127,95,132,.3)'
              }
            }
          ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
