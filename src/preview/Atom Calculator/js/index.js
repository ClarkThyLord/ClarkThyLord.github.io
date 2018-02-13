// Global variables
var stage;
var atoms = [];
var colors = {
  "=": "rgb(100, 100, 100)",
  "+": "rgb(255, 0, 0)",
  "-": "rgb(0, 0, 255)"
};

// Global configuration
var config = {
  "custom_colors": true
};

/**
 * Function to setup canvas.
 * @return {undefined} Returns nothing.
 */
function init() {
  stage = new createjs.Stage("main_canvas");
  atom("=", 12.2, (config.custom_colors ? random_rgb() : colors["="]));
  stage.update();
}

/**
 * Generate a random RGB string.
 * @return {String} Returns a string represeting a random RGB color.
 */
function random_rgb() {
  return "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
}


/**
 * Atom object instacing function.
 * @param {string} [charge] Atom's Charge; options: =, + and -.
 * @param {float} [magnitude] Atom's charge magnitude.
 * @param {string} [color] Atom's color.
 * @return {Object} Returns refrence to atom.
 */
function atom(charge, magnitude, color) {
  // Setup properties for self
  this.charge = charge;
  this.magnitude = Math.abs(magnitude);
  this.color = color;

  // Create canvas object
  this.object = new createjs.Shape();
  this.object.graphics.beginFill(this.color).drawCircle(0, 0, 50);
  this.object.x = this.object.y = 100;
  stage.addChild(this.object);

  // Add self to atoms
  atoms.push(this);

  // Return self
  return this;
}