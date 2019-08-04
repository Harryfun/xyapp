<template>
    <div class="loading" v-show="loadShow">
        <img src="../assets/images/loading2.gif" alt="">
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'loading',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['loadShow'])
  }
}
</script>

<style lang="less" scoped>
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(107, 195, 211, 0.2);
        img{
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%);
            width: 100px;
        }
    }
</style>
