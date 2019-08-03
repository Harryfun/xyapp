<template>
  <div class="home">
    <Search v-show="showSearch" @cancelSearch="cancelSearch"></Search>
    <div class="index" v-show="!showSearch">
      <header>
        <div class="logo"></div>
        <div class="search" @click="changeSearch" >
          <input type="text" placeholder="搜索游记" disabled />
          <i class="iconfont iconsousuo"></i>
        </div>
        <span @click="login">登录</span>
      </header>
      <div class="banner">
        <van-swipe :autoplay="2000">
          <van-swipe-item v-for="(value, index) in images" :key="index">
            <img v-lazy="'http://157.122.54.189:9095'+value.url" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <nav>
        <ul>
          <li>
            <router-link to="/calendar">
              <div class="icon"></div>
              <span>找攻略</span>
            </router-link>
          </li>
          <li>
            <router-link to="/hotel">
              <div class="icon"></div>
              <span>酒店</span>
            </router-link>
          </li>
          <li>
            <router-link to="/calendar">
              <div class="icon"></div>
              <span>去旅行</span>
            </router-link>
          </li>
          <li>
            <router-link to="/airTic">
              <div class="icon"></div>
              <span>机票</span>
            </router-link>
          </li>
          <li>
            <router-link to="/strategyList">
              <div class="icon"></div>
              <span>看游记</span>
            </router-link>
          </li>
          <li>
            <router-link to="/hotel">
              <div class="icon"></div>
              <span>结伴</span>
            </router-link>
          </li>
          <li>
            <router-link to="/hotel">
              <div class="icon"></div>
              <span>问达人</span>
            </router-link>
          </li>
          <li>
          <router-link to="/hotel">
              <div class="icon"></div>
              <span>找攻略</span>
          </router-link>
          </li>
        </ul>
      </nav>
      <!-- 攻略部分 -->
      <section class="strategy">
        <div class="str-title">
          <h3>推荐攻略</h3>
        </div>
        <div class="str-list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ul>
              <li v-for="item in list " :key="item.id">
                <div class="item-title">{{item.title}}</div>
                <div class="item-content">
                <div class="item-l">
                    <img :src="item.images[0]" alt />
                </div>
                  <div class="item-r">
                    <p>{{item.summary}}</p>
                    <div class="item-bottom">
                      <span>{{item.watch}}浏览</span>
                      <span>
                        {{item.account.nickname}}
                        <img :src="'http://157.122.54.189:9095'+item.account.defaultAvatar" alt />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import { getBanners, getPosts } from '@/api/index'
export default {
  name: 'home',
  components: {
    Search
  },
  data () {
    return {
      images: [

      ],
      list: [],
      posts: [],
      loading: false,
      finished: false,
      showSearch: false
    }
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
    // 跳出搜索框
    changeSearch () {
      console.log(111)
      this.showSearch = true
    },
    cancelSearch () {
      this.showSearch = false
    },
    login () {
      this.$router.push({ name: 'login' })
    },
    getBanners () {
      getBanners().then(res => {
        if (res.status === 200) {
          this.images = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getPosts () {
      getPosts().then(res => {
        console.log(res.data.data)
        if (res.status === 200) {
          this.posts = res.data.data
        }
      })
    },
    init () {
      this.getBanners()
      this.getPosts()
    }
  },
  created () {
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.home{
  padding-top: 52px;
  header {
    display: flex;
    width: 100%;
    background-color: #fff;
    font-size: 16px;
    border: 1px solid #ccc;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 99;
    .logo {
      width: 135px;
      height: 50px;
      background: url(../assets/images/logo.jpg) no-repeat;
      background-size: 120px 33px;
      background-origin: content-box;
      padding: 7px 10px;
    }
    .search {
      flex: 1;
      position: relative;
      input {
        width: 100%;
        height: 30px;
        border-radius: 15px;
        outline: none;
        border: none;
        background-color: #f3f3f3;
        font-size: 14px;
        padding-left: 20px;
      }
      > i {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #aaa;
        font-size: 14px;
      }
    }
    > span {
      color: @xy-color;
      padding: 0 10px;
    }
  }

  .banner {
    .van-swipe {
      height: 160px;
    }
  }
  nav {
    margin: 20px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      font-size: 16px;
      li {
        flex: 25%;
        a{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #ff9e03;
        }
        span{
          margin: 8px 0 10px;
        }
        .icon {
          width: 46px;
          height: 46px;
          background: url("../assets/images/i_nav3.png");
          background-size: 375px/2 186px/2;
        }
        &:nth-child(2){
          color: #32a2f1;
          .icon {
            background-position: -46px 0;
          }
        }
        &:nth-child(3) {
          color: #fd4e4e;
          .icon {
            background-position: -92px 0;
          }
        }
        &:nth-child(4){
          color: #97cf2b;
          .icon {
              background-position: -138px 0;
          }
        }
        &:nth-child(5){
          color: #ffca2b;
          .icon {
            background-position: 0 -46px;
          }
        }
        &:nth-child(6){
          color: #f94a87;
          .icon {
            background-position: -46px -46px;
          }
        }
        &:nth-child(7){
          color: #42d6ba;
          .icon {
            background-position: -92px -46px;
          }
        }
        &:nth-child(8){
          color: #d37af0;
          .icon {
            background-position: -138px -46px;
          }
        }
      }
    }
  }

  .strategy{
    padding: 0 5px;
    .str-title{
      height: 40px;
      background-color: #f8f8f8;
      text-align: center;
      h3{
        display: inline-block;
        font-size: 15px;
        color: #999;
        font-weight: normal;
        line-height: 40px;
        position: relative;
        &::before,&::after{
          content: "";
          display: inline-block;
          width: 10px;
          height: 12.5px;
          background: url('../assets/images/i_guidet.png') no-repeat;
          background-size: 10px;
          vertical-align: middle;
          margin-right: 10px;
        }
        &::after{
          background-position: 0 -12.5px;
          margin: 0 0 0 10px;
        }
      }
    }
    .str-list{
      li{
        .item-title{
          font-size: 20px;
          color: #111;
          padding: 10px 0;
          margin-bottom: 10px;
        }
        .item-content{
          display: flex;
          height: 90px;
          color: #999;
          font-size: 14px;
          .item-l{
            width: 130px;
            height: 90px;

          }
          .item-r{
            position: relative;
            margin-left: 15px;
            flex: 1;
            p{
              width: 94%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .item-bottom{
              position: absolute;
              width: 100%;
              bottom: 0;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              padding-right: 10px;
              span:last-child{
                img{
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  vertical-align: bottom;
                }
              }
            }
          }
        }
      }
    }
  }

}
</style>
