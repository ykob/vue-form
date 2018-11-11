import Vue from 'vue';
import Form from '../modules/Form.vue';

export default function() {
  new Vue({
    el: '#vue-form',
    components: { Form },
  });
};
