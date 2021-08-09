<template>
  <div class="mask">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.726);
  top: 0;
  left: 0;
  .loading{
    width: 30px;
    height: 30px;
    border: 5px solid #fff;
    border-radius: 50%;
    border-right-color: transparent;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0);
    animation: rotate .5s linear infinite;
  }
}
@keyframes rotate {
  from{
    transform: translate(-50%, -50%) rotate(0);
  }
  to{
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
