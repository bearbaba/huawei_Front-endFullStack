<template>
<div id="welcome">
  <h1>{{welcome}}{{year}}</h1>
  <Time :year="year"></Time>
</div>
</template>

<script>
import Time from "./Time";
export default {
  data() {
    return {
      welcome: "welcome",
    };
  },
  props: {
    year: {
      default: 2000,
      type: Number,
    },
  },
  components: {
    Time,
  },
};
</script>

<style>
#welcome {
  color: red;
  font-family: 22px;
}
</style>
