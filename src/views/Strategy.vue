<template>
    <div class="strategy">
      <Loading></Loading>
      <Xyheader></Xyheader>
      <div class="content" v-if="detail">
        <div class="date">
        <div class="date-title">
          <div class="title-left">
            29
          </div>
          <div class="title-right">
            <div class="title-top">
              2019
            </div>
            <div class="title-bottom">
              JUL
            </div>
          </div>
        </div>
        <span>云首纪念</span>
      </div>

      <div class="banner">
        <img :src="detail.images[0]" alt="">
      </div>
      <article>
        <div class="art-title">
          {{detail.title}}
        </div>
        <div class="sub-title">
          <span class="time">19:10:29</span>
          <span class="watch">浏览 · <strong>{{detail.watch}}</strong></span>
          <span class="reply">回复 · <strong>{{detail.comments.length}}</strong></span>
        </div>
        <div class="art-header">
          <div class="avatar">
            <img :src="'http://127.0.0.1:1337'+detail.account.defaultAvatar" alt="">
          </div>
          <div class="info">
            <div class="nickname">{{detail.account.nickname}} <span>Lv.15</span></div>
            <div class="fans">3篇游记，203粉丝</div>
          </div>
          <div class="place">
            顺德
          </div>
        </div>
        <article v-html="detail.content">

        </article>
      </article>

      <div class="tool">
        <div class="top"><i class="iconfont iconliubianxinghao1"></i> 2175</div>
        <div class="cate"><i class="iconfont iconmulu1"></i>目录</div>
        <div class="reply"><i class="iconfont iconhuifu1"></i><span>{{detail.comments.length}}</span></div>
      </div>
      </div>
    </div>
</template>

<script>
import { getPosts } from '@/api/index'
import Xyheader from '@/components/Xyheader.vue'
import Loading from '@/components/Loading.vue'
export default {
  name: 'strategy',
  data () {
    return {
      detail: null
    }
  },
  components: {
    Xyheader,
    Loading
  },
  methods: {
    init () {
      let id = this.$route.params.id
      getPosts({ id: id }).then((res) => {
        this.detail = res.data.data[0]
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.strategy{
  padding-top: 50px;
  .content{
    .date{
    color: #008489;
    text-align: center;
    padding-bottom: 20px;
    .date-title{
      display: flex;
      justify-content: center;
      padding: 20px 0 0;
      .title-left{
        font-size: 65px;
        line-height: 55px;
        font-weight: 600;
        padding: 0 5px;
        border-left: 4px solid #008489;
        border-right: 4px solid #008489;
      }
      .title-right{
        border-right: 4px solid #008489;
        padding: 0 15px;
        font-size: 28px;
        text-align: center;
      }
    }
    >span{
      font-weight: 600;
      font-size: 40px;
    }
  }
  >article{
    padding: 20px;
    .art-title{
      font-size: 28px;
      line-height: 1.2;
      font-weight: 600;
      padding-bottom: 20px;
    }
    .sub-title{
      font-size: 12px;
      >.time{
        font-weight: 600;
        padding-right: 20px;
      }
      >.watch{
        padding-right: 10px;
      }
    }
    .art-header{
      display: flex;
      align-items: center;
      font-size: 18px;
      margin: 18px 0;
      .avatar{
        width: 65px;
        height: 65px;
        border-radius: 50%;
        overflow: hidden;
      }
      .info{
        flex: 15%;
        margin-left: 6px;
        .nickname{
          >span{
            border: 1px solid #ccc;
            background-color: #ffed92;
            font-size: 14px;
            padding: 2px;
            vertical-align: top;
          }
        }
        .fans{
          font-size: 13px;
          margin-top: 6px;
        }
      }
      .place{
        flex: 1;
        font-size: 40px;
        text-align: right;
        line-height: 1.1;
        border-left: 1px solid #ccc;
      }
    }
  }
  .tool{
    display: flex;
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 60%;
    height: 56px;
    border-radius: 0 28px 28px 0;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
    background-color: #fff;
    font-size: 16px;
    align-items: center;
    color: @xy-color;
    .top{
      position: relative;
      display: flex;
      align-items: center;
      padding-right: 12px;
      >i{
        font-size: 46px;
      }
      &::after{
        content:'顶';
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 17px;
        font-weight: 300;
        color: #fff;
      }
    }
    .cate{
      display: flex;
      align-items: center;
      >i{
        font-size: 28px;
        padding-right: 6px;
      }
    }
    .reply{
      padding-left: 10px;
      position: relative;
      >i{
        font-size: 32px;
      }
      >span{
        position: absolute;
        top: -4px;
        right: -6px;
        background-color: #f00;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        padding: 0 4px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
  }
}
</style>
