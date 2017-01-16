import scroll from 'js-util/scrollInnerPage.js';

export default function() {
  const id = '#vue-form';
  return new Vue({
    el: id,
    data: {
      input: {
        text: {
          value: '',
          validation: null,
          error: []
        },
        mail: {
          value: '',
          validation: null,
          error: []
        },
        radio: {
          value: 'Radio A',
          validation: null,
          error: []
        },
        checkbox: {
          value: [],
          validation: null,
          error: []
        },
        select: {
          value: 'Select A',
          validation: null,
          error: []
        },
        multiText: {
          value: '',
          validation: null,
          error: []
        },
      },
      elm: {
        form: $(id)
      },
      step: 0
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
      initInput: function(input){
        input.validation = true;
        input.error = [];
      },
      matchRequire: function(input) {
        const valid = (input.value.length > 0);
        if (!valid) input.error.push('この項目は記入必須です。');
        if (input.validation === (true || null)) input.validation = valid;
      },
      matchTel: function(input) {
        const valid = !!String(input.value).match(/^[0-9０-９\-\ー]+$/);
        if (!valid && !!input.value) input.error.push('電話番号を入力してください。');
        if (input.validation === (true || null)) input.validation = valid;
      },
      matchMail: function(input) {
        const valid = !!String(input.value).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!valid && !!input.value) input.error.push('メールアドレスを入力してください。');
        if (input.validation === (true || null)) input.validation = valid;
      },
      matchNumber: function(input) {
        const valid = !!String(input.value).match(/^[0-9０-９]+$/);
        if (!valid && !!input.value) input.error.push('数値を入力してください。');
        if (input.validation === (true || null)) input.validation = valid;
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
      back: function() {
        this.step = 0;
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
            $.ajax({
              url: '/sendmail.php',
              type: 'POST',
              data: this.elm.form.serialize()
            })
            .done(() => {
              this.step = 2;
              this.scroll();
              // ga('send', 'event', 'form', 'complete')
            })
            .fail((data) => {
              this.step = 0;
              this.scroll();
            })
            break;
          default:
        }
      },
      scroll: function() {
        setTimeout(() => {
          scroll(this.elm.form.offset().top, 600, 'easeOutQuart')
        }, 50);
      }
    }
  })
}
