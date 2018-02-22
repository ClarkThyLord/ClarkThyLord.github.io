// Global variables
var stage, update = true,
  active_atoms = [],
  atoms = [],
  colors = {
    "=": "rgb(100, 100, 100)",
    "+": "rgb(255, 0, 0)",
    "-": "rgb(0, 0, 255)"
  },
  config = {
    "custom_colors": true,
    "show_text": true,
    "text_color": "rgb(0, 0, 0)",
    "show_magnitudes": true,
    "magnitude_alpha": 0.25
  },
  active_session = "temporary",
  sessions = {};


/**
 * Save session to local storage.
 * @return {undefined} Returns nothing.
 */
function save() {
  localStorage.setItem("config", JSON.stringify(config));

  sessions[active_session] = [];
  for (let atom of atoms) {
    sessions[active_session].push(atom.toDictionary());
  }
  localStorage.setItem("sessions", JSON.stringify({
    "active_session": active_session,
    "sessions": sessions
  }));
}


/**
 * Load and setup session from local storage.
 * @return {undefined} Returns nothing.
 */
function load() {
  var data = localStorage.getItem("config");
  if (data !== null) {
    data = JSON.parse(data);
    config = Object.assign(config, data);
  }
  data = localStorage.getItem("sessions");
  if (data !== null) {
    data = JSON.parse(data);
    active_session = data.active_session;
    sessions = data.sessions;
  }
}


/**
 * Updates control panel's DOMs.
 * @return {undefined} Returns nothing.
 */
function updateAllAtomsList() {
  var panel = document.querySelector("#control_panel");
  panel.elements.atoms_all.innerHTML = "";
  for (let atom of atoms) {
    panel.elements.atoms_all.innerHTML += "<option value=" + atom.id + ">Atom " + atom.id + "</option>";
  }
}


/**
 * Updates control panel's DOMs.
 * @return {undefined} Returns nothing.
 */
function updateCurrentAtomsList() {
  var panel = document.querySelector("#control_panel");
}


/**
 * Updates control panel's DOMs.
 * @return {undefined} Returns nothing.
 */
function updateControlPanel() {
  var panel = document.querySelector("#control_panel");
}


/**
 * Updates config panel's DOMs.
 * @return {undefined} Returns nothing.
 */
function updateConfigPanel() {
  var panel = document.querySelector("#config_panel");

  // Update DOMs
  panel.elements.custom_colors.checked = config.custom_colors;
  panel.elements.show_text.checked = config.custom_colors;
  panel.elements.show_magnitudes.checked = config.show_magnitudes;
  // TODO update text color
  panel.elements.magnitude_alpha.value = config.magnitude_alpha;
}


/**
 * Function to setup everything.
 * @return {undefined} Returns nothing.
 */
function init() {
  load();
  updateConfigPanel();

  // Setup EaselJS
  stage = new createjs.Stage("main_canvas");

  // Enable touch interactions
  createjs.Touch.enable(stage);

  // Enable mouse events
  stage.enableMouseOver(10);
  stage.mouseMoveOutside = true;

  // Create the first atom
  new newAtom();

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
function newAtom(charge = "=", magnitude = 1, color = randomRGB()) {
  // Setup properties for self
  this.id = atoms.length;
  this.charge = charge;
  this.magnitude = Math.abs(magnitude);
  this.color = color;

  // Create canvas object
  // Setup group
  this.obj = new createjs.Container();
  this.obj.x = 400;
  this.obj.y = 300;

  // Mouse enter event handler
  this.obj.on("rollover", function(evt) {
    this.scale = 1.25;
    update = true;
  });

  // Mouse exit event handler
  this.obj.on("rollout", function(evt) {
    this.scale = 1;
    update = true;
  });

  // Mouse down events handler
  this.obj.on("mousedown", function(evt) {
    this.parent.addChild(this);
    this.offset = {
      x: this.x - evt.stageX,
      y: this.y - evt.stageY
    };
    active_atoms.push(this.id);
  });

  // Mouse drag events handler
  this.obj.on("pressmove", function(evt) {
    this.x = evt.stageX + this.offset.x;
    this.y = evt.stageY + this.offset.y;
    update = true;
  });

  // Mouse drag events handler
  this.obj.on("pressup", function(evt) {
    active_atoms.splice(active_atoms.indexOf(this.id), 1);
  });

  // Setup atom
  this.atom = new createjs.Shape();
  this.atom.graphics.beginFill(stringRGB(this.color)).drawCircle(0, 0, 25);

  // Setup text
  this.text = new createjs.Text(this.charge + "\n" + this.magnitude, "12px Arial", config.text_color);
  this.text.textAlign = "center";

  this.obj.addChild(this.atom, this.text);
  stage.addChild(this.obj);

  // Add self to atoms
  atoms.push(this);
  updateAllAtomsList();

  update = true;

  // Return self
  return this;
}


// Atom's prototype
newAtom.prototype = {
  /**
   * Atom to a dictionary object.
   * @return {Object} Returns a dictionary object.
   */
  toDictionary: function() {
    return {
      "charge": this.charge,
      "magnitude": this.magnitude,
      "color": this.color
    };
  },



  /**
   * Atom to a string representing a JSON.
   * @return {Object} Returns a string representing a JSON.
   */
  toJSON: function() {
    return JSON.stringify({
      "charge": this.charge,
      "magnitude": this.magnitude,
      "color": this.color
    });
  }
};