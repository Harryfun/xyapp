<template>
  <div class="home">
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <a href="#">
      我是谁？
      <span>我是皮卡丘Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores cupiditate dolorem adipisci in quae magnam mollitia culpa dolorum necessitatibus eligendi tenetur voluptate, dicta error quia amet, laborum omnis hic aliquid!</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      currentDate: new Date()
    }
  },
  mounted () {
    window.console.log(1)
  }
}
</script>

<style lang="less" scoped>
a {
  display: block;
  width: 375px/2;
  height: 375px;
  background-color: #0a0;
  span {
    font-size: 20px;
  }
}
</style>
