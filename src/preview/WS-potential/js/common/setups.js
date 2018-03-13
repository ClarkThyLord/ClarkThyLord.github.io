var SETUPS = {
  "2d": {
    original: {},
    modified: {},
    custom: {}
  },
  "3d": {
    original: {},
    modified: {},
    custom: {}
  },
  "other": {
    original: {},
    modified: {},
    custom: {}
  }
};


/**
 * Save current setups to local storage.
 * @return {undefined} Return nothing.
 */
function setupsSave() {
  localStorage.setItem("THEMES", JSON.stringify(SETUPS));
}


/**
 * Load setups from local storage.
 * @return {Boolean} Returns true if sucesfully loaded; otherwise, false.
 */
function setupsLoad() {
  if (localStorage.getItem("SETUPS") !== null) {
    SETUPS = JSON.parse(localStorage.getItem("SETUPS"));
    return true;
  } else {
    return false;
  }
}