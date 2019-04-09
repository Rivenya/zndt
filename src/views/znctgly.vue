<template>
  <div>
    <form>
      <button @click.prevent="submit()">测试</button>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    submit () {
      this.$post('yanzhenglogin.php').then(
        response => {
          console.log(response)
        }
      )

    }
  },
}
</script>
<style lang="scss" scoped>
</style>
