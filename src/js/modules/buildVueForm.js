import serialize from 'form-serialize';

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
        multiText: {
          default: '',
          value: null,
          validation: null,
          error: []
        },
      },
      step: 0
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
      validateText: function() {
        this.initInput(this.input.text);
        this.matchRequire(this.input.text);
      },
      validateMail: function() {
        this.initInput(this.input.mail);
        this.matchRequire(this.input.mail);
        this.matchMail(this.input.mail);
      },
      validateRadio: function() {
        this.initInput(this.input.radio);
        this.matchRequire(this.input.radio);
      },
      validateCheckbox: function() {
        this.initInput(this.input.checkbox);
        this.matchRequire(this.input.checkbox);
      },
      validateSelect: function() {
        this.initInput(this.input.select);
        this.matchRequire(this.input.select);
      },
      validateMultiText: function() {
        this.initInput(this.input.multiText);
        this.matchRequire(this.input.multiText);
      },
      validateAll: function() {
        this.validateText();
        this.validateMail();
        this.validateRadio();
        this.validateCheckbox();
        this.validateSelect();
        this.validateMultiText();
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
        console.log(serialize(this.$el));
        switch (this.step) {
          case 0:
            this.validateAll();
            if (this.isValid) {
              this.step = 1;
            }
            this.scroll();
            break;
          case 1:
            // $.ajax({
            //   url: '/sendmail.php',
            //   type: 'POST',
            //   data: $(id).serialize()
            // })
            // .done(() => {
            //   this.step = 2;
            //   this.scroll();
            //   ga('send', 'event', 'form', 'complete')
            // })
            // .fail((data) => {
            //   this.step = 0;
            //   this.scroll();
            // })
            this.step = 2;
            break;
          default:
        }
      },
      scroll: function() {
      }
    }
  })
}
