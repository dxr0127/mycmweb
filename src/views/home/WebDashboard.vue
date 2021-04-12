<template>
  <div id="main" class="main">
    <audio src="http://res.jinpeiwang.cn/luna/backgroup_music.mp3" id="myaudio" autoplay="autoplay" loop="loop"></audio>
    <div class="contbox" :style="divMargin">
      <div class="cont-inner" :style="innerStyle">
        <img src="http://res.jinpeiwang.cn/gs_bx/xueru/board/image/music.png" class="imgmusic" :class="isplay ? 'musicpaly' : ''" alt="" @click="changePlay">
        <div class="titlebox">
          <!-- <img src="../../../static/images/image/title1.png" /> -->
          <!-- <div class="title">蓄客助手-数据统计</div> -->
          <div class="title">蓄客数据统计展板</div>
        </div>
        <div class="datebox">
          <span v-text="year"></span>-<span v-text="month"></span>-<span v-text="date"></span> <span v-text="hour"></span>:<span v-text="min"></span>:<span v-text="sec"></span>
        </div>
        <div class="topcont">
          <div class="todaydata">
            <div class="today-inner">
              <div class="cm-color-white cm-font-size-20">
                <span class="info-title">今日数据</span>
              </div>
              <div class="cm-f-b-c cm-color-white margin-t-40">
                <span>今日意向定金</span>
                <span>万元</span>
              </div>
              <div class="today-num-box cm-f-e-c">
                <section v-for="(item, key) in numlist" :key="key">
                  <div class="numbox cm-f-c-c cm-margin-r-5" :class="parseInt(item)>=0 ? 'bgcolor numborder' : ''">
                    <div class="numinner cm-color-blue" :style="styles[key]">
                      <section v-if="parseInt(item)>=0">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                      </section>
                      <section v-else>
                        <span v-text="item" class="color-blue"></span>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
              <div class="progress-box">
                <div class="cm-color-white progress-box-info">今日网点填报百分比</div>
                <div class="linebox cm-margin-t-10">
                  <div class="line" :style="'width: ' + ratenum">
                    <div class="point">
                      <div class="point-info cm-margin-b-5 cm-color-white" v-text="ratenum"></div>
                      <div class="circle cm-f-c-c">
                        <div class="circle-inner"></div>
                      </div>
                      <div class="sanjiao"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chartbox cm-f-c-c">
            <div class="chartbox-inner">
              <div class="cm-color-white cm-font-size-20 cm-margin-b-10">
                <span class="data-title info-title">蓄客实时走势</span>
                <!-- <span class="cm-font-size-16">Order Curve</span> -->
              </div>
              <web-chart dom="chart" :data="trend" ref="chart"></web-chart>
            </div>
          </div>
          <div class="databox">
            <div class="cm-color-white cm-font-size-20 cm-padded-b-15">
              <span class="info-title">统计数据</span>
              <!-- <span class="cm-font-size-16">Statistics Data</span> -->
            </div>
            <div class="numlabelbox">
              <div class="numlabel cm-pos-r">
                <img src="../../../static/images/image/labelbg1.png" alt="">
                <div class="numlabel-inner cm-f-b-c">
                  <img src="../../../static/images/image/22.png" class="itemicon" alt="">
                  <div class="cm-f-1 cm-padded-l-20">
                    <div class="cm-font-size-18 cm-tx-l cm-color-white">累计意向定金</div>
                    <div class="cm-margin-t-10 cm-tx-c color-blue">
                      <span v-text="rightDatas.total_fee" class="totalfee cm-ftw-b"></span>
                      <span class="cm-font-size-14">万元</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cm-f-b-c cm-margin-t-20">
                <div class="numitem cm-tx-c">
                  <div class="cm-color-white cm-font-size-16">网点总数</div>
                  <div class="cm-margin-t-10">
                    <span class="labeldatanum cm-ftw-b color-blue" v-text="rightDatas.nk_num"></span>
                    <span class="cm-color-white">个</span>
                  </div>
                </div>
                <div class="numitem cm-tx-c cm-font-size-16">
                  <div class="cm-color-white">点均意向定金</div>
                  <div class="cm-margin-t-10">
                    <span class="labeldatanum cm-ftw-b color-blue" v-text="rightDatas.avg_fee"></span>
                    <span class="cm-color-white">万元</span>
                  </div>
                </div>
                <div class="numitem cm-tx-c cm-font-size-16">
                  <div class="cm-color-white">累计蓄客人数</div>
                  <div class="cm-margin-t-10">
                    <span class="labeldatanum cm-ftw-b color-blue" v-text="rightDatas.total_xk"></span>
                    <span class="cm-color-white">人</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="cm-f-b cm-f-w cm-margin-t-20">
              <div class="dataitem cm-margin-b-15">
                <img src="../../../static/images/image/bg1.png" class="itembg" alt="">
                <div class="data-item-inner cm-f-b-c">
                  <img src="../../../static/images/image/1.png" class="itemicon" alt="">
                  <div class="cm-tx-r cm-color-red">
                    <div class="cm-font-size-20 cm-margin-b-10">累计蓄客人数</div>
                    <div class="cm-color-lightred">
                      <span class="datanum" v-text="rightDatas.total_xk">606</span>
                      <span>人</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dataitem cm-margin-b-15">
                <img src="../../../static/images/image/bg2.png" class="itembg" alt="">
                <div class="data-item-inner cm-f-b-c">
                  <img src="../../../static/images/image/2.png" class="itemicon" alt="">
                  <div class="cm-tx-r cm-color-red">
                    <div class="cm-font-size-20 cm-margin-b-10">累计意向定金</div>
                    <div class="cm-color-lightred cm-f-e-c cm-f-w dingjin cm-line-h">
                      <span class="datanum cm-font-size-20" v-text="rightDatas.total_fee + ',900'">88.21</span>
                      <span class="">万元</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dataitem">
                <img src="../../../static/images/image/bg3.png" class="itembg" alt="">
                <div class="data-item-inner cm-f-b-c">
                  <img src="../../../static/images/image/3.png" class="itemicon" alt="">
                  <div class="cm-tx-r cm-color-red">
                    <div class="cm-font-size-20 cm-margin-b-10">网点总数</div>
                    <div class="cm-color-lightred">
                      <span class="datanum" v-text="rightDatas.nk_num">956</span>
                      <span>个</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dataitem">
                <img src="../../../static/images/image/bg4.png" class="itembg" alt="">
                <div class="data-item-inner cm-f-b-c">
                  <img src="../../../static/images/image/4.png" class="itemicon" alt="">
                  <div class="cm-tx-r cm-color-red">
                    <div class="cm-font-size-20 cm-margin-b-10">点均意向定金</div>
                    <div class="cm-color-lightred">
                      <span class="datanum" v-text="rightDatas.avg_fee">10</span>
                      <span>万元</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="botcont cm-f-b-e">
          <div class="leftcont">
            <div>
              <div class="info-title cm-color-white cm-margin-b-20">省排行</div>
              <div class="listbox bg-blue cm-font-size-14">
                <div class="list list36 cm-f-b-c bg-dark-red">
                  <div class="item width12 cm-color-blue border-r">序号</div>
                  <div class="item width18 cm-color-blue border-r">省份</div>
                  <div class="item width24 cm-color-blue border-r">蓄客人数</div>
                  <div class="item width36 cm-color-blue">意向定金（万元）</div>
                </div>
                <swiper class="swiper1" v-if="provRank.length > 0" :options="swiperOption" ref="mySwiper">
                  <swiper-slide v-for="(item, key) in provRank" :key="key">
                    <div class="list cm-f-b-c" :class="k%2 === 0 ? '' : 'bg-red'" v-for="(v, k) in item" :key="k">
                      <div class="item width12 cm-f-c-c border-r">
                        <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                      </div>
                      <div class="item width18 border-r" v-text="v.name">山东省</div>
                      <div class="item width24 border-r" v-text="v.xk_num">500</div>
                      <div class="item width36" v-text="v.xk_fee_format">984,382</div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
          <div class="midcont1">
            <div class="info-title cm-color-white cm-margin-b-20">二十强地市</div>
            <div class="listbox bg-blue cm-font-size-14">
              <div class="list list36 cm-f-b-c bg-dark-red">
                <div class="item width12 cm-color-blue border-r">序号</div>
                <div class="item width18 cm-color-blue border-r">城市</div>
                <div class="item width24 cm-color-blue border-r">所属省份</div>
                <div class="item width36 cm-color-blue">意向定金（万元）</div>
              </div>
              <swiper class="swiper2" v-if="cityRank.length > 0" :options="swiperOption" ref="mySwiper">
                  <swiper-slide v-for="(item, key) in cityRank" :key="key">
                    <div class="list cm-f-b-c" :class="k%2 === 0 ? '' : 'bg-red'" v-for="(v, k) in item" :key="k">
                      <div class="item width12 cm-f-c-c border-r">
                        <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                      </div>
                      <div class="item width18 border-r" v-text="v.city">城市一</div>
                      <div class="item width24 border-r" v-text="v.prov">山东</div>
                      <div class="item width36" v-text="v.xk_fee_format">984,382</div>
                    </div>
                  </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="midcont2">
            <div class="info-title cm-color-white cm-margin-b-20">百强网点</div>
            <div class="listbox bg-blue cm-font-size-14">
              <div class="list list36 cm-f-b-c bg-dark-red">
                <div class="item width12 cm-color-blue border-r">序号</div>
                <div class="item width52 cm-color-blue border-r">网点</div>
                <div class="item width36 cm-color-blue">意向定金（万元）</div>
              </div>
              <swiper class="swiper3" v-if="networks.length > 0" :options="swiperOption" ref="mySwiper">
                  <swiper-slide v-for="(item, key) in networks" :key="key">
                    <div class="list cm-f-b-c" :class="k%2 === 0 ? '' : 'bg-red'" v-for="(v, k) in item" :key="k">
                      <div class="item width12 cm-f-c-c border-r">
                        <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                      </div>
                      <div class="item width52 border-r cm-padded-l-10 cm-padded-r-10 cm-ellipsis-1" v-text="v.name">网点一</div>
                      <div class="item width36" v-text="v.xk_fee_format">984,382</div>
                    </div>
                  </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="rightcont">
            <div class="info-title cm-color-white cm-margin-b-20">保险产品排行</div>
            <div class="listbox bg-blue cm-font-size-14">
                <div class="list list36 cm-f-b-c bg-dark-red">
                  <div class="item width12 cm-color-blue border-r">序号</div>
                  <!-- <div class="item width18 border-r">保险产品</div> -->
                  <div class="item width24 cm-color-blue border-r">保险公司</div>
                  <div class="item width36 cm-color-blue">意向定金（万元）</div>
                </div>
                <swiper class="swiper1" v-if="products.length > 0" :options="swiperOption" ref="mySwiper">
                  <swiper-slide v-for="(item, key) in products" :key="key">
                    <div class="list cm-f-b-c" :class="k%2 === 0 ? '' : 'bg-red'" v-for="(v, k) in item" :key="k">
                      <div class="item width12 cm-f-c-c border-r">
                        <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                      </div>
                      <!-- <div class="item width18 border-r">产品一</div> -->
                      <div class="item width24 border-r" v-text="v.name">保险公司一</div>
                      <div class="item width36" v-text="v.xk_fee_format">984,382</div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WebChart from './WebChart'
