import axios from 'axios'

const searchNewsRequest = axios.create({
  baseURL: 'https://newsapi.org/v2/everything',
  headers: { 'X-Api-Key': '0a6fe3ea19534aad8a9ac93a90ab445d' }
})

export const apiGetNewsList = (params) => searchNewsRequest.get(null, { params })
