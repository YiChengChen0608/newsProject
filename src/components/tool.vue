<template>
  <div>
    <div class="search-tool">
      <button :class="{ 'tool-btn': !toolShow }" @click="toolShow = !toolShow">Tool</button>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="!toolShow" class="search-result" key="result">about {{ totalResults }} result</div>
      <div v-else class="tool-wrapper" key="tool">
        <el-select class="tool-sort" :value="sortBy" @change="changeSortByValue($event)" clearable placeholder="Choose">
          <el-option
            v-for="item in sortItem"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="datePicker"
          type="daterange"
          range-separator="~"
          start-placeholder="start"
          end-placeholder="end"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="(value)=>changeDateValue(value)"
          >
        </el-date-picker>
        <button @click="clearToolValue">clear</button>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    totalResults: {
      type: Number,
      required: true
    },
    sortBy: {
      type: String,
      defalut: ''
    },
    searchDate: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      toolShow: false,
      datePicker: [],
      sortItem: [
        {
          value: 'relevancy',
          label: 'relevancy'
        },
        {
          value: 'popularity',
          label: 'popularity'
        },
        {
          value: 'publishedAt',
          label: 'publishedAt'
        }
      ],
      pickerOptions: {
        disabledDate (time) {
          const maxTime = moment().endOf('day')
          return moment(time) > maxTime
        }
      }
    }
  },
  methods: {
    clearToolValue () {
      this.datePicker = []
      this.$emit('update:sortBy', '')
      this.$emit('update:searchDate', [])
    },
    changeSortByValue (value) {
      this.$emit('update:sortBy', value)
    },
    changeDateValue (value) {
      this.$emit('update:searchDate', value)
    }
  }
}
</script>

<style>

</style>
