<template lang="pug">
  .p-vue-form-submit
    .p-vue-form-submit__wrap(
      v-show = 'step == 0'
      )
      input(
        type = 'submit'
        value = 'Confirm input content'
        class = 'p-vue-form__button p-vue-form__button--submit'
      )
    .p-vue-form-submit__wrap(
      v-show = 'step == 1'
      )
      input(
        type = 'button'
        value = 'Back'
        class = 'p-vue-form__button p-vue-form__button--utility'
        @click = 'back'
      )
      input(
        type = 'submit'
        value = 'Send Mail'
        class = 'p-vue-form__button p-vue-form__button--submit'
      )
    .p-vue-form-submit__wrap(
      v-show = 'step >= 2'
      )
      input(
        type = 'button'
        value = 'Back to Home'
        class = 'p-vue-form__button p-vue-form__button--submit'
        @click = 'reset'
      )
</template>

<script>
  export default {
    name: 'FormSubmit',
    props: [
      'step',
      'back',
      'reset',
    ]
  }
</script>

<style lang="scss">
  .p-vue-form-submit {
    margin: 3rem 0;
    &__wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
