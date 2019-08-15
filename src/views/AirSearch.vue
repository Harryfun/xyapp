<template>
    <div class="airSearch">
        <Loading></Loading>
        <van-popup v-model="cityShow"  position="right">
            <City @getVal="getVal"></City>
        </van-popup>
      <div class="head-bg">
        <img src="../assets/images/air.jpeg" alt="">
      </div>
      <div class="search">
        <div class="addr">
          <div class="come" @click="cityShow = true;currentAddr = 0">
            {{comeAddr}}
          </div>
          <i class="iconfont iconfeiji1"></i>
          <div class="go"  @click="cityShow = true;currentAddr = 1">
            {{goAddr}}
          </div>
        </div>
        <div class="time">
          <div class="left" @click="dateShow = true">
            <p class="title">出发日期</p>
            <p>{{comeTime}}</p>
          </div>
          <div class="right" @click="$toast('更多功能请下载闲云旅游app查看')">
            <p class="title">返程日期</p>
            <p>08月16日</p>
          </div>
        </div>
        <div class="person" @click="personShow = true">
          {{personData}}
        </div>
        <button @click="goAirList">
          搜索
        </button>
      </div>

      <div class="slogan">
        <p class="title">云行无忧</p>
        <p class="ad">如实出票 · 出行保障 · 标准退改 · 先行赔付</p>
      </div>
      <footer>
        <div @click="showList = true">
          <i class="iconfont iconyouhuiquan"></i>
          <p>我的优惠券</p>
        </div>

        <div>
          <i class="iconfont iconzaixianzhiji"></i>
          <p>值机服务</p>
        </div>

        <div>
          <i class="iconfont iconicon-"></i>
          <p>我的订单</p>
        </div>
      </footer>
       <van-popup v-model="dateShow" position="bottom">
         <van-datetime-picker
          v-model="currentDate"
          type="date"
          :title="title"
          @cancel="dateShow = false"
          @confirm="getDate"
        />
      </van-popup>
      <van-popup v-model="personShow" position="bottom">
        <van-picker :columns="columns" @change="onChange" title="人数选择" show-toolbar  @cancel="personShow=false"
        @confirm="confirmPer"/>
      </van-popup>
    <!-- 优惠券部分 -->
    <!-- 优惠券单元格 -->
      <!-- 优惠券列表 -->
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChangeCou"
          @exchange="onExchange"
        />
      </van-popup>
    </div>
</template>

<script>
import City from '@/components/City.vue'
import Loading from '@/components/Loading.vue'
import { formatDate } from '@/utils/utils'
import { getCity } from '@/api/air'
import { mapMutations } from 'vuex'
const personData = {
  '1成人': ['0儿童', '1儿童', '2儿童', '3儿童'],
  '2成人': ['0儿童', '1儿童', '2儿童', '3儿童'],
  '3成人': ['0儿童', '1儿童', '2儿童', '3儿童'],
  '4成人': ['0儿童', '1儿童', '2儿童', '3儿童']
}
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优50元',
  reason: '',
  value: 150,
  name: '酒店新人红包',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '50',
  unitDesc: '元'
}
export default {
  name: 'airSearch',
  components: {
    City,
    Loading
  },
  data () {
    return {
      cityShow: false,
      dateShow: false,
      // 人数弹出层
      personShow: false,
      // 当前日期
      currentDate: new Date(),
      // 日期弹出层的标题
      title: '出发日期',
      // 出发时间，页面显示
      comeTime: '',
      // 人数选择器的数据
      columns: [
        {
          values: Object.keys(personData),
          className: 'column1',
          defaultIndex: 0
        },
        {
          values: personData['1成人'],
          className: 'column2',
          defaultIndex: 0
        }
      ],
      // 人数数据
      personData: '1成人,0儿童',
      // 优惠券
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      comeAddr: '哈尔滨',
      goAddr: '广州',
      currentAddr: 0,
      airs: {
        departCity: '哈尔滨',
        departCode: 'HRB',
        destCity: '广州',
        destCode: 'CAN',
        departDate: '2019-05-01'
      }
    }
  },
  methods: {
    // 获取地址栏信息
    getVal (val) {
      // 关闭弹出层
      this.cityShow = false
      if (this.currentAddr === 0) {
        this.comeAddr = val
      } else {
        this.goAddr = val
      }
      let city, code
      getCity({ name: val }).then(res => {
        city = val
        code = res.data.data[0].sort
        if (this.currentAddr === 0) {
          this.airs.departCity = city
          this.airs.departCode = code
        } else {
          this.airs.destCity = city
          this.airs.destCode = code
        }
      }).catch(err => {
        console.error(err)
      })
    },
    // 获取日期
    getDate (val) {
      let standardDate = formatDate(val)
      let arr = standardDate.split('-')
      let text = `${arr[1]}月${arr[2]}日`
      console.log(val, text)
      this.comeTime = text
      this.airs.departDate = standardDate
      this.dateShow = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1, personData[values[0]])
    },

    // 获取人数信息
    confirmPer (val) {
      console.log(val)
      this.personShow = false
      this.personData = val.join(',')
    },
    // 优惠券
    onChangeCou (index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange (code) {
      this.coupons.push(coupon)
    },
    ...mapMutations(['SAVE_AIR']),
    goAirList () {
      this.SAVE_AIR(this.airs)
      this.$router.push({ name: 'airList' })
    },
    init () {
      this.getDate(this.currentDate)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.airSearch{
  background-color: #f6f7f9;
  height: 100%;
}
.search{
  position: relative;
  top: -50px;
  left: 50%;
  transform: translate(-50%);
  width: 96%;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
  .addr{
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    align-items: center;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    >i{
      font-size: 30px;
      color: @xy-color;
    }
  }
  .time{
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    .right{
      text-align: right;
      color: #ccc;
    }
    .title{
      color: #aaa;
      font-size: 12px;
    }
    p:last-child{
      font-weight: 600;
      font-size: 18px;
    }
  }
  .person{
    font-size: 18px;
    font-weight: 600;
    color: #333;
    text-align: right;
    padding: 10px 0;
  }
  button{
    display: block;
    background-color: @xy-color;
    color: #fff;
    width: 88%;
    height: 40px;
    border-radius: 20px;
    font-size: 20px;
    margin: 20px auto;
  }
}

.slogan{
  font-size: 12px;
  text-align: center;
  .title{
    width: 70px;
    margin: 0 auto;
    background-color: @xy-color;
    color: #fff;
    transform: skew(-10deg);
    border-radius: 4px 0;
    font-weight: 600;
    margin-bottom: 10px;
  }
}

footer{
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  background-color: #fff;
  padding: 4px;
  >div{
    flex: 1;
    text-align: center;
    i{
      font-size: 30px;
      line-height: 30px;
    }
    &:first-of-type{
      i{
        font-size: 20px;
      }
    }
  }
}
</style>
