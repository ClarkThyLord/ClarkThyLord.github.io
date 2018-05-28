$(function() {
  console.log('Setting up gui-potential...');

  $('.gui.menu').menu();

  console.log('Gui-potential done setting up!');
});

jQuery.fn.extend({
  log: function() {
    console.log(this);
  },
  menu: function() {
    if (!$(this).hasClass('vertical')) {
      $(this).addClass('horizontal');
    }

    $(this).children('.section').each(function() {
      $(this).children('div').each(function() {
        if (!$(this).hasClass('item')) {
          $(this).addClass('item');
        }
      });
    });
  }
});