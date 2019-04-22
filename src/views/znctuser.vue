<template>
  <div class="znctuser">
    <!-- 顶部导航和退出 -->
    <contentH></contentH>
    <!-- 搜索框 -->
    <Search></Search>
    <!-- 导航栏 -->
    <userNavbar></userNavbar>
    <div style="background-color:#f6f6f6;">
      <!-- 内容框 -->
      <transition enter-active-class="animated fadeInLeft"
                  leave-active-class="animated fadeOutRight"
                  mode="out-in"
                  :duration="750">
        <!-- 渲染子组件 -->
        <router-view></router-view>
      </transition>
    </div>
    <footerH></footerH>
  </div>
</template>
<script>
import contentH from '../components/contentHead';
import Search from '../components/search';
import userNavbar from '../components/usernavbar';
import footerH from '../components/footerH';
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    contentH,
    Search,
    userNavbar,
    footerH
  }
}
</script>
<style lang="scss" >
.znctuser {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  background-color: rgb(246, 246, 246);
}
</style>
