<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" />
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item prop='mobile'>
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input style="width:280px" v-model="ruleForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click='submitForm()'>登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      checked: true,
      ruleForm: {
        mobile: '18526079668',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入有效手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入有效验证码', trigger: 'blur' },
          { len: 6, message: '必须是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.axios
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.ruleForm)
            .then((res) => {
              const data = res.data
              console.log(data)
              this.$router.push('/')
            })
            .catch((err) => {
              console.log(err)
              this.$message.error('用户名或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 450px;
    height: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
img {
  display: block;
  width: 200px;
  margin: 0px auto 10px;
}
.el-checkbox{
  margin-right: 5px;
}
</style>
