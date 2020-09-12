<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from './components/Home.vue'

export default {
  name: 'App',
/*   components: {
    Home
  } */
}
</script>

<style>
#app {

}
</style>
