<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <div class="left">
        <image-switcher
          :srcFront="srcFront"
          :srcBack="srcBack"
          :rows="7"
          :cols="7"
        ></image-switcher>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import ImageSwitcher from "@/components/ImageSwitcher"
import AppHeader from "@/components/AppHeader"

export default {
  name: 'App',
  components: {
    ImageSwitcher,
    AppHeader
  },
  data() {
    return {
      srcFront: 'https://www.kadrovik01.com.ua/images/News/2020/12/16.12/16122020_001.jpg',
      srcBack: 'https://ua.news/wp-content/uploads/2018/12/new-year2018.jpg'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%
}
.container {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 60px - 16px);
  flex-wrap: wrap;
}
.left {
  width: 25%;
}
.right {
  width: 75%;
}

@media screen and (max-width: 500px) {
  .left {
    width: 100%;
  }
  .right {
    width: 100%;
  }
}
</style>
