<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getTimeLine } from '@/api/commonProcess'
const moment = require('moment')
const _ = require('lodash')

export default {
  name: 'TimeLineLineChart',
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
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      minTime: '',
      maxTime: '',
      chartData: {},
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.fetchData()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    fetchData() {
      getTimeLine(this.projectId).then(response => {
        this.chartData = response.data
        this.chartData.actualData = _.map(this.chartData.actualData, (value) => {
          return moment(value).valueOf()
        })
        this.chartData.expectedData = _.map(this.chartData.expectedData, (value) => {
          return moment(value).valueOf()
        })
        const sortedActualData = _.sortedUniq(this.chartData.actualData)
        const sortedExpectedData = _.sortedUniq(this.chartData.expectedData)
        const actualLength = sortedActualData.length - 1
        const expectedLength = sortedExpectedData.length - 1
        this.minTime = sortedActualData[0] >= sortedExpectedData[0] ? sortedExpectedData[0] : sortedActualData[0]
        this.maxTime = sortedActualData[actualLength] <= sortedExpectedData[expectedLength] ? sortedExpectedData[expectedLength] : sortedActualData[actualLength]
        this.initChart()
      })
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ expectedData, actualData, stageData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: stageData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: (value, index) => {
              return moment(value).format('YYYY-MM-DD')
            }
          },
          min: this.minTime,
          max: this.maxTime
        },
        legend: {
          data: ['计划时间', '实际时间']
        },
        series: [{
          name: '计划时间', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }

          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'

        },
        {
          name: '实际时间',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              },
              label: {
                formatter: function(value) {
                  return moment(value).format('YYYY-MM-DD')
                }
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
