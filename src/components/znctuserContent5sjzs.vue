<template>
  <div class="sjlb">
    <div class='sjcontent'
         id="sjdown">
      <div>
        <h4>一、选择题</h4>
        <ul>
          <li v-for="(val,index) in xzt"
              :key="index">
            <div>
              <div class="timu">
                {{index + 1}}、 {{val.content.split(';')[0]}}
              </div>
              <div class="content">
                {{val.content.split(';')[1]}}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h4>二、填空题</h4>
        <ul>
          <li v-for="(val,index) in tkt"
              :key="index">
            <div>
              <div class="timu">
                {{index + 1}}、 {{val.content}}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h4>三、解答题</h4>
        <ul>
          <li v-for="(val,index) in jdt"
              :key="index">
            <div>
              <div class="timu">
                {{index + 1}}、 {{val.content}}
              </div>
            </div>
          </li>
          <li>
            <div></div>
          </li>
        </ul>
      </div>
    </div>
    <div class='sjfenxi'>
      <div id="myChart"
           ref='myChart'
           :style="{width: '300px', height: '300px',margin:'14% auto 0 '}">
      </div>
      <div id="myChart2"
           ref='myChart2'
           :style="{width: '300px', height: '300px',margin:'24% auto 0'}">
      </div>
      <h3 style="color:rgb(72, 201, 176);border:1px solid rgb(72, 201, 176);padding:6px;">难度综合打分:{{dafen}}</h3>
      <button @click.prevent='down()'>下载</button>
    </div>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
export default {
  data () {
    return {
      xzt: null,
      tkt: null,
      jdt: null,
      dafen: null
    }
  },
  methods: {
    draw (xz, tk, dt, jd, pt, kn) {
      let ctx = this.$refs.myChart
      let myChart = this.$echarts.init(ctx, 'light')
      myChart.setOption({
        title: {
          text: '试卷分析',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          // orient: 'vertical',
          // right: 10,
          // top: 20,
          bottom: 10,
          data: ["选择题", "填空题", "解答题"],
        },
        series: [
          {
            name: '题型',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [{ name: "选择题", value: xz }, { name: "填空题", value: tk }, { name: "解答题", value: dt }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      let ctx2 = this.$refs.myChart2
      let myChart2 = this.$echarts.init(ctx2)
      myChart2.setOption({
        title: {
          text: '难度分析',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ["简单", "一般", "困难"],
        },
        series: [
          {
            name: '难度',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            roseType: 'radius',
            data: [{ name: "简单", value: jd }, { name: "一般", value: pt }, { name: "困难", value: kn }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    down () {
      let wb = document.querySelector("#sjdown").textContent
      var blob = new Blob([wb], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "试卷.doc");
    }
  },
  mounted () {
    this.$get('sjzs2.php', { id: this.$route.query.sjId }).then(
      res => {
        this.xzt = res.data.xz
        this.tkt = res.data.tk
        this.jdt = res.data.jd
        // 处理难度
        let xz = res.data.xz.length
        let tk = res.data.tk.length
        let jd = res.data.jd.length
        let rongyi = 0
        let putong = 0
        let kunnan = 0
        res.data.xz.forEach(value => {
          parseInt(value.difficult) === 1 ? rongyi++ : parseInt(value.difficult) === 2 ? putong++ : parseInt(value.difficult) === 3 ? kunnan++ : ""
        });
        res.data.tk.forEach(value => {
          parseInt(value.difficult) === 1 ? rongyi++ : parseInt(value.difficult) === 2 ? putong++ : parseInt(value.difficult) === 3 ? kunnan++ : ""
        });
        res.data.jd.forEach(value => {
          parseInt(value.difficult) === 1 ? rongyi++ : parseInt(value.difficult) === 2 ? putong++ : parseInt(value.difficult) === 3 ? kunnan++ : ""
        });
        //渲染图表
        this.draw(xz, tk, jd, rongyi, putong, kunnan)
        //综合难度打分
        this.dafen = parseInt((rongyi * 1 + putong * 2 + kunnan * 3) / ((rongyi + putong + kunnan) * 3) * 100)
      }
    )
  },
}
</script>
<style lang="scss" >
.sjlb {
  width: 85%;
  margin: 2% auto;
  padding: 6px;
  display: flex;
  .sjcontent {
    flex: 1;
    text-align: left;
    background-color: white;
    margin-right: 12px;
    padding: 12px 0 12px 20px;
    min-height: 1000px;
    h4 {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      margin-bottom: 5%;
    }
    ul {
      padding: 0px;
    }
    li {
      list-style: none;
      padding: 12px;
      &:hover {
        border: 1px solid rgb(72, 201, 176);
      }
      font-size: 14px;
    }
    .timu {
      margin-bottom: 2%;
      letter-spacing: 3px;
    }
    .content {
      letter-spacing: 7px;
      margin: 3% 3%;
    }
  }
  .sjfenxi {
    width: 350px;
    height: 870px;
    text-align: center;
    background-color: white;
    button {
      width: 120px;
      height: 30px;
      background-color: white;
      border: 1px solid #95a5a6;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      margin-top: 2%;
      &:hover {
        color: white;
        background-color: rgb(72, 201, 176);
        border-color: white;
      }
    }
  }
}
</style>
