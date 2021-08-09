<template>
  <div class="footer">
    <button v-show="page !== 1" @click="page -= 1">＜</button>
    <ul class="page-container">
      <template v-for="number of canShowPageNumber">
        <li
          v-if="
            number > (pageRound - 1) * isShowPage &&
            number <= pageRound * isShowPage
          "
          :key="number"
          :class="{ 'text-blue': number !== page }"
          @click="page = number"
        >
          {{ number }}
        </li>
      </template>
    </ul>
    <button v-show="page !== pageNumber" @click="page += 1">＞</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    pageSize: {
      type: Number,
      required: true
    },
    isShowPage: {
      type: Number,
      required: true
    },
    searchHandler: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      page: 1, // 當前頁數
      pageRound: 1 // 頁數幾輪 ex 1-10 第一輪 11-20 第二輪
    }
  },
  computed: {
    ...mapState(['pageNumber']),
    canShowPageNumber () {
      let numberPage = 0
      if (!this.pageNumber) return numberPage
      numberPage = this.pageRound * this.isShowPage
      numberPage = numberPage > this.pageNumber ? this.pageNumber : numberPage
      return numberPage
    }
  },
  watch: {
    page: {
      handler (val) {
        if (val % this.isShowPage === 1 && val > this.canShowPageNumber) { this.pageRound++ }
        if (val % this.isShowPage === 0 && val < this.canShowPageNumber) { this.pageRound-- }
        this.searchHandler(val)
      }
    }
  }
}
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: center;
  .page-container {
    list-style: none;
    padding-left: 0;
    display: flex;
    justify-content: center;
    margin: 0;
    li {
      padding: 8px;
    }
  }
  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    &:focus {
      outline: transparent;
    }
    &:active {
      color: blue;
    }
  }
}
</style>
