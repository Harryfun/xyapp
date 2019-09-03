<template>
  <div class="allorder">
      <Loading></Loading>
      <header>
          <i class="iconfont iconfanhui1" @click="$router.push({name:'personal'})"></i>
          全部订单
      </header>
      <main>
          <div class="card" v-for="item in orderList" :key="item.id">
              <div class="card-header">
                  <span>闲云旅行旗舰店</span>
                  <span class="success">出票成功</span>
              </div>
              <div class="card-content">
                  <div class="air-info">
                      <i class="iconfont iconfeiji1"></i>
                      <p>{{item.air.org_city_name}} - {{item.air.dst_city_name}}</p>
                      <div class="plane">
                            <p>{{item.air.airline_name}}{{item.air.plane_name}}</p>
                            <p>出发时间 {{item.air.dep_datetime}}</p>
                      </div>
                  </div>
                  <div class="total">
                      <span>合计</span>：¥{{item.price}}.00
                  </div>
              </div>
              <div class="card-footer">
                  <span>删除订单</span>
                  <span>报销</span>
                  <span>退改签</span>
              </div>
          </div>

      </main>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { getAirOrders } from '@/api/air'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      orderList: []
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(['userToken'])
  },
  methods: {
    getOrders () {
      getAirOrders(this.userToken).then(res => {
        const { data } = res
        this.orderList = data
      })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.allorder{
    background-color: #efefef;
    padding-top: 50px;
    font-size: 14px;
    min-height: 100%;
}
header{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: @xy-color;
    color: #fff;
    font-size: 18px;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    i{
        position: absolute;
        top: 0px;
        left: 10px;
    }
}
main{
    margin: 10px;
    .card{
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 0px 4px 4px 0px #dcf3ff;
        position: relative;
    }
    .card-header{
        display: flex;
        justify-content: space-between;
        padding: 6px;
        font-size: 12px;
        .success{
            color: @xy-color;
        }
    }
}
.air-info{
    padding: 0 0 0 50px;
    margin-top: 10px;
    position: relative;
    i{
        color: @xy-color;
        font-size: 30px;
        position: absolute;
        top: 0px;
        left: 6px;
    }
    .plane{
        margin-top: 6px;
        font-size: 12px;
        color: #aaa;
    }
}
.total{
    text-align: right;
    padding-right: 10px;
    span{
        font-size: 12px;
    }
}
.card-footer{
    text-align: right;
    padding: 20px 6px 14px;
    span{
        border: 1px solid #666;
        font-size: 12px;
        border-radius: 6px;
        padding: 4px 8px;
        margin-left: 10px;
    }
}
</style>
