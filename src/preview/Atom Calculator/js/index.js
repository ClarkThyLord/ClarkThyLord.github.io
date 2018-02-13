// Global variables
var stage, update = true,
  atoms = [],
  colors = {
    "=": "rgb(100, 100, 100)",
    "+": "rgb(255, 0, 0)",
    "-": "rgb(0, 0, 255)"
  },
  config = {
    "custom_colors": true
  };


/**
 * Function to setup canvas.
 * @return {undefined} Returns nothing.
 */
function init() {
  stage = new createjs.Stage("main_canvas");

  // Enable touch interactions
  createjs.Touch.enable(stage);

  // Enable mouse events
  stage.enableMouseOver(10);
  stage.mouseMoveOutside = true;

  // Create the first atom
  atom("=", 12.2, (config.custom_colors ? randomRGB() : colors["="]));

  // Setup tick
  createjs.Ticker.addEventListener("tick", tick);
}


/**
 * Function to update components.
 * @return {undefined} Returns nothing.
 */
function tick(event) {
  if (update) {
    update = false;
    stage.update(event);
  }
}


/**
 * Generate a random RGB color.
 * @return {Array} Returns a Array, containing three integers, representing a random RGB color.
 */
function randomRGB() {
  return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
}


/**
 * Given a RGB object return a RGB string.
 * @param {Object} [rgb] RGB object.
 * @return {String} Returns a string representing a RGB color.
 */
function stringRGB(rgb) {
  return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
}


/**
 * Given a RGB object and alpha return a RGBA string.
 * @param {Object} [rgb] RGB object.
 * @param {Integer} [alpha] Alpha amount; Range: 0 - 1.
 * @return {String} Returns a string representing a RGBA color.
 */
function stringRGBA(rgb, alpha) {
  // Make sure alpha is valid
  if (alpha == undefined) {
    alpha = 1;
  } else if (alpha < 0) {
    alpha = 0;
  } else if (alpha > 1) {
    alpha = 1;
  }

  return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
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
  this.atom = new createjs.Shape();
  this.atom.graphics.beginFill(stringRGB(this.color)).drawCircle(0, 0, 25);
  this.atom.x = this.atom.y = 100;
  stage.addChild(this.atom);

  // Add self to atoms
  atoms.push(this);

  // Return self
  return this;
}