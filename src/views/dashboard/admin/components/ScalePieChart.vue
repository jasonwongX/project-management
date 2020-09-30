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
          text: '项目规模',
          x: 'center',
          y: 'top',
          textStyle: {
            color: '#000',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 'bolder'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['AA', 'A', 'B', 'C', 'D']
        },
        calculable: true,
        series: [
          {
            name: '项目规模',
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
              { value: 6, name: 'AA' },
              { value: 36, name: 'A' },
              { value: 63, name: 'B' },
              { value: 18, name: 'C' },
              { value: 4, name: 'D' }
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
