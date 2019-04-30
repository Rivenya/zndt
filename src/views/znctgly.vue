<template>
  <div>
    <contentHead></contentHead>
    <div class="gly">
      <el-container>
        <el-aside>
          <el-row class="tac">
            <el-col>
              <el-menu :default-active="activeD"
                       class="el-menu-vertical-demo"
                       @select="daohang">
                <el-menu-item index="znctglyCon1">
                  <i class="el-icon-setting"></i>
                  <span slot="title">
                    <a>总体分析</a>
                  </span>
                </el-menu-item>
                <el-menu-item index="znctglyCon2">
                  <i class="el-icon-setting"></i>
                  <a>选择题管理</a>
                </el-menu-item>
                <el-menu-item index="znctglyCon3">
                  <i class="el-icon-setting"></i>
                  <a>填空题管理</a>
                </el-menu-item>
                <el-menu-item index="znctglyCon4">
                  <i class="el-icon-setting"></i>
                  <a>解答题管理</a>
                </el-menu-item>
                <el-menu-item index="znctglyCon5">
                  <i class="el-icon-setting"></i>
                  <a>知识点管理</a>
                </el-menu-item>
                <el-menu-item index="znctglyCon6">
                  <i class="el-icon-setting"></i>
                  <a>章节管理</a>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
    <footerH></footerH>
  </div>
</template>
<script>
import contentHead from '../components/contentHead'
import footerH from '../components/footerH'
export default {
  data () {
    return {
      activeD: this.$route.name
    }
  },
  methods: {
    daohang (key) {
      this.$router.push({
        name: key
      })
    }
  },
  components: {
    contentHead,
    footerH
  },
  mounted () {

  }
}
</script>
<style lang="scss">
.gly {
  min-height: 620px;
  background-color: #f6f6f6;
  .el-container {
    margin: 0 auto;
    display: -webkit-box;
    .el-aside {
      width: 20% !important;
      min-height: 620px;
      background-color: white;
      border-right: 1px solid #e6e6e6;
      a {
        text-decoration: none;
        color: #48c9b0;
      }
      ul {
        width: 100%;
        margin-top: 13%;
        border: none;
      }
      li {
        width: 100%;
        text-align: center;
        margin-bottom: 5%;
        font-size: 16px;
      }
    }
  }
}
</style>
