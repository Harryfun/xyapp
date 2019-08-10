<template>
    <div class="airOrder">
        <Airheader :come="airOrder.org_city_name" :go="airOrder.dst_city_name"></Airheader>
        <div class="airInfo">
          <div class="item">
            <div class="date line">
              <p>08月14日 周三 06:45</p>
              <p>首都机场-白云机场 经济舱</p>
            </div>
            <div class="price">
              <p><span class="money"><span>&yen;</span>1205</span>/成人</p>
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
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
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
              <p><span class="rmb">￥</span>0</p>
            </div>
            <button>
              提交订单
            </button>
          </footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Airheader from '@/components/AirHeader.vue'

export default {
  name: 'airOrder',
  computed: {
    ...mapState(['airOrder'])
  },
  components: {
    Airheader
  },
  data () {
    return {
      users: [{
        username: '',
        id: '',
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
      insurances: []
    }
  },
  methods: {
    // 添加乘机人
    addUser () {
      this.users.push({
        username: '',
        id: '',
        idType: 1
      })
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    }
  },
  mounted () {
    console.log(this.airOrder)
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
</style>
