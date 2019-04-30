<template>
  <ZnctglySt :id="stlx"></ZnctglySt>
</template>
<script>
import ZnctglySt from './znctglySt'
export default {
  data () {
    return {
      stlx: 3
    }
  }, components: {
    ZnctglySt
  }
}
</script>
<style lang="scss">
</style>
