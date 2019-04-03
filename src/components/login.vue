<template>
  <el-row :gutter="0"
          class="top">
    <el-col :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8">
      <div class="grid-content"></div>
    </el-col>
    <el-col :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8">
      <div class="grid-content bg-purple">
        <el-row>
          <el-col :xs="12"
                  :sm="12"
                  :md="12"
                  :lg="12"
                  :xl="12"
                  :class="[active === 'home' ? 'active':'','font']">
            <router-link to="/home">登录</router-link>
          </el-col>
          <el-col :xs="12"
                  :sm="12"
                  :md="12"
                  :lg="12"
                  :xl="12"
                  :class="[active === 'glyhome' ? 'active':'','font']">
            <router-link to="/glyhome">管理员登录</router-link>
          </el-col>
        </el-row>
        <el-container>
          <el-header>
            <router-view></router-view>
          </el-header>
          <el-main></el-main>
        </el-container>
      </div>
    </el-col>
    <el-col :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>

<script>


export default {
  name: "home",
  data () {
    return {
      active: this.$route.name
    }
  }
};
</script>
<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
.el-col .active {
  border-bottom: 3px solid #fa7411;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: rgba($color: #ffffff, $alpha: 0.8);
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 12px;
  min-height: 36px;
}
.top {
  margin-top: 15%;
}

.font {
  a {
    font-size: 24px;
    display: block;
    text-align: center;
    color: #fa7411;
    font-weight: bold;
    text-decoration: none;
    :hover {
      color: #000;
    }
  }
}
</style>
