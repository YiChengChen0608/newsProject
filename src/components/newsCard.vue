<template>
  <div class="card-wrapper" @click="showNewsDetail">
    <div class="card-content">
      <div class="content-main">
        <h2>
          {{ title }}
        </h2>
        <p v-html="description"></p>
      </div>
      <div class="content-footer">
        <div>PublishedAt: {{ getPublishedAt }}</div>
        <div v-if="author">Author: {{ author }}</div>
      </div>
    </div>

    <div class="image-wrapper" v-if="urlToImage">
      <img :src="urlToImage" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    author: {
      type: String,
      default: ''
    },
    publishedAt: {
      type: String,
      required: true
    },
    urlToImage: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    source: {
      type: Object,
      required: true
    }
  },
  computed: {
    getPublishedAt () {
      return moment(this.publishedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    showNewsDetail () {
      const params = {
        author: this.author,
        publishedAt: this.getPublishedAt,
        urlToImage: this.urlToImage,
        title: this.title,
        content: this.content,
        sourceName: this.source.name
      }
      window.localStorage.setItem('CardDetail', JSON.stringify(params))
      this.$router.push({ name: 'CardDetail', params })
    }
  }

}
</script>

<style lang="scss">
.card-wrapper {
  display: flex;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 24px;
  cursor: pointer;
  &:hover h2{
    color: rgb(3, 98, 175)
  }
  .card-content {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .content-main{
      text-align: left;
      h2{
        margin: 0;
      }
    }
    .content-footer {
      display: flex;
      padding-right: 16px;
      text-align: left;
      height: 20px;
      div{
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .image-wrapper {
    width: 30%;
    img {
      border-radius: 10px;
      border: 1px solid transparent;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
