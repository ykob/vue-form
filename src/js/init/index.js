// import Preloader from '../modules/preloader.js';

export default function() {
  const vm = new Vue({
    el: '#app',
    components: {
      msg: require('../vue/form.vue')
    }
  })
};
