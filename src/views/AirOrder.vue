<template>
    <div class="airOrder">
        <Airheader :come="airOrder.org_city_name" :go="airOrder.dst_city_name" :address="'airList'"></Airheader>
        <div class="airInfo">
          <div class="item">
            <div class="date line">
              <p>08月14日 周三 {{airOrder.dep_time}}</p>
              <p>{{airOrder.org_airport_name}}{{airOrder.org_airport_quay}} - {{airOrder.dst_airport_name}}{{airOrder.dst_airport_quay}}    {{airOrder.seat_infos[0].group_name}}</p>
            </div>
            <div class="price">
              <p><span class="money"><span>&yen;</span>{{airOrder.seat_infos[0].par_price}}</span>/成人</p>
              <p>退改签规则和行李额说明</p>
            </div>
          </div>
          <div class="item">
            <h4 @click="addUser" class="addUser"><span>添加乘机人</span><i class="iconfont iconjia1"></i></h4>
            <van-cell-group :title="'旅客'+ ++index" v-for="(item,index) in users" :key="index">
              <van-field
                v-model="item.username"
                required
                clearable
                label="乘机人"
                placeholder="请输入乘机人姓名"
              />

              <van-field
                v-model="item.id"

                label="身份证"
                placeholder="请输入身份证号码"
                required
              />
            </van-cell-group>
          </div>
          <div class="item">
            <h4 class="addUser">添加联系人信息</h4>
               <van-cell-group>
                <van-field
                  v-model="contactPerson.contactName"
                  required
                  clearable
                  label="联系人"
                  placeholder="请输入联系人姓名"
                />

                <van-field
                  v-model="contactPerson.contactPhone"

                  label="联系方式"
                  placeholder="请输入手机号码"
                  required
                />
                  <van-field
                    v-model="contactPerson.captcha"
                    center
                    clearable
                    label="短信验证码"
                    required
                    placeholder="请输入短信验证码"
                  >
                    <van-button slot="button" size="small" class="yzm" @click="getCode">发送验证码</van-button>
                  </van-field>
              </van-cell-group>
              <div class="tips">
                <i class="iconfont iconfangxinfei"></i>
                80%的用户为自己的出行增添保障
              </div>
              <div class="insurances">
                <van-checkbox-group v-model="insurances">
                  <van-cell-group>
                    <van-cell
                      clickable
                      v-for="(item,index) in ins"
                      :key="item.id"
                      @click="toggle(index)"
                    >
                    {{item.info}}
                      <van-checkbox
                        :name="item.id"
                        ref="checkboxes"
                        slot="right-icon"
                      />
                    </van-cell>
                  </van-cell-group>
                </van-checkbox-group>
              </div>
          </div>
          <footer>
            <div class="left">
              <p>订单总额</p>
              <p><span class="rmb">￥</span>{{totalPrice}}</p>
            </div>
            <button @click="pay">
              提交订单
            </button>
          </footer>
        </div>
        <van-dialog
          v-model="qrshow"
          title="长按保存二维码识别支付"
          show-cancel-button
          cancel-button-text="残忍离开"
          confirm-button-text="我已支付"
          @confirm="toIndex"
          @cancel="shutDialog"
        >
          <Qrcode :code_url="code_url"></Qrcode>
        </van-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Airheader from '@/components/AirHeader.vue'
