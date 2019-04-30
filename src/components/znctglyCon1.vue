<template>
  <div>
    <header>
      <div>
        <h3 class="el-icon-star-off"></h3><span>题目总数:
          <hr>{{tmc}}</span>
      </div>
      <div>
        <h3 class="el-icon-document"></h3><span>知识点总数
          <hr>{{zsd}}</span>
      </div>
      <div>
        <h3 class="el-icon-message"></h3><span>章节总数
          <hr>{{zj}}</span>
      </div>
      <div>
        <h3 class="el-icon-edit"></h3><span>试卷总数
          <hr>{{sj}}</span>
      </div>
    </header>
    <main>
      <div id="zs"></div>
      <div id="zj"></div>
    </main>
    <footer>
      <div id="ctlx"></div>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tmc: null,
      zsd: null,
      zj: null,
      sj: null
    }
  },
  methods: {
    zsInit (xz, tk, jd) {
      this.$echarts.init(document.getElementById('zs')).setOption({
        title: {
          text: '题目数量',
          x: 'center',
          textStyle: {
            fontSize: '18',
            color: '#48c9b0'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y: '10%',
          data: ['选择题', '填空题', '解答题']
        },
        series: [
          {
            name: '题目数量',
            type: 'pie',
            radius: ['45%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '22',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: xz, name: '选择题', itemStyle: { color: "#f1c40f" } },
              { value: tk, name: '填空题', itemStyle: { color: "#e74c3c" } },
              { value: jd, name: '解答题', itemStyle: { color: "#DB7093" } },
            ]
          }
        ]
      })
    },
    zjInit (jd, pt, kn) {
      this.$echarts.init(document.getElementById('zj')).setOption({
        title: {
          text: '难度分析',
          x: 'center',
          textStyle: {
            fontSize: '18',
            color: '#48c9b0'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y: '10%',
          data: ['简单题', '普通题', '困难题']
        },
        series: [
          {
            name: '题目数量',
            type: 'pie',
            radius: ['45%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '22',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: jd, name: '简单题', itemStyle: { color: "#9b59b6" } },
              { value: pt, name: '普通题', itemStyle: { color: "#3498db" } },
              { value: kn, name: '困难题', itemStyle: { color: "#2ecc71" } },
            ]
          }
        ]
      })
    },
    ctlxInit (zh, zs, zj) {
      this.$echarts.init(document.getElementById("ctlx")).setOption({
        title: {
          text: '出题方式',
          textStyle: {
            fontSize: '18',
            color: '#48c9b0'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 4]
        },
        yAxis: {
          type: 'category',
          data: ['综合出题', '知识点出题', '章节出题']
        },
        series: [
          {
            type: 'bar',
            data: [zh, zs, zj],
            itemStyle: {
              color: "#666699"
            }
          },
        ]
      })
    }
  },
  mounted () {
    this.$get("glySelect.php").then(
      res => {
        // 题目总数
        this.tmc = res.data.tmCount
        // 知识点总数
        this.zsd = res.data.zsdCount
        //章节总数
        this.zj = res.data.zjCount
        //试卷总数
        this.sj = res.data.sjCount
        //选择题,填空，解答题数量
        let xznum = res.data.xznum
        let tknum = res.data.tknum
        let jdnum = res.data.dtnum
        //简单，普通，困难数量
        let jd = res.data.jdCount
        let pt = res.data.ptCount
        let kn = res.data.knCount
        //出题方式数量
        let zhct = res.data.zhctCount
        let zsdct = res.data.zsctCount
        let zjct = res.data.zjctCount
        this.zsInit(xznum, tknum, jdnum)
        this.zjInit(jd, pt, kn)
        this.ctlxInit(zhct, zsdct, zjct)
      })
  }
}
</script>
<style lang="scss">
.gly {
  .el-container {
    .el-main {
      header {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        margin-top: 3%;
        div {
          width: 15%;
          height: 60px;
          text-align: center;
          display: flex;
          span {
            box-sizing: border-box;
            display: block;
            height: 60px;
            width: 70%;
            background-color: white;
            font-size: 14px;
            padding: 5.5% 0;
            hr {
              border: 1px solid white;
              margin: 2%;
            }
          }
          h3 {
            box-sizing: border-box;
            background-color: #00bfff;
            color: white;
            height: 60px;
            padding: 12% 0;
            width: 30%;
            margin: 0;
            font-weight: 300;
            font-size: 20px;
          }
        }
      }
      main {
        display: flex;
        flex-wrap: nowrap;
        #zs {
          box-sizing: border-box;
          width: 50%;
          padding: 50px 5% 0;
          height: 350px;
        }
        #zj {
          box-sizing: border-box;
          width: 50%;
          padding: 50px 5% 0;
          height: 350px;
        }
      }
      footer {
        #ctlx {
          min-height: 180px;
          width: 100%;
        }
      }
    }
  }
}
</style>
