<template>
  <div class="daohang">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             background-color="#48c9b0"
             text-color="#fff"
             active-text-color="white">
      <el-menu-item class="nav"
                    index="znctusercontent">
        <router-link :to="{name:'znctusercontent'}">首页</router-link>
      </el-menu-item>
      <el-menu-item index="znctusercontent2"><a target="_blank">
          <router-link :to="{name:'znctusercontent2'}">章节智能组卷</router-link>
        </a>
      </el-menu-item>
      <el-menu-item index="znctusercontent3">
        <router-link :to="{name:'znctusercontent3'}">知识智能组卷</router-link>
      </el-menu-item>
      <el-menu-item index="znctusercontent4">
        <router-link :to="{name:'znctusercontent4'}">知识智能组卷</router-link>
      </el-menu-item>
      <el-menu-item index="znctusercontent5">
        <router-link :to="{name:'znctusercontent5'}">查看所有试卷</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: this.$route.name
    }
  },
  methods: {

  },
  mounted () {

  },
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
.daohang {
  margin-top: 2%;
  .el-menu--horizontal > .el-menu-item {
    @include screen(16);
    padding: 0;
    a {
      text-decoration: none;
      display: block;
      width: 125px;
      text-align: center;
    }
  }
  .nav {
    @include marginLeft(27);
  }
}
</style>
