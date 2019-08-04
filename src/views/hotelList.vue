<template>
    <div class="hotelList">
        <Loading></Loading>
        <header>
            <div class="header-left">
                <i class="iconfont iconfanhui1"></i>
            </div>
            <div class="header-center">
                <p>南京</p>
                <p>09月-04日 -- 09月-11日</p>
            </div>
            <div class="header-right">
                <i class="iconfont iconsousuo2"></i>
            </div>
        </header>

        <!-- options -->
        <section class="options">
            <div class="order">
                <i class="iconfont iconpaixu"></i>
                <span>综合排序</span>
            </div>
            <div class="choose">
                <i class="iconfont iconshaixuan1">
                </i>
                <span>筛选</span>
            </div>
        </section>
        <ul class="main">
             <li class="item">
                <div class="item-l">
                    <img src="../assets/images/pic_sea.jpeg" alt="">
                </div>
                <div class="item-r">
                    <h4>南京中心大酒店</h4>
                    <p class="titleE">Central Hotel</p>
                    <p class="comments"><span>62</span>云评，<span>10</span>游记提及</p>
                    <p class="loc">
                        <span>位于新街口/豪华</span>
                        <span class="rmb"><span>&yen;490</span>起</span>
                    </p>
                </div>
            </li>
            <li class="item">
                <div class="item-l">
                    <img src="../assets/images/pic_sea.jpeg" alt="">
                </div>
                <div class="item-r">
                    <h4>南京中心大酒店</h4>
                    <p class="titleE">Central Hotel</p>
                    <p class="comments"><span class="lang">62</span>云评，<span class="lang">10</span>游记提及</p>
                    <p class="loc">
                        <span>位于新街口/豪华</span>
                        <span class="rmb"><span>&yen;490</span>起</span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { getHotelList } from '@/api/hotel'
export default {
  name: 'hotelList',
  data () {
    return {
      hotelInfo: {}
    }
  },
  components: {
    Loading
  },
  methods: {
    getHotelList () {
      getHotelList(this.hotelInfo).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    init () {
      this.hotelInfo = this.$route.params
      this.getHotelList()
      console.log(this.$route.params)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
    .hotelList{
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

</style>
