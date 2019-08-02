<template>
    <div class="calendar">
        <van-tabs>
            <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
               <van-steps direction="vertical" :active="0">
                <van-step>
                    <h3>【城市】物流状态{{index}}</h3>
                    <p>2016-07-12 12:40</p>
                </van-step>
                <van-step>
                    <h3>【城市】物流状态2</h3>
                    <p>2016-07-11 10:00</p>
                </van-step>
                <van-step>
                    <h3>快件已发货</h3>
                    <p>2016-07-10 09:30</p>
                </van-step>
                </van-steps>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
  name: 'calender',

  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.calendar{
    width: 100%;
    height: 100% ;
    background: #309296 url('../assets/images/bg.png') no-repeat center top;
    background-size: 100% auto;
    // background-attachment: fixed;
    overflow: scroll;
    /deep/.van-tabs__nav,.van-steps{
        background-color: transparent;
    }
    &::before{
        content:'';
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        background: url('../assets/images/cal-bg.jpg') no-repeat;
        background-size: cover;
        opacity: .08;
    }
}
</style>
