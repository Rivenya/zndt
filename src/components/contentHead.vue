<template>
  <div class="contenthead">
    <el-row>
      <el-col :xs="12"
              :sm="10"
              :md="8"
              :lg="6"
              :xl="6">
        <div class="grid-content">
          中学数学在线出题系统
        </div>
      </el-col>
      <el-col :xs="0"
              :sm="4"
              :md="8"
              :lg="12"
              :xl="12">
        <div class="grid-content"></div>
      </el-col>
      <el-col :xs="12"
              :sm="10"
              :md="8"
              :lg="6"
              :xl="6">
        <div class="grid-content bg-purple">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              账号：&nbsp;&nbsp; &nbsp;{{$store.getters.getUserName}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                <router-link to="">个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                <router-link to=""
                             @click.native="exit()">退出登录</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    exit () {
      window.localStorage.removeItem('token')
      window.sessionStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
.contenthead {
  color: white;
  width: 100%;
  height: 40px;
  .grid-content {
    min-height: 36px;
    text-align: center;
    background: #48c9b0;
    @include screen(16);
    @include lineHeight(32);
  }
  .bg-purple {
    text-align: left;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .el-dropdown {
    @include screen(16);
    color: white;
    &:hover {
      cursor: pointer;
    }
  }
}
.el-dropdown-menu {
  a {
    color: #606266;
    text-decoration: none;
  }
  .popper__arrow {
    &:after {
      border-bottom-color: #f2f3f4 !important;
    }
  }
}
.el-dropdown-menu__item:hover {
  color: white !important;
  background-color: #48c9b0 !important;
}
</style>
