<template>
  <div class="card-wrapper">
    <div class="card-content">
      <div class="content-main">
        <h2>
          {{ title }}
        </h2>
        <p>
          {{ description }}
        </p>
      </div>
      <div class="content-footer">
        <div>PublishedAt: {{ time }}</div>
        <div>Author: {{ author }}</div>
      </div>
    </div>

    <div class="image-wrapper">
      <img :src="urlToImage" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    author: {
      type: Number,
      required: true
    },
    publishedAt: {
      type: String,
      required: true
    },
    urlToImage: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      time: moment('2021-08-06T17:00:00Z').format('YYYY-MM-DD HH:mm:ss')
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
      justify-content: space-between;
      padding-right: 16px;
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
