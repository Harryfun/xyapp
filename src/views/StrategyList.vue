<template>
    <div class="strategyList">
      <Xyheader></Xyheader>
      <header>
        <div class="header-title">
          <div class="title-left">
            <div class="line"></div>
            <span class="day">29</span>
            <div class="line"></div>
            <span class="year">
              <p>2019</p>
              <p>JUL</p>
            </span>
            <div class="line"></div>
            <span class="memory">
              云首纪念
            </span>
            <div class="line"></div>
          </div>
          <div class="title-right">
            历历在目
            <i class="iconfont iconrili1"></i>
          </div>
        </div>
      <van-swipe  :autoplay="3000"  @change="onChange" touchable>
        <van-swipe-item  v-for="item in swiperList" :key="item.id" ><div class="card">
           <div class="card-title">
             <img :src="item.images[0]" alt="">
           </div>
           <div class="card-content">
             <p>{{item.title}}</p>
             <p>我是<span>{{item.account.nickname}}</span>&nbsp;&nbsp;&nbsp;我在<span>{{item.cityName}}</span></p>
           </div>
         </div></van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          <div :class="{indicator: true,active:current == index}" v-for="(item,index) in swiperList " :key="item.id">
            <img :src="item.images[0]" alt="">
          </div>
        </div>
      </van-swipe>
      </header>

      <div class="list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ul>
              <li v-for="item in list " :key="item.id">
                <div class="left">
                  <div class="title">
                  {{item.title}}
                  </div>
                  <div class="writer">
                    <div class="person">
                      <div class="avatar">
                      <img :src="'http://157.122.54.189:9095'+item.account.defaultAvatar" alt="">
                    </div>
                    <span> {{item.account.nickname}}</span>
                    </div>
                    <span>在<i>{{item.cityName}}</i></span>
                  </div>
                  <div class="info">
                    <i class="iconfont iconyanjing1"></i>
                    <span>{{item.watch}}</span>
                    <i class="iconfont iconhuifu1"></i>
                    <span>{{item.comments.length}}</span>
                  </div>
                </div>
                <div class="right">
                    <img :src="item.images[0]" alt="">
                </div>
              </li>
            </ul>
          </van-list>
      </div>
    </div>
</template>

<script>
import { getPosts } from '@/api/index'
import Xyheader from '@/components/Xyheader.vue'
export default {
  name: 'strategyList',
  data () {
    return {
      detail: null,
      current: 0,
      list: [],
      swiperList: [],
      posts: [],
      loading: false,
      finished: false
    }
  },
  components: {
    Xyheader
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          let arr = this.posts.shift()
          this.list.push(arr)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.posts.length === 0) {
          this.finished = true
        }
      }, 1000)
    },
    onChange (index) {
      this.current = index
    },
    getPosts () {
      console.log(111)
      getPosts().then(res => {
        console.log(res.data.data)
        if (res.status === 200) {
          this.posts = [ ...res.data.data ]
          console.log(this.posts)
          this.swiperList = [ ...res.data.data ]
        }
      })
    },
    init () {
      this.getPosts()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.strategyList{
  padding-top: 50px;
  >header{
    background: #309296 url('../assets/images/fs-bg.png') no-repeat center top;
    position: relative;
    background-size: cover;
    padding: 0 10px;
    .header-title{
      padding: 20px 0;
      .line{
        width: 2px;
        height: 28px;
        background-color: #fff;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
       .title-left{
         font-size: 30px;
         color: #fff;
         font-weight: 300;
         display: flex;
         align-items: center;
         >.day{
            padding: 0 4px;
          }
          >.year{
            font-size: 12px;
            text-align: center;
            padding: 0 5px;
          }
          >.memory{
            padding: 0 4px;
          }
       }
       .title-right{
         width: 100px;
         height: 34px;
         line-height: 36px;
         border-radius: 17px;
         background-color: #000;
         color: #fff;
         font-size: 12px;
         overflow: hidden;
         display: flex;
         justify-content: space-around;
         padding: 0 10px;
         >i{
           margin-left: 4px;
           line-height: 33px;
         }
       }
    }
  }
  .van-swipe{
    height: 366px;
  }
  .custom-indicator{
    position: absolute;
    width: 100%;
    bottom: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    .indicator{
      width: 50px;
      height: 50px;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 10px;
      position: relative;
      img{
        height: 100%;
      }
      &::after{
        content:'';
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%);
        width: 70%;
        height: 4px;
        background-color: #6a9bdd;
        border-radius: 2px;
        display: none;
      }
      &.active{
        &::after{
          display: block;
        }
      }
    }
  }
  .card{
    width: 356px;
    height: 300px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 10px;

    .card-title{
      height: 215px;
      img{
        height: 100%;
      }
    }
    .card-content{
      font-size: 22px;
      padding: 18px;
      text-align: center;
      p:first-child{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p:last-child{
        font-size: 18px;
        margin-top: 4px;
        span{
          color: @xy-color;
        }
      }
    }
  }
  .list{
    li{
      display: flex;
      padding: 8px 0 8px 8px;
      .left{
        flex:1;
        margin-right: 20px;
        border-bottom: 1px solid #ccc;
        position: relative;
        .title{
          height: 50px;
          font-size: 18px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .writer{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          padding-top: 20px;
          .person{
            display: flex;
            align-items: center;
            .avatar{
              width: 20px;
              height: 20px;
              overflow: hidden;
            }
            >span{
              color: #aaa;
              padding-left: 10px;
            }
          }
          >span{
            >i{
              font-style: normal;
              color: @xy-color;
            }
          }
        }
        .info{
          position: absolute;
          bottom: 5px;
          font-size: 14px;
          color: #999;
          >i{
            vertical-align: text-top;
          }
          span:first-of-type{
            padding-right: 4px;
          }
        }
      }
      .right{
        height: 130px;
        flex: 1;
        img{
          height: 90%;
        }
      }
    }
  }
}
</style>
