
<template>
    <div class="hotel">
      <XyHeader></XyHeader>
      <div class="coupon">
        <img src="../assets/images/coupon-banner-gif.gif" alt="">
      </div>
      <div class="content">
        <div class="address item">
          <div class="left">
            <p class="sub-title">目的地</p>
            <div>目的地/城市</div>
          </div>
          <div class="right">
            <img src="../assets/images/geo.png" alt="">
            <p>我的位置</p>
          </div>
        </div>
        <div class="date item">
          <div class="inhouse sel">
            <p class="sub-title">入住</p>
            <div>9月4日</div>
          </div>
          <span>-</span>
          <div class="outhouse sel">
            <p class="sub-title">离店</p>
            <div>9月11日</div>
          </div>
        </div>
        <div class="person item sel">
          <p class="sub-title">每间</p>
          <div>2成人，0儿童</div>
        </div>
        <button>查找酒店</button>
      </div>
      <div class="footer">
        <div>
           <div> <img src="../assets/images/coupon.png" alt=""></div>
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
</template>

<script>
import { mapState } from 'vuex'
import XyHeader from '@/components/Xyheader.vue'
export default {
  name: 'hotel',
  components: {
    XyHeader
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['userToken', 'userInfo'])
  },
  methods: {

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
