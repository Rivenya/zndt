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
    <el-col :xs="24"
            :sm="14"
            :md="10"
            :lg="8"
            :xl="8">
      <div class="grid-content bg-purple">
        <el-row>
          <el-col :xs="24"
                  :sm="24"
                  :md="24"
                  :lg="24"
                  :xl="24"
                  class="font">
            <router-link to="/register">新用户注册</router-link>
          </el-col>
        </el-row>
        <!-- ----------------------------登陆表单---------------------- -->
        <el-container>
          <el-main>
            <registerForm></registerForm>
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
import registerForm from "../components/registerForm"
export default {
  data () {
    return {

    }
  },
  components: {
    registerForm
  },
  mounted () {
    document.querySelector('body').setAttribute('class', 'bg1')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('class')
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/index.scss';
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: rgba($color: #ffffff, $alpha: 0.8);
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
