<template>
  <div class="login">
    <Loading></Loading>
    <!-- 头部logo -->
    <header>
      <div class="logo">
        <img src="../assets/images/logo.jpg" alt />
      </div>
    </header>
    <!-- 选项卡部分 -->
    <van-tabs color="#409eff" :animated="true" title-active-color="#409eff" ref="changetab">
      <van-tab title="普通登录">
        <div class="form-container">
          <van-field v-model="loginData.username" clearable placeholder="您的邮箱/手机号" />
          <van-field v-model="loginData.password" type="password" placeholder="您的密码" />
        </div>
        <div class="btns">
          <van-button type="primary" size="large" @click="login">登录</van-button>
          <van-button type="primary" size="large" class="wait-btn" @click="changetab('reg')">快速注册</van-button>
        </div>
      </van-tab>
      <van-tab title="快速注册">
        <div class="form-container">
          <van-field v-model="regData.username" clearable placeholder="您的邮箱/手机号" />

          <van-field v-model="regData.captcha" center clearable placeholder="请输入短信验证码">
            <van-button slot="button" size="small" type="primary" class="yzm" @click="getCode">发送验证码</van-button>
          </van-field>

          <van-field v-model="regData.password" type="password" placeholder="您的密码" />
          <van-field v-model="regData.nickname" clearable placeholder="您的昵称" />
        </div>
        <div class="btns">
          <van-button type="primary" size="large" @click="reg">快速注册</van-button>
          <van-button type="primary" size="large" class="wait-btn" @click="changetab('login')">登录</van-button>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 底部第三方登录 -->
    <footer>
      <van-divider>使用第三方账号登录</van-divider>
      <div class="footer-content">
        <div class="git" @click="toGit">
          <img src="http://img0.imgtn.bdimg.com/it/u=3000368218,295699058&fm=26&gp=0.jpg" alt />
          github登录
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getCode, register, login, getGitUrl, gitReg } from '@/api/login'
import Loading from '@/components/Loading.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  components: {
    Loading
  },
  data () {
    return {
      loginData: {
        username: '17611111111',
        password: '111111'
      },
      regData: {
        username: '17611111111',
        password: '111111',
        nickname: '松野君',
        captcha: '000000'
      },
      gitUrl: ''
    }
  },
  methods: {
    ...mapMutations(['changeToken']),
    getCode () {
      let data = {
        tel: this.regData.username
      }
      getCode(data)
        .then(res => {
          console.log(res)
          this.$notify({
            message: `您的验证码是${res.data.code}`,
            duration: 2000,
            background: '#409eff'
          })
        })
        .catch(err => {
          throw err
        })
    },
    reg () {
      register(this.regData)
        .then(res => {
          if (res.status === 200) {
            this.$notify({
              message: `注册成功，2s后跳转登录页面`,
              duration: 2000,
              background: '#409eff'
            })
            setTimeout(() => {
              this.changetab('login')
            }, 1500)
          }
          console.log(111)
        })
        .catch(err => {
          this.$store.commit('changeload', false)
          this.$notify({
            message: err.response.data.message,
            duration: 2000,
            background: '#dc2727'
          })
        })
    },
    login () {
      let jumpName = '首页'
      let pathName = 'home'
      login(this.loginData)
        .then(res => {
          this.changeToken({ userInfo: res.data.user, userToken: res.data.token })
          console.log(this.$route.params.air)
          // 判断如果是从air过来的，则直接跳到airOrder页面
          if (this.$route.params.air === true) {
            jumpName = '机票下单页'
            pathName = 'airOrder'
          }
          this.$notify({
            message: `欢迎您${res.data.user.nickname},1s后将跳转${jumpName}`,
            duration: 2000,
            background: '#409eff'
          })
          setTimeout(() => {
            this.$router.push({ name: pathName })
          }, 1000)
        })
        .catch(err => {
          this.$store.commit('changeload', false)
          this.$notify({
            message: err.response.data.message,
            duration: 2000,
            background: '#dc2727'
          })
        })
    },
    changetab (dom) {
      let ele = this.$refs.changetab.$el.children[0].children[0].children
      if (dom === 'login') {
        ele[0].click()
      } else {
        ele[1].click()
      }
    },
    toGit () {
      location.href = this.gitUrl
    },
    // 判断是否拿到code
    getUrlCode () {
      // console.log(location.href.slice(location.href.indexOf('code')).split('&')[0].split('=')[1])
      let code = location.href.slice(location.href.indexOf('code')).split('&')[0].split('=')[1]
      if (code) {
        let data = {
          code
        }
        gitReg(data).then(res => {
          this.changeToken({ userInfo: res.data.gitUser, userToken: res.data.token })

          this.$notify({
            message: `欢迎您${res.data.gitUser.nickname},1s后将跳转首页`,
            duration: 2000,
            background: '#409eff'
          })
          setTimeout(() => {
            location.href = 'http://192.168.0.106:8080/'
          }, 1000)
        })
      }
    }
  },
  mounted () {
    this.getUrlCode()
    getGitUrl().then(res => {
      this.gitUrl = res.data.url
    })
  }
}
</script>
<style lang="less" scoped>
@xy-color: #409eff;
.login {
  padding: 0 10px;
  header {
    .logo {
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        height: 50px;
        width: 180px;
      }
    }
  }
  /deep/.van-tabs__line {
    width: 50% !important;
    height: 3px !important;
    top: -3px;
  }
  /deep/.van-tabs__nav.van-tabs__nav--line {
    border-top: 4px solid #ccc !important;
  }
  .form-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px auto;
    overflow: hidden;
    width: 99%;
  }
  /deep/.van-cell.van-field {
    border-bottom: 1px solid #ccc;
    margin: 0;
    &:last-child {
      border-bottom: none;
    }
    .yzm {
      background-color: @xy-color;
      border-radius: 3px;
      border-color: @xy-color;
    }
  }
  .btns {
    .van-button {
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      background-color: @xy-color;
      border-color: @xy-color;
      margin-bottom: 15px;
      &.wait-btn {
        background-color: #fff;
        color: @xy-color;
      }
    }
  }
  footer {
    /deep/.van-divider {
      font-size: 12px;
      color: #bbb;
    }
    /deep/.van-divider::before,
    .van-divider::after {
      border-color: #bbb;
    }
    .footer-content {
      display: flex;
      justify-content: center;
      > div {
        width: 90%;
        height: 96px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
        text-align: center;
        color: #666;
      }
      img {
        display: block;
        width: 75px;
        height: 49.5px;
        margin: 10px auto 4px;
      }
    }
  }
}
</style>
