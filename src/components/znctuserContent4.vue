<template>
  <div class="zhct">
    <div>
      <h2>综合智能出题</h2>
      <h3>1.基于考试出题，全真智能模拟</h3>
      <h3>2.完整覆盖多个知识点，全面出题</h3>
    </div>
    <div class='nandu'>
      <h3>难度设置:</h3>
      <div style="margin-top:5%;">
        <button @click.prevent="jd()"
                :class="jdStatus?'active':''">简单</button>
        <button @click.prevent="pt()"
                :class="ptStatus?'active':''">一般</button>
        <button @click.prevent="kn()"
                :class="knStatus?'active':''">困难</button>
      </div>
    </div>
    <div class="znct"
         v-loading="loading">
      <button @click.prevent='znct()'>综合智能出卷</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      jdStatus: false,
      ptStatus: false,
      knStatus: false,
      loading: false
    }
  },
  methods: {
    jd () {
      this.ptStatus = false
      this.knStatus = false
      this.jdStatus = !this.jdStatus
    },
    pt () {
      this.jdStatus = false
      this.knStatus = false
      this.ptStatus = !this.ptStatus
    },
    kn () {
      this.ptStatus = false
      this.jdStatus = false
      this.knStatus = !this.knStatus
    },
    znct () {
      this.loading = true
      let type = this.jdStatus ? 1 : this.ptStatus ? 2 : this.knStatus ? 3 : ''
      if (type === '') {
        this.$message({
          message: "出题失败，请选择一个难度",
          type: "error",
        })
      } else if (type) {
        this.$get('zhct.php', { nd: type }).then(
          res => {
            this.loading = false
            if (res.data.errCode === 200) {
              this.$message({
                message: "出题成功",
                type: "success",
              })
            } else {
              this.$message({
                message: "出题失败",
                type: "error",
              })
            }
          }
        )
      }

    }
  },
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
.zhct {
  width: 65%;
  margin: 2% auto 0;
  overflow: hidden;
  text-align: center;
  padding: 12px;
  h2,
  h3 {
    color: #333;
    font-weight: 300;
  }
  div {
    background-color: white;
    border: 1px solid white;
    border-radius: 12px;
  }
  .nandu {
    margin: 3% auto 0;
    padding: 12px 0 12px 35px;
    h3 {
      color: #333;
      font-weight: 300;
      text-align: left;
    }
    button {
      width: 120px;
      height: 30px;
      background-color: white;
      border: 1px solid #95a5a6;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      margin-right: 4.5%;
    }
    .active {
      background: url('../assets/active.png') no-repeat;
      background-position: right bottom;
      border: 1px solid $color;
    }
  }
  .znct {
    button {
      width: 160px;
      height: 40px;
      background-color: $color;
      color: white;
      border: 1px solid white;
      border-radius: 12px;
      outline: none;
      cursor: pointer;
      margin-top: 15%;
      margin-bottom: 3%;
    }
  }
}
</style>
