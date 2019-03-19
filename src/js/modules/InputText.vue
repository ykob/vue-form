<template lang="pug">
  input.p-vue-form-input-text(
    :type = 'type ? type : "text"'
    @input = '$emit("input", $event.target.value)'
    @focusout = '$emit("focusout")'
    )
</template>

<script>
  export default {
    name: 'InputText',
    props: [
      'type',
    ],
  }
</script>

<style lang="scss">
  @import "../../css/foundation/_mixin-utils";

  .p-vue-form-input-text {
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
