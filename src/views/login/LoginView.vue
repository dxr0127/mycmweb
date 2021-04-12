<template>
  <div class="cont-box" :style="{backgroundImage: `url(${bgimg})`}">
    <div class="cont-top">
      <img src="../../../static/images/icon/weblogo.png" alt="">
    </div>
    <router-view />
    <div class="botinfo">
      <div><span>服务热线:</span><span>400-8676-001</span></div>
      <div>© 2020 泽世教育 版权所有 京ICP备13038042号-6</div>
    </div>
  </div>
</template>
<script>
import bgimg from '../../../static/images/image/bg.png'
export default {
  name: 'LoginView',
  data () {
    return {
      bgimg: bgimg
    }
  }
}
</script>
<style scoped>
  .cont-box {
    height: 100%;
    /* background-image: url("../../../static/images/image/bg.png"); */
    background-color:rgb(241, 241, 244);
    background-size: cover;
  }
  .cont-top {
    display: flex;
    -moz-box-align: center;
    align-items: center;
    padding: 30px 36px;
  }
  .cont-top img {
    height: 24px;
  }
  .botinfo {
    position: fixed;
    width: 100%;
    bottom: 30px;
    text-align: center;
    font-size: 14px;
    color: rgb(153, 153, 153);
    line-height: 21px;
  }
</style>
