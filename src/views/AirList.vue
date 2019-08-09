<template>
    <div class="airList">
      <header>
        <i class="iconfont iconfanhui1"></i>
        北京<i class="iconfont iconchufadaodaxiao"></i>
        曼谷
      </header>
      <van-tabs sticky :active='2' @click="changeList">
        <!-- 航班起降时间均为当地时间 -->
        <div class="tips">
          <p>
            <i class="iconfont icongupiao"></i>临近出发<span>价格可能上涨，</span>建议提前购票
          </p>
          <p>航班起降时间均为当地时间</p>
        </div>
       <van-tab v-for="item in dateArr" :title="item.date+' ￥'+item.price+'  '" :key="item.index">
          <ul>
            <li  v-for="item in airList"  :key="item.id" @click="toOrder(item)">
              <div class="top">
                <div class="come">
                  <p class="time">
                    {{item.dep_time}}
                  </p>
                  <p class="comeAddr">
                    {{item.org_airport_name}}{{item.org_airport_quay}}
                  </p>
                </div>
                <div class="airplan">
                  <i class="dur">5小时25分</i>
                  <i class="iconfont iconGroup"></i>
                </div>
                 <div class="go">
                  <p class="time">
                    {{item.arr_time}}
                  </p>
                  <p class="comeAddr">
                    {{item.dst_airport_name}}{{item.dst_airport_quay}}
                  </p>
                </div>
                <div class="price">
                  <p><span class="rmb">&yen;</span>{{item.base_price}}</p>
                  <p>含税价</p>
                </div>
              </div>
            <div class="bottom">
              {{item.airline_name}} {{item.flight_no}}
            </div>
            </li>
          </ul>
        </van-tab>
        </van-tabs>

        <footer>
          <div>
            <i class="iconfont iconshaixuan1"></i>
            筛选
          </div>
          <div>
            <i class="iconfont iconjiaotong-feiji"></i>
            直飞优先
          </div>
        </footer>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getAirList } from '@/api/air'
import { getDate, getRandom, formatDate } from '@/utils/utils'

export default {
  name: 'airList',
  data () {
    return {
      // 机票列表
      airList: [],
      dateArr: []
    }
  },
  computed: {
    ...mapState(['airInfo'])

  },
  methods: {
    // 获取机票列表
    getAirList () {
      getAirList(this.airInfo).then(res => {
        console.log(res.data)
        this.airList = res.data.flights
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取前2天和后三天的列表
    getDays () {
      // 获取2天前时间的毫秒数
      let currentMs = new Date(this.airInfo.departDate) - 86400000
      console.log(currentMs)
      let dateArr = []
      // 遍历放到数组中
      for (let i = 0; i < 5; i++) {
        dateArr.push({ date: getDate(new Date(currentMs)), price: getRandom(400, 2000), index: formatDate(new Date(currentMs)) })
        currentMs += 86400000
      }
      this.dateArr = dateArr
      console.log(this.dateArr)
    },
    // 切换列表
    changeList (index) {
      this.airInfo.departDate = { ...this.dateArr[index] }['index']
      this.getAirList()
    },
    ...mapMutations(['SAVE_AIR_ORDER']),
    // 跳转订单页面
    toOrder (item) {
      this.SAVE_AIR_ORDER(item)
      this.$router.push({ name: 'airOrder' })
    },
    init () {
      console.log(this.airInfo)
      this.getDays()
      this.getAirList()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
  @xy-color: #409eff;
  .airList{
    // padding: 10px 0 80px;
  }
  header{
    background-color: @xy-color;
    font-size: 16px;
    color: #fff;
    height: 50px;
    text-align: center;
    line-height: 50px;
    position: relative;
    i.iconfanhui1{
      position: absolute;
      top: 0px;
      left: 10px;
    }
    i.iconchufadaodaxiao{
      padding: 0 8px 0 10px;
    }
  }
  /deep/.van-tabs__nav{
    background-color: @xy-color;
    padding: 10px 0;
  }
  // 清除上边距线
  /deep/.van-hairline--top-bottom::after{
    border-width: 0;
  }
  // 修改选中样式
  /deep/.van-tabs__line{
    height: 100%;
    padding: 0 40px;
    background-color: rgba(255,255,255,.4);
    z-index: 1;
  }
  /deep/.van-tab{
    color: #555;
    line-height: 1.3;
  }
  /deep/.van-tab--active{
    color: #222;
    font-weight: 600;
  }
  /deep/.van-tab{
    position: relative;
    z-index: 9
  }
  /deep/.van-ellipsis{
    white-space: pre-wrap;
    text-overflow: initial;
  }

  // 去掉高度
  /deep/.van-tabs--line .van-tabs__wrap{
    height: 54px;
    overflow: hidden;
    box-shadow: 0px 3px 3px rgba(110, 110, 110, 0.3);
  }
  .tips{
    background-color: rgb(246, 246, 246);
    p:first-child{
      font-size: 16px;
      padding: 10px;
      >.iconfont{
        font-size: 35px;
        vertical-align: sub;
        color: @xy-color;
        margin-right: 16px;
      }
      span{
        color: #ff0000
      }
    }
    p:last-child{
      color: #013cff;
      font-size: 12px;
      padding-left: 10px;
    }
  }

  // 列表
  ul{
    margin-top: 20px;
    padding: 0 10px 60px;
  }
  li{
    font-size: 12px;
    padding: 14px 0;
    .top{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .time{
        font-size: 20px;
        font-weight: 600;
      }
    }
    .come,.airplan,.go,.price{
      flex: 1;
    }
    .airplan{
      position: relative;
      flex: 2;
      text-align: center;
      .iconGroup{
        color: @xy-color;
      }
      .dur{
        position: absolute;
        width: 100px;
        top: -20px;
        left: 50%;
        transform: translate(-50%);
        color: #888;
        font-weight: 300;
        font-style: normal;
      }
    }
    .price{
      text-align: right;
      color: #666;
      p:first-child{
        font-size: 20px;
        font-weight: 600;
        color: #f00;
        .rmb{
          font-size: 12px;
        }
      }
    }
    .bottom{
      color: #888;
      padding: 4px 0;
    }
  }
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-shadow: 0px 6px 16px rgba(0,0,0,.2);
    >div{
      font-weight: 600;
      text-align: center;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      i{
        margin-bottom: 2px;
      }
    }
  }
</style>
