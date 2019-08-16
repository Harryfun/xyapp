<template>
  <div class="filter">
    <header>
        <span @click="clearOut">取消</span>
        <span @click="clearAll">清除全部</span>
    </header>
    <div class="item">
      <h4>价格</h4>
      <van-slider
        v-model="hotelOpt.price_lt"
        active-color="#409eff"
        :min="0" :max="2000"
      >
        <div
          slot="button"
          class="custom-button"
        >
          {{ hotelOpt.price_lt }}
        </div>
      </van-slider>
    </div>
    <div class="item">
      <van-field
        readonly
        clickable
        label="酒店等级"
        :value="current.levels"
        placeholder="请选择酒店等级"
        @click="showPicker(['hotellevel','levels'])"
      />
    </div>
    <div class="item">
      <van-field
        readonly
        clickable
        label="酒店类型"
        :value="current.types"
        placeholder="请选择酒店类型"
        @click="showPicker(['hoteltype_in','types'])"
      />
    </div>
    <div class="item">
      <van-field
        readonly
        clickable
        label="酒店设施"
        :value="current.assets"
        placeholder="请选择酒店设施"
        @click="showPicker(['hotelasset_in','assets'])"
      />
    </div>
    <div class="item">
      <van-field
        readonly
        clickable
        label="酒店品牌"
        :value="current.brands"
        placeholder="请选择酒店品牌"
        @click="showPicker(['hotelbrand_in','brands'])"
      />
    </div>
    <van-popup v-model="isshowPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="picker.columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        :title="picker.title"
      />
    </van-popup>
    <button @click="subFilter">确定</button>
  </div>
</template>

<script>
import { getOptions } from '@/api/hotel'
export default {
  data () {
    return {
      // 酒店选项
      isshowPicker: false,
      options: {},
      hotelOpt: {
        // 酒店价格
        price_lt: 1000,
        // 酒店星级
        hotellevel: '',
        // 酒店型号
        hoteltype_in: '',
        // 酒店设施
        hotelasset_in: '',
        // 酒店品牌
        hotelbrand_in: ''
      },
      // 页面上显示内容
      current: {
        assets: '',
        brands: '',
        levels: '',
        types: ''
      },
      // 选择器数据
      picker: {
        columns: []
      },
      // 当前选项
      currentOpt: []
    }
  },
  methods: {
    //   获取酒店选项
    getOptions () {
      getOptions().then(res => {
        console.log(res)
        this.options = res.data.data
      })
    },
    showPicker (type) {
      this.isshowPicker = true
      this.currentOpt = type
      this.picker.columns = this.options[type[1]].map((v) => v.name)
    },
    init () {
      this.getOptions()
    },
    onConfirm (v, i) {
      this.isshowPicker = false
      this.hotelOpt[this.currentOpt[0]] = this.options[this.currentOpt[1]].map((v) => v.id)[i]
      this.current[this.currentOpt[1]] = this.options[this.currentOpt[1]].map((v) => v.name)[i]
    },
    onCancel () {
      this.isshowPicker = false
    },
    subFilter () {
      let temp = { ...this.hotelOpt }
      for (let prop in temp) {
        if (temp[prop] === '') {
          delete temp[prop]
        }
      }
      this.$emit('out', temp)
    },
    clearOut () {
      this.clearAll()
      this.$emit('out')
    },
    clearAll () {
      this.current = {
        assets: '',
        brands: '',
        levels: '',
        types: ''
      }
      this.hotelOpt = {
        price_lt: 1000,
        hotellevel: '',
        hoteltype_in: '',
        hotelasset_in: '',
        hotelbrand_in: ''
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@xy-color: #409eff;
.filter{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
button{
  position: fixed;
  height: 50px;
  font-size: 18px;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #fff;
  background-color: @xy-color;
}
header{
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 0 10px;
}
.item{
  h4{
    font-size: 14px;
    color: #323233;
    padding-left: 15px;
  }
  /deep/.van-slider{
    margin: 20px;
  }
  .custom-button{
    font-size: 15px;
    background-color: @xy-color;
    color: #fff;
    padding: 3px 4px 2px;
    border-radius: 10px;
  }
}
</style>
