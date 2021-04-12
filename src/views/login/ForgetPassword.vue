<template>
  <div class="cont">
    <div class="cont-inner">
      <div class="cont-ttl">忘记密码</div>
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
      <div class="btn-box">
        <div class="btn-cancel" @click="openWin('/log/login')">取消</div>
        <div class="btn-confirm" @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
let reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
export default {
  name: 'ForgetPassword',
  data () {
    return {
      phone: '',
      pass: '',
      repass: '',
      code: '',
      passflag: false,
      repassflag: false,
      phoneinfo: false,
      phoneerr: false,
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
        self.confirm() // 调用登录按钮的登录事件
      }
    }
  },
  methods: {
    inputChange (type) {
      if (this[type]) {
        this[type + 'info'] = false
        if (type === 'phone') {
          if (!reg.test(this[type])) {
            this[type + 'err'] = true
          } else {
            this[type + 'err'] = false
          }
        } else {
          if (this.pass === this.repass) {
            this[type + 'err'] = false
          } else {
            this[type + 'err'] = true
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
      if (!reg.test(this.phone)) {
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
    confirm () {
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
      postData.smscode = this.code
      let self = this
      self.$post(self.$baseurl + '/Allapi-user-ForgetPassword?fly=1&devicetype=web&version=0.0.1', postData).then(res => {
        // console.log(res)
        if (res.data.status === '1') {
          let postData = {}
          postData.phone = self.phone
          postData.firstpassword = self.pass
          postData.secondpassword = self.repass
          self.$post(self.$baseurl + '/Allapi-user-ResetPassword?fly=1&devicetype=web&version=0.0.1', postData).then(res => {
            // console.log(res)
            if (res.data.status === '1') {
              self.success()
              self.$router.push({
                path: '/log/login'
              })
            } else {
              self.error(res.data.error)
            }
            self.btnflag = true
          }).catch(() => {
            self.error('密码修改失败')
            self.btnflag = true
          })
        } else {
          self.error(res.data.error)
          self.btnflag = true
        }
      }).catch(() => {
        self.error('密码修改失败')
        self.btnflag = true
      })
    },
    success () {
      this.$message.success('修改成功，请重新登录')
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
