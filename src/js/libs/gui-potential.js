$(function() {
  console.log('Setting up gui-potential...');

  $('.gui.menu').menu();

  console.log('Gui-potential done setting up!');
});

(function($) {

  // Setup Menu
  $.fn.menu = function(action, args) {
    action = action || 'initialize';
    args = args || {};

    if (action === '') {

    } else {
      // Set classes; if not set
      if (!$(this).hasClass('gui')) {
        $(this).addClass('gui');
      }
      if (!$(this).hasClass('menu')) {
        $(this).addClass('menu');
      }

      // Set orientation; if non set
      if (args.orientation) {
        $(this).addClass(args.orientation);
      } else if (!$(this).hasClass('vertical')) {
        $(this).addClass('horizontal');
      }

      $(this).children('.section').each(function() {
        $(this).children('div').each(function() {
          if (!$(this).hasClass('item')) {
            $(this).addClass('item');
          }

          $(this).children('ul').each(function() {
            $($(this).parent()).dropdown('initialize', {
              orientation: 'vertical'
            });
          });
        });
      });
    }
  };

  // Setup Dropdown
  $.fn.dropdown = function(action, args) {
    action = action || 'initialize';
    args = args || {};

    if (action === 'show') {
      $(this).children('ul').show();
    } else if (action === 'hide') {
      $(this).children('ul').hide();
    } else if (action === 'toggle') {
      $(this).children('ul').toggle();
    } else {
      // Set classes; if not set
      if (!$(this).hasClass('gui')) {
        $(this).addClass('gui');
      }
      if (!$(this).hasClass('dropdown')) {
        $(this).addClass('dropdown');
      }

      // Set orientation; if non set
      if (args.orientation) {
        $(this).addClass(args.orientation);
      } else if (!$(this).hasClass('vertical')) {
        $(this).addClass('horizontal');
      }

      $(this).on('click', function() {
        $(this).children('ul').toggle();
      });

      $(this).children('ul').hide();
    }
  };

}(jQuery));