<template>
  <div class="search">
    <el-row>
      <el-col :xs="4"
              :sm="5"
              :md="6"
              :lg="6"
              :xl="6">
        <div class="grid-content mao">
          <i class="el-icon-al-mao"></i>
          <span>欢迎使用</span>
        </div>
      </el-col>
      <el-col :xs="16"
              :sm="14"
              :md="12"
              :lg="12"
              :xl="6">
        <div class="grid-content search1">
          <el-input placeholder="请输入内容"
                    v-model="search">
            <i slot="suffix"
               class="el-input__icon el-icon-search"
               @click.prevent="submit(search)"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :xs="4"
              :sm="5"
              :md="6"
              :lg="6"
              :xl="6">
        <div class="grid-content">
          <span><img src="../assets/VIP.gif"
                 alt=""></span>
          <span class="help"
                @click.prevent="help()">帮助</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    submit (search) {
      this.$store.commit('changeSearchId', search)
      this.$router.push({
        name: 'znctusercontent5sjzs', query: { sjId: search }
      })
      this.search = ""
    },
    help () {
      this.$message({        message: "您只需要在这里输入试卷的ID就可以快速搜索",
        type: "info", center: true, showClose: true      })
    }
  },
}
</script>
<style lang="scss" >
@import '../assets/scss/index.scss';
.search {
  margin-top: 3%;
  .el-row {
    height: 71px;
  }
  .grid-content {
    // 猫icon调整大小
    .el-icon-al-mao {
      color: $color;
      @include screen(50);
    }
    // 字体偏右
    text-align: center;
    // 猫下面的文字
    span {
      color: $color;
      @include screen(16);
      display: block;
      img {
        margin-top: 1.5%;
      }
    }
    // 搜索框的样式
    .el-input__icon {
      background-color: $color;
      color: white;
      width: 36px;
      margin-left: 13%;
      cursor: pointer;
    }
    //help样式
    .help {
      margin: 0 auto;
      @include screen(18);
      cursor: pointer;
      width: 50px;
      &:hover {
        color: #16a085;
      }
    }
  }
  // 猫单独的样式
  .mao {
    text-align: right;
  }
  // 搜索框单独的样式
  .search1 {
    width: 80%;
    margin: 3% auto;
    .el-input__inner {
      border-color: #16a085;
    }
  }
}
</style>
