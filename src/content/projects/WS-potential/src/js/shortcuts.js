let SHORTCUTS = {
  'master navigation toggle': {
    'hint': 'Toggle the visibility of the master navigation.',
    'triggers': [
      'shift+t',
    ],
    action: function(event, handler) {
      master_navigation_toggle();
    },
  },
  'master overlay toggle': {
    'hint': 'Toggle view of overlay and all of its content.',
    'triggers': [
      'shift+`',
    ],
    action: function(event, handler) {
      $('#master_overlay').hide().children('.content');
    },
  },
  'master workspaces toggle': {
    'hint': 'Toggle view of Work Spaces and setups.',
    'triggers': [
      'shift+w',
    ],
    action: function(event, handler) {
      master_overlay_content_toggle('workspaces');
    },
  },
  'master search toggle': {
    'hint': 'Toggle view of WS search.',
    'triggers': [
      'shift+space',
      'shift+enter',
    ],
    action: function(event, handler) {
      master_overlay_content_toggle('search');
    },
  },
  'master help toggle': {
    'hint': 'Toggle view of documentation.',
    'triggers': [
      'shift+/',
    ],
    action: function(event, handler) {
      master_overlay_content_toggle('help');
    },
  },
  'master configurations toggle': {
    'hint': 'Toggle view of configurations.',
    'triggers': [
      'shift+c',
    ],
    action: function(event, handler) {
      master_overlay_content_toggle('configurations');
    },
  },
};

// Load Shortcuts from localStorage if any
$(function() {
  SHORTCUTS = Object.assign(SHORTCUTS, (JSON.parse(localStorage.getItem('shortcuts')) || {}));
});


/**
 * Save current Shortcuts to localStorage.
 * @return {undefined} Returns nothing.
 */
function shortcuts_save() {
  localStorage.setItem('shortcuts', JSON.stringify(SHORTCUTS));
}


/**
 * Setup shortcuts key bindings and to dom refrencing shortcut.
 * @return {undefined} Returns nothing.
 */
function shortcuts_setup() {
  // Setup key bindings
  for (const shortcut of Object.keys(SHORTCUTS)) {
    hotkeys(SHORTCUTS[shortcut].triggers.join(), SHORTCUTS[shortcut].action);
  }

  // Setup dom refrences
  $('[data-shortcut]').each(function() {
    shortcut_dom(this, $(this).data('shortcut'));
  });
}


/**
 * Trigger a shortcut.
 * @param {String} shortcut_name Shortcut's name.
 * @return {undefined} Returns nothing.
 */
function shortcut_trigger_add(shortcut_name, trigger) {
  if (Object.values(SHORTCUTS).find(value => value.triggers.indexOf(trigger) !== -1)) {
    // TODO better warning
    alert(`Shortcuts \`${shortcut_trigger}\` already taken!`);
  } else {
    SHORTCUTS[shortcut_name].triggers.push(trigger);
  }
}


/**
 * Trigger a shortcut.
 * @param {String} shortcut_name Shortcut's name.
 * @return {undefined} Returns nothing.
 */
function shortcut_trigger_remove(shortcut_name, trigger) {
  delete SHORTCUTS[shortcut_name].triggers[trigger];
}


/**
 * Trigger a shortcut.
 * @param {String} shortcut_name Shortcut's name.
 * @return {undefined} Returns nothing.
 */
function shortcut_trigger(shortcut_name) {
  if (typeof shortcut_name === 'object') {
    shortcut_name = shortcut_name.data[0];
  }

  SHORTCUTS[shortcut_name].action();
}


/**
 * Manually trigger a shortcut.
 * @param {String} dom Dome elemenent to bind shortcut to.
 * @param {String} shortcut_name Shortcut's name.
 * @return {undefined} Returns nothing.
 */
function shortcut_dom(dom, shortcut_name) {
  $(dom).on('click', [shortcut_name], shortcut_trigger).attr('title', $(dom).attr('title') + (SHORTCUTS[shortcut_name].hint ? ('\nHint: ' + SHORTCUTS[shortcut_name].hint) : '') + (SHORTCUTS[shortcut_name].triggers && SHORTCUTS[shortcut_name].triggers.length > 0 ? ('\nShortcut(s): ' + SHORTCUTS[shortcut_name].triggers.join(', ')) : ''));
}