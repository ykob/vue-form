<template lang="pug">
  .p-vue-form-complete
    p
      |thank you for a message!
</template>

<script>
  export default {
    name: 'FormComplete',
  }
</script>

<style lang="scss">
  @import "../../css/foundation/_mixin-utils";

  .p-vue-form-complete {
    margin: 8rem 0 4rem;
    @include fontSize(16);
    text-align: center;
    letter-spacing: 0.16em;
  }
</style>
