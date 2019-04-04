<template>
  <login></login>
</template>
<script>
import login from "../components/login.vue"

export default {
  name: "home",
  components: {
    login
  },
  mounted () {
    document.querySelector('body').setAttribute('class', 'bg1')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('class')
  }
};
</script>
<style lang="scss" scoped>
</style>
