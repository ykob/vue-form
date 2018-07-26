const Vue = require('vue/dist/vue.min');
const axios = require('axios');

export default function() {
  return new Vue({
    el: '#vue-form',
    data: {
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
      isProcessing: false,
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
        const valid = !!String(input.value).match(/^[0-9０-９\-\ー]+$/);
        if (!valid && !!input.value) input.error.push('電話番号を入力してください。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchMail: function(input) {
        const valid = !!String(input.value).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!valid && !!input.value) input.error.push('メールアドレスを入力してください。');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchNumber: function(input) {
        const valid = !!String(input.value).match(/^[0-9０-９]+$/);
        if (!valid && !!input.value) input.error.push('数値を入力してください。');
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
            const formData = new FormData(this.$el);
            axios.post('/sendmail.php', formData)
            this.isProcessing = true;
              .then((response) => {
                // succeed to post.
                this.step = 2;
              })
              .catch((error) => {
                // failed to post.
                console.error(`A post by axios had an error : ${error.response.status} ${error.response.statusText}`);
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
  })
}
