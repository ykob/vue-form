<template lang="pug">
  .p-vue-form__step
    .p-vue-form__step-item(:class='{ "is-current" : step == 0 }')
      |Step1 : Input
    .p-vue-form__step-item(:class='{ "is-current" : step == 1 }')
      |Step2 : Confirm
    .p-vue-form__step-item(:class='{ "is-current" : step == 2 }')
      |Step3 : Finish
</template>

<script>
  export default {
    name: 'FormStep',
    props: [
      'step'
    ],
  }
</script>

<style lang="scss">
</style>
