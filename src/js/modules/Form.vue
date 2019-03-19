<template lang="pug">
  form(
    class = 'p-vue-form'
    enctype = 'multipart/form-data'
    @submit = 'submit'
  )
    h1.p-vue-form__head
      |vue-form

    FormStep(
      :step = 'step'
      )

    .p-vue-form__contents(v-show = 'step < 2')
      .p-vue-form__item
        .p-vue-form__item-head
          .p-vue-form__item-inner
            |name
            .c-require *
        .p-vue-form__item-body
          .p-vue-form__item-inner(v-show = 'step == 0')
            InputText(
              name = 'name'
              placeholder = 'input your name'
              v-model = 'input.name.value'
              @focusout = 'validate("name")'
            )
          .p-vue-form__item-inner.p-vue-form__confirm(v-show = 'step == 1')
            |{{ input.name.value }}
          .p-vue-form__error.p-vue-form__error--next-input(v-show = 'input.name.validation == false')
            span(v-for = 'item in input.name.error')
              |{{ item }}
      .p-vue-form__item
        .p-vue-form__item-head
          .p-vue-form__item-inner
            |email
            .c-require *
        .p-vue-form__item-body
          .p-vue-form__item-inner(v-show = 'step == 0')
            InputText(
              name = 'email'
              placeholder = 'input your email'
              type = 'email'
              v-model = 'input.email.value'
              @focusout = 'validate("email")'
            )
          .p-vue-form__item-inner.p-vue-form__confirm(v-show = 'step == 1')
            |{{ input.email.value }}
          .p-vue-form__error.p-vue-form__error--next-input(v-show = 'input.email.validation == false')
            span(v-for = 'item in input.email.error')
              |{{ item }}
      .p-vue-form__item
        .p-vue-form__item-head
          .p-vue-form__item-inner
            |radio button
            .c-require *
        .p-vue-form__item-body
          .p-vue-form__item-inner.p-vue-form__label-wrap(v-show = 'step == 0')
            label
              InputRadio(
                name = 'radio'
                value = 'Radio A'
                v-model = 'input.radio.value'
              )
              |Radio A
            label
              InputRadio(
                name = 'radio'
                value = 'Radio B'
                v-model = 'input.radio.value'
              )
              |Radio B
            label
              InputRadio(
                name = 'radio'
                value = 'Radio C'
                v-model = 'input.radio.value'
              )
              |Radio C
          .p-vue-form__item-inner.p-vue-form__confirm(v-show = 'step == 1')
            |{{ input.radio.value }}
          .p-vue-form__error(v-show = 'input.radio.validation == false')
            span(v-for = 'item in input.radio.error')
              |{{ item }}
      .p-vue-form__item
        .p-vue-form__item-head
          .p-vue-form__item-inner
            |checkbox
            .c-require *
        .p-vue-form__item-body
          .p-vue-form__item-inner.p-vue-form__label-wrap(v-show = 'step == 0')
            label
              input(
                type = 'checkbox'
                name = 'checkbox[]'
                value = 'Checkbox A'
                v-model = 'input.checkbox.value'
                class = 'p-vue-form__checkbox'
                @change = 'validate("checkbox")'
              )
              |Checkbox A
            label
              input(
                type = 'checkbox'
                name = 'checkbox[]'
                value = 'Checkbox B'
                v-model = 'input.checkbox.value'
                class = 'p-vue-form__checkbox'
                @change = 'validate("checkbox")'
              )
              |Checkbox B
            label
              input(
                type = 'checkbox'
                name = 'checkbox[]'
                value = 'Checkbox C'
                v-model = 'input.checkbox.value'
                class = 'p-vue-form__checkbox'
                @change = 'validate("checkbox")'
              )
              |Checkbox C
          .p-vue-form__item-inner.p-vue-form__confirm(v-show = 'step == 1')
            span.p-vue-form__confirm-item(v-for = '(item, index) in input.checkbox.value')
              |{{ item }}
          .p-vue-form__error(v-show = 'input.checkbox.validation == false')
            span(v-for = 'item in input.checkbox.error')
              |{{ item }}
      .p-vue-form__item
        .p-vue-form__item-head
          .p-vue-form__item-inner
            |select
            .c-require *
        .p-vue-form__item-body
          .p-vue-form__item-inner(v-show = 'step == 0')
            select(
              name = 'select[]'
              v-model = 'input.select.value'
              @change = 'validate("select")'
            )
              option(value = 'Select A')
                |Select A
              option(value = 'Select B')
                |Select B
              option(value = 'Select C')
                |Select C
          .p-vue-form__item-inner.p-vue-form__confirm(v-show = 'step == 1')
            |{{ input.select.value }}
          .p-vue-form__error(v-show = 'input.select.validation == false')
            span(v-for = 'item in input.select.error')
              |{{ item }}
      .p-vue-form__item
        .p-vue-form__item-head
          .p-vue-form__item-inner
            |attachment file
            br
            small
              |only jpeg/png/gif
        .p-vue-form__item-body
          .p-vue-form__item-inner(v-show = 'step == 0')
            input(
              type = 'file'
              name = 'file'
              @change = 'getFile(event, "file")'
              )
          .p-vue-form__item-inner.p-vue-form__confirm(v-show = 'step == 1')
            span(v-for = 'item in input.file.value')
              |{{ item.name }}
          .p-vue-form__error(v-show = 'input.file.validation == false')
            span(v-for = 'item in input.file.error')
              |{{ item }}
      .p-vue-form__item
        .p-vue-form__item-head
          .p-vue-form__item-inner
            |multi column text
            .c-require *
        .p-vue-form__item-body
          .p-vue-form__item-inner(v-show = 'step == 0')
            Textarea(
              name = 'multiText'
              cols = '60'
              rows = '8'
              v-model = 'input.multiText.value'
              @focusout = 'validate("multiText")'
            )
          .p-vue-form__item-inner.p-vue-form__confirm(v-show = 'step == 1')
            |{{ input.multiText.value }}
          .p-vue-form__error.p-vue-form__error--next-input(v-show = 'input.multiText.validation == false')
            span(v-for = 'item in input.multiText.error')
              |{{ item }}

    FormComplete(
      v-show = 'step == 2'
      )

    FormSubmitError(
      v-show = 'step == 3'
      :error = 'error'
      )

    FormSubmit(
      :step = 'step'
      :back = 'back'
      :reset = 'reset'
      )

    FormProcessing(
      v-show = 'isProcessing === true'
      )
