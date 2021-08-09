<template>
  <div class='card-detail-wrapper'>
    <div class="card-detail-header">
      <h2>{{ title }}</h2>
      <button class="back-button" @click="$router.go(-1)"><img src="../assets/img/back.svg" alt=""></button>
    </div>
    <div class="card-detail-created">{{ publishedAt + ' / ' + author }}</div>
    <div class="card-detail-main">
      <div class="card-detail-image"><img :src="urlToImage"></div>
      <p class="card-detail-content" v-html="content"></p>
    </div>
    <div>《 Source Name: {{ sourceName }} 》</div>
  </div>
</template>

<script>
export default {
  data () {
    const Params = this.$route.params
    const LoaclCardDetail = JSON.parse(window.localStorage.getItem('CardDetail'))
    return {
      author: Params.author || LoaclCardDetail.author,
      publishedAt: Params.publishedAt || LoaclCardDetail.publishedAt,
      urlToImage: Params.urlToImage || LoaclCardDetail.urlToImage,
      title: Params.title || LoaclCardDetail.title,
      content: Params.content || LoaclCardDetail.content,
      sourceName: Params.sourceName || LoaclCardDetail.sourceName
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!window.localStorage.getItem('CardDetail')) next({ name: 'Index' })
    next()
  }
}
</script>

<style lang="scss">
.card-detail-wrapper{
  max-width: 800px;
  border: 1px solid #dbdbdb;
  margin: 16px auto;
  padding: 16px 32px;
  .card-detail-header{
    display: flex;
    button{
      width: 10%;
      background-color: transparent;
      border: 0;
      transition: transform .5s;
      cursor: pointer;
      &:focus{
        outline: none;
      }
      &:active{
        transform: scale(.8);
      }
      img{
        width: 70%;
        height: 70%;
      }
    }
    h2{
      width: 90%;
      margin-top: 0;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #dbdbdb;
    }
  }
  .card-detail-created{
    margin: 16px 0;
  }
  .card-detail-main{
    min-height: 300px;
    .card-detail-image{
      width: 50%;
      object-fit: cover;
      border: 10px solid #dbdbdb;
      float: right;
      margin: 0 0 16px 16px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .card-detail-content{
      word-break: break-all;
      margin: 16px 0;
    }
  }

}
</style>
