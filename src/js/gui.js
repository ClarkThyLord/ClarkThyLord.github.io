var app;

$(function() {
  // Start Vue and Metro
  app = new Vue({
    el: '#app',
    mounted: function() {
      Metro.init();
    }
  });
});
