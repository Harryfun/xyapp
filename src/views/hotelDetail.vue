<template>
    <div class="hotelDetail">
        <header>
            <div class="left">
                <i class="iconfont iconfanhui1"></i>
            </div>
            <div class="logo">
                <img src="../assets/images/logo.jpg" alt="">
            </div>
        </header>
        <div class="container">
             <ul class="pics">
                <li>
                    <img src="../assets/images/pic_sea.jpeg" alt="">
                </li>
                <li>
                    <img src="../assets/images/pic_sea.jpeg" alt="">
                </li>
                <li>
                    <img src="../assets/images/pic_sea.jpeg" alt="">
                </li>
            </ul>
            <div class="hotel-title">
                <div class="hotel-info">
                    <span class="title">
                        南京中心大酒店
                    </span>
                    <span class="star">
                        ❤ ❤ ❤ ❤ ❤
                    </span>
                    <span>
                        豪华型
                    </span>
                </div>
                <ul class="hotel-des">
                    <li>热销推荐</li>
                    <li>2018年装修</li>
                    <li>市中心方圆</li>
                    <li>服务号</li>
                </ul>
                <div class="hotel-geo">
                    <div class="left">
                        <p>
                            <i class="iconfont icondingwei"></i>
                            <strong>新街口</strong>
                            <span>(16%用户选择)</span>
                        </p>
                        <p>中山路75号</p>
                    </div>
                    <div class="right">
                        <div class="map">
                            周边
                        </div>
                    </div>
                </div>
            </div>
            <div class="ad">
                <img src="../assets/images/coupon-banner-gif.gif" alt="">
            </div>
        </div>
        <section>
            <div class="checkin">
                <div class="left">
                    入 <strong>09月04日</strong>
                    离 <strong>09月11日</strong>
                </div>
                <div class="line">|</div>
                <div class="right">
                    <strong>2成人 0儿童</strong>
                </div>
            </div>
            <div class="condition">
                <van-tag color="#7232dd" plain>大床</van-tag>
                <van-tag color="#7232dd" plain>双床</van-tag>
                <van-tag color="#7232dd" plain>含早餐</van-tag>
                <van-tag color="#7232dd" plain>免费取消</van-tag>
            </div>
            <ul class="platform">
                <li>
                    <div class="left">
                        <p>
                            <img src="../assets/images/qq.png" alt="">
                            <strong>携程</strong>
                        </p>
                        <p>
                            <span class="onsale">含餐 免费取消</span><span>大床房</span>
                        </p>
                        <p>
                            <span class="onsale">立即确认</span><span>在线付</span>
                        </p>
                    </div>
                    <div class="right">
                        <span class="rmb">&yen;</span>
                        <span class="price">497</span>/晚
                    </div>
                </li>
            </ul>
        </section>
        <div class="strategy">
            <div class="title">
                酒店攻略
            </div>
            <div class="container">
                <div>
                    <p class="subtitle">入住</p>
                    <p>14:00以后</p>
                </div>
                <div>
                    <p class="subtitle">离店</p>
                    <p>12:00之前</p>
                </div>
                <div>
                    <p class="subtitle">开业</p>
                    <p>2010年</p>
                </div>
                <div>
                    <p class="subtitle">酒店规模</p>
                    <p>100间</p>
                </div>
            </div>
            <div class="service">
                <p class="subtitle">入住</p>
                <ul>
                    <li>外币兑换服务</li>
                    <li>电梯</li>
                    <li>洗衣服务</li>
                    <li>热水壶</li>
                </ul>
            </div>
        </div>
        <footer>
            <div class="left">
                <p class="title">每晚</p>
                <p class="price"><span style="color: red">&yen;</span><span>497</span>起</p>
            </div>
            <button class="right">
                查看房型
            </button>
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'hotelDetail',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['hotelInfo'])

  },
  methods: {
    init () {
      console.log(this.hotelInfo)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.hotelDetail{
    padding: 60px 0 0 ;
    header{
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        padding: 0 10px;
        .left{
            position: absolute;
            font-weight: 600;
            color: @xy-color;
            top: 5px;
            left: 10px;
        }
        .logo{
            text-align: center;
            img{
                width: 150px;
                margin-top: 4px;
            }
        }
    }
    // container
    .container{
        padding: 0 10px;
        .pics{
            border-radius: 10px;
            overflow: hidden;
            li{
                float: left;
                width: 40%;
                height: 186px / 2;
                img{
                    height: 100%;
                }
            }
            li:first-child{
                width: 60%;
                height: 186px;
                padding-right: 2px;
            }
            li:nth-child(2){
                padding-bottom: 2px;
            }
        }
        .hotel-title{
            padding-top: 16px;
            .hotel-info{
                font-size: 12px;
                .title{
                    font-weight: 600;
                    font-size: 15px;
                    color: #000;
                }
                .star{
                    font-size: 12px;
                    color: red;
                }

            }
        }
        .hotel-des{
            font-size: 12px;
            display: flex;
            margin-top: 6px;
            li{
                background: #e5f0ff;
                border: 1px solid #c0d8fa;
                color: #376db9;
                margin-right: 10px;
            }
        }
        .hotel-geo{
            background-color: #f6f7f9;
            border-radius: 10px;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 10px;
            margin: 16px 0;
            .left{
                color: #000;
                strong{
                    padding: 0 5px;
                }
                p>span{
                    color: #999;
                }
                p:first-child{
                    padding-bottom: 3px;
                }
            }
            .right{
                .map{
                    width: 50px;
                    height: 50px;
                    background-image: url('../assets/images/map.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    text-align: center;
                    line-height: 50px;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    color: #000;
                }
                margin-right: 8px;
            }
        }
    }

    section{
        background-color: #f6f7f9;
        border-top: 6px solid #f6f7f9;
        padding-top: 14px;
        .checkin{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            height: 44px;
            background-color: #559bff;
            border-radius: 6px;
            padding: 0 10px;
            color: #fff;
            margin: 0 10px 14px;
        }
        .condition{
            padding: 5px 10px 10px;
            background-color: #fff;
            margin-bottom: 10px;
            span{
                margin-right: 10px;
            }
        }
        .platform{
            padding: 0 10px;
            li{
                display: flex;
                justify-content: space-between;
                height: 86px;
                font-size: 12px;
                border-radius: 8px;
                overflow: hidden;
                background-color: #fff;
                padding: 12px 10px;
                .left{
                    p:first-child{
                        strong{
                            font-size: 14px;
                            margin-top: 10px;
                        }
                        img{
                            width: 25px;
                            height: 25px;
                            vertical-align: middle;
                            margin-right: 6px;
                        }
                        margin-bottom: 6px;
                    }
                    .onsale{
                        color: #40a40b;
                        margin-right: 4px;
                    }
                }
                .right{
                    color: #666;
                    .price,.rmb{
                        font-size: 30px;
                        color: red;
                        font-weight: 600;
                    }
                    .rmb{
                        font-size: 18px;
                        margin-right: 6px;
                    }
                }
            }
        }
    }
}
</style>
