<template>
  <el-row :gutter="0"
          class="top">
    <el-col :xs="0"
            :sm="5"
            :md="7"
            :lg="8"
            :xl="8">
      <div class="grid-content"></div>
    </el-col>
    <!--------------------------------------------------- 登录 -->
    <el-col :xs="24"
            :sm="14"
            :md="10"
            :lg="8"
            :xl="8">
      <div class="grid-content bg-purple">
        <el-row>
          <!-- ---------------------active判断是不是被选中的 -->
          <el-col :xs="12"
                  :sm="12"
                  :md="12"
                  :lg="12"
                  :xl="12"
                  :class="[active === 'home' ? 'active':'','font']">
            <router-link to="/">登录</router-link>
          </el-col>
          <!-- ---------------------active判断是不是被选中的 -->
          <el-col :xs="12"
                  :sm="12"
                  :md="12"
                  :lg="12"
                  :xl="12"
                  :class="[active === 'glyhome' ? 'active':'','font']">
            <router-link to="/glyhome">管理员登录</router-link>
          </el-col>
        </el-row>
        <!-- ----------------------------登陆表单---------------------- -->
        <el-container>
          <el-main>
            <loginForm></loginForm>
          </el-main>
        </el-container>
      </div>
    </el-col>

    <el-col :xs="0"
            :sm="5"
            :md="7"
            :lg="8"
            :xl="8">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>

<script>
import loginForm from "./loginForm.vue"

export default {
  name: "home",
  data () {
    return {
      active: this.$route.name
    }
  },
  components: {
    loginForm
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/index.scss';
.el-col {
  border-radius: 4px;
}
.el-col .active {
  border-bottom: 3px solid rgba($color: #fa7411, $alpha: 0.8);
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
  @include magrinTop;
}

.font {
  margin-top: 2%;
  a {
    display: block;
    text-align: center;
    color: #fa7411;
    font-weight: bold;
    text-decoration: none;
    :hover {
      color: #000;
    }
  }
  a {
    @include screen(24);
  }
}
</style>
