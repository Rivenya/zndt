<template>
  <div class="znctuser">
    <div>
      <!-- 顶部导航和退出 -->
      <contentH></contentH>
    </div>
    <div>
      <!-- 搜索框 -->
      <Search></Search>
    </div>
    <div>
      <!-- 导航栏 -->
      <userNavbar></userNavbar>
    </div>
    <div style="background-color:#f6f6f6;">
      <!-- 内容框 -->
      <router-view></router-view>
    </div>
    <div>尾部</div>
  </div>
</template>
<script>
import contentH from '../components/contentHead';
import Search from '../components/search';
import userNavbar from '../components/usernavbar';
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
    userNavbar
  }
}
</script>
<style lang="scss" >
.znctuser {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
}
</style>
