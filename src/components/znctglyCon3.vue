<template>
  <ZnctglySt :id="stlx"></ZnctglySt>
</template>
<script>
import ZnctglySt from './znctglySt'
export default {
  data () {
    return {
      stlx: 2
    }
  }, components: {
    ZnctglySt
  }
}
</script>
<style lang="scss">
</style>
