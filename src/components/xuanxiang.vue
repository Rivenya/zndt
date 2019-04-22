<template>
  <el-container class="container">
    <el-aside class='zhangjie'>
      <header>章节选项：</header>
      <main>
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="(val,key,index) in title"
                       :key="index"
                       @change="selectInfo(val.zhangjieId)"
                       :label="'第'+val.zhangjieId+'章: '+val.zhangjieName"></el-checkbox>
        </el-checkbox-group>
      </main>
      <footer>
        <el-pagination @current-change="changePage"
                       background
                       layout="prev, pager, next"
                       :total="26"
                       :page-size="row">
        </el-pagination>
      </footer>
    </el-aside>
    <el-main class="timu">
      <header>
        <div class="yxzj"><span>已选章节({{checkList.length}}个)</span> <i class="el-icon-delete"
             @click.prevent="qingkong()">清空</i></div>
        <div class="yxzj-btn">
          <div v-for="(val,index) in checkList"
               :key="index">
            <span>{{val}}</span>
            <i class="el-icon-close"
               @click.prevent="shanchu(index,val)"></i>
          </div>
        </div>
      </header>
      <main>
        <div>
          <div class="txsz">题型设置</div>
          <div class="txtype">
            <div><button @click.prevent="xztype()"
                      :class="xzstatus?'active':''">选择题</button></div>
            <div><button :class="tkstatus?'active':''"
                      @click.prevent="tktype()">填空题</button></div>
            <div><button :class="jdstatus?'active':''"
                      @click.prevent="jdtype()">解答题</button></div>
          </div>
          <div class="txnum"
               v-for="(val,key) in txtype"
               :key="key">
            <span>{{val.title}}</span>
            <div><span>容易</span> <input type="text"
                     :disabled="val.jd > 0?false:true"
                     v-model="submitNum[val.id].jd"> <span>({{val.jd}}道试题可用) </span></div>
            <div><span>普通</span> <input type="text"
                     :disabled="val.pt > 0?false:true"
                     v-model="submitNum[val.id].pt"> <span>({{val.pt}}道试题可用) </span></div>
            <div><span>困难</span> <input type="text"
                     :disabled="val.kn > 0?false:true"
                     v-model="submitNum[val.id].kn"> <span>({{val.kn}}道试题可用) </span></div>
            <div>删除:<i @click="detype(val.id)"
                 class="el-icon-delete"></i></div>
          </div>
        </div>
      </main>
      <section v-loading="loading"
               element-loading-text="出题中~~~~~~~~">
        <button @click.prevent="chujuan(selectData,submitNum)">智能出卷</button>
      </section>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      title: [],
      //多选框选中的元素
      checkList: [],
      // 每行显示多少条数据
      row: 8,
      //选中的题目类型
      txtype: [],
      xzstatus: false,
      tkstatus: false,
      jdstatus: false,
      //需要查询的数据，选择的知识点的Id
      selectData: [],
      //需要查询的类型,填空，选择，判断
      selectType: [],
      //需要提交的题目数量
      submitNum: [{}, { type: 'xz', jd: 0, pt: 0, kn: 0 }, { type: 'tk', jd: 0, pt: 0, kn: 0 }, { type: 'jd', jd: 0, pt: 0, kn: 0 }],
      loading: false
    }
  },
  methods: {
    // 改变页数查询数据库
    changePage (page) {
      this.$get('changepage.php', { page: page, row: 8 }).then(
        response => {
          this.title = []
          this.title = response.data
        }
      )
    },
    qingkong () {
      this.checkList = []
      this.txtype = []
      this.jdstatus = false
      this.tkstatus = false
      this.xzstatus = false
    },
    shanchu (index, val) {
      this.checkList.splice(index, 1)
      let a = val.replace(/[^0-9]/ig, "")
      this.selectInfo(a)
    },
    // 选择题展示到题型设置下面      
    xztype () {
      this.xzstatus = !this.xzstatus
      if (this.xzstatus) {
        // 展示的数组里面插入选择题
        this.txtype.push({ id: 1, title: '选择题:', jd: 0, pt: 0, kn: 0, jdnum: 0, ptnum: 0, knnum: 0 })
        //查询选择题的简单困难普通的数量
        if (this.tktype !== "" && this.selectData !== "") {
          this.$get('timuzongshu.php', { type: 1, select: this.selectData, difficult1: 1, difficult2: 2, difficult3: 3 }).then(
            response => {
              // 如果结果不是404，数据添加进txttype
              if (response.data != 404) {
                new Promise(
                  resolve => {
                    this.txtype.find(
                      (x, index) => {
                        x.id === 1 && resolve(index)
                      }
                    )
                  }
                ).then(
                  resolve => {
                    this.txtype[resolve].jd = parseInt(response.data.jd)
                    this.txtype[resolve].pt = parseInt(response.data.pt)
                    this.txtype[resolve].kn = parseInt(response.data.kn)
                  }
                )
              }
            }
          )
        }
      } else {
        new Promise(resolve => {
          this.txtype.find(function (x, index) {
            if (x.id === 1) {
              resolve(index)
            }
          })
        }).then(
          resolve => {
            this.txtype.splice(resolve, 1)
          }
        )
      }
    },
    // 填空题按钮展示到题型设置下面   
    tktype () {
      this.tkstatus = !this.tkstatus
      if (this.tkstatus) {
        this.txtype.push({ id: 2, title: '填空题:', jd: 0, pt: 0, kn: 0, stnum: 0 })
        if (this.tktype !== "" && this.selectData !== "") {
          this.$get('timuzongshu.php', { type: 2, select: this.selectData, difficult1: 1, difficult2: 2, difficult3: 3 }).then(
            response => {
              if (response.data != 404) {
                new Promise(
                  resolve => {
                    this.txtype.find(
                      (x, index) => {
                        x.id === 2 && resolve(index)
                      }
                    )
                  }
                ).then(
                  resolve => {
                    this.txtype[resolve].jd = parseInt(response.data.jd)
                    this.txtype[resolve].pt = parseInt(response.data.pt)
                    this.txtype[resolve].kn = parseInt(response.data.kn)
                  }
                )
              }
            }
          )
        }
      } else {
        new Promise(resolve => {
          this.txtype.find(function (x, index) {
            if (x.id === 2) {
              resolve(index)
            }
          })
        }).then(
          resolve => {
            this.txtype.splice(resolve, 1)
          }
        )
      }
    },
    // 解答题展示到题型设置下面
    jdtype () {
      this.jdstatus = !this.jdstatus
      if (this.jdstatus) {
        this.txtype.push({ id: 3, title: '解答题:', jd: 0, pt: 0, kn: 0, stnum: 0 })
        if (this.tktype !== "" && this.selectData !== "") {
          this.$get('timuzongshu.php', { type: 3, select: this.selectData, difficult1: 1, difficult2: 2, difficult3: 3 }).then(
            response => {
              if (response.data != 404) {
                new Promise(
                  resolve => {
                    this.txtype.find(
                      (x, index) => {
                        x.id === 3 && resolve(index)
                      }
                    )
                  }
                ).then(
                  resolve => {
                    this.txtype[resolve].jd = parseInt(response.data.jd)
                    this.txtype[resolve].pt = parseInt(response.data.pt)
                    this.txtype[resolve].kn = parseInt(response.data.kn)
                  }
                )
              }
            }
          )
        }
      } else {
        new Promise(resolve => {
          this.txtype.find(function (x, index) {
            if (x.id === 3) {
              resolve(index)
            }
          })
        }).then(
          resolve => {
            this.txtype.splice(resolve, 1)
          }
        )
      }
    },
    // 删除题型设置里面的选择
    detype (num) {
      new Promise(
        resolve => {
          this.txtype.find(
            (x, index) => {
              if (x.id === num) {
                resolve(index)
              }
            }
          )
        }
      ).then(
        resolve => {
          if (this.txtype.splice(resolve, 1)) {
            return true
          }
          resolve()
        }
      ).then(
        resolve => {
          if (resolve) {
            switch (num) {
              case 1:
                this.xzstatus = !this.xzstatus
                break;
              case 2:
                this.tkstatus = !this.tkstatus
                break;
              case 3:
                this.jdstatus = !this.jdstatus
                break;
            }
          }
        }
      )
    },
    //将数据添加进查询的集合
    selectInfo (num) {
      num = parseInt(num)
      let index = this.selectData.indexOf(num)
      if (index >= 0) {
        this.selectData.splice(index, 1)
      } else {
        this.selectData.push(num)
      }
      this.txtype = []
      this.jdstatus = false
      this.tkstatus = false
      this.xzstatus = false
    },
    //智能出卷的事件
    chujuan (type, num) {
      this.loading = true
      this.$get('zjchujuan.php', { id: type, xz: num[1], tk: num[2], jd: num[3] }).then(
        res => {
          this.loading = false
          if (res.data.errCode === 200) {
            this.$message({
              message: "出题成功!",
              type: "success",
            })
          } else if (res.data.errCode === 404) {
            this.$message({
              message: "出题失败，不能全部为0!",
              type: "error",
            })
          }
        }
      )
    },
  },
  // 页面加载的时候，加载出第一页的数据
  mounted () {
    this.$get('changepage.php', { page: 1, row: 8 }).then(
      response => {
        this.title = response.data
      }
    )
  },
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
.container {
  // 清除浮动
  .clear-float {
    clear: both;
  }
  width: 80%;
  margin: 3% auto 0;
  text-align: center;
  // 左边的章节
  .zhangjie {
    width: 30% !important;
    border-radius: 16px;
    border: 1px solid white;
    background-color: white;
    //左边章节的头部
    header {
      height: 45px;
      background-color: $color;
      line-height: 45px;
      color: white;
      font-size: 1rem;
    }
    //左边章节的中间
    main {
      label {
        width: 50%;
        display: block;
        margin: 7% auto 0;
        height: 30px;
        text-align: left;
      }
      .el-checkbox {
        color: #333;
      }
      .el-checkbox__label {
        font-size: 1rem;
      }
    }
    //左边章节的分页
    footer {
      margin-top: 3%;
    }
  }
  //右边的题目
  .timu {
    padding-top: 0px;
    // 右边题目的第一个方框
    header {
      min-height: 80px;
      border: 1px solid white;
      background-color: white;
      border-radius: 16px;
      padding: 20px 0 20px 20px;
      //右边题目的已选标题
      .yxzj {
        margin: 0 0 20px 0;
        padding: 0 12px;
        display: flex;
        span {
          flex: 7;
          text-align: left;
        }
        i {
          flex: 0.5;
          font-style: normal;
          text-align: center;
          color: #e74c3c;
          font-size: 0.9rem;
          line-height: 20px;
          cursor: pointer;
          min-width: 48px;
        }
      }
      //右边题目的已选具体的章节
      .yxzj-btn {
        text-align: left;
        div {
          display: inline-block;
          padding: 6px;
          border: 1px solid #95a5a6;
          font-size: 13px;
          border-radius: 3px;
          margin: 0 6px 6px 0;
          span {
            margin-right: 3px;
          }
          i {
            color: #e74c3c;
            font-weight: 500;
            font-size: 16px;
            vertical-align: bottom;
            cursor: pointer;
          }
        }
      }
    }
    //右边题目第二个方框
    main {
      border: 1px solid white;
      background-color: white;
      border-radius: 16px;
      margin-top: 2%;
      padding: 20px 0 20px 20px;
      min-height: 300px;
      .txsz {
        text-align: left;
        padding-left: 12px;
      }
      .txtype {
        padding: 20px 14px 0 0;
        display: flex;
        justify-content: space-evenly;
        div {
          font-size: 14px;
        }
        button {
          width: 120px;
          height: 30px;
          background-color: white;
          border: 1px solid #95a5a6;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
        }
        .active {
          background: url('../assets/active.png') no-repeat;
          background-position: right bottom;
          border-color: $color;
        }
      }
      .txnum {
        display: flex;
        font-size: 14px;
        margin-top: 7%;
        justify-content: space-around;
        input {
          width: 25px;
          margin: 0 10px;
          height: 15px;
        }
        i {
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
    //下面的智能出题按钮
    section {
      button {
        width: 160px;
        height: 40px;
        background-color: $color;
        border: 1px solid $color;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        margin-top: 16px;
        color: white;
      }
    }
  }
  //设置Loading
  .el-loading-spinner {
    position: static;
    .el-loading-text {
      color: $color;
    }
  }
}
// 设置左边知识点被选中的框
.zhangjie .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: $color;
  border-color: $color;
}
// 设置分页被选中的框
.zhangjie .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #364044;
}
//被选中时字体的颜色
.zhangjie .el-checkbox__input.is-checked + .el-checkbox__label {
  color: $color;
}
//设置分页框的颜色
.zhangjie .el-pagination.is-background .el-pager li {
  background-color: $color;
  color: white;
}
//设置多选框的颜色
.zhangjie .el-checkbox__inner {
  border: 1px solid #364044;
}
//设置多选框大小
.zhangjie .el-pagination.is-background .el-pager li {
  min-width: 26px;
}
</style>
    