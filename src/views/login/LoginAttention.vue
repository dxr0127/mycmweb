<template>
  <div>
    <div class="popup-box">
      <div class="popup">
        <div class="loginttl">下线通知</div>
        <div class="line"></div>
        <div class="logininfo">该账号已在其他同类设备登录，如非本人操作，请确认账号信息是否泄露。</div>
        <div class="btn cm-pointer" @click="confirm()">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginAttention',
  data () {
    return {
    }
  },
  props: [],
  mounted () {
  },
  methods: {
    confirm () {
      this.$store.commit('setLoginOut', false)
      this.$loginOut()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: rgba(0, 0, 0, .7);
    z-index: 999;
}
.popup{
    padding: 20px;
    border-radius: 5px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: pre-line;
    line-height: 30px;
    box-sizing: border-box;
    width: 300px;
}
.loginttl{
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}
.line{
  height: 1px;
  width: 100%;
  border-top: 1px solid #E9E9E9;
  margin-top: 10px;
}
.logininfo{
  margin-top: 10px;
  font-size: 13px;
}
.btn{
  width: 100%;
  border-radius: 4px;
  color: #fff;
  background: #2c9dec;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
</style>