import Qrcode from '@/components/qrcode.vue'
import { getCode } from '@/api/login'
import { postAirOrders, payOrder, getAirOrders } from '@/api/air'
import { Dialog } from 'vant'
export default {
  name: 'airOrder',
  computed: {
    ...mapState(['airOrder', 'userToken']),
    totalPrice () {
      return this.users.length * this.airOrder.seat_infos[0].par_price + this.insurances.length * 30 * this.users.length
    }
  },
  components: {
    Airheader,
    Qrcode,
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      qrshow: false,
      // 二维码图
      code_url: '',
      users: [{
        username: '11',
        id: '11',
        idType: 1
      }],
      // 联系人信息
      contactPerson: {
        captcha: '000000',
        contactName: '松野',
        contactPhone: '13477651123'
      },
      ins: [
        {
          id: 1,
          info: '航空意外险: ￥30/份 最高赔付260万'
        },
        {
          id: 2,
          info: '航空延误险: ￥30/份 最高赔付1000元'
        }
      ],
      insurances: [],
      // 查询订单支付条件
      checkInfo: {},
      // 付款定时器
      timer: null,
      // 支付状态
      payStatus: false
    }
  },
  methods: {
    // 添加乘机人
    addUser () {
      this.users.push({
        username: '1',
        id: '1',
        idType: 1
      })
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    getCode () {
      getCode({ tel: this.contactPerson.contactPhone }).then(res => {
        this.$toast(`您的验证码是${res.data.code}`)
      })
    },
    // 查询用户是否成功付款
    isPay () {
      return payOrder(this.checkInfo, this.userToken).then(res => {
        const { statusTxt } = res.data

        if (statusTxt === '支付完成') {
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.error(err)
      })
    },
    pay () {
      let data = { ...this.contactPerson }
      data.air = this.airOrder.id
      data.insurances = [...this.insurances]
      data.invoice = false
      data.seat_xid = this.airOrder.seat_infos[0].seat_xid
      data.users = [ ...this.users ]
      postAirOrders(data, this.userToken).then(res => {
        this.checkInfo.nonce_str = res.data.data.price
        this.checkInfo.id = res.data.data.id
        this.checkInfo.out_trade_no = res.data.data.payInfo.order_no
        // 显示二维码
        this.qrshow = true
        this.code_url = res.data.data.payInfo.code_url
        // 调用付款状态的查询
        this.timer = setInterval(async () => {
          this.payStatus = await this.isPay()
          if (this.payStatus) {
            clearInterval(this.timer)
            this.timer = null
            this.$toast('您已成功支付，订单会稍后已短信的形式发送到您的手机，2s后跳转至首页')
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 2500)
          }
        }, 3000)
      }).catch(err => {
        this.$notify({
          message: err.response.data.message,
          duration: 2000,
          background: '#dc2727'
        })
      })
    },
    // 确认支付操作
    toIndex () {
      if (this.payStatus) {
        this.qrshow = false
        this.$toast('您已成功支付，订单会稍后已短信的形式发送到您的手机，2s后跳转至首页')
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 1500)
      } else {
        this.qrshow = false
        this.$toast('支付遇到问题？请联系客服')
        clearInterval(this.timer)
        this.timer = null
      }
    },
    shutDialog () {
      clearInterval(this.timer)
      this.timer = null
      this.qrshow = false
      this.$toast('该航线十分火爆，欲购速从哦~')
      clearInterval(this.timer)
      this.timer = null
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  mounted () {
    getAirOrders(this.userToken).then(res => {
      console.log(res, 111)
    })
  }
}
</script>

<style lang="less" scoped>
  @xy-color: #409eff;
  .airOrder{
    font-size: 18px;
    height: 100%;
    background-color: #f6f7f9;
  }
  /deep/header{
    box-shadow: 0 10px 50px 50px @xy-color;
  }
  .airInfo{
    position: relative;
    width: 100%;
    height: 100%;
    top: 50px;
    left: 0;
    padding: 0 10px 100px;
    overflow: scroll;
  }
  .item{
    background-color: #fff;
    border-radius: 4px;
    padding: 6px 10px;
    .line{
      border-bottom: 1px solid #eee;
    }
    margin-bottom: 14px;
  }
  .date{
    >p:first-child{
      font-weight: 600;
    }
    >p:nth-child(2){
      font-size: 12px;
      padding: 5px 0 10px;
    }
  }

  .price{
    font-size: 12px;
    >p:first-child{
      padding: 10px 0;
      font-size: 12px;
      .money{
        color: #f00;
        font-weight: 600;
        font-size: 24px;
        span{
          font-size: 12px;
          padding-right: 2px;
        }
      }
    }
    >p:last-child{
      color: @xy-color;
    }
  }

  .addUser{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 5px 10px 0;
    i{
      color: @xy-color;
    }
  }
  // 表单副标题 前移动
  /deep/.van-cell-group__title{
    margin-left: -16px;
  }

  .tips{
    font-size: 12px;
    font-weight: 600;
    color: #888;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i{
      font-size: 30px;
      color: @xy-color;
      vertical-align: sub;
      font-weight: 300;
    }
  }
  footer{
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
    box-shadow: 0px -3px 10px rgba(0,0,0,.1);
    background-color: #fff;
    .left{
      font-size: 12px;
      p:last-child{
        color: #f00;
        font-weight: 600;
        font-size: 20px;
        span{
          font-size: 14px;
        }
      }
    }
    button{
      width: 160px;
      height: 40px;
      background-color: @xy-color;
      color: #fff;
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
    }
  }
  .yzm{
    background-color: @xy-color;
    color: #fff;
    border-radius: 8px;
    height: 37px;
    line-height: 37px;
    padding: 0 10px;
  }
  // 对话框
  // /deep/.van-dialog{
  //   height: 50vh;
  // }
</style>
