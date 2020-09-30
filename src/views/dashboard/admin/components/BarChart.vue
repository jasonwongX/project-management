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
          text: '项目阶段分布',
          x: 'center',
          y: 'top',
          // padding: 10,
          textStyle: {
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 'bolder',
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          // top: 25,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['启动', '软件需求', '概要设计', '编码', '测试', '上线', '敏捷迭代'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '项目个数',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          itemStyle: {
            normal: {
            // 随机显示
            // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

              // 定制显示（按顺序）
              color: function(params) {
                var colorList = ['#bae7ff', '#91d5ff', '#69c0ff', '#40a9ff', '#1890ff', '#096dd9', '#0050b3', '#003a8c', '#002766']
                return colorList[params.dataIndex]
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#29AAE3'
                }
              }
            }
          },
          data: [3, 29, 16, 30, 23, 9, 17],
          animationDuration
        }]
      })
    }
  }
}
</script>
