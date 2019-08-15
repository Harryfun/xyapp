<template>
    <div class="hotelList">
        <Loading></Loading>
        <van-popup v-model="filterShow"  position="right">
            <Hotelfilter @out="getFilter"></Hotelfilter>
        </van-popup>
        <div class="top">
              <header>
            <div class="header-left" @click="$router.back(-1)">
                <i class="iconfont iconfanhui1"></i>
            </div>
            <div class="header-center">
                <p>南京</p>
                <p>09月-04日 -- 09月-11日</p>
            </div>
            <div class="header-right">
                <i class="iconfont iconsousuo2" ></i>
            </div>
        </header>

        <!-- options -->
        <section class="options">
            <div class="order">
                <i class="iconfont iconpaixu"></i>
                <span>综合排序</span>
            </div>
            <div class="choose" @click="filterShow = true">
                <i class="iconfont iconshaixuan1">
                </i>
                <span>筛选</span>
            </div>
        </section>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getHotelList"
            >
        <ul class="main">
             <li class="item" v-for="(item,index) in hotelList" :key="index" @click="toHotelDetail(item)">
                <div class="item-l">
                    <img :src="item.photos" alt="">
                </div>
                <div class="item-r">
                    <h4>{{item.name}}</h4>
                    <p class="titleE">{{item.alias}}</p>
                    <p class="comments"><span class="lang">{{item.all_remarks}}</span>云评，<span class="lang">{{item.num_collected}}</span>游记提及</p>
                    <p class="loc">
                        <span>位于{{item.business_area}}/豪华</span>
                        <span class="rmb"><span>&yen;{{item.price}}</span>起</span>
                    </p>
                </div>
            </li>
        </ul>
        </van-list>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Hotelfilter from '@/components/Filter.vue'
import { getHotelList } from '@/api/hotel'
import { mapMutations } from 'vuex'
export default {
  name: 'hotelList',
  data () {
    return {
      hotelInfo: {},
      hotelList: [],
      total: 0,
      finished: false,
      loading: false,
      //   筛选显示
      filterShow: false
    }
  },
  components: {
    Loading,
    Hotelfilter
  },
  methods: {
    getHotelList (data) {
      // 准备数据
      if (data) {
        this.hotelList = []
        this.hotelInfo._start = -6
        this.hotelInfo = { ...this.hotelInfo, ...data }
      }
      this.hotelInfo._start += this.hotelInfo._limit
      getHotelList(this.hotelInfo).then(res => {
        this.hotelList.push(...res.data.data)
        this.total = res.data.total
        console.log(this.hotelList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.hotelList.length >= this.total) {
          console.log(this.hotelList.length, this.total)
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 存储用户选中的酒店到vuex中
    ...mapMutations(['SAVE_HOTEL']),
    toHotelDetail (detail) {
      this.SAVE_HOTEL(detail)
      this.$router.push(
        { name: 'hotelDetail' }
      )
    },
    getFilter (data) {
      this.filterShow = false
      if (data) {
        this.getHotelList(data)
      }
    },
    init () {
      this.hotelInfo = this.$route.params
      this.hotelInfo._limit = 6
      this.hotelInfo._start = -6
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.top{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 10;
}
    .hotelList{
        padding-top: 100px;
        header{
            font-size: 14px;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            .header-center{
                text-align: center;
            }
            i{
                color: @xy-color;
                font-weight: 600;
            }
            .header-right i {
                font-size: 22px;
            }
        }

        section{
            &.options{
                height: 50px;
                background-color: #f7f7f7;
                font-size: 18px;
                display: flex;
                align-items: center;
                >div{
                    flex: 1;
                    text-align: center;
                    >i{
                        font-size: 16px;
                        margin-right: 12px;
                    }
                }
            }
        }
        .main{
            .item{
                display: flex;
                font-size: 18px;
                padding: 20px 16px;
                border-bottom: 1px solid #ccc;
                .item-l{
                    width: 100px;
                    height: 100px;
                    margin-right: 20px;
                    img{
                        height: 100px;
                    }
                }
                .item-r{
                    flex: 1;
                    position: relative;
                    h4{
                        width: 185px;
                        font-size: 20px;
                        font-weight: 600;
                        height: 20px;
                        line-height: 20px;
                        margin-left: -1px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: #474747;
                    }
                    .titleE{
                        width: 175px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 14px;
                        height: 24px;
                        line-height: 24px;
                    }
                    .comments{
                        font-size: 16px;
                        color: #333;
                        .lang{
                            font-weight: 600;
                            position: relative;
                            margin-right: 4px;
                            &::after{
                                content: '';
                                width: 16px;
                                height: 4px;
                                background: url('../assets/images/hlist-sprites5.png') no-repeat;
                                background-size: 125px;
                                background-position: 0 -155px;
                                position: absolute;
                                bottom: -5px;
                                left: 50%;
                                margin-left: -8px;
                            }
                        }
                    }
                    .loc{
                        font-size: 14px;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        .rmb{
                            color: #ccc;
                            margin-bottom: -4px;
                            span{
                                font-size: 26px;
                                font-weight: 600;
                                color: #f00
                            }
                        }
                    }
                }
            }
        }
    }
// 筛选的样式
/deep/.van-popup--right{
    height: 100%;
    width: 100%;
}
</style>
