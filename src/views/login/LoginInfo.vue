<template>
  <div class="infobox" :class="infoflag ? 'show' : ''">
    <i class="iconfont" :class="infotype === 'err' ? 'icon-Closewithcircle cm-color-red' : 'icon-chenggong cm-color-green'"></i>
    <div class="info cm-padded-l-5" v-text="info"></div>
  </div>
</template>
<script>
export default {
  name: 'LoginInfo',
  data () {
    return {

    }
  },
  props: ['info', 'infoflag', 'infotype']
}
</script>
<style scoped>
  .infobox {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translate(-50%, -200%);
    background: #fff;
    padding: 12px 15px;
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0, 0, 0, .1);
    transition: all .3s ease;
    display: flex;
    align-items: center;
  }
  .infobox.show {
    transform: translate(-50%, 0);
  }
</style>
