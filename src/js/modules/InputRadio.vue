<template lang="pug">
  input.p-vue-form-input-radio(
    type = 'radio'
    @input = '$emit("input", $event.target.value)'
    )
</template>

<script>
  export default {
    name: 'InputRadio',
  }
</script>

<style lang="scss">
  .p-vue-form-input-radio {
    vertical-align: middle;
    margin-right: 0.5rem;
  }
</style>
