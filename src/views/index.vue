<template>
  <div>
    <header class="header">
      <h2>Everything News</h2>
      <div class="search-container">
        <div class="input-wrapper">
          <input type="text" v-model="searchNews">
          <button><img class="icon-image" src="../assets/img/cancel.svg"></button>
        </div>
        <button @click="searchHandler()"><img class="icon-image" src="../assets/img/loupe.svg"></button>
      </div>
    </header>
    <main>
      <ul class="news-list">
        <li><NewsCard /></li>
      </ul>
    </main>
    <footer v-if="canShowPageNumber > 0" class="footer">
      <button v-show="page !== 1" @click="page -= 1">＜</button>
      <ul class="page-container">
        <template v-for="number of canShowPageNumber">
          <li
          v-if="number > (pageRound - 1) * isShowPage && number <= pageRound * isShowPage"
          :key="number"
          :class="{'text-blue': number !== page}"
          @click="page = number">
          {{ number }}
          </li>
        </template>
      </ul>
      <button v-show="page !== pageNumber" @click="page += 1">＞</button>
    </footer>
  </div>

</template>

<script>
import { apiGetNewsList } from '../utils/api'
import NewsCard from '../components/newsCard'
export default {
  components: {
    NewsCard
  },
  data () {
    return {
      searchNews: 'COVID-19',
      pageNumber: 29, // 總頁數
      pageSize: 20, // 幾筆數量
      page: 1, // 當前頁數
      isShowPage: 10, // 一次顯示幾頁
      pageRound: 1 // 頁數幾輪 ex: 1-10 第一輪 11-20 第二輪
    }
  },
  computed: {
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
        if (val % this.isShowPage === 1 && val > this.canShowPageNumber) this.pageRound += 1
        if (val % this.isShowPage === 0 && val < this.canShowPageNumber) this.pageRound -= 1
        // this.searchHandler(val)
      }
    }
  },
  methods: {
    async searchHandler (page = 1) {
      this.page = page
      const params = {
        q: this.searchNews,
        pageSize: this.pageSize,
        page
      }
      const newsList = await apiGetNewsList(params)
      if (newsList.data.totalResults % this.pageSize === 0) {
        this.pageNumber = newsList.data.totalResults / this.pageSize
      } else {
        this.pageNumber = Math.trunc(newsList.data.totalResults / this.pageSize) + 1
      }
    }
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
  .search-container{
    display: flex;
    width: 60%;
    margin: 0 auto;
    border-radius: 10px;
    border: 1px solid #a5a5a5;
    >button{
      width: 5%;
      padding: 0 4px;
      margin-right: 8px;
      object-fit: cover;
      .icon-image{
        width: 50%;
        height: 50%;
      }
    }
    .input-wrapper{
      flex: 1;
      padding-left: 8px;
      display: flex;
      input{
        border-radius: 10px;
        width: 90%;
        outline: none;
        padding-left: 8px;
        border: 0;
      }
      >button{
        margin-left: 8px;
        .icon-image{
          width: 12px;
          height: 12px;
        }
      }
      &::after{
        content: '';
        display: inline-block;
        width: 1px;
        background: #dbdbdb;
        height: 100%;
        margin-left: 16px
      }
    }
    button{
      background-color: transparent;
      border: 0;
    }
  }
}
.news-list{
  list-style: none;
  text-align: center;
  padding: 0;
  li{
    margin: 8px;
  }
}
.footer{
  display: flex;
  justify-content: center;
  .page-container{
    list-style: none;
    padding-left: 0;
    display: flex;
    justify-content: center;
    margin: 0;
    li{
      padding: 8px;
    }
  }
  button{
    background-color: transparent;
    border: 0;
    cursor: pointer;
    &:focus{
      outline: transparent;
    }
    &:active{
      color: blue;
    }
  }
}
.text-blue{
  color: rgb(142, 142, 250);
  cursor: pointer;
}
</style>
