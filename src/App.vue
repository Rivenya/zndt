<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  }
}
</script>
<style lang="scss">
body {
  background: url('./assets/background.jpg') no-repeat;
  background-position: center bottom;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>

