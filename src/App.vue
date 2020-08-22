<template>
  <div id="app" class="main-contianer">
    <NavBar/>
    <!--  创建路由  -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
  }
}
</script>

<style>

</style>
