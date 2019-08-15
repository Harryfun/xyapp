<template>
    <div class="air-header">
        <header>
        <i class="iconfont iconfanhui1" @click="$router.push({name:address})"></i>
            {{come}}
        <i class="iconfont iconchufadaodaxiao"></i>
            {{go}}
      </header>
    </div>
</template>

<script>
export default {
  name: 'air-header',
  props: {
    come: {
      type: String,
      required: true
    },
    go: {
      type: String,
      required: true
    },
    // 返回上一页的地址
    address: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
  @xy-color: #409eff;
 header{
    background-color: @xy-color;
    font-size: 16px;
    color: #fff;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    position: fixed;
    top: 0;
    i.iconfanhui1{
      position: absolute;
      top: 0px;
      left: 10px;
    }
    i.iconchufadaodaxiao{
      padding: 0 8px 0 10px;
    }
  }
</style>