export default {
  name: 'WebDashboard',
  data () {
    return {
      contStyle: {
        width: '',
        height: ''
      },
      divMargin: {
        margin: ''
      },
      innerStyle: {
        backgroundImage: 'url(http://res.jinpeiwang.cn/gs_bx/xueru/board/web/xkbg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%  105%',
        backgroundPosition: 'center',
        transform: 'scale(1)',
        width: '1920px',
        height: '1080px'
      },
      rate: '',
      year: '',
      month: '',
      date: '',
      hour: '',
      min: '',
      sec: '',
      swiperOption: {
        speed: 1000,
        autoplay: {
          disableOnInteraction: false,
          delay: 6000
        },
        direction: 'vertical',
        pagination: false,
        loop: true
      },
      isplay: false,
      myAuto: '',
      numlist: [],
      styles: [],
      provRank: [],
      cityRank: [],
      networks: [],
      products: [],
      todayFeeStart: '',
      todayFeeEnd: '',
      ratenum: 0,
      rightDatas: '',
      datas: '',
      trend: {
        time: [],
        xkData: [],
        feeData: [],
        xkmax: '',
        feemax: ''
      },
      reqind: 1,
      timer: ''
    }
  },
  props: [],
  components: {
    WebChart
  },
  created () {
    this.getProvRank()
    this.getCityRank()
    this.getNetworks()
    this.getProducts()
    this.getLeftDatas()
    this.getRightDatas()
    this.getDatas()
    this.timer = setInterval(() => {
      switch (this.reqind) {
        case 1:
          this.getDatas()
          break
        case 2:
          this.getLeftDatas()
          break
        case 3:
          this.getRightDatas()
          break
        case 4:
          this.getProvRank()
          break
        case 5:
          this.getCityRank()
          break
        case 6:
          this.getNetworks()
          break
        case 7:
          this.getProducts()
          break
      }
      if (this.reqind === 7) {
        this.reqind = 1
      } else {
        this.reqind += 1
      }
    }, 15000)
    // setInterval(() => {
    //   this.number(this.toPrice(this.loopanimal()))
    //   this.animation()
    // }, 12000)
  },
  mounted () {
    this.myAuto = document.getElementById('myaudio')
    this.myAuto.addEventListener('playing', () => {
      this.isplay = true
    })
    this.myAuto.addEventListener('pause', () => {
      this.isplay = false
    })
    this.setWin()
    window.onresize = () => {
      this.setWin()
    }
    setInterval(() => {
      var nowDate = new Date()
      this.year = nowDate.getFullYear()
      this.month = this.setDate(nowDate.getMonth() + 1)
      this.date = this.setDate(nowDate.getDate())
      this.hour = this.setDate(nowDate.getHours())
      this.min = this.setDate(nowDate.getMinutes())
      this.sec = this.setDate(nowDate.getSeconds())
    }, 1000)
    // this.number('35100852.1')
    // this.animation()
    // setInterval(() => {
    //   this.number('35100452.1')
    //   this.animation()
    // }, 6000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })
  },
  methods: {
    getDatas () {
      // 各省邮银
      this.$get('app2', '/Csas-custorage-web_getStaData2').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            this.trend.time = []
            this.trend.xkData = []
            this.trend.feeData = []
            res.data.msg[0].forEach(data => {
              var time = this.setHour(parseInt(data.ordertime) * 1000)
              this.trend.time.push(time)
              this.trend.xkData.push(parseFloat(data.xk))
              this.trend.feeData.push(parseFloat(data.fee.replace(/,/g, '')))
            })
            var arr1 = JSON.parse(JSON.stringify(this.trend.xkData))
            this.trend.xkmax = Math.max(...arr1)
            var arr2 = JSON.parse(JSON.stringify(this.trend.feeData))
            this.trend.feemax = Math.max(...arr2)
            // console.log(this.trend)
            this.$refs.chart.drawLine()
          }
        }
      })
    },
    getLeftDatas () {
      // 各省邮银
      this.$get('app2', '/Csas-custorage-web_getStaData1').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === '1') {
            this.ratenum = res.data.msg.today_tb
            this.$nextTick(() => {
              // this.todayFeeEnd = parseFloat(res.data.msg.today_fee.replace(',', ''))
              // if (!this.todayFeeStart) {
              //   this.todayFeeStart = parseFloat(this.todayFeeEnd * 0.8)
              // }
              this.todayFeeStart = parseFloat(res.data.msg.today_fee.replace(/,/g, ''))
              this.number(this.toPrice(this.todayFeeStart))
              this.animation()
            })
          }
        }
      })
    },
    getRightDatas () {
      // 各省邮银
      this.$get('app2', '/Csas-custorage-web_getStaData3').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === '1') {
            this.rightDatas = res.data.msg
          }
        }
      })
    },
    getProvRank () {
      // 各省邮银
      this.$get('app2', '/Csas-custorage-web_getRankList?tab=1').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === '1') {
            var arrData = res.data.msg.lists.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 16 - arrData.length % 16
            for (var i = 0; i < num; i++) {
              arrData.push([])
            }
            this.provRank = this.setListData(arrData, 16)
            // console.log(JSON.stringify(this.provRank))
          }
        }
      })
    },
    getCityRank () {
      // 各省邮银
      this.$get('app2', '/Csas-custorage-web_getRankList?tab=2').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === '1') {
            var arrData = res.data.msg.lists.map((data, index) => {
              var obj = data
              obj.city = obj.name.split('(')[0]
              obj.prov = obj.name.split('(')[1].split(')')[0]
              obj.rank = index + 1
              return obj
            })
            var num = 14 - arrData.length % 14
            for (var i = 0; i < num; i++) {
              arrData.push([])
            }
            this.cityRank = this.setListData(arrData, 14)
          }
        }
      })
    },
    getNetworks () {
      // 各省邮银
      this.$get('app2', '/Csas-custorage-web_getRankList?tab=3').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === '1') {
            var arrData = res.data.msg.lists.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 14 - arrData.length % 14
            for (var i = 0; i < num; i++) {
              arrData.push([])
            }
            this.networks = this.setListData(arrData, 14)
          }
        }
      })
    },
    getProducts () {
      // 各省邮银
      this.$get('app2', '/Csas-custorage-web_getRankList?tab=4').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === '1') {
            var arrData = res.data.msg.lists.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 16 - arrData.length % 16
            for (var i = 0; i < num; i++) {
              arrData.push([])
            }
            this.products = this.setListData(arrData, 16)
          }
        }
      })
    },
    changePlay () {
      if (this.isplay) {
        this.myAuto.pause()
        this.isplay = false
      } else {
        this.myAuto.play()
        this.isplay = true
      }
    },
    setHour (stringTime) {
      var date = new Date(stringTime)
      var hour = date.getHours()
      if (hour < 10) {
        return '0' + hour + ':00'
      } else {
        return hour + ':00'
      }
    },
    PrefixInteger (num, n) {
      return (Array(n).join(0) + num).slice(-n)
    },
    loopanimal () {
      var randomnum = parseFloat(Math.random() * (this.todayFeeEnd - this.todayFeeStart) / 60)
      this.todayFeeStart += randomnum
      return this.todayFeeStart
    },
    toNum (str) {
      return str.replace(/,|￥/g, '')
    },
    toPrice (num) {
      num = parseFloat(this.toNum(num.toString()).replace(/(\.\d{2})\d+$/, '$1')).toFixed(2).toString().split('.')
      num[0] = this.PrefixInteger(num[0], 6)
      num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,')
      return num.join('.')
    },
    number (digit) {
      this.numlist = []
      for (var i = 0; i < digit.length; i++) {
        this.numlist.push(digit.charAt(i))
      }
    },
    animation () {
      this.styles = []
      this.numlist.forEach((data, index) => {
        let obj = {}
        if (parseInt(data) > 0) {
          obj.transform = 'translate(0, -' + parseInt(data) * 72 + 'px)'
        } else {
          obj.transform = 'translate(0, 0)'
        }
        this.styles.push(obj)
      })
    },
    setDate (date) {
      if (date < 10) {
        return '0' + date
      } else {
        return date
      }
    },
    setWin () {
      let rate1 = 1080 / 1920
      let winWidth = document.body.clientWidth
      let winHeight = document.body.clientHeight
      let rate2 = winHeight / winWidth
      if (rate2 > rate1) {
        this.contStyle.width = winWidth + 'px'
        this.contStyle.height = winWidth / 1920 * 1080 + 'px'
        this.divMargin.margin = (winHeight - winWidth / 1920 * 1080) / 2 + 'px auto'
        this.rate = winWidth / 1920
        this.innerStyle.transform = `scale(${this.rate}, ${this.rate})!important`
      } else if (rate2 < rate1) {
        this.contStyle.height = winHeight + 'px'
        this.contStyle.width = winHeight / 1080 * 1920 + 'px'
        let ml = (winWidth - winHeight / 1080 * 1920) / 2
        this.divMargin.margin = 'auto ' + ml + 'px'
        this.rate = winHeight / 1080
        this.innerStyle.transform = `scale(${this.rate}, ${this.rate})!important`
      } else {
        this.contStyle.width = 1920 + 'px'
        this.contStyle.height = 1080 + 'px'
        this.rate = 1
        this.divMargin.margin = 'auto'
      }
    },
    setListData (arr, size) {
      // 首页分类 拆分
      let list = []
      for (var i = 0; i < arr.length; i = i + size) {
        list.push(arr.slice(i, i + size))
      }
      return list
    }
  }
}
</script>
<style scoped>
@import url('../../assets/css/board.css');
</style>
