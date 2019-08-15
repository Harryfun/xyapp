<template>
    <div class="amap-page-container">
    <XyHeader>
        <i class="iconfont iconfanhui" @click="$router.back(-1)"></i>
    </XyHeader>
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
        <el-amap-info-window  :position="mywindow.position" :content="mywindow.content" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
        <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>

      </el-amap>
    </div>
</template>

<style scoped>
  .iconfont{
        font-weight: 600;
        margin-left: 20px;
    }
 .amap-page-container {
    height: 100%;
  }
  /deep/.amap-info-content.amap-info-outer{
      font-size: 16px;
      padding: 10px 20px 10px 12px;
  }
  /deep/.amap-info-contentContainer{
      transform: translate(15px,-16px)
  }

</style>

<script>
import XyHeader from '@/components/Xyheader.vue'
import AMap from 'vue-amap'
AMap.initAMapApiLoader({
  key: 'e1e61e5025f6ae08e31cbad3a2fd3a04',
  plugin: ['AMap.Geolocation'],
  v: '1.4.4'
})
export default {
  components: {
    XyHeader
  },
  data () {
    return {
      zoom: 15,
      center: [118.8718107, 31.32846821],
      marker: {
        position: [118.8718107, 31.32846821],
        events: {
          click: () => {
            if (this.mywindow.visible === true) {
              this.mywindow.visible = false
            } else {
              this.mywindow.visible = true
            }
          },
          dragend: (e) => {
            this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
          }
        },
        visible: true,
        draggable: false
      },
      mywindow: {
        position: [118.8718107, 31.32846821],
        content: '宾馆',
        visible: true,
        events: {
          close () {
            this.mywindow.visible = false
          }
        }
      },
      plugin: {
        pName: 'Scale',
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      },
      location: [],
      name: ''
    }
  },
  created () {
    this.location = this.$route.params.location
    this.name = this.$route.params.name
    this.center = [this.location.longitude, this.location.latitude]
    this.marker.position = this.center
    this.mywindow.position = this.center
    this.mywindow.content = this.name
  }
}
</script>
