<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 3000
const maxCount = 20 // 所有出现风险的最高项目数
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
      default: '380px'
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
        title: {
          show: true,
          text: '风险项目分布',
          x: 'center',
          y: 'top',
          textStyle: {
            fontSize: 14,
            fontStyle: 'normal',
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
          center: ['50%', '42%'],
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
          indicator: [
            { name: '外部依赖', max: maxCount },
            { name: '关联系统', max: maxCount },
            { name: '项目招标', max: maxCount },
            { name: '软硬件采购', max: maxCount },
            { name: '技术风险', max: maxCount },
            { name: '需求变更', max: maxCount },
            { name: '人力资源', max: maxCount },
            { name: '外包合作', max: maxCount },
            { name: '项目进度', max: maxCount },
            { name: '生产环境保障', max: maxCount }
          ]
        },
        series: [{
          type: 'radar',
          // symbolSize: 0,s
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              opacity: 0.8
            }
          },
          data: [
            {
              value: [9, 11, 6, 10, 5, 12, 8, 5, 20, 3],
              name: '存在风险分布',
              label: {
                show: true,
                formatter: function(params) {
                  return params.value
                },
                textStyle: {
                  color: '#000'
                }
              },
              areaStyle: {
                color: '#69c0ff'
              },
              lineStyle: {
                color: '#69c0ff'
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
