<template>
    <div class="airOrder">
airOrder
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'airOrder',
  computed: {
    ...mapState(['airOrder'])
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    console.log(this.airOrder)
  }
}
</script>

<style lang="less" scoped>

</style>
