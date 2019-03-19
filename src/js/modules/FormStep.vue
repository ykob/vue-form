<template lang="pug">
  .p-vue-form-step
    .p-vue-form-step__item(
      :class = '{ "is-current" : step == 0 }'
      )
      |Step1 : Input
    .p-vue-form-step__item(
      :class = '{ "is-current" : step == 1 }'
      )
      |Step2 : Confirm
    .p-vue-form-step__item(
      :class = '{ "is-current" : step == 2 }'
      )
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
  .p-vue-form-step {
    display: flex;
    justify-content: center;
    margin: 0 0 3rem;
    &__item {
      margin: 0 1rem;
      letter-spacing: 0.1em;
      text-align: center;
      &.is-current {
        color: #69c592;
        font-weight: 700;
      }
    }
  }
</style>
