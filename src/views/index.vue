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
    </header>
    <!-- tool start -->
    <Tool :totalResults="totalResults" :sortBy.sync="sortBy" :searchDate.sync="searchDate" />
    <!-- tool stop -->
    <main>
      <ul class="news-list" v-if="articles.length > 0">
        <li v-for="(article, index) of articles" :key="article.source.id + index">
          <NewsCard v-bind="article" />
        </li>
      </ul>
    </main>
    <Pagination v-if="totalResults > 0" :pageSize="pageSize" :isShowPage="isShowPage" :searchHandler="searchHandler" />
    <Loading v-show="loading" />
    <ErrorPopup v-if="errorMessageShow" :message="errorMessage" />
  </div>
</template>

<script>
import NewsCard from '../components/newsCard'
import Pagination from '../components/pagination'
import Loading from '../components/loading'
import ErrorPopup from '../components/errorPopup'
import Tool from '../components/tool'
import { mapState } from 'vuex'
export default {
  name: 'Index',
  components: {
    NewsCard,
    Pagination,
    Tool,
    Loading,
    ErrorPopup
  },
  data () {
    return {
      loading: false,
      searchNews: 'COVID-19',
      searchDate: [],
      sortBy: '',
      pageSize: 20, // 幾筆數量
      isShowPage: 5, // 一次顯示幾個頁碼
      errorMessageShow: false,
      errorMessage: '', // 錯誤訊息
      timer: 0 // setTimeout 時間
    }
  },
  computed: {
    ...mapState(['articles', 'totalResults'])
  },
  methods: {
    async searchHandler (page = 1) {
      const params = {
        q: this.searchNews,
        pageSize: this.pageSize,
        page
      }
      if (this.sortBy) params.sortBy = this.sortBy
      if (this.searchDate.length > 0) {
        params.from = this.searchDate[0]
        params.to = this.searchDate[1]
      }
      this.loading = true
      const result = await this.$store.dispatch('getArticles', params)
      this.loading = false
      if (result.err) {
        this.errorMessageShow = true
        switch (result.err.type) {
          case 'status':
            this.errorMessage = `${result.err.type}: ${result.err.StatusCode} ${result.err.Message}`
            break
          case 'error':
            this.errorMessage = `${result.err.type}: ${result.err.Message}`
        }
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.errorMessageShow = false
        }, 3000)
      }
    },
    clearToolValue () {
      this.searchDate = []
      this.sortBy = ''
    }
  },
  created () {
    // this.searchHandler()
  },
  activated () {
    if (this.timer) clearTimeout(this.timer)
    window.localStorage.removeItem('CardDetail')
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
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
.search-tool{
    width: 60%;
    margin: 16px auto;
    text-align: right;
    border-bottom: 1px solid #dbdbdb;
    padding: 8px 0;
    button{
      cursor: pointer;
      box-shadow: 0 2px 5px 1px rgb(199, 199, 199);
    }
    .tool-btn{
      border-color: transparent;
      background-color: transparent;
      box-shadow: none;
      &:focus{
        outline: none;
      }
    }
  }
.search-result{
    width: 60%;
    margin: 8px auto;
    height: 40px;
    line-height: 40px;
    color: rgb(150, 150, 150);
  }
  .tool-wrapper{
    display: flex;
    width: 60%;
    height: 40px;
    margin: 8px auto;
    .tool-sort{
      margin-right: 16px;
    }
    button{
      margin-left: 16px;
      cursor: pointer;
      border: transparent;
      background-color: transparent;
      height: 100%;
      &:hover{
        opacity: .5;
      }
      &:focus{
        outline: none;
      }
      &:active{
        transform: scale(.9);
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

.text-blue {
  color: rgb(142, 142, 250);
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
