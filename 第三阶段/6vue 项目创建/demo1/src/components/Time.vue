<template>
<div>
  <h1>{{year}}</h1>
</div>
</template>

<script>
export default {
  data: function () {
    return {

    }
  },
  props: {
    year: {
      type: Number,
      default: 2000
    }

  }
}
</script>
