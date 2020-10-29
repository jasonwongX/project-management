<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="../../../../assets/images/work.png">
    </div>
    <div style="position:relative;">
      <mallki class-name="mallki-text" text="人员-项目分布" />
      <div
        v-for="(item,index) in list"
        :key="index"
        class="progress-item"
        :style="index == 0 ? 'padding-top:35px' : ''"
      >
        <span>{{ item.qa }}({{ item.count }})</span>
        <el-progress :percentage="parseFloat(getPercent(item.count))" />
      </div>
    </div>
  </el-card>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import { getQaProjectStatistics } from '@/api/project'
export default {
  components: { Mallki },
  data() {
    return {
      list: [],
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getQaProjectStatistics().then(response => {
        this.list = response.data
        for (const item of response.data) {
          this.total += item.count
        }
      })
    },
    getPercent(value) {
      return (value * 100 / this.total).toFixed(1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component{

  .el-card__header {
    padding: 0px!important;
    border-bottom: none!important;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    border:none;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  // @media only screen and (max-width: 1510px){
  //   .mallki-text{
  //     display: none;
  //   }
  // }
}
</style>
