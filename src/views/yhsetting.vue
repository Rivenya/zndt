<template>
  <div class="setting">
    <!-- 顶部导航和退出 -->
    <contentH></contentH>
    <div class="info">
      <h3>信息修改</h3>
      <span>昵称：</span>
      <input type="text"
             name=""
             id=""
             :placeholder="name"
             v-model="name">
      <span>年龄：</span>
      <input type="text"
             name=""
             id=""
             :placeholder="age"
             v-model="age">
      <span>性别：</span>
      <input type="text"
             name=""
             id=""
             :placeholder="sex"
             v-model="sex">
      <button @click.prevent="infoSub()"
              v-loading="loading">确认修改</button>
    </div>
    <footerH></footerH>
  </div>
</template>
<script>
import contentH from '../components/contentHead';
import footerH from '../components/footerH';
export default {
  data () {
    return {
      name: '',
      sex: "",
      age: '',
      loading: false
    }
  },
  methods: {
    infoSub () {
      this.lodaing = true
      let sex = this.sex ? this.sex === "男" ? this.sex = 1 : this.sex = 0 : ""
      this.$post('userSet.php', { id: this.$route.query.id, name: this.name, age: this.age, sex: sex }).then(
        res => {
          this.loading = false
          if (res.data.errCode === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            })
          }
        }
      )
    }
  },
  components: {
    contentH,
    footerH
  },
  mounted () {
    this.$get('userSet.php', { id: this.$route.query.id }).then(
      res => {
        this.name = res.data.name
        this.age = res.data.age
        this.sex = res.data.sex ? res.data.sex === "1" ? "男" : "女" : ""
      }
    )
  },
}
</script>
<style lang="scss">
.setting {
  background-color: #f6f6f6;
  .info {
    min-height: 500px;
    text-align: center;
    width: 40%;
    margin: 5% auto;
    background-color: white;
    border: 1px solid #95a5a6;
    border-radius: 8px;
    span{
      margin-top: 10%;
      display:block;
    }
    input {
      display: block;
      margin: 1% auto 7%;
      width: 240px;
      height: 25px;
      border-radius: 3px;
      outline: none;
      border: 1px solid #95a5a6;
      padding-left: 6px;
    }
    button {
      margin: 0 auto 7%;
      width: 140px;
      height: 30px;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      background-color: #48c9b0;
    }
  }
}
</style>
