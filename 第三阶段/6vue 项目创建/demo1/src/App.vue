<template>
  <div id="app">
    <Welcome :year="year"></Welcome>
    <router-link to="/home">首页</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Welcome from './components/Welcome'
export default {
  name: 'App',
  data() {
    return {
      year: 2020
    }
  },
  components:{
    Welcome,
    
  }
}
</script>

<style>

</style>
