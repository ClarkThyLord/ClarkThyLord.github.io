var style = 0,
  objects = [],
  selectedObjects = [];

window.onload = function() {
  // Create root object
  objCreate("Project Objects", "folder");

  // Testing objects
  objCreate("Head", "sprite", 0);
  objCreate("Body", "sprite", 0);
  objCreate("Hands", "sprite", 0);
  objCreate("Legs", "sprite", 0);
  objCreate("Feet", "sprite", 0);
};


/**
 * Function to handle the start of a object's dragging.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragStart(e) {
  // Check if it's invalid
  if (e.target.dataset.id == 0 || e.target.dataset.id == "error") {
    e.preventDefault();
    return;
  }

  e.dataTransfer.setData("obj", e.target.dataset.id);
  e.dataTransfer.setData("type", "object");
}


/**
 * Function to handle dragging enter of an object within object managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragEnter(e) {
  // Check if it's invalid
  if ((e.target.dataset.id || e.target.parentNode.dataset.id) === e.dataTransfer.getData("obj") || (e.target.dataset.id || e.target.parentNode.dataset.id) == 0 || (e.target.dataset.id || e.target.parentNode.dataset.id) == "error") {
    e.preventDefault();
    return;
  }

  e.target.parentNode.classList.add("hover-" + e.target.classList[0]);
}


/**
 * Function to handle dragging over of an object within object managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragOver(e) {
  e.preventDefault();
}


/**
 * Function to handle dragging leave of an object within object managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragLeave(e) {
  e.target.parentNode.classList.remove("hover-" + e.target.classList[0]);
}


/**
 * Function to handle dropping of an object within object managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragDrop(e) {
  e.target.parentNode.classList.remove("hover-" + e.target.classList[0]);

  // Check if it's invalid
  if ((e.target.dataset.id || e.target.parentNode.dataset.id) == 0 || (e.target.dataset.id || e.target.parentNode.dataset.id) == "error") {
    e.preventDefault();
    return;
  }

  // Setup variables
  var obj = e.dataTransfer.getData("obj"),
    target = e.target.dataset.id || e.target.parentNode.dataset.id;

  // Check if the target is the object being dropped
  if (obj == target[0]) {
    return;
  }

  if (e.target.classList.contains("above")) {
    objMove(obj, target, "above");
  } else if (e.target.classList.contains("content")) {
    objMove(obj, target, "into");
  } else if (e.target.classList.contains("bottom")) {
    objMove(obj, target, "below");
  }
}


/**
 * AMove a object, within objects, to another position, within objects; and update all the object managers;
 * @param {Integer} [obj] Obj to move.
 * @param {Integer} [target] Target to move obj to.
 * @param {String} [operation] Where should obj be placed relative to target; Options: above, into, below.
 * @return {undefined} Returns nothing.
 */
function objMove(obj, target, operation) {
  // Setup variables
  var index;
  obj = objects[obj];
  target = objects[target];

  // Remove links between object and root
  objects[obj.root].branches.splice(objects[obj.root].branches.indexOf(obj.id), 1);

  // If object is already in target's root then remove it
  index = objects[target.root].branches.indexOf(obj.id);
  while (index !== -1) {
    objects[target.root].branches.splice(index, 1);

    index = objects[target.root].branches.indexOf(obj.id);
  }

  if (operation == "above") {
    // Move obj below the target in root
    objects[target.root].branches.splice(objects[target.root].branches.indexOf(target.id), 0, obj.id);

    // Setup root for obj
    objects[obj.id].root = target.root;
  } else if (operation == "into") {
    objects[target.id].branches.push(obj.id);

    // Setup root for obj
    objects[obj.id].root = target.id;
  } else if (operation == "below") {
    // Move obj below the target in root
    objects[target.root].branches.splice(objects[target.root].branches.indexOf(target.id) + 1, 0, obj.id);

    // Setup root for obj
    objects[obj.id].root = target.root;
  }

  updateObjectManagers();
}


/**
 * Search for a specific object within a object.
 * @param {String} [name] Name of object searching for.
 * @param {String} [type] Type of object to search for.
 * @param {Object} [obj] Object to search through.
 * @return {Object} Returns a object filled with valid objects; empty object, neither this object or it's branches-objects are valid.
 */
function objSearch(name, type, obj) {
  // Setup variables
  name = name || "<any>";
  type = type || "any";

  var result;

  // Check if this object is valid
  if ((name === "<any>" || (obj.name).toLowerCase().indexOf(name.toLowerCase()) !== -1) && obj.name !== objects[0].name) {
    if (type === "any" || type === obj.type) {
      result = obj;
    } else {
      result = {
        "id": "error",
        "name": "Not Found"
      };
    }
  }
  // Check if this object has valid branches objects
  else {
    result = Object.assign({}, obj);
    result.branches = [];

    var branches, subResult;
    for (branches in obj.branches) {
      subResult = objSearch(name, type, objects[obj.branches[branches]]);

      // If a valid object is found push it to result
      if (subResult.id !== "error") {
        result.branches.push(subResult);
      }
    }

    if (result.branches.length === 0) {
      result = {
        "id": "error",
        "name": "Not Found"
      };
    } else {
      // result.open = true;
      result.realRefrences = true;
    }
  }

  return result;
}


