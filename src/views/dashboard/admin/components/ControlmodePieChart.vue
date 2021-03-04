<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getProjectControlModeStatistics } from '@/api/project'

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
      chart: null,
      list: []
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
      getProjectControlModeStatistics().then(response => {
        this.list = response.data
        this.label = this.list.map(function(value, index) {
          return value['name']
        })
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          show: true,
          text: '研发模式',
          x: 'center',
          y: 'top',
          textStyle: {
            color: '#666',
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
          data: this.label
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
            data: this.list,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
