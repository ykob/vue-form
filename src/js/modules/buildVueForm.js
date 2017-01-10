// import scroll from './scrollInnerPage.js';

export default function() {
    return new Vue({
      el: '#vue-form',
      data: {
        input: {
          text: '',
          mail: '',
          radio: '',
          checkbox: '',
          select: '',
          attachment: '',
          multiText: '',
        },
        validation: {
          text: null,
          mail: null,
          radio: null,
          checkbox: null,
          select: null,
          attachment: null,
          multiText: null,
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
        selectSex: function(i) {
          this.input.sex = i;
        },
        matchRequire: function(val) {
          return !!val;
        },
        matchTel: function(val) {
          return !!String(val).match(/^[0-9０-９\-\ー]+$/);
        },
        matchMail: function(val) {
          return !!String(val).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        },
        matchNumber: function(val) {
          return !!String(val).match(/^[0-9０-９]+$/);
        },
        validateText: function() {
          this.validation.text = this.matchRequire(this.input.text);
        },
        validateMail: function() {
          this.validation.mail = this.matchRequire(this.input.mail) && this.matchMail(this.input.mail);
        },
        validateRadio: function() {
          this.validation.radio = this.matchRequire(this.input.radio);
        },
        validateCheckbox: function() {
          this.validation.checkbox = this.matchRequire(this.input.checkbox);
        },
        validateSelect: function() {
          this.validation.select = this.matchRequire(this.input.select);
        },
        validateAttachment: function() {
          this.validation.attachment = this.matchRequire(this.input.attachment);
        },
        validateMultiText: function() {
          this.validation.multiText = this.matchRequire(this.input.multiText);
        },
        validateAll: function() {
          this.validateText();
          this.validateMail();
          this.validateRadio();
          this.validateCheckbox();
          this.validateSelect();
          this.validateAttachment();
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
                data: $('#vue-form').serialize()
              })
              .done(() => {
                this.step = 2;
                this.scroll();
                // ga('send', 'event', 'form', 'complete')
              })
              .fail((data) => {
                alert(data);
                this.step = 0;
                this.scroll();
              })
              break;
            default:
          }
        },
        scroll: function() {
          setTimeout(() => {
            scroll(this.contents.offset().top, 600)
          }, 50);
        }
      }
    })
}
