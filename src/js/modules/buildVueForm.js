import Vue from 'vue/dist/vue.min';

export default function() {
  return new Vue({
    el: '#vue-form',
    data: {
      input: {
        text: {
          default: '',
          value: null,
          validation: null,
          error: []
        },
        mail: {
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
        const valid = (input.value.length > 0);
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
      noValidation: function(input) {
        input.validation = true;
      },
      validate: function(key, event) {
        switch (key) {
          case 'text':
            this.initInput(this.input.text);
            this.matchRequire(this.input.text);
            break;
          case 'mail':
            this.initInput(this.input.mail);
            this.matchRequire(this.input.mail);
            this.matchMail(this.input.mail);
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
            const files = event.target.files;
            this.initInput(this.input.file);
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
        switch (this.step) {
          case 0:
            this.validateAll();
            if (this.isValid) {
              this.step = 1;
            }
            this.scroll();
            break;
          case 1:
            const xhr = new XMLHttpRequest();
            const formData = new FormData(this.$el);
            xhr.addEventListener('load', (event) => {
              this.step = 2;
            });
            xhr.addEventListener('error', (event) => {
            });
            xhr.open('POST', '/sendmail.php');
            xhr.send(formData);
            break;
          default:
        }
      },
      scroll: function() {
      }
    }
  })
}
