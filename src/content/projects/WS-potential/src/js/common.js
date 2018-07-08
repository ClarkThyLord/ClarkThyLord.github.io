let app;
$(function() {
  // Setup Vue and Metro
  app = new Vue({
    el: '#app',
    mounted: function() {
      Metro.init();
      shortcuts_setup();
    },
  });
});