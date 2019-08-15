<template>
  <div class="search">
   <header>
     <input type="text" placeholder="搜索游记">
     <span @click="cancelSearch">取消</span>
   </header>
   <section>
     <img src="../assets/images/searchdefault.gif" alt="">
   </section>
  </div>
</template>

<script>
export default {
  name: 'Search',
  methods: {
    cancelSearch () {
      this.$emit('cancelSearch')
    }
  }
}
</script>

<style scoped lang="less">
@xy-color: #409eff;
.search{
  position: fixed;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
  padding: 8px;
  font-size: 14px;
  header{
    position: relative;
      &::before{
      content: "\e611";
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      font-family: "iconfont" !important;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
    }
    input{
      width: 320px;
      height: 30px;
      background: #ececec;
      border: 0;
      outline: 0;
      border-radius: 6px;
      padding-left: 30px;
      margin-right: 5px;
    }
    span{
      color: @xy-color;
    }
  }
}

</style>
