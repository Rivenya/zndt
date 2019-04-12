<template>
  <div class="daohang">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             background-color="#48c9b0"
             text-color="#fff"
             active-text-color="white">
      <el-menu-item class="nav"
                    index="1">
        <router-link :to="{name:'znctusercontent'}">首页</router-link>
      </el-menu-item>
      <el-menu-item><a target="_blank">章节智能组卷</a>
      </el-menu-item>
      <el-menu-item><a target="_blank">知识点智能组卷</a>
      </el-menu-item>
      <el-menu-item><a target="_blank">综合智能组卷</a>
      </el-menu-item>
      <el-menu-item><a target="_blank">查看试卷</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {

  },
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
.daohang {
  margin-top: 2%;
  .el-menu--horizontal > .el-menu-item {
    @include screen(16);
    padding: 0 1rem;
    a {
      text-decoration: none;
    }
  }
  .nav {
    @include marginLeft(27);
  }
}
</style>
