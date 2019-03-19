<template lang="pug">
  textarea.p-vue-form-textarea(
    :value = 'value'
    @input = '$emit("input", $event.target.value)'
    @focusout = '$emit("focusout")'
    )
</template>

<script>
  export default {
    name: 'Textarea',
    props: [
      'value',
    ],
  }
</script>

<style lang="scss">
  @import "../../css/foundation/_mixin-utils";

  .p-vue-form-textarea {
    width: 100%;
    appearance: none;
    box-sizing: border-box;
    display: block;
    margin: -0.75rem 0;
    padding: 0.75rem 1rem;
    border: 1px solid #aaa;
    @include fontSize(14);
  }
</style>
