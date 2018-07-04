var app;

$(function() {
  // Start Vue and Metro
  app = new Vue({
    el: '#app',
    mounted: function() {
      Metro.init();

      switch_content('home');
    }
  });
});


/**
 * Switch viewing content.
 * @param {String} identifier Identifier of content.
 * @return {undefined} Returns nothing.
 */
function switch_content(identifier) {
  $.get('./html/' + identifier + '.html', function(data) {
    $('#master_content').html(data);
  });
}
