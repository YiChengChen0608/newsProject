<template>
  <div>
    <header class="header">
      <h2>Everything News</h2>
      <div class="search-container">
        <div class="input-wrapper">
          <input type="text" v-model="searchNews" />
          <button v-if="searchNews" @click="searchNews = ''">
            <img class="icon-image" src="../assets/img/cancel.svg" />
          </button>
        </div>
        <button @click="searchHandler()">
          <img class="icon-image" src="../assets/img/loupe.svg" />
        </button>
      </div>
      <div class="search-tool">
        <button>Tool</button>
      </div>
    </header>
    <transition>
      <div v-if="totalResult > 0" class="search-result">about {{ totalResult }} result</div>
      <div class="tool-wrapper">
        <select class="tool-sort">
          <option hidden>Choose</option>
          <option value="relevancy">relevancy</option>
          <option value="popularity">popularity</option>
          <option value="publishedAt">publishedAt</option>
        </select>
      </div>
    </transition>
    <main>
      <ul class="news-list">
        <li v-for="(article, index) of articles" :key="article.source.id + index">
          <NewsCard v-bind="article" />
        </li>
      </ul>
    </main>
    <footer v-if="canShowPageNumber > 0" class="footer">
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
      articles: [],
      totalResult: 0,
      pageNumber: 0, // 總頁數
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
        if (val % this.isShowPage === 1 && val > this.canShowPageNumber) { this.pageRound++ }
        if (val % this.isShowPage === 0 && val < this.canShowPageNumber) { this.pageRound-- }
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
      this.articles = newsList.data.articles
      this.totalResult = newsList.data.totalResults
      this.pageNumber = Math.ceil(this.totalResult / this.pageSize)
    }
  },
  created () {
    window.localStorage.removeItem('CardDetail')
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
  border-bottom: 1px solid #dbdbdb;
  .search-tool{
    width: 60%;
    margin: 16px auto;
    text-align: right;
  }
  .search-container {
    display: flex;
    width: 60%;
    margin: 0 auto;
    border-radius: 10px;
    border: 1px solid #a5a5a5;
    box-shadow: 0 2px 5px 1px rgb(199, 199, 199);
    &:hover{
      box-shadow: 0 2px 5px 1px rgb(150, 150, 150);
    }
    > button {
      width: 10%;
      padding: 0;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        display: block;
        width: 1px;
        background: #dbdbdb;
        height: 100%;
      }
      .icon-image {
        width: 60%;
        height: 60%;
        margin: 0 auto;
      }
    }
    .input-wrapper {
      flex: 1;
      padding-left: 8px;
      display: flex;
      input {
        border-radius: 10px;
        width: 90%;
        outline: none;
        padding-left: 8px;
        border: 0;
        font-size: 1.25rem;
      }
      > button {
        width: 10%;
        padding: 0;
        transition: transform .5s ease-out;
        &:active{
        transform: scale(.7);
      }
        .icon-image {
          width: 12px;
          height: 12px;
        }
      }

    }
    button {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      &:focus{
        outline: none;
      }

    }
  }
}
.search-result{
  width: 60%;
  margin: 8px auto;
  color: rgb(150, 150, 150);
}
.tool-wrapper{
  width: 60%;
  margin: 8px auto;
  select{
    background: transparent;
    border: 0;
    &:focus{
      outline: 0;
    }
  }
}
.news-list {
  list-style: none;
  text-align: center;
  padding: 0;
  li {
    margin: 8px;
  }
}
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
.text-blue {
  color: rgb(142, 142, 250);
  cursor: pointer;
}
</style>
