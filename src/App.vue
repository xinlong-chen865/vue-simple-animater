<template>
  <div class="app page">
    <Page1 class="page1"></Page1>
    <Page2 class="page2"></Page2>
    <Page3 class="page3"></Page3>
  </div>
</template>

<script>
import Page1 from './pages/Page1/Animate.vue'
import Page2 from './pages/Page2/index.vue'
import Page3 from './pages/Page3/index.vue'

export default {
  name: 'App',
  components: {
    Page1,
    Page2,
    Page3,
  }
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.page {
  width: 100vw;
  display: flex;
}
.page1 {
  width: 30vw;
}
.page2 {
  width: 30vw;
}
.page3 {
  width: 30vw;
}
</style>
