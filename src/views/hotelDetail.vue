<template>
    <div class="hotelDetail">
        <header>
            <div class="left">
                <i class="iconfont iconfanhui1" @click="$router.back(-1)"></i>
            </div>
            <div class="logo">
                <img src="../assets/images/logo.jpg" alt="">
            </div>
        </header>
        <div class="container">
             <ul class="pics">
                <li @click="showGal">
                    <img src="../assets/images/hotel-pics/1.jpeg" alt="">
                </li>
                <li>
                    <img src="../assets/images/hotel-pics/2.jpeg" alt="">
                </li>
                <li>
                    <img src="../assets/images/hotel-pics/3.jpeg" alt="">
                </li>
            </ul>
            <div class="hotel-title">
                <div class="hotel-info">
                    <span class="title">
                        {{hotelInfo.name}}
                    </span>
                    <span class="star">
                        <span v-for="index in 5" :key="index" :style="index <= hotelInfo.hotellevel?hotelInfo.hotellevel.level:5?'':'color: #ccc'">❤</span>
                    </span>
                    <span>
                        {{hotelInfo.hoteltype.name}}
                    </span>
                </div>
                <div class="phone">前台电话：{{hotelInfo.phone}}</div>
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
                            <strong>{{hotelInfo.area}}</strong>
                            <span>({{parseInt(((hotelInfo.very_good_remarks+hotelInfo.very_bad_remarks)/hotelInfo.very_good_remarks)*10)}}%用户选择)</span>
                        </p>
                        <p>{{hotelInfo.address}}</p>
                    </div>
                    <div class="right">
                        <div class="map" @click="toMap">
                            地图
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
                <li v-for="(item,index) in hotelInfo.products" :key="index">
                    <div class="left">
                        <p>
                            <img src="../assets/images/qq.png" alt="">
                            <strong>{{item.name}}</strong>
                        </p>
                        <p>
                            <span class="onsale">含餐 免费取消</span><span>{{item.bestType}}</span>
                        </p>
                        <p>
                            <span class="onsale">立即确认</span><span>在线付</span>
                        </p>
                    </div>
                    <div class="right">
                        <span class="rmb">&yen;</span>
                        <span class="price">{{item.price}}</span>/晚
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
                    <p>{{hotelInfo.creation_time !='null' ? hotelInfo.creation_time : '2008年'}}</p>
                </div>
                <div>
                    <p class="subtitle">装修</p>
                    <p>{{hotelInfo.renovat_time !='null' ? hotelInfo.renovat_time : '2018年'}}</p>
                </div>
                <div>
                    <p class="subtitle">酒店规模</p>
                    <p>{{hotelInfo.roomCount}}间</p>
                </div>
            </div>
            <div class="service">
                <p class="subtitle">酒店设施/服务</p>
                <ul>
                    <li v-for="(item,index) in hotelInfo.hotelassets" :key="index" v-show="index<4">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <footer>
            <div class="left">
                <p class="title">每晚</p>
                <p class="price"><span style="color: red">&yen;</span><span style="padding-right: 4px;">{{hotelInfo.price}}</span>起</p>
            </div>
            <button class="right" @click="showToast">
                查看房型
            </button>
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { ImagePreview } from 'vant'
export default {
  name: 'hotelDetail',
  data () {
    return {
      imgList: [
        'https://p3-q.mafengwo.net/s11/M00/6C/A2/wKgBEFtqoNSAMF8BAAV_eVg4XCI21.jpeg?imageMogr2%2Fthumbnail%2F1125x%2Fquality%2F90',
        'https://n1-q.mafengwo.net/s11/M00/6C/A1/wKgBEFtqoNOAAfrLAAPUMdHs01M69.jpeg?imageMogr2%2Fthumbnail%2F1125x%2Fquality%2F90',
        'https://n2-q.mafengwo.net/s9/M00/F2/CD/wKgBs1ZG15qAe1HIAACzEx2uPZM14.jpeg?imageMogr2%2Fthumbnail%2F1125x%2Fquality%2F90'
      ]
    }
  },
  computed: {
    ...mapState(['hotelInfo'])

  },
  methods: {
    //   展示预览图
    showGal () {
      ImagePreview(this.imgList)
    },
    toMap () {
      this.$router.push({
        name: 'map',
        params: {
          location: this.hotelInfo.location,
          name: this.hotelInfo.name
        }
      })
    },
    showToast () {
      this.$toast('更多功能请到闲云app客户端体验')
    },
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
    padding: 60px 0 ;
    header{
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        padding: 0 10px;
        z-index: 99;
        border-bottom: 1px solid #eee;
        .left{
            position: absolute;
            font-weight: 600;
            color: @xy-color;
            top: 8px;
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
    >.container{
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
        .phone{
            font-size: 14px;
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
        padding-bottom: 10px;
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
                margin-bottom: 10px;
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
                    padding-top: 13px;
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
    .strategy{
        padding: 0 16px;
        .title{
            padding: 6px 0 12px;
            font-size: 18px;
            font-weight: 600;
        }
        .subtitle{
            font-size: 12px;
            color: #888;
        }
        .container{
            display: flex;
            flex-wrap: wrap;
            line-height: 24px;
            >div{
                flex: 50%;
                padding: 4px 0;
            }
            p:last-child{
                font-size: 16px;
                font-weight: 600;
            }
        }
        .service{
            margin-top: 14px;
            ul{
                display: flex;
                justify-content: space-between;
                margin-top: 12px;
                li{
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 12px;
                    width: 23%;
                    height: 60px;
                    line-height: 60px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    text-align: center;
                }
            }
        }
    }
    footer{
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        width: 100%;
        height: 50px;
        display: flex;
        box-shadow: 0 -2px 4px #ccc;
        padding: 6px 16px;
        .left{
            flex: 1;
            font-size: 12px;
            color: #888;
            span{
                font-size: 20px;
                color: #f00;
                font-weight: 600;
                &:first-child{
                    font-size: 14px;
                }
            }
        }
        .right{
            flex: 1;
            border: 0;
            outline: 0;
            background-color: @xy-color;
            color: #fff;
            font-size: 16px;
            border-radius: 19px;
        }
    }
}
</style>
