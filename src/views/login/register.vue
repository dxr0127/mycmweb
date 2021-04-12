<template>
  <div class="cont">
    <div class="cont-inner">
      <div class="cont-ttl">注册</div>
      <div class="from-box">
        <div class="form-inner">
          <div class="input-info">手机号码</div>
          <div class="input-box">
            <div class="input cm-border-b" :class="phoneinfo || phoneerr ? 'red-border-b':''">
              <input type="text" placeholder="请输入手机号" v-model="phone" @blur="inputChange('phone')">
            </div>
            <div class="info" :class="phoneinfo || phoneerr ? '':'hide'">
              <span v-show="phoneinfo">请输入手机号</span>
              <span>手机号不正确</span>
            </div>
          </div>
        </div>
        <div class="form-inner">
          <div class="input-info">身份证号</div>
          <div class="input-box">
            <div class="input cm-border-b" :class="cardinfo || carderr ? 'red-border-b':''">
              <input type="text" placeholder="请输入身份证号" v-model="card" @blur="inputChange('card')">
            </div>
            <div class="info" :class="cardinfo || carderr ? '':'hide'">
              <span v-show="cardinfo">请输入身份证号</span>
              <span>身份证号不正确</span>
            </div>
          </div>
        </div>
        <div class="form-inner">
          <div class="input-info">验证码</div>
          <div class="input-box">
            <div class="input cm-border-b" :class="codeinfo ? 'red-border-b':''">
              <input type="text" placeholder="请输入验证码" v-model="code" @blur="codeChange('code')" style="width: 50%;">
            </div>
            <div class="getCode cm-color-blue cm-pointer" @click="sendCode" v-text="getCodeInfo"></div>
            <div class="info" :class="codeinfo ? '':'hide'">
              <span>请输入验证码</span>
            </div>
          </div>
        </div>
        <div class="form-inner">
          <div class="input-info">设置密码</div>
          <div class="input-box cm-border-b" :class="passinfo ? 'red-border-b':''">
            <div class="input">
              <input :type="passflag ? 'text':'password'" placeholder="请输入密码" v-model="pass" @blur="codeChange('pass')" style="width: 80%;">
            </div>
            <div class="info" :class="passinfo ? '':'hide'">请输入密码</div>
            <i class="iconfont cm-pointer" :class="passflag ? 'icon-yanjing-zheng' : 'icon-yanjing-bi'" @click="changePassFlag('pass')"></i>
          </div>
        </div>
        <div class="form-inner">
          <div class="input-info">验证密码</div>
          <div class="input-box cm-border-b" :class="repassinfo || repasserr ? 'red-border-b':''">
            <div class="input">
              <input :type="repassflag ? 'text':'password'" placeholder="请输入密码" v-model="repass" @blur="inputChange('repass')" style="width: 80%;">
            </div>
            <div class="info" :class="repassinfo || repasserr ? '':'hide'">
              <span v-show="repassinfo">请输入密码</span>
              <span>两次输入密码不一致</span>
            </div>
            <i class="iconfont cm-pointer" :class="repassflag ? 'icon-yanjing-zheng' : 'icon-yanjing-bi'" @click="changePassFlag('repass')"></i>
          </div>
        </div>
      </div>
      <div class="cont-btn" @click="register">注册</div>
      <div class="bot-btn">有账号，<span class="cm-color-blue cm-pointer" @click="openWin('/log/login')">去登录</span><i class="iconfont icon-arrowsrightline cm-font-size-12 cm-margin-l-10"></i></div>
    </div>
  </div>
