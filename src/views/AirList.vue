<template>
    <div class="airList">
      {{airInfo}}
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'airList',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['airInfo'])

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>

</style>
