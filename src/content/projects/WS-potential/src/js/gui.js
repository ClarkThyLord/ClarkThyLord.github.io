$(function() {});

/**
 * Toggle master navigation's display.
 * @param {String} action Action to take upon content.
 * @return {undefined} Returns nothing.
 */
function master_overlay(action) {
  switch (action) {
    case 'show':
      $('#master_overlay').show();
      break;
    case 'hide':
      $('#master_overlay').hide();
      break;
    default:
      $('#master_overlay').toggle();
  }
}


/**
 * Toggle  navigation's display.
 * @param {String} identifier Identifier of content.
 * @param {String} action Action to take upon content.
 * @return {undefined} Returns nothing.
 */
function master_overlay_content_toggle(identifier, action) {
  const icons = {
    workspaces: 'apps',
    search: 'search',
    help: 'question',
    configurations: 'cogs',
  };

  switch (action) {
    case 'show':
      $('#master_' + identifier).show();
      break;
    case 'hide':
      $('#master_' + identifier).hide();
      break;
    default:
      // Hide all other content
      $('#master_overlay').toggle().children().children('.content').hide();

      // Change overlay's info
      $('#master_overlay_title').html('#master_overlay_title').html('<span class="mif-' + icons[identifier] + ' pr-2"></span>' + identifier);

      // Toggle specified content
      $('#master_' + identifier).show();
  }
}


/**
 * Toggle master navigation's display.
 * @param {String} action Action to take upon content.
 * @return {undefined} Returns nothing.
 */
function master_navigation_toggle(action) {
  switch (action) {
    case 'show':
      $('#master_navigation > .content-holder').show();
      break;
    case 'hide':
      $('#master_navigation > .content-holder').hide();
      break;
    default:
      $('#master_navigation > .content-holder').toggle();
  }
}


/**
 * Toggle  navigation's display.
 * @param {String} identifier Identifier of content.
 * @return {undefined} Returns nothing.
 */
function master_navigation_content_show(identifier) {
  // Make navs content visible
  master_navigation_toggle('show');
  // Click on specified tab
  $('.tabs-holder > li[href="#workspace-' + identifier + '"]').click();
}