</template>
<script>
let phonereg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
var cardreg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
export default {
  name: 'register',
  data () {
    return {
      phone: '',
      pass: '',
      repass: '',
      card: '',
      code: '',
      passflag: false,
      repassflag: false,
      phoneinfo: false,
      phoneerr: false,
      cardinfo: false,
      carderr: false,
      codeinfo: false,
      passinfo: false,
      repassinfo: false,
      repasserr: false,
      count: 60,
      sendFlag: true,
      getCodeInfo: '获取验证码',
      timer: '',
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
    self.$once('hook:beforeDestroy', () => {
      clearInterval(self.timer)
    })
    document.onkeydown = function (event) {
      var e = event || window.event
      if (e && e.keyCode === 13) { // 回车键的键值为13
        self.register() // 调用登录按钮的登录事件
      }
    }
  },
  methods: {
    inputChange (type) {
      if (this[type]) {
        this[type + 'info'] = false
        if (type === 'repass') {
          if (this.pass === this.repass) {
            this[type + 'err'] = false
          } else {
            this[type + 'err'] = true
          }
        } else {
          let reg
          if (type === 'phone') {
            reg = phonereg
          } else {
            reg = cardreg
          }
          if (!reg.test(this[type])) {
            this[type + 'err'] = true
          } else {
            this[type + 'err'] = false
          }
        }
      } else {
        this[type + 'info'] = true
      }
    },
    codeChange (type) {
      if (this[type]) {
        this[type + 'info'] = false
      } else {
        this[type + 'info'] = true
      }
    },
    changePassFlag (type) {
      this[type + 'flag'] = !this[type + 'flag']
    },
    sendCode () {
      if (!this.sendFlag) {
        return
      }
      if (!this.phone) {
        this.error('请填写手机号码')
        return
      }
      if (!phonereg.test(this.phone)) {
        this.error('手机号码不正确')
        return
      }
      if (this.count === 60) {
        this.sendFlag = false
        this.countDown()
        let postData = {}
        postData.phone = this.phone
        let self = this
        this.$post(self.$baseurl + '/Allapi-Sms-SmsSend?fly=1&devicetype=web&version=0.0.1', postData).then(res => {
          // console.log(res)
          if (res.data.status !== '1') {
            self.error(res.data.error)
          }
        }).catch(() => {
          self.error('获取验证码失败')
        })
      }
    },
    countDown () {
      if (this.count === 0) {
        this.getCodeInfo = '获取验证码'
        this.count = 60
        this.sendFlag = true
      } else {
        this.getCodeInfo = this.count + 's'
        this.count--
        var self = this
        this.timer = setTimeout(() => {
          self.countDown()
        }, 1000)
      }
    },
    openWin (url) {
      this.$router.push({
        path: url
      })
    },
    register () {
      if (!this.btnflag) {
        return
      }
      if (!this.phone) {
        this.error('请填写手机号码')
        return
      }
      if (!phonereg.test(this.phone)) {
        this.error('手机号码不正确')
        return
      }
      if (!this.card) {
        this.error('请填写身份证号')
        return
      }
      if (!cardreg.test(this.card)) {
        this.error('身份证号不正确')
        return
      }
      if (!this.code) {
        this.error('请填写验证码')
        return
      }
      if (!this.pass) {
        this.error('请填写密码')
        return
      }
      if (!this.repass) {
        this.error('请填写验证密码')
        return
      }
      if (this.repass !== this.pass) {
        this.error('两次输入密码不一致')
        return
      }
      this.btnflag = false
      let postData = {}
      postData.phone = this.phone
      postData.password = this.pass
      postData.idcard = this.card
      postData.smscode = this.code
      let self = this
      self.$post(self.$baseurl + '/Allapi-user-PhoneRegister?fly=1&devicetype=web&version=0.0.1', postData).then(res => {
        // console.log(res)
        if (res.data.status === '1') {
          self.success()
          localStorage.setItem('token', res.data.msg.token)
          localStorage.setItem('uid', res.data.msg.uid)
          localStorage.setItem('data', JSON.stringify(res.data.msg))
          self.$router.push({
            path: '/'
          })
        } else {
          self.error(res.data.error)
        }
        self.btnflag = true
      }).catch(() => {
        self.error('注册失败')
        self.btnflag = true
      })
    },
    success () {
      this.$message.success('注册成功')
    },
    error (err) {
      this.$message.error(err)
    }
  }
}
</script>
<style scoped>
  @import url('../../assets/css/login');
</style>
