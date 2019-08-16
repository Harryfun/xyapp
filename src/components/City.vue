<template>
  <div class="city">
    <div class="hot-city">
        <div class="title">
            热门城市
        </div>
        <ul class="hot-list">
            <li v-for="(item,index) in hotArr" :key="index" @click="getVal(item)">
                <span>{{item}}</span>
            </li>
        </ul>
    </div>
    <van-index-bar :index-list="indexList" :sticky-offset-top="stickyTop" :sticky='false'>
        <div v-for="(item,index) in city" :key="index" >
            <van-index-anchor :index="item.initial" class="titleZ"/>
            <van-cell :title="val" v-for="(val,index) in item.city" :key="index" @click="getVal(val)"/>
        </div>
    </van-index-bar>
  </div>
</template>

<script>
import city from '@/utils/city'
import { getHot, getCity } from '@/api/hotel'
export default {
  name: 'city',
  data () {
    return {
      hotArr: [],
      indexList: [],
      stickyTop: 50
    }
  },
  components: {
  },
  methods: {
    getVal (val) {
      this.$emit('getVal', val)
      console.log(val)
    }
  },
  created () {
    this.city = city
    console.log(city)
    city.forEach(e => {
      this.indexList.push(e.initial)
    })
    getHot().then(res => {
      let hotArr = []
      res.data.data.forEach(e => {
        e.children.forEach(v => {
          hotArr.push(v.city)
        })
      })
      this.hotArr = hotArr
      console.log(hotArr)
    }).catch(err => {
      console.log(err)
    })
    getCity()
  }
}
</script>

<style scoped lang="less">
.city{
    position: relative;
    top: 0px;
    z-index: 80;
    background: #fff;
    height: 100vh;
    overflow: scroll;
    .title,.titleZ{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        background-color: #f2f2f2;
        padding: 0 10px;

    }
    .titleZ{
        padding: 0;
    }
    /deep/.van-index-bar__index{
        // font-size: 16px;
        // margin: 3px;
    }
    .hot-city{
        .hot-list{
            display: flex;
            flex-wrap: wrap;
            padding-right: 20px;

            li{
                width: 33.33%;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                margin: 10px 0;
                span{
                    width: 80%;
                    display: block;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    text-align: center;
                    margin: 0 auto;
                }
            }
        }
    }
}
</style>
