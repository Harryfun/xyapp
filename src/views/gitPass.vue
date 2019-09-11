<template>
  <div class="git">
      <Loading></Loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations(['changeload'])
  },
  components: {
    Loading
  },
  mounted () {
    this.changeload(true)
  }
}
</script>

<style>

</style>
