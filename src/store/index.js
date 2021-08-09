import Vue from 'vue'
import Vuex from 'vuex'
import { apiGetNewsList } from '../utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [], // 文章列表
    pageNumber: 0, // 總頁數
    totalResults: 0 // 文章總數量
  },
  mutations: {
    SET_ARTICLES (state, payload) {
      state.articles = payload
    },
    SET_PAGE_NUMBER (state, payload) {
      state.pageNumber = payload
    },
    SET_TOTAL_RESULTS (state, payload) {
      state.totalResults = payload
    }
  },
  actions: {
    async getArticles ({ commit }, params) {
      try {
        const result = await apiGetNewsList(params)
        if (result.data) {
          commit('SET_ARTICLES', result.data.articles)
          commit('SET_TOTAL_RESULTS', result.data.totalResults)
          commit('SET_PAGE_NUMBER', Math.ceil(result.data.totalResults / params.pageSize))
        }
        return result
      } catch (error) {
        return {
          err: {
            type: 'error',
            message: error.message
          }
        }
      }
    }
  },
  modules: {
  }
})
