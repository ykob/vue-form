import scroll from 'js-util/scrollInnerPage.js';

export default function() {
  const id = '#vue-form';
  return new Vue({
    el: id,
    data: {
      input: {
        text: '',
        mail: '',
        radio: 'Radio A',
        checkbox: ['Checkbox A'],
        select: 'Select A',
        multiText: '',
      },
      validation: {
        text: null,
        mail: null,
        radio: null,
        checkbox: null,
        select: null,
        multiText: null,
      },
      errorMsg: {
        text: [],
        mail: [],
        radio: [],
        checkbox: [],
        select: [],
        multiText: [],
      },
      elm: {
        form: $(id)
      },
      step: 0
    },
    computed: {
      isValid: function() {
        var valid = true;
        for (var key in this.validation) {
          if (!this.validation[key]) valid = false;
        }
        return valid
      }
    },
    methods: {
      matchRequire: function(val, errorMsg) {
        const valid = !!val;
        if (!valid) errorMsg.push('この項目は記入必須です。');
        return valid;
      },
      matchTel: function(val, errorMsg) {
        const valid = !!String(val).match(/^[0-9０-９\-\ー]+$/);
        if (!valid && !!val) errorMsg.push('電話番号を入力してください。');
        return valid;
      },
      matchMail: function(val, errorMsg) {
        const valid = !!String(val).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!valid && !!val) errorMsg.push('メールアドレスを入力してください。');
        return valid;
      },
      matchNumber: function(val, errorMsg) {
        const valid = !!String(val).match(/^[0-9０-９]+$/);
        if (!valid && !!val) errorMsg.push('数値を入力してください。');
        return valid;
      },
      validateText: function() {
        this.errorMsg.text = [];
        this.validation.text = this.matchRequire(this.input.text, this.errorMsg.text);
      },
      validateMail: function() {
        this.errorMsg.mail = [];
        this.validation.mail = this.matchRequire(this.input.mail, this.errorMsg.mail) && this.matchMail(this.input.mail, this.errorMsg.mail);
      },
      validateRadio: function() {
        this.errorMsg.radio = [];
        this.validation.radio = this.matchRequire(this.input.radio, this.errorMsg.radio);
      },
      validateCheckbox: function() {
        this.errorMsg.checkbox = [];
        this.validation.checkbox = this.matchRequire(this.input.checkbox, this.errorMsg.checkbox);
      },
      validateSelect: function() {
        this.errorMsg.select = [];
        this.validation.select = this.matchRequire(this.input.select, this.errorMsg.select);
      },
      validateMultiText: function() {
        this.errorMsg.multiText = [];
        this.validation.multiText = this.matchRequire(this.input.multiText, this.errorMsg.multiText);
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
