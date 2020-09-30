<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

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
      default: '360px'
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
          text: '研发模式',
          x: 'center',
          y: 'top',
          textStyle: {
            color: '#000',
            fontSize: 16,
            fontStyle: 'bolder',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['自主研发', '掌控研发', '引进产品', '完全外包']
        },
        calculable: true,
        series: [
          {
            name: '研发模式',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '48%'],
            label: {
              normal: {
                formatter: '{b}({d}%)',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12
                }
              }
            },
            data: [
              { value: 25, name: '自主研发' },
              { value: 76, name: '掌控研发' },
              { value: 25, name: '引进产品' },
              { value: 1, name: '完全外包' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
