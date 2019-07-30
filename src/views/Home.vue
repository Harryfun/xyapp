<template>
  <div class="home">
    <header>
      <div class="logo"></div>
      <div class="search">
        <input type="text" placeholder="搜索游记" />
        <i class="iconfont iconsousuo"></i>
      </div>
      <span>登录</span>
    </header>
    <div class="banner">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <nav>
      <ul>
        <li>
          <div class="icon"></div>
          <span>找攻略</span>
        </li>
        <li>
          <div class="icon"></div>
          <span>酒店</span>
        </li>
        <li>
          <div class="icon"></div>
          <span>去旅行</span>
        </li>
        <li>
          <div class="icon"></div>
          <span>机票</span>
        </li>
        <li>
          <div class="icon"></div>
          <span>看游记</span>
        </li>
        <li>
          <div class="icon"></div>
          <span>结伴</span>
        </li>
        <li>
          <div class="icon"></div>
          <span>问达人</span>
        </li>
        <li>
          <div class="icon"></div>
          <span>找攻略</span>
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
            <li v-for="(value,index) in list " :key="index">
              <div class="item-title">{{value}}顺德|我有一个2天胖10斤的梦想</div>
              <div class="item-content">
                <img src="../assets/images/pic_sea.jpeg" alt />
                <div class="item-r">
                  <p>法国 继天堂之后最美丽的国度 La France est le plus beau royaume après le ciel. 法国 ，继天堂之后最美丽的国度。 如果说一座城市的建筑折射的是历史风干的化石，那 法国 的哥特式建筑则深刻地记录了民族的历史。去过 法国 的人，一定会为这里弥漫着的艺术气息与魅力而着迷。 喜欢 法国 是因为找不到任何讨厌这里的理由，他的一切汇聚成了我的乌托邦。 走过 法国 的边远小镇，素未谋面的擦肩流露着微笑，一句亲切的Bonjour就是 法国 人的常态。无论是C'est La Vie还是Oh la la，这句常挂在 法国 人嘴边的口头禅，道尽了对生活某些时</p>
                  <div class="item-bottom">
                    <span>1111浏览</span>
                    <span>
                      harry
                      <img src="../assets/images/qq.png" alt />
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
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      list: [],
      loading: false,
      finished: false
    }
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
    }
  },
  mounted () {}
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ff9e03;
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
          img{
            width: 130px;
            height: 90px;
          }
          .item-r{
            position: relative;
            margin-left: 15px;
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
                  vertical-align: middle;
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
