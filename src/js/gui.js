var app, GLOBALS = {};

$(function() {
  // Start Vue and Metro
  app = new Vue({
    el: '#app',
    data: {
      GLOBALS: GLOBALS
    },
    mounted: function() {
      Metro.init();
    }
  });
});
