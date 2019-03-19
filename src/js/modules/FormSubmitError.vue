<template lang="pug">
  .p-vue-form-submit-error
    p
      |{{ error }}
</template>

<script>
  export default {
    name: 'FormSubmitError',
    props: [
      'error',
    ]
  }
</script>

<style lang="scss">
  .p-vue-form-submit-error {
    color: #d33;
    font-weight: 700;
    text-align: center;
  }
</style>
