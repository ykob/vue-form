import Vue from 'vue/dist/vue.min';

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
      xhr: new XMLHttpRequest(),
    },
    mounted: function() {
      this.initForm();

      this.xhr.onreadystatechange = () => {
        switch (this.xhr.readyState) {
          case 0: // UNSENT
            break;
          case 1: // OPENED
            this.isProcessing = true;
            break;
          case 2: // HEADERS_RECEIVED
            break;
          case 3: // LOADING
            break;
          case 4: // DONE
            switch (this.xhr.status) {
              case 200:
                this.step = 2;
                break;
              case 404:
                console.error('Async request by Pjax has error, 404 not found.');
                break;
              case 500:
                console.error('Async request by Pjax has error, 500 Internal Server Error.');
                break;
            }
            this.isProcessing = false;
          default:
        }
      }
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
            this.xhr.open('POST', '/sendmail.php');
            this.xhr.send(formData);
            break;
          default:
        }
      },
      scroll: function() {
      }
    }
  })
}
