import axios from 'axios'

const searchNewsRequest = axios.create({
  baseURL: 'https://newsapi.org/v2/everything',
  headers: { 'X-Api-Key': '0a6fe3ea19534aad8a9ac93a90ab445d' }
})

searchNewsRequest.interceptors.response.use((response) => {
  return {
    data: response.data
  }
}, (error) => {
  if (error.response) {
    return {
      err: {
        type: 'status',
        StatusCode: error.response.status,
        Message: error.response.data.message
      }
    }
  }
})

export const apiGetNewsList = (params) => searchNewsRequest.get(null, { params })
