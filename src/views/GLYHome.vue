<template>
  <login></login>
</template>
<script>
import login from "../components/login.vue"
export default {
  name: "glyhome",
  components: {
    login
  },
  mounted () {
    document.querySelector('body').setAttribute('class', 'bg1 bg2')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('class')
  }
};
</script>
<style lang="scss" scoped>
</style>