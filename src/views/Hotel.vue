
<template>
    <div class="hotel">
        <Loading></Loading>
        <XyHeader></XyHeader>
        <van-popup v-model="cityShow"  position="right">
            <City @getVal="getVal"></City>
        </van-popup>
      <div class="container">
      <div class="coupon">
        <img src="../assets/images/coupon-banner-gif.gif" alt="">
      </div>
      <div class="content">
        <div class="address item">
          <div class="left">
            <p class="sub-title">目的地</p>
            <div @click="cityShow = true" :class="{active:addressAc}">{{address}}</div>
          </div>
          <div class="right">
            <img src="../assets/images/geo.png" alt="">
            <p>我的位置</p>
          </div>
        </div>
        <div class="date item">
          <div class="inhouse sel">
            <p class="sub-title">入住</p>
            <div @click="showDate('enterTime')">{{enterDate}}</div>
          </div>
          <span>-</span>
          <div class="outhouse sel">
            <p class="sub-title">离店</p>
            <div @click="showDate('leftTime')">{{leaveDate}}</div>
          </div>
        </div>
        <div class="person item sel">
          <p class="sub-title">每间</p>
          <div @click="personShow = true">{{personData}}</div>
        </div>
        <button @click="toHotelList">查找酒店</button>
      </div>
      <div class="footer">
        <div>
           <div
        @click="showList = true"> <img src="../assets/images/coupon.png" alt=""></div>
            优惠券
        </div>
        <div>
           <div> <img src="../assets/images/star.png" alt=""></div>
            酒店收藏
        </div>
        <div>
          <div>  <img src="../assets/images/order.png" alt=""></div>
            我的订单
        </div>
      </div>
      </div>
      <!-- 时间选择器 -->

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
import { mapState } from 'vuex'
import { formatDate } from '@/utils/utils'
import { getCity } from '@/api/hotel'
import XyHeader from '@/components/Xyheader.vue'
import City from '@/components/City.vue'
import Loading from '@/components/Loading.vue'
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
  name: 'hotel',
  components: {
    XyHeader,
    City,
    Loading
  },
  data () {
    return {
      // 城市列表弹出层
      cityShow: false,
      // 目的地信息
      address: '目的地/城市',
      // 获取值之后更改类名
      addressAc: false,
      // 日期选择器弹出层
      dateShow: false,
      // 人数弹出层
      personShow: false,
      // 当前日期
      currentDate: new Date(),
      // 日期弹出层的标题
      title: '入住日期',
      // 入住/离开日期 传递的数据
      enterTime: '',
      leftTime: '',
      // 入住/离开日期 显示在页面上的数据
      enterDate: '',
      leaveDate: '',
      // 时间选择器 判断是入住还是离开
      currentStatus: null,
      // 人数选择器的数据
      columns: [
        {
          values: Object.keys(personData),
          className: 'column1',
          defaultIndex: 1
        },
        {
          values: personData['1成人'],
          className: 'column2',
          defaultIndex: 0
        }
      ],
      // 人数数据
      personData: '',
      // 优惠券
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false
    }
  },
  computed: {
    ...mapState(['userToken', 'userInfo', 'loadShow'])
  },
  methods: {
    // 获取地址栏信息
    getVal (val) {
      // 关闭弹出层
      this.cityShow = false
      this.address = val
      // 替换初始的placeholder样式
      this.addressAc = true
      // 根据名字获取id
      getCity({
        name: val
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取日期
    getDate (val) {
      console.log(val)
      let arr = formatDate(val).split('-')
      let text = `${arr[1]}月${arr[2]}日`
      // 根据入住和离开判断标题
      if (this.currentStatus === 'enterTime') {
        this.enterTime = formatDate(val)
        this.enterDate = text
      } else if (this.currentStatus === 'leftTime') {
        this.leftTime = formatDate(val)
        this.leaveDate = text
      }
      this.dateShow = false
    },
    // 显示时间选择器弹出层
    showDate (val) {
      this.dateShow = true
      this.currentStatus = val
      if (this.currentStatus === 'enterTime') {
        this.title = '入住日期'
      } else {
        this.title = '离店日期'
      }
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
    toHotelList () {
      this.$router.push({ name: 'hotelList',
        params: {
          city: 74,
          enterTime: this.enterTime,
          leftTime: this.leftTime
        } })
    },
    init () {
    // 获取初始结束时间
      this.enterTime = formatDate(new Date())
      this.leftTime = formatDate(new Date())
      let arr = formatDate(new Date()).split('-')
      let text = `${arr[1]}月${arr[2]}日`
      this.enterDate = text
      this.leaveDate = text

      this.personData = '2成人,0儿童'
    }
  },

  created () {
    this.init()
  },
  mounted () {
    console.log(this.userInfo, this.userToken)
  }

}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
  .hotel{
    padding-top: 50px;
    .content{
      padding: 0 14px;
      .item{
        font-size: 20px;
         .sub-title{
          color: #474747;
          font-weight: 300;
          text-align: left;
          line-height: 1;
          font-size: 12px;
          padding-bottom: 8px;
        }
      }
      .sel{
          padding-bottom: 10px;
          >div{
            color: #474747;
            font-size: 18px;
            font-weight: 600;
            text-align: left;
            display: flex;
            justify-content: space-between;
            &::after{
              content: '\e62d';
              display: inline-block;
              font-family: "iconfont" !important;
              font-style: normal;
              color: #999;
            }
          }
          border-bottom: 1px solid #ccc;
        }
      .address{
        display: flex;
        .left{
          border-bottom: 1px solid #ccc;
          width: 270px;
          padding: 6px 0;
          >div{
            color: #c1c1cc;
            font-weight: 600;
            &.active{
              color: #474747;
            }
          }
        }
        .right{
          flex: 1;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img{
            width: 30%;
          }
        }
      }
      .date{
        display: flex;
        padding: 14px 0;
        align-items: center;
        .inhouse,.outhouse{
          flex: 45%;

        }

        >span{
          flex: 1;
          padding: 0 20px;
        }
      }
      >button{
        width: 100%;
        height: 40px;
        color: #fff;
        background-color: @xy-color;
        border: none;
        outline: none;
        border-radius: 6px;
        font-size: 16px;
        margin-top: 20px;
      }
    }
    .footer{
      display: flex;
      margin-top: 20px;
      padding: 20px 0;
      border: 1px solid #eee;
      >div{
        flex: 1;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #474747;
        >div{
          width: 21px;
          height: 21px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
