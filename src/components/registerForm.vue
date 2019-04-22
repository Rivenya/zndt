<template>
  <el-row class="registerForm">
    <el-col :xs="20"
            :sm="20"
            :md="20"
            :lg="20"
            :xl="20"
            :offset="2"
            class="registerForminput">
      <!---------------------------------------------- 表单开始 -->
      <el-form :model="Form"
               :rules="rules"
               ref="Form"
               label-width="100px"
               class="demo-ruleForm"
               status-icon>
        <el-form-item prop="name"
                      :error="Form.errmsg">
          <el-input placeholder="请输入账号"
                    prefix-icon="el-icon-al-tx"
                    v-model="Form.name">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-al-suo"
                    v-model="Form.password"
                    class="suo">
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password"
                    placeholder="请确认密码"
                    prefix-icon="el-icon-al-suo"
                    v-model="Form.repassword"
                    class="suo"
                    autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item class="yhxy">
          <router-link :to="{ name:'yhxy'}">同意用户协议</router-link>
          <el-switch v-model="Form.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit('Form')"
                     :disabled="!this.Form.status">立即注册</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/">已有账号,返回登陆</router-link>
        </el-form-item>
      </el-form>
      <el-button v-popover:popover1
                 class="zuozhe">联系作者</el-button>
      <el-popover ref="popover1"
                  placement="top-start"
                  title="作品仅供学习和参考！！"
                  width="200"
                  trigger="click"
                  content="联系邮件:alifetimetogether@outlook.com。。">
      </el-popover>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "registerForm",
  data () {
    // 检测用户名是否重复
    var checkname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("(*￣︿￣)  账号不能为空!"))
      } else if (value.length < 4) {
        callback(new Error('(*￣︿￣)长度在 4 到 16 个字符'))
      } else if (value.length > 16) {
        callback(new Error('(*￣︿￣)长度在 4 到 16 个字符'))
      } else {
        // errmsg，elmentui的一个错误提示属性
        this.Form.errmsg = ""
        // 发送axios检测用户名是否重复
        this.$get('register.php', { id: value }).then(
          (response) => {
            if (response.data.id == value) {
              this.Form.errmsg = "(*￣︿￣)  账号已存在!"
            }
            callback()
          })
      }
    }
    // 检查密码
    var checkps = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("(*￣︿￣)  密码不能为空!"))
      } else if (value.length < 6) {
        callback(new Error('(*￣︿￣)长度在 6 到 12 个长度'))
      } else if (value.length > 16) {
        callback(new Error('(*￣︿￣)长度在 6 到 12 个长度'))
      } else {
        callback();
      }
    }
    // 检查密码是否一致
    var checkpw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('(*￣︿￣) 请再次输入密码'))
      } else if (value !== this.Form.password) {
        callback(new Error('(*￣︿￣) 两次输入密码不一致!'))
      } else {
        callback();
      }
    }
    return {
      Form: {
        name: "",
        password: "",
        status: true,
        repassword: "",
        errmsg: ""
      },
      rules: {
        name: [
          { validator: checkname, trigger: 'blur' }
        ],
        password: [
          { validator: checkps, trigger: 'blur' }
        ],
        repassword: [{
          validator: checkpw, trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onSubmit (guizhe) {
      this.$refs[guizhe].validate((valid) => {
        if (valid) {
          // 将错误信息清空
          this.Form.errmsg = ""
          // 发送请求
          this.$post("register.php", { id: this.Form.name, ps: this.Form.password }).then((response) => {
            if (response.data.errCode === 200) {
              this.$message({
                message: "╰(*°▽°*)╯ 注册成功,返回登陆页面！",
                type: "success",
                center: true,
                onClose: () => { this.$router.push({ name: 'home' }) },
                duration: 1000
              })
            } else {
              this.$message({
                message: "(* ￣︿￣) 注册失败",
                type: "error",
                center: true,
                duration: 1000
              })
            }
          })
        } else {
          this.$message({
            message: "(* ￣︿￣) 注册失败",
            type: "error",
            center: true,
            duration: 1000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
// registerForm增加层级的
.registerForm {
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  // registerForminput增加层级的
  .registerForminput {
    .el-col {
      border-radius: 20px;
    }
    .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
      margin-top: 5%;
    }
    .el-input__inner {
      border-radius: 20px;
    }
    .el-input__icon {
      font-size: 20px;
      line-height: 0;
      margin-left: 10%;
    }
    .el-icon-al-suo {
      font-size: 24px;
      margin-top: 8%;
    }
    .el-input__inner {
      padding-left: 37px;
      background-color: rgba(255, 255, 255, 0.7);
    }
    //  去除蓝色边框
    .el-input.is-active .el-input__inner,
    .el-input__inner:focus {
      border-color: #fa7411;
    }
    //字体响应式
    .el-input__inner {
      @include screen(16);
    }
    //取消Item的margin
    .el-form-item__content {
      margin-left: 0 !important;
    }
    // 字体标签
    .el-form-item__label {
      @include screen(16);
      color: #fa7411;
      padding: 0 20px 0 0;
      line-height: 43px;
      font-weight: 500;
    }
    // 按钮
    .el-button--primary {
      color: #fff;
      background-color: rgba($color: #fa7411, $alpha: 0.9);
      border-color: #fa7411;
      width: 100%;
      border-radius: 24px;
      @include screen(16);
    }
    // 自动登录开关判断
    .el-switch.is-checked .el-switch__core {
      border-color: rgba($color: #fa7411, $alpha: 0.9);
      background-color: rgba($color: #fa7411, $alpha: 0.9);
    }
    //立即注册判断
    a {
      display: block;
      text-decoration: none;
      color: rgba($color: #fa7411, $alpha: 0.9);
      text-align: center;
      @include screen(17);
      font-weight: 600;
    }
    //错误信息样式
    .el-form-item__error {
      color: red;
      @include screen(14);
      line-height: 1;
      padding-top: 5px;
      position: absolute;
      top: 100%;
      left: 6%;
    }
    .zuozhe {
      position: relative;
      right: -80%;
    }
    .yhxy {
      a {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
