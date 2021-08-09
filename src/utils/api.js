import axios from 'axios'

const searchNewsRequest = axios.create({
  baseURL: 'https://newsapi.org/v2/everything',
  headers: { 'X-Api-Key': '85de3cdb01284c3482c4e1ad942cc1d7' }
})

export const apiGetNewsList = (params) => searchNewsRequest.get(null, { params })
