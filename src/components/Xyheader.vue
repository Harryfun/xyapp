<template>
    <div class="xyheader">
     <header>
        <slot>
          <div class="logo" @click="toIndex"></div>
        </slot>
        <div class="header-right">
            <router-link to="/">官网首页</router-link>
            <i class="iconfont iconsousuo"></i>
        </div>
     </header>
    </div>
</template>

<script>
export default {
  name: 'xyheader',
  data () {
    return {

    }
  },
  methods: {
    toIndex () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
header {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #fff;
    font-size: 16px;
    border: 1px solid #ccc;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 99;
    color: @xy-color;
    .logo {
      width: 135px;
      height: 50px;
      background: url(../assets/images/logo.jpg) no-repeat;
      background-size: 120px 33px;
      background-origin: content-box;
      padding: 7px 10px;
    }
    .header-right{
        display: flex;
        width: 40%;
        justify-content: space-around;
        i{
            font-size: 20px;
        }
    }
  }
</style>
