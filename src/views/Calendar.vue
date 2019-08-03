<template>
    <div class="calendar">
        <i class="iconfont iconfanhui" @click="$router.back(-1)"></i>
        <van-tabs :ellipsis="false" :border="false" :sticky="true">
            <van-tab v-for="(item,index) in calData" :title="item.year" :key="index">
               <van-steps direction="vertical" :active="0" active-color="#fff">
                <van-step v-for="(monthData,index) in item.monthPic" :key="index">
                   <h3 v-if="index == 0" class="title">{{monthData.title}}</h3>
                   <div class="content" v-else>
                        <h3><div class="left">{{monthData.month}}</div><div class="right"><p>月</p><p>{{monthData.monEn}}.</p></div></h3>
                    <ul class="pics">
                        <li v-for="(pic,index) in monthData.pic" :key="index" @click="toStrategy">
                            <img :src="pic" alt="" >
                        </li>
                    </ul>
                   </div>
                </van-step>
                </van-steps>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import imgData from '@/utils/imgData'
import { getRandom } from '@/utils/utils'
export default {
  name: 'calender',

  data () {
    return {
      calData: []
    }
  },
  methods: {
    getData () {
      let date = new Date()
      let monEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      //  准备图片数组
      let calData = []
      for (let m = 2019; m > 2013; m--) {
        let year = {}
        year.year = m.toString()
        year.monthPic = []
        for (let i = 1; i <= 13; i++) {
          let obj = {}
          if (i === 13) {
            obj.title = '欢迎来到闲云的宝库'
          } else {
            obj.month = i > 9 ? i : '0' + i
            obj.monEn = monEn[i - 1]
            obj.pic = []
            for (let j = 1; j <= 31; j++) {
              obj.pic.push(imgData[getRandom(0, 100)])
              if (i === 2) {
                if (j === 28) {
                  break
                }
              } else if (i === 4 || i === 6 || i === 9 || i === 11) {
                if (j === 30) {
                  break
                }
              } else if (m === 2019) {
                if (i === date.getMonth() + 1) {
                  if (j === date.getDate()) {
                    break
                  }
                }
              }
            }
          }
          if (m === 2019) {
            console.log(i === date.getMonth() + 1)
            if (i === date.getMonth() + 2) {
              break
            }
          }
          year.monthPic.push(obj)
        }
        if (m === 2019) {
          year.monthPic.push({ title: '欢迎来到闲云的宝库' })
        }
        year.monthPic.reverse()
        calData.push(year)
      }
      this.calData = calData
      console.log(calData)
    },
    toStrategy () {
      this.$router.push('/strategy/4')
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.calendar{
    width: 100%;
    height: 100% ;
    padding-top: 50px;
    background: #309296 url('../assets/images/bg.png') no-repeat center top;
    background-size: 100% auto;
    // background-attachment: fixed;
    overflow: scroll;
    .iconfanhui{
        position: fixed;
        top: 14px;
        left: 10px;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        z-index: 100;
    }
    /deep/.van-tabs__nav,.van-steps{
        background-color: transparent;
    }
    &::before{
        content:'';
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        background: url('../assets/images/cal-bg.jpg') no-repeat;
        background-size: cover;
        opacity: .08;
    }
    /deep/.van-sticky{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 99;
    }
    /deep/.van-tabs__wrap {
        padding-left: 30px;
    }
    /deep/.van-tabs__line{
        background-color: #fff;
        width: 88px !important;
        position: absolute;
        left: -6px;
    }
    /deep/.van-tab span{
        font-size: 28px;
        color: #fff;
        position: relative;
        padding-right: 20px;
        &::after{
            content: '年';
            position: absolute;
            right: 6px;
            bottom: -6px;
            font-size: 12px;
        }
    }
    /deep/.van-tab.van-tab--active span{
        font-size: 34px;
    }
    // 进度条
    .van-step--vertical:first-child::before{
        background-color: transparent;
    }
    /deep/.van-step__line{
        top: 24px;
        left: -15px;
    }
    /deep/.van-icon-checked:before{
        content:'';
        width: 0px;
        height: 0px;
        box-shadow: 0 0 6px 5px #fff;
        border-radius: 50%;
    }
    /deep/.van-step__circle{
        width: 0px;
        height: 0px;
        box-shadow: 0 0 6px 5px #fff;
        border-radius: 50%;
    }
    // 最后一根线
    /deep/.van-step:last-child .van-step__line{
        width: 1px;
    }
    // 每个进度下的下划线
    /deep/[class*=van-hairline]::after{
        border: 0
    }

    //表头
    .title{
        padding-top: 6px;
    }
    .content{
        h3{
            display: flex;
            color: #fff;
            align-items: center;
            .left{
                font-size: 40px;
            }
            .right{
                margin-left: 6px;
                p{
                    color: rgba(255,255,255,0.4);
                    font-size: 14px;
                }
            }
        }
        .pics{
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            li{
                width: 33.33%;
                padding: 0 5px;
            }
        }
    }
}
</style>
