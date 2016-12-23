<style lang="scss">
  .red {
    color: #f00;
  }
</style>

<template lang="pug">
  h1.red
    |{{ msg }}
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello world!'
      }
    }
  }
</script>
