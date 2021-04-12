<template>
  <div>
    <div class="cm-body">
      <common-menu></common-menu>
      <div class="cm-right">
        <common-header></common-header>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from './common/CommonHeader'
import CommonMenu from './common/CommonMenu'
export default {
  name: 'LayOut',
  data () {
    return {
    }
  },
  created () {
  },
  components: {
    CommonHeader,
    CommonMenu
  }
}
</script>
<style scoped>
.bg-color-dark {
  background-color: #363e4f;
}
</style>

