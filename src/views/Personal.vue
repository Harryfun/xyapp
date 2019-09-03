<template>
  <div class="user">
    <header>
        <div class="left">
            <i class="iconfont iconfanhui1" @click="$router.back(-1)"></i>
        </div>
       <div class="userInfo">
            <div class="avatar">
            <img :src="'http://157.122.54.189:9095'+userInfo.defaultAvatar" alt="">
        </div>
        <div class="nickname">{{userInfo.nickname}}</div>
       </div>
    </header>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待出行
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待评价
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        退款/售后
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link @click="$router.push(name='allorder')" />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="看游记" is-link />
      <van-cell icon="gold-coin-o" title="历历在目" is-link />
      <van-cell icon="gift-o" title="退出登录" is-link @click="logout"/>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Row, Col, Icon, Cell, CellGroup, Dialog } from 'vant'
export default {

  computed: {
    ...mapState(['userInfo'])

  },
  methods: {
    ...mapMutations(['clearToken']),
    logout () {
      Dialog.confirm({
        title: '退出登录',
        message: this.userInfo.nickname + ',您是否要退出当前登录用户？'
      }).then(() => {
        // on confirm
        this.$notify({
          message: `成功登出，1s后跳转首页`,
          duration: 2000,
          background: '#409eff'
        })
        setTimeout(() => {
          this.clearToken()
          this.$router.push({ name: 'home' })
        }, 1500)
      }).catch(() => {
        // on cancel
      })
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;

    header{
        width: 100%;
        height: 200px;
        background-color: #66ccff;
        padding: 0 10px;
        z-index: 99;
        border-bottom: 1px solid #eee;
        position: relative;
        .left{
            position: absolute;
            font-weight: 600;
            color: #fff;
            top: 20px;
            left: 20px;
        }
        .userInfo{
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translate(-50%);
        }
        .avatar{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;

        }
        .nickname{
            margin-top: 10px;
            font-size: 20px;
            text-align: center;
            color: #fff;
        }
    }
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
