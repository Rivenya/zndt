<template>
  <div class='sjzs'>
    <div class="sjlb">试卷列表:</div>
    <div class='zs'
         v-for="(val,key) in sjList"
         :key="key">
      <router-link :to="{name:'znctusercontent5sjzs',query: { sjId: val.pageid }}">{{val.pagename}}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sjList: []
    }
  },
  methods: {

  },
  mounted () {
    this.$get('sjzs.php').then(
      res => {
        this.sjList = res.data
      }
    )
  },
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
.sjzs {
  width: 50%;
  background-color: white;
  margin: 2% auto;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  padding: 12px;
  color: #333;
  min-height: 460px;
  .sjlb {
    text-align: center;
    font-size: 20px;
  }
  .zs {
    width: 80%;
    margin: 3% auto;
    a {
      text-decoration: none;
      color: #333;
      &:hover {
        color: $color;
        text-decoration: underline;
      }
    }
  }
}
</style>
