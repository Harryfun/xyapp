<template>
  <div class="qrcode">
      <!-- <img :src="qrcodeImg" alt=""> -->
      <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'qrcode',
  props: {
    code_url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      qrcodeImg: ''
    }
  },
  methods: {
    init () {
    //   QRCode.toDataURL('I am a harry!', (err, url) => {
    //     if (err) throw err
    //     this.qrcodeImg = this.code_url
    //   })
      var canvas = document.getElementById('canvas')

      QRCode.toCanvas(canvas, this.code_url)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
    .qrcode{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        z-index: 123;
        text-align: center;

    }
</style>
