<template>
  <div class="page-login">
    <div class="login-title">
      <img class="login-title-logo" src="~@/assets/logo.png" />
      <span class="login-title-name">登录</span>
    </div>
    <div class="login-mainer">
      <div class="login-form-password" v-show="passwordMode">
        <el-form
          :model="passwordFrom"
          status-icon
          :rules="passwordRules"
          ref="passwordFrom"
        >
          <el-form-item prop="phone">
            <el-input
              type="number"
              prefix-icon="el-icon-mobile-phone"
              placeholder="请输手机号"
              v-model="passwordFrom.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="passwordFrom.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checked">
            <div class="flex-cell">
              <el-checkbox
                class="flex-cell-bd"
                v-model="passwordFrom.checked"
                >自动登录</el-checkbox
              >
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="submitForm('passwordFrom')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button type="text" @click="()=>this.$router.push('/')">返回首页</el-button>
  </div>
</template>

<script>
// import axios from 'axios'
import loginModel from '@/models/login'
export default {
  data () {
    return {
      passwordMode: true,
      passwordFrom: {
        phone: '',
        password: '',
        checked: true
      },
      passwordRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        let phone = this.passwordFrom.phone
        let password = this.passwordFrom.password
        let params = { phone, password }
        if (!phone || !password) {
          return
        }
        loginModel.post(params).then(res => {
          if (res.data.code === 200) {
            localStorage.setItem('token', res.data.token)// 把token放到本地储存
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
            this.$router.replace({ name: 'Article' })
          } else {
            this.$message({
              type: 'error',
              message: '登录失败，没有此用户!'
            })
          }
        })
        // axios.post('/admin/login', params).then(res => {
        //   console.log(res)
        //   if (res.data.code === 200) {
        //     console.log(res.data.token)
        //     localStorage.setItem('token', res.data.token)
        //     this.$message({
        //       type: 'success',
        //       message: '登录成功!'
        //     })
        //     this.$router.replace({ name: 'Article' })
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: '登录失败，没有此用户!'
        //     })
        //   }
        // })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.flex-cell {
  display: flex;
  .flex-cell-bd {
    flex: 1;
  }
  .flex-cell-ft {
    width: 130px;
    margin-left: 8px;
    &:after {
      display: none;
    }
    &.link {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #409eff;
      text-decoration: none;
    }
  }
}
.page-login {
  display: flex;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  background-position: center;
  padding-top: 40px;
  box-sizing: border-box;
  min-width: 400px;
  position: relative;
  .el-button--text{
    position: absolute;
    right: 10%;
    font-size: 18px;
    font-family: monospace;
  }
}
.login-title {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-title-logo {
    height: 44px;
    margin-right: 20px;
  }
  .login-title-name {
    line-height: 44px;
    font-size: 33px;
    font-weight: 600;
    font-family: Avenir;
  }
}
.login-mainer {
  width: 388px;
  min-width: 388px;
  margin: 40px auto;
}
.login-tab-container {
  text-align: center;
  margin-bottom: 24px;
  .login-tab-item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin-right: 32px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    color: #666;
    border-bottom: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:last-child {
      margin-right: 0;
    }
    &.active {
      color: #1890ff;
      font-weight: 500;
      border-color: #1890ff;
    }
  }
}
</style>
