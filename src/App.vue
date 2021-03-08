<template>
  <div id="app">
    <div class="container">
      <div class="component-wrapper">
        <image-switcher
          :srcFront="srcFront"
          :srcBack="srcBack"
          :rows="7"
          :cols="7"
        ></image-switcher>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSwitcher from "@/components/ImageSwitcher"

export default {
  name: 'App',
  components: {
    ImageSwitcher,
  },
  data() {
    return {
      srcFront: 'https://s0.rbk.ru/v6_top_pics/media/img/2/19/756088015039192.jpeg',
      srcBack: 'https://ua.news/wp-content/uploads/2018/12/new-year2018.jpg'
    }
  }
}
</script>

<style lang="scss">

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fafafa;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.component-wrapper {
  width: 40%;
}

@media screen and (max-width: 1200px) {
  .component-wrapper {
    width: 60%;
  }
}

@media screen and (max-width: 680px) {
  .component-wrapper {
    width: 90%;
  }
}
</style>