/**
 * Create HTML, meant for object managing, out of a given object's data.
 * @param {Object} [obj] Name of the file.
 * @return {String} String representing object's data in HTML.
 */
function objToHTML(obj) {
  // Setup variables
  var inner = "";

  if (obj.open == true) {
    for (var branches in obj.branches) {
      if (obj.realRefrences) {
        inner += objToHTML(obj.branches[branches]);
      } else {
        inner += objToHTML(objects[obj.branches[branches]]);
      }
    }
  } else {
    inner = null;
  }

  return '<li class="item" draggable="true" ondragstart="objManagingDragStart(event);" ondragenter="objManagingDragEnter(event);" ondragover="objManagingDragOver(event);" ondragleave="objManagingDragLeave(event);" ondrop="objManagingDragDrop(event);" data-id="' + obj.id + '"> <div class="above"></div> <div class="content"> <span onclick="objToggle(this.parentNode.parentNode.dataset.id)" class="toggle">' + (inner == "" ? "&#9900" : "+" /** (objects[obj.id].open ? "-" : "+") **/ ) + '</span>' + obj.name + '<span onclick="objDelete(this.parentNode.parentNode.dataset.id);" class="remove">x</span></div> <ul class="item-menu">' + (inner == null ? "" : inner) + '</ul> <div class="bottom"></div> </li>';
}


/**
 * Create a object, and add it to "objects array".
 * @param {String} [name] Name for the new object.
 * @param {String} [type] Type of object to be created.
 * @return {Integer} Returns the objects index in "objects array".
 */
function objCreate(name, type, root) {
  // Setup variables
  type = type || "sprite";
  name = name || type + " " + objects.length;

  // Object's Structure:
  // {String} [object's name] : {
  //
  //  "id": {Integer} [object's unique ID/index in objects],
  //  "name": {String} [object's name],
  //  "type": {String} [object's type],
  //  "root": {Integer} [object's root ID],
  //  "branches": {Array of Objects} [objects under this object],
  //  "realRefrences": {Boolean} [wether refrences to objects are objects themselves or ids]
  //
  //  }
  var key = objects.push({
    id: objects.length,
    name: name,
    type: type,
    root: root,
    branches: [],
    realRefrences: false,
    open: true
  }) - 1;

  // Add as branches to root
  if (root !== undefined) {
    objects[root].branches.push(key);
  }

  updateObjectManagers();

  return key;
}


/**
 * Delete a object.
 * @param {Integer} [obj_id] ID of object to delete.
 * @return {undefined} Returns nothing.
 */
function objDelete(obj_id) {
  delete objects[obj_id];
  updateObjectManagers();
}

/**
 * Toggle a object.
 * @param {Integer} [obj_id] ID of object to toggle.
 * @return {undefined} Returns nothing.
 */
function objToggle(obj_id) {
  objects[obj_id].open = !objects[obj_id].open;
  updateObjectManagers();
}


/**
 * Update all of the object managers with the following objs.
 * @return {undefined} Returns nothing.
 */
function updateObjectManagers() {
  let object_managers = document.querySelectorAll("#object_manager");
  for (let object_manager of object_managers) {
    let objs = objSearch(object_manager.obj_search.value, object_manager.obj_filter.value, objects[0]);
    object_manager.querySelector("[name=obj_view]").innerHTML = objToHTML(objs);
  }
}


/**
 * Update the pages style.
 * @return {undefined} Returns nothing.
 */
function updateStyle() {
  if (style == 0) {
    document.documentElement.style.setProperty("--text-color", "rgba(255, 255, 255, 1)");
    document.documentElement.style.setProperty("--above-color", "rgba(255, 0, 200, 1)");
    document.documentElement.style.setProperty("--content-color", "rgba(255, 175, 0, 1)");
    document.documentElement.style.setProperty("--bottom-color", "rgba(0, 155, 255, 1)");
    document.documentElement.style.setProperty("--border-color", "rgba(255, 255, 255, 1)");
    document.documentElement.style.setProperty("--primary-background-color", "rgba(60, 255, 0, 1)");
    document.documentElement.style.setProperty("--secondary-background-color", "rgba(0, 0, 0, 1)");

    style = 1;
  } else {
    document.documentElement.style.setProperty("--text-color", "rgba(255, 255, 255, 1)");
    document.documentElement.style.setProperty("--above-color", "rgb(54, 54, 54)");
    document.documentElement.style.setProperty("--content-color", "rgb(54, 54, 54)");
    document.documentElement.style.setProperty("--bottom-color", "rgb(54, 54, 54)");
    document.documentElement.style.setProperty("--border-color", "rgb(91, 91, 91)");
    document.documentElement.style.setProperty("--primary-background-color", "rgb(30, 30, 30)");
    document.documentElement.style.setProperty("--secondary-background-color", "rgb(42, 42, 42)");

    style = 0;
  }
}