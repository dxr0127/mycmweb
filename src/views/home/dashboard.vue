<template>
  <div id="main" class="main">
    <audio src="http://res.jinpeiwang.cn/luna/backgroup_music.mp3" id="myaudio" autoplay="autoplay" loop="loop"></audio>
    <div class="contbox" :style="divMargin" @click="tabflag = false">
      <div class="cont-inner" :style="innerStyle">
        <img src="http://res.jinpeiwang.cn/gs_bx/xueru/board/image/music.png" class="imgmusic" :class="isplay ? 'musicpaly' : ''" alt="" @click="changePlay">
        <img src="http://res.jinpeiwang.cn/gs_bx/xueru/board/web/tx.png" class="txicon" alt="">
        <div class="titlebox">
          <img src="http://res.jinpeiwang.cn/gs_bx/xueru/board/web/title.png" />
          <!-- <div class="title">
            <div class="titleinfo">2021保险开门红业绩展板</div>
          </div> -->
        </div>
        <div class="datebox">
          <span v-text="`${year}-${month}-${date}`"></span> <span v-text="hour"></span>:<span v-text="min"></span>:<span v-text="sec"></span>
        </div>
        <div class="topcont">
          <div class="todaydata">
            <div class="today-inner">
              <div class="cm-color-white cm-font-size-20">
                <span class="info-title">业绩实时走势</span>
              </div>
              <chart :dom="'mychart1'" :data="yjtrend" :name="'金额（万元）'" ref="chart1"></chart>
              <!-- <div class="cm-color-white cm-font-size-20">
                <span class="info-title">总单数实时走势</span>
              </div>
              <chart :dom="'mychart2'" :data="ordertrend" :name="'单数（笔）'" ref="chart2"></chart> -->
            </div>
          </div>
          <div class="chartbox">
            <div class="chartbox-inner">
              <div class="cm-color-white cm-font-size-20 cm-padded-b-20">
                <span class="data-title info-title">邮银业绩总额</span>
              </div>
              <div class="today-num-box cm-f-c-e">
                <section v-for="(item, key) in numlist" :key="key">
                  <div class="numbox cm-f-c-c cm-margin-r-10" :class="parseInt(item)>=0 ? 'bgcolor numborder' : ''">
                    <div class="numinner" :style="styles[key]">
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
                        <span v-text="item"></span>
                      </section>
                    </div>
                  </div>
                </section>
                <span class="cm-color-white cm-font-size-16">万元</span>
              </div>
            </div>
            <div class="orderDatabox cm-f-a-c cm-padded-t-10">
              <!-- <div class="cm-padded-t-20 cm-padded-r-15">
                <div class="ordernum cm-tx-c" v-text="totalData.yystart">31400</div>
                <div class="cm-font-size-16 cm-color-white cm-margin-t-10 cm-tx-c">邮银订单总数（笔）</div>
              </div> -->
              <div class="cm-padded-t-20 cm-padded-l-15">
                <div class="ordernum cm-tx-c" v-text="amountData.yzstart">31.4 / 38212</div>
                <div class="cm-font-size-16 cm-color-white cm-margin-t-10  cm-tx-c">代理业绩总额（万元）</div>
              </div>
              <div class="cm-padded-t-20 cm-padded-l-15 cm-padded-r-15">
                <div class="ordernum cm-tx-c" v-text="amountData.ycstart">31.4 / 19283</div>
                <div class="cm-font-size-16 cm-color-white cm-margin-t-10 cm-tx-c">自营业绩总额（万元）</div>
              </div>
            </div>
          </div>
          <div class="databox">
            <div class="cm-color-white cm-font-size-20 cm-padded-b-15">
              <span class="info-title">实时喜报</span>
            </div>
            <swiper :options="swiperOption1" v-if="bulletinList.length > 0" class="swiperbox cm-padded-20">
              <swiper-slide class="slide" v-for="(item, key) in bulletinList" :key="key">
                <div class="slidebox" :class="'slide' + item.num" v-if="item.num">
                  <img :src="item.address">
                  <div class="slideinner">
                    <div class="peopleinfo">
                      <div class="addr" v-text="item.province">山东省济南市</div>
                      <div class="name" v-text="item.name">张三</div>
                      <div class="amount" v-text="item.fee">50万元</div>
                    </div>
                    <div class="product" v-text="item.product_name">富德生命金典人生终身寿险</div>
                  </div>
                </div>
                <div class="slidebox" v-else>
                  <img :src="item.address">
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="botcont cm-f-b-e">
          <div class="leftcont">
            <div>
              <div class="info-title cm-color-white cm-margin-b-20">各省邮银总业绩排名（万元）<span class="cm-font-size-14">每小时更新</span></div>
              <div class="listbox bg-white cm-font-size-14">
                <div class="list list36 cm-f-b-c bg-dark-red">
                  <div class="item width18 cm-color-white border-r">序号</div>
                  <div class="item width36 cm-color-white border-r">省份</div>
                  <!-- <div class="item width24">总单数（笔）</div> -->
                  <div class="item width36 cm-color-white">总业绩</div>
                </div>
                <swiper class="swiper0" v-if="provinceYYAmount.length > 0" :options="swiperOption" ref="mySwiper0">
                  <swiper-slide v-for="(item, key) in provinceYYAmount" :key="key">
                    <div class="list cm-f-b-c" :class="k%2 === 0 ? 'bg-white' : 'bg-red'" v-for="(v, k) in item" :key="k">
                      <div class="item width18 cm-f-c-c border-r">
                        <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                      </div>
                      <div class="item width36 border-r" v-text="v.name">山东省</div>
                      <!-- <div class="item width24" v-text="v.total_num">500</div> -->
                      <div class="item width36" v-text="v.total_amount">984,382</div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
          <div class="midcont1">
            <div class="info-title cm-color-white cm-margin-b-20">各省代理总业绩排名（万元）<span class="cm-font-size-14">每小时更新</span></div>
            <div class="listbox bg-white cm-font-size-14">
              <div class="list list36 cm-f-b-c bg-dark-red">
                <div class="item width18 cm-color-white border-r">序号</div>
                <div class="item width36 cm-color-white border-r">省份</div>
                <!-- <div class="item width24 border-r">总单数（笔）</div> -->
                <div class="item width36 cm-color-white">总业绩</div>
              </div>
              <swiper class="swiper2" v-if="provinceYZAmount.length > 0" :options="swiperOption" ref="mySwiper4">
                  <swiper-slide v-for="(item, key) in provinceYZAmount" :key="key">
                    <div class="list cm-f-b-c" :class="k%2 === 0 ? 'bg-white' : 'bg-red'" v-for="(v, k) in item" :key="k">
                      <div class="item width18 cm-f-c-c border-r">
                        <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                      </div>
                      <div class="item width36 border-r" v-text="v.name">山东省</div>
                      <!-- <div class="item width24" v-text="v.total_num">500</div> -->
                      <div class="item width36" v-text="v.total_amount">984,382</div>
                    </div>
                  </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="midcont1">
            <div class="info-title cm-color-white cm-margin-b-20">各省自营总业绩排名（万元）<span class="cm-font-size-14">每小时更新</span></div>
            <div class="listbox bg-white cm-font-size-14">
              <div class="list list36 cm-f-b-c bg-dark-red">
                <div class="item width18 cm-color-white border-r">序号</div>
                <div class="item width36 cm-color-white border-r">省份</div>
                <!-- <div class="item width24 border-r">总单数（笔）</div> -->
                <div class="item width36 cm-color-white">总业绩</div>
              </div>
              <swiper class="swiper2" v-if="provinceYCAmount.length > 0" :options="swiperOption" ref="mySwiper3">
                  <swiper-slide v-for="(item, key) in provinceYCAmount" :key="key">
                    <div class="list cm-f-b-c" :class="k%2 === 0 ? 'bg-white' : 'bg-red'" v-for="(v, k) in item" :key="k">
                      <div class="item width18 cm-f-c-c border-r">
                        <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                      </div>
                      <div class="item width36 border-r" v-text="v.name">山东省</div>
                      <!-- <div class="item width24" v-text="v.total_num">500</div> -->
                      <div class="item width36" v-text="v.total_amount">984,382</div>
                    </div>
                  </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="rightcont">
            <div class="info-title cm-color-white cm-margin-b-20">保险公司总业绩排名（万元）<span class="cm-font-size-14">每小时更新</span></div>
            <div class="listbox bg-white cm-font-size-14">
              <div class="list list36 cm-f-b-c bg-dark-red">
                <div class="item width18 cm-color-white border-r">序号</div>
                <div class="item width36 cm-color-white border-r">保险公司</div>
                <div class="item width36 cm-color-white">总业绩</div>
              </div>
              <swiper class="swiper1" v-if="companyAmount.length > 0" :options="swiperOption" ref="mySwiper5">
                <swiper-slide v-for="(item, key) in companyAmount" :key="key">
                  <div class="list cm-f-b-c" :class="k%2 === 0 ? 'bg-white' : 'bg-red'" v-for="(v, k) in item" :key="k">
                    <div class="item width18 cm-f-c-c border-r">
                      <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                    </div>
                    <div class="item width36 border-r" v-text="v.abbreviation">保险公司一</div>
                    <div class="item width36" v-text="v.total_amount">984,382</div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="info-title cm-color-white margin-t-40 cm-margin-b-20 cm-f-s-c" @click.stop="openSelect">
              <div>
                <span v-text="companyTitle"></span><span>各省业绩实时排名（万元）</span>
              </div>
              <img src="http://res.jinpeiwang.cn/gs_bx/xueru/board/web/sanjiao.png" class="sanjiaoicon" alt="">
              <div class="tabbox" v-show="tabflag" @click.stop="">
                <div class="tabinner">
                  <div class="tabcont" :style="{height: tabheight + 'px'}">
                    <div class="tabs"
                      v-for="(item, key) in productCompanyList"
                      :key="key"
                      v-text="item.abbreviation"
                      @click="selectTab(item)"
                    >1</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="listbox bg-white cm-font-size-14" style="min-height: 204px;">
              <div class="list bg-dark-red list36 cm-f-b-c">
                <div class="item width12 cm-color-white border-r">序号</div>
                <div class="item width24 cm-color-white border-r">省份</div>
                <div class="item width36 cm-color-white border-r">总业绩</div>
                <div class="item width36 cm-color-white border-r">趸交业绩</div>
                <div class="item width36 cm-color-white">期交业绩</div>
              </div>
              <swiper class="swiper1" v-if="proflag" :options="swiperOption" ref="mySwiper6">
                <swiper-slide v-for="(item, key) in companyProAmount" :key="key">
                  <div class="list cm-f-b-c" :class="k%2 === 0 ? 'bg-white' : 'bg-red'" v-for="(v, k) in item" :key="v.order">
                    <div class="item width12 cm-f-c-c border-r">
                      <div class="num-circle" v-show="v.rank" :class="parseInt(v.rank) < 4 ? 'bg-orange' : ''" v-text="v.rank">1</div>
                    </div>
                    <div class="item width24 border-r" v-text="v.abbreviation">保险公司一</div>
                    <div class="item width36 border-r" v-text="v.z_amount">984,382</div>
                    <div class="item width36 border-r" v-text="v.dj_amount">984,382</div>
                    <div class="item width36" v-text="v.qj_amount">984,382</div>
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
import Chart from './Chart'
export default {
  name: 'dashboard',
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
        backgroundImage: 'url(http://res.jinpeiwang.cn/gs_bx/xueru/board/web/bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%  100%',
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
          delay: 5000
        },
        direction: 'vertical',
        pagination: false,
        loop: true
      },
      swiperOption1: {
        speed: 1000,
        autoplay: {
          disableOnInteraction: false,
          delay: 500
        },
        // autoplay: false,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: true
      },
      numlist: [],
      styles: [],
      provinceYYAmount: [],
      provinceYCAmount: [],
      provinceYZAmount: [],
      companyAmount: [],
      productCompanyList: [],
      companyProAmount: [],
      companyTitle: '',
      bulletinList: [],
      groupAmount: {
        yc_total: '',
        yc_amount: '',
        yz_total: '',
        yz_amount: '',
        yy_total: '',
        yy_amount: ''
      },
      yjtrend: {
        time: [],
        yyData: [],
        ycData: [],
        yzData: [],
        max: ''
      },
      ordertrend: {
        time: [],
        yyData: [],
        ycData: [],
        yzData: [],
        max: ''
      },
      tabflag: false,
      tabheight: 0,
      isplay: false,
      myAuto: '',
      yystart: '',
      yyend: '',
      amountData: {
        ycstart: '',
        ycend: '',
        yzstart: '',
        yzend: ''
      },
      totalData: {
        yystart: '',
        yyend: '',
        ycstart: '',
        ycend: '',
        yzstart: '',
        yzend: ''
      },
      reqind: 1,
      maskshow: false,
      maskflag: false,
      cid: '',
      proflag: false,
      yyorderdate: '',
      yzorderdate: '',
      ycorderdate: '',
      corderdate: '',
      timer: ''
    }
  },
  props: [],
  components: {
    Chart
  },
  created () {
    this.timer = setInterval(() => {
      switch (this.reqind) {
        case 1:
          this.getGroupAmount()
          break
        case 2:
          this.getGroupAmountTrend()
          break
        case 3:
          this.getProvinceYYAmount()
          break
        case 4:
          this.getProvinceYCamount()
          break
        case 5:
          this.getProvinceYZAmount()
          break
        case 6:
          this.getCompanyAmount()
          break
        case 7:
          this.getBulletinList()
          break
        case 8:
          this.getProAmount()
          break
      }
      if (this.reqind === 8) {
        this.reqind = 1
      } else {
        this.reqind += 1
      }
    }, 15000)
    this.getGroupAmount()
    this.getGroupAmountTrend()
    this.getProvinceYYAmount()
    this.getProvinceYCamount()
    this.getProvinceYZAmount()
    this.getCompanyAmount()
    this.getBulletinList()
    // 保险公司各省业绩
    this.getProAmount()
    // 保险公司
    this.$get('www', '/Gsbx-bulletin-productCompanyList').then((res) => {
      // console.log(JSON.stringify(res))
      if (res) {
        if (res.data.status === 'ok') {
          this.productCompanyList = res.data.msg
          this.tabheight = this.productCompanyList.length * 36
          // console.log(this.tabheight)
        }
      }
    })
    let title = '中国邮政2021代理保险旺季营销业绩展板'
    let desc = '捍荣光思变图强，仗笔廿一写华章！2021中国邮政加油！'
    let link = 'http://www.jinpeiwang.cn/Public/webboard/#/dashboard'
    let sharelink = location.href + '?&'
    let imgUrl = 'http://res.jinpeiwang.cn/gs_bx/xueru/board/image/webshare.jpg'
    this.$share(title, desc, link, sharelink, imgUrl)
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
    // setInterval(() => {
    //   this.number(this.toPrice(this.loopanimal()))
    //   this.loopamout('amountData', 'ycstart', 'ycend')
    //   this.loopamout('amountData', 'yzstart', 'yzend')
    //   this.loopnum('totalData', 'yystart', 'yyend')
    //   this.loopnum('totalData', 'ycstart', 'ycend')
    //   this.loopnum('totalData', 'yzstart', 'yzend')
    //   this.animation()
    // }, 12000)
    // this.$nextTick(() => {
    //   this.maskflag = true
    //   setTimeout(() => {
    //     this.maskshow = true
    //   }, 50)
    // })
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })
  },
  methods: {
    loopamout (key, startkey, endkey) {
      var randomnum = parseFloat(Math.random() * (parseFloat(this[key][endkey]) - parseFloat(this[key][startkey])) / 60).toFixed(2)
      // console.log(randomnum)
      this[key][startkey] = (parseFloat(this[key][startkey]) + parseFloat(randomnum)).toFixed(2)
      return this[key][startkey]
    },
    loopnum (key, startkey, endkey) {
      var randomnum = parseInt(Math.random() * (parseInt(this[key][endkey]) - parseInt(this[key][startkey])) / 60)
      // console.log(randomnum)
      this[key][startkey] = parseInt(this[key][startkey]) + parseInt(randomnum)
      return this[key][startkey]
    },
    loopanimal () {
      var randomnum = parseFloat(Math.random() * (this.yyend - this.yystart) / 60)
      this.yystart += randomnum
      return this.yystart
    },
    getGroupAmount () {
      // 获取业绩总额
      this.$get('www', '/Gsbx-bulletin-groupAmount').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            this.groupAmount = res.data.msg
            // 总额
            this.amountData.ycstart = this.groupAmount.yc_amount
            this.amountData.yzstart = this.groupAmount.yz_amount
            // console.log(this.amountData)
            // 订单数
            this.totalData.yystart = this.groupAmount.yy_total
            this.totalData.ycstart = this.groupAmount.yc_total
            this.totalData.yzstart = this.groupAmount.yz_total
            // console.log(this.totalData)
            this.$nextTick(() => {
              this.yystart = parseFloat(this.groupAmount.yy_amount.replace(/,/g, ''))
              this.number(this.toPrice(this.yystart))
              this.animation()
            })
          }
        }
      })
    },
    getGroupAmountTrend () {
      // 业绩趋势
      this.$get('www', '/Gsbx-bulletin-groupAmountTrend').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            this.yjtrend.time = []
            this.yjtrend.yyData = []
            this.yjtrend.ycData = []
            this.yjtrend.yzData = []
            this.ordertrend.time = []
            this.ordertrend.yyData = []
            this.ordertrend.ycData = []
            this.ordertrend.yzData = []
            res.data.msg[1].forEach(data => {
              var time = this.setHour(parseInt(data.ordertime) * 1000)
              this.yjtrend.time.push(time)
              this.yjtrend.yyData.push(parseFloat(data.yy.replace(/,/g, '')))
              this.yjtrend.ycData.push(parseFloat(data.yc.replace(/,/g, '')))
              this.yjtrend.yzData.push(parseFloat(data.yz.replace(/,/g, '')))
            })
            var arr1 = JSON.parse(JSON.stringify(this.yjtrend.yyData))
            this.yjtrend.max = Math.max(...arr1)
            // console.log(this.yjtrend.max)
            this.$refs.chart1.drawLine()
            // res.data.msg[0].forEach(data => {
            //   var time = this.setHour(parseInt(data.ordertime) * 1000)
            //   this.ordertrend.time.push(time)
            //   this.ordertrend.yyData.push(parseFloat(data.yy))
            //   this.ordertrend.ycData.push(parseFloat(data.yc))
            //   this.ordertrend.yzData.push(parseFloat(data.yz))
            // })
            // var arr2 = JSON.parse(JSON.stringify(this.ordertrend.yyData))
            // this.ordertrend.max = Math.max(...arr2)
            // this.$refs.chart2.drawLine()
          }
        }
      })
    },
    getProvinceYYAmount () {
      // 各省邮银
      this.$get('www', '/Gsbx-bulletin-provinceYYAmount').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            this.yyorderdate = res.data.msg.orderdate + '时'
            var arrData = res.data.msg.list.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 18 - arrData.length % 18
            if (num < 18) {
              for (var i = 0; i < num; i++) {
                arrData.push([])
              }
            }
            this.provinceYYAmount = this.setListData(arrData, 18)
          }
        }
      })
    },
    getProvinceYCamount () {
      // 各省邮储
      this.$get('www', '/Gsbx-bulletin-provinceYCamount').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            this.ycorderdate = res.data.msg.orderdate + '时'
            var arrData = res.data.msg.list.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 18 - arrData.length % 18
            if (num < 18) {
              for (var i = 0; i < num; i++) {
                arrData.push([])
              }
            }
            this.provinceYCAmount = this.setListData(arrData, 18)
          }
        }
      })
    },
    getProvinceYZAmount () {
      // 各省邮政
      this.$get('www', '/Gsbx-bulletin-provinceYZAmount').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            this.yzorderdate = res.data.msg.orderdate + '时'
            var arrData = res.data.msg.list.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 18 - arrData.length % 18
            if (num < 18) {
              for (var i = 0; i < num; i++) {
                arrData.push([])
              }
            }
            this.provinceYZAmount = this.setListData(arrData, 18)
          }
        }
      })
    },
    getCompanyAmount () {
      // 保险公司总业绩
      this.$get('www', '/Gsbx-bulletin-companyAmount').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            this.corderdate = res.data.msg.orderdate + '时'
            var arrData = res.data.msg.list.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 6 - arrData.length % 6
            if (num < 6) {
              for (var i = 0; i < num; i++) {
                arrData.push([])
              }
            }
            this.companyAmount = this.setListData(arrData, 6)
          }
        }
      })
    },
    getBulletinList () {
      // 获取大单喜报
      this.$get('www', '/Gsbx-bulletin-bulletinList').then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            var n = 1
            this.bulletinList = res.data.msg.ddxb.map(data => {
              var obj = data
              if (!data.address) {
                obj.num = n
                obj.address = `http://res.jinpeiwang.cn/gs_bx/xueru/board/image/xb/${n}.png`
                n += 1
                if (n > 3) {
                  n = 1
                }
              }
              if (obj.fee >= 10000) {
                obj.fee = (obj.fee * 0.0001).toFixed(0) + '万元'
              } else if (obj.fee >= 1000) {
                // obj.fee = obj.fee + '元'
                obj.fee = (obj.fee * 0.0001).toFixed(0) + '万元'
              } else {
                obj.fee = (obj.fee * 0.0001).toFixed(0) + '万元'
              }
              return obj
            })
            // console.log(this.tabheight)
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
    PrefixInteger (num, n) {
      return (Array(n).join(0) + num).slice(-n)
    },
    toNum (str) {
      return str.replace(/,|￥/g, '')
    },
    toPrice (num) {
      num = parseFloat(this.toNum(num.toString()).replace(/(\.\d{2})\d+$/, '$1')).toFixed(2).toString().split('.')
      num[0] = this.PrefixInteger(num[0], 9)
      num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,')
      return num.join('.')
    },
    openSelect () {
      this.tabflag = !this.tabflag
    },
    selectTab (data) {
      this.cid = data.id
      this.getProAmount()
      this.tabflag = false
    },
    getProAmount () {
      var url
      if (this.cid) {
        url = '/Gsbx-bulletin-companyProAmount?cid=' + this.cid
      } else {
        url = '/Gsbx-bulletin-companyProAmount'
      }
      this.proflag = false
      this.$get('www', url).then((res) => {
        // console.log(JSON.stringify(res))
        if (res) {
          if (res.data.status === 'ok') {
            var arrData = res.data.msg.list.map((data, index) => {
              var obj = data
              obj.rank = index + 1
              return obj
            })
            var num = 6 - arrData.length % 6
            if (num < 6) {
              for (var i = 0; i < num; i++) {
                arrData.push([])
              }
            }
            this.companyProAmount = this.setListData(arrData, 6)
            this.proflag = true
            this.companyTitle = res.data.msg.title
          }
        }
      })
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
@import url('../../assets/css/home.css');
</style>
