<template>
  <div class="cont">
    <div class="cont-inner">
      <div class="cont-ttl">密码登录</div>
      <div class="from-box">
        <div class="form-inner">
          <div class="input-info">账号</div>
          <div class="input-box">
            <div class="input cm-border-b" :class="phoneinfo || phoneerr ? 'red-border-b':''">
              <input type="text" placeholder="注册时填写的手机号" v-model="phone" @blur="phoneChange">
            </div>
            <div class="info" :class="phoneinfo || phoneerr ? '':'hide'">
              <span v-show="phoneinfo">请输入手机号码</span>
              <span>手机号码不正确</span>
            </div>
          </div>
        </div>
        <div class="form-inner">
          <div class="input-info">密码</div>
          <div class="input-box cm-border-b" :class="passinfo ? 'red-border-b':''">
            <div class="input">
              <input :type="passflag ? 'text':'password'" placeholder="请输入密码" v-model="pass" @blur="passChange">
            </div>
            <div class="info" :class="passinfo ? '':'hide'">请输入密码</div>
            <i class="iconfont cm-pointer" :class="passflag ? 'icon-yanjing-zheng' : 'icon-yanjing-bi'" @click="changePassFlag"></i>
          </div>
        </div>
      </div>
      <span class="forget"><span @click="openWin('/log/forgetpass')" class="cm-pointer">忘记密码？</span></span>
      <div class="cont-btn" @click="login">登录</div>
      <div class="bot-btn">还没有账号，<span class="cm-color-blue cm-pointer" @click="openWin('/log/register')">去注册</span><i class="iconfont icon-arrowsrightline cm-font-size-12 cm-margin-l-10"></i></div>
    </div>
  </div>
</template>
<script>
let reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
export default {
  name: 'login',
  data () {
    return {
      phone: '',
      pass: '',
      passflag: false,
      phoneinfo: false,
      phoneerr: false,
      passinfo: false,
      info: '',
      infoflag: false,
      infotype: '',
      btnflag: true
    }
  },
  created () {
    this.$message.config({
      duration: 1
    })
  },
  mounted () {
    var self = this
    document.onkeydown = function (event) {
      var e = event || window.event
      if (e && e.keyCode === 13) { // 回车键的键值为13
        self.login() // 调用登录按钮的登录事件
      }
    }
  },
  components: {
  },
  methods: {
    phoneChange () {
      if (this.phone) {
        this.phoneinfo = false
        if (!reg.test(this.phone)) {
          this.phoneerr = true
        } else {
          this.phoneerr = false
        }
      } else {
        this.phoneinfo = true
      }
    },
    passChange () {
      if (this.pass) {
        this.passinfo = false
      } else {
        this.passinfo = true
      }
    },
    changePassFlag () {
      this.passflag = !this.passflag
    },
    openWin (url) {
      this.$router.push({
        path: url
      })
    },
    login () {
      if (!this.btnflag) {
        return
      }
      if (!this.phone) {
        this.error('请填写手机号码')
        return
      }
      if (!reg.test(this.phone)) {
        this.error('手机号码不正确')
        return
      }
      if (!this.pass) {
        this.error('请填写密码')
        return
      }
      this.btnflag = false
      // 接口地址
      let postData = {}
      postData.phone = this.phone
      postData.password = this.pass
      let self = this
      self.$post(self.$baseurl + '/Allapi-user-WebLoginCheck?fly=1&devicetype=web&version=0.0.1', postData).then(res => {
        // console.log(res)
        if (res.data.status === '1') {
          self.success()
          localStorage.setItem('token', res.data.msg.token)
          localStorage.setItem('uid', res.data.msg.uid)
          localStorage.setItem('data', JSON.stringify(res.data.msg))
          self.$store.commit('setAvatar', res.data.msg.headimgurl)
          self.$router.push({
            path: '/'
          })
        } else {
          self.error(res.data.error)
        }
        self.btnflag = true
      }).catch(() => {
        self.error()
        self.btnflag = true
      })
    },
    success () {
      this.$message.success('登录成功')
    },
    error (err = '登录失败') {
      this.$message.error(err)
    }
  }
}
</script>
<style scoped>
  @import url('../../assets/css/login');
</style>
