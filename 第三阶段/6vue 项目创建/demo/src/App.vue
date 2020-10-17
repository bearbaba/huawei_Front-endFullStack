<template>
<div id="app">
  <header class="site-header jumbotron">
    <div class="row">
      <div class="col-xs-12">
        <h1>请发表对Vue的评论</h1>
      </div>
    </div>
  </header>
  <div class="container"></div>

</div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
