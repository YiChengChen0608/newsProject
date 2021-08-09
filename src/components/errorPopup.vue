<template>
    <div class="popup">
      {{ message }}
    </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .popup{
    width: 30%;
    word-break: break-all;
    padding: 8px;
    color: #f56c6c;
    background-color: #fef0f0;
    border: 1px solid #fde2e2;
    border-radius: 10px;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate(-50%);
    animation: down .5s linear forwards;
  }
  @keyframes down {
    from{
      top: 0;
      opacity: 0;
    }
    to{
      top: 5%;
      opacity: 1;
    }
  }
</style>