</template>

<script>
  import axios from 'axios';
  import FormStep from './FormStep.vue';
  import FormComplete from './FormComplete.vue';
  import FormSubmitError from './FormSubmitError.vue';
  import FormSubmit from './FormSubmit.vue';
  import FormProcessing from './FormProcessing.vue';
  import InputText from './InputText.vue';
  import InputRadio from './InputRadio.vue';
  import Textarea from './Textarea.vue';

  export default {
    name: 'Form',
    components: {
      FormStep,
      FormComplete,
      FormSubmit,
      FormSubmitError,
      FormProcessing,
      InputText,
      InputRadio,
      Textarea,
    },
    data: function() {
      return {
        input: {
          name: {
            default: '',
            value: null,
            validation: null,
            error: []
          },
          email: {
            default: '',
            value: null,
            validation: null,
            error: []
          },
          radio: {
            default: 'Radio A',
            value: null,
            validation: null,
            error: []
          },
          checkbox: {
            default: [],
            value: null,
            validation: null,
            error: []
          },
          select: {
            default: 'Select A',
            value: null,
            validation: null,
            error: []
          },
          file: {
            default: [],
            value: null,
            validation: null,
            error: []
          },
          multiText: {
            default: '',
            value: null,
            validation: null,
            error: []
          },
        },
        step: 0,
        error: '',
        isProcessing: false,
      }
    },
    mounted: function() {
      this.initForm();
    },
    computed: {
      isValid: function() {
        var valid = true;
        for (var key in this.input) {
          if (!this.input[key].validation) valid = false;
        }
        return valid
      }
    },
    methods: {
      initForm: function() {
        this.$el.reset();
        for (var key in this.input) {
          this.input[key].value = this.input[key].default;
          this.input[key].validation = null;
          this.input[key].error = [];
        }
      },
      initInput: function(input){
        input.validation = true;
        input.error = [];
      },
      matchRequire: function(input) {
        const valid = (String(input.value).length > 0);
        if (!valid) input.error.push('この項目は記入必須です。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchTel: function(input) {
        const valid = (String(input.value).length === 0) || !!String(input.value).match(/^[0-9０-９\-\ー]+$/);
        if (!valid) input.error.push('電話番号を入力してください。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchMail: function(input) {
        const valid = (String(input.value).length === 0) || !!String(input.value).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!valid) input.error.push('メールアドレスを入力してください。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchNumber: function(input) {
        const valid = (String(input.value).length === 0) || !!String(input.value).match(/^[0-9０-９]+$/);
        if (!valid) input.error.push('数値を入力してください。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchURL: function(input) {
        const valid = (String(input.value).length === 0) || !!String(input.value).match(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/);
        if (!valid) input.error.push('URLを入力してください。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchMaxLength: function(input, maxLength) {
        const valid = (input.value.length <= maxLength);
        if (!valid) {
          input.error.push(maxLength + '文字以内でご記入ください。');
        }
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchFiletype: function(input, regexp) {
        let valid = true;
        for (var i = 0; i < input.value.length; i++) {
          if (!input.value[i].type.match(regexp)) {
            valid = false;
            break;
          }
        }
        if (!valid && !!input.value) input.error.push('指定の形式のファイルを選択してください。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      getFile: function(event, key) {
        this.input[key].value = event.target.files;
        this.validate(key);
      },
      noValidation: function(input) {
        input.validation = true;
      },
      validate: function(key, event) {
        switch (key) {
          case 'name':
            this.initInput(this.input.name);
            this.matchRequire(this.input.name);
            break;
          case 'email':
            this.initInput(this.input.email);
            this.matchRequire(this.input.email);
            this.matchMail(this.input.email);
            break;
          case 'radio':
            this.initInput(this.input.radio);
            this.matchRequire(this.input.radio);
            break;
          case 'checkbox':
            this.initInput(this.input.checkbox);
            this.matchRequire(this.input.checkbox);
            break;
          case 'select':
            this.initInput(this.input.select);
            this.matchRequire(this.input.select);
            break;
          case 'file':
            this.initInput(this.input.file);
            this.matchFiletype(this.input.file, /(png|jpeg|jpg|gif)/g);
            break;
          case 'multiText':
            this.initInput(this.input.multiText);
            this.matchRequire(this.input.multiText);
            break;
          default:
        }
      },
      validateAll: function() {
        for (var key in this.input) {
          this.validate(key);
        }
      },
      back: function(event) {
        event.preventDefault();
        this.step = 0;
        this.scroll();
      },
      reset: function(event) {
        event.preventDefault();
        this.step = 0;
        this.initForm();
        this.scroll();
      },
      submit: function(event) {
        event.preventDefault();
        if (this.isProcessing === true) return;
        switch (this.step) {
          case 0:
            this.validateAll();
            if (this.isValid) this.step = 1;
            this.scroll();
            break;
          case 1:
            this.isProcessing = true;
            axios.post('/sendmail.php', new FormData(this.$el))
              .then((response) => {
                // succeed to post.
                this.step = 2;
              })
              .catch((error) => {
                // failed to post.
                this.error = `A post by axios had an error : ${error.response.status} ${error.response.statusText}`;
                console.error(this.error);
                this.step = 3;
              })
              .then(() => {
                // always executed.
                this.isProcessing = false;
              });
            break;
          default:
        }
      },
      scroll: function() {
      }
    }
  };
</script>

<style lang="scss">
  @import "../../css/foundation/_mixin-utils";

  .p-vue-form {
    max-width: 800px;
    margin: 100px auto;
    @include fontSize(14);
    &__head {
      margin: 0 0 5rem;
      font-weight: 400;
      text-align: center;
      letter-spacing: 0.14em;
      @include fontSize(32);
    }
    &__item {
      display: flex;
      border-bottom: 1px solid #ddd;
      &-head {
        width: 30%;
        box-sizing: border-box;
        padding: 1rem 0;
      }
      &-body {
        width: 70%;
        padding: 1rem 0;
      }
      &-inner {
        padding: 0.75rem 0;
      }
    }
    &__checkbox {
      vertical-align: middle;
      margin-right: 0.5rem;
    }
    &__label-wrap {
      display: flex;
      label {
        display: block;
        margin-right: 2rem;
      }
    }
    &__error {
      color: #d33;
      font-weight: 700;
      &--next-input {
        margin-top: 0.5rem;
      }
    }
    &__confirm {
      white-space: pre-wrap;
      &-item {
        display: inline-block;
        &:after {
          content: '/';
          margin: 0 1rem;
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }
      }
    }
    &__button {
      appearance: none;
      margin: 0 10px;
      padding: 1.2rem 3rem;
      border: 0;
      border-radius: 4px;
      letter-spacing: 0.1rem;
      &--submit {
        color: #fff;
        background-color: #69c592;
      }
      &--utility {
        color: #fff;
        background-color: #aaa;
      }
    }
  }
</style>
