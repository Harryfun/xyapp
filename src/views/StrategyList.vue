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
        <van-tabs swipeable animated>
        <van-tab v-for="index in 4" :key="index">
         <div class="card">
           <div class="card-title">
             <img src="../assets/images/pic_sea.jpeg" alt="">
           </div>
           <div class="card-content">
             <p>顺德 | 我有一个2天胖10斤的梦想{{index}}</p>
             <p>我是<span>Harry</span>,我在<span>顺德</span></p>
           </div>
         </div>
        </van-tab>
      </van-tabs>
      </header>

      <div class="list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ul>
              <li v-for="(item,index) in 10" :key="index">
                <div class="left">
                  <div class="title">
                    曼谷＋象岛｜“泰”享受！看海发呆美食逛..
                  </div>
                  <div class="writer">
                    <div class="person">
                      <div class="avatar">
                      <img src="../assets/images/qq.png" alt="">
                    </div>
                    <span>harry</span>
                    </div>
                    <span>在<i>泰国</i></span>
                  </div>
                  <div class="info">
                    <i class="iconfont iconyanjing1"></i>
                    <span>3122</span>
                    <i class="iconfont iconhuifu1"></i>
                    <span>38</span>
                  </div>
                </div>
                <div class="right">
                  <img src="../assets/images/pic_sea.jpeg" alt="">
                </div>
              </li>
            </ul>
          </van-list>
      </div>
    </div>
</template>

<script>
// import { getPosts } from '@/api/index'
import Xyheader from '@/components/Xyheader.vue'
export default {
  name: 'strategyList',
  data () {
    return {
      detail: null
    }
  },
  components: {
    Xyheader
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    init () {

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
  /deep/.van-tabs__wrap{
      bottom: -310px;
      left: 0;
      background-color: #000;
      z-index:99;
    }
    /deep/.van-tabs__content{
      transform: translateY(-40px)
    }
    /deep/.van-tabs__nav{
      background-color: transparent !important;
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
      padding: 15px 0 15px 15px;
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
        flex: 1;
      }
    }
  }
}
</style>
