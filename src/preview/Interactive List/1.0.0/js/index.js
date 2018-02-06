var style = 0;
var tree = {
  active: [], // Branches that are active
  root: [], // Branches found at the root of the tree
  branches: {}, // All the branches attached to the tree
  branches_total: 0 // Total number of branches in the tree's lifetime
};

window.onload = function() {
  // Testing branches
  branchCreate("Head", "sprite");
  branchCreate("Body", "sprite");
  branchCreate("Hands", "sprite");
  branchCreate("Legs", "sprite");
  branchCreate("Feet", "sprite");
};


/**
 * Function to handle the action "drag start" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragStart(e) {
  // Make sure it's a valid target; meaning target isn't a disabled branch
  if (e.target.classList.contains("disabled")) {
    e.preventDefault();
    return;
  }

  // Setup data for data transfer
  e.dataTransfer.setData("branch_id", e.target.dataset.id);
}


/**
 * Function to handle the action "drag enter" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragEnter(e) {
  // Refrence to branch DOM
  var branch, relative;
  switch (e.target.nodeName === "#text" ? e.target.parentNode.dataset.path : e.target.dataset.path) {
    case "0":
      branch = e.target;
      relative = "content";
      break;
    case "1":
      branch = e.target.parentNode;
      relative = e.target.classList[0];
      break;
    case "2":
      branch = e.target.parentNode.parentNode.parentNode;
      relative = "content";
      break;
    default:
      return;
  }

  // Maker sure it's a valid target; target isn't itself or a disabled branch
  if (branch.dataset.id === e.dataTransfer.getData("branch_id") || branch.classList.contains("disabled")) {
    e.preventDefault();
    return;
  }

  // Add CSS "hover" class to target's parent DOM
  branch.classList.add("hover-" + relative);
}


/**
 * Function to handle the action "drag over" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragOver(e) {
  e.preventDefault();
}


/**
 * Function to handle the action "drag exit" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragExit(e) {
  // Refrence to branch DOM
  var branch, relative;
  switch (e.target.nodeName === "#text" ? e.target.parentNode.dataset.path : e.target.dataset.path) {
    case "0":
      branch = e.target;
      relative = "content";
      break;
    case "1":
      branch = e.target.parentNode;
      relative = e.target.classList[0];
      break;
    case "2":
      branch = e.target.parentNode.parentNode.parentNode;
      relative = "content";
      break;
    default:
      return;
  }

  // Maker sure it's a valid target; target isn't itself or a disabled branch
  if (branch.dataset.id === e.dataTransfer.getData("branch_id") || branch.classList.contains("disabled")) {
    e.preventDefault();
    return;
  }

  // Remove CSS "hover" class to target's parent DOM
  branch.classList.remove("hover-" + relative);
}


/**
 * Function to handle the action "drag drop" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragDrop(e) {
  // Refrence to branch DOM
  var branch, relative;
  switch (e.target.nodeName === "#text" ? e.target.parentNode.dataset.path : e.target.dataset.path) {
    case "0":
      branch = e.target;
      relative = "content";
      break;
    case "1":
      branch = e.target.parentNode;
      relative = e.target.classList[0];
      break;
    case "2":
      branch = e.target.nodeName === "#text" ? e.target.parentNode.parentNode.parentNode : e.target.parentNode.parentNode;
      relative = "content";
      break;
    default:
      return;
  }

  // Remove CSS "hover" class to target's parent DOM
  branch.classList.remove("hover-" + relative);

  // Maker sure it's a valid target; target isn't itself or a disabled branch
  if (branch.dataset.id === e.dataTransfer.getData("branch_id") || branch.classList.contains("disabled")) {
    e.preventDefault();
    return;
  }

  // Setup variables
  var branch = e.dataTransfer.getData("branch_id"),
    target = e.target.dataset.id || e.target.parentNode.dataset.id || e.target.parentNode.parentNode.dataset.id;

  // Check if the target is the object being dropped
  if (branch == target[0]) {
    return;
  }

  if (relative === "above") {
    branchMove(tree.branches[branch], tree.branches[target], "above");
  } else if (relative === "content") {
    branchMove(tree.branches[branch], tree.branches[target], "into");
  } else if (relative === "bottom") {
    branchMove(tree.branches[branch], tree.branches[target], "below");
  }
}


/**
 * Move a branch, within the tree, to another position; and update all the object managers.
 * @param {Branch} [branch] Branch to be moved.
 * @param {Branch} [target_branch] "Branch" will be moved relative to "target branch".
 * @param {String} [operation] Where "branch" should be set relative to "target branch"; Options: above, into, below.
 * @return {undefined} Returns nothing.
 */
function branchMove(branch = undefined, target_branch = undefined, operation = "into") {
  // If "branch" or "target branch" is not given return
  if (branch == undefined || target_branch == undefined) {
    return;
  }

  // If branch has a root branch do the following
  if (branch.root !== undefined) {
    // From branch's root remove itself
    tree.branches[branch.root].branches.splice(tree.branches[branch.root].branches.indexOf(branch.id), 1);
  } else {
    // From tree's root remove itself
    tree.root.splice(tree.root.indexOf(branch.id), 1);
  }

  if (target_branch.root !== undefined) {
    // If branch is in branch target's root then remove itself
    let index = tree.branches[target_branch.root].branches.indexOf(branch.id);
    while (index !== -1) {
      tree.branches[target_branch.root].branches.splice(index, 1);

      index = tree.branches[target_branch.root].branches.indexOf(branch.id);
    }
  } else {
    let index = tree.root.indexOf(branch.id);
    while (index !== -1) {
      index = tree.root.splice(index, 1);

      index = tree.root.indexOf(branch.id);
    }
  }

  if (operation == "above") {
    if (target_branch.root === undefined) {
      tree.root.splice(tree.root.indexOf(target_branch.id), 0, branch.id);
    } else {
      // Move branch below the targeted branch in root
      tree.branches[target_branch.root].branches.splice(tree.branches[target_branch.root].branches.indexOf(target_branch.id), 0, branch.id);

      // Setup root for branch
      tree.branches[branch.id].root = target_branch.root;
    }
  } else if (operation == "into") {
    // Move branch into the targeted branch
    tree.branches[target_branch.id].branches.push(branch.id);
    // Setup root for branch
    tree.branches[branch.id].root = target_branch.id;
  } else if (operation == "below") {
    if (target_branch.root === undefined) {
      tree.root.splice(tree.root.indexOf(target_branch.id) + 1, 0, branch.id);
    } else {
      // Move branch below the targeted branch in root
      tree.branches[target_branch.root].branches.splice(tree.branches[target_branch.root].branches.indexOf(target_branch.id) + 1, 0, branch.id);

      // Setup root for branch
      tree.branches[branch.id].root = target_branch.root;
    }
  }

  updateObjectManagers();
}


/**
 * Search for a specific branch within another branch.
 * @param {String} [search_term] Search term used to identify branch.
 * @param {String} [search_type] Type of branch we're searching for.
 * @param {Object} [branch] Branch to search through.
 * @return {Branch} Returns a branch filled with valid branches; else, empty object if neither this object or it's branches are valid.
 */
function branchSearch(search_term = "<any>", search_type = "any", branch) {
  // If branch is not given return
  if (branch == undefined) {
    return;
  }
  var result;

  // Check if this object is valid
  // First: check if substring in name has the search term
  if (search_term === "<any>" || (branch.name).toLowerCase().indexOf(search_term.toLowerCase()) !== -1) {
    // Second: check if the branch type matches the search type
    if (search_type === "any" || search_type === branch.type) {
      result = branch;
    } else {
      result = {
        "id": "error",
        "name": "Not Found"
      }
    }
  }
  // Check if this object has any valid branches
  else {
    result = Object.assign({
      branches: []
    }, branch);
    // For branch within this branch do a search
    for (let branches of branch.branches) {
      var subResult = branchSearch(search_term, search_type, tree.branches[branches]);

      // If a valid branch is returned append to branches
      if (subResult.id !== "error") {
        result.branches.push(subResult);
      }
    }

    // If no valid branches are found then return a error branch
    if (result.branches.length === 0) {
      result = {
        "id": "error",
        "name": "Not Found"
      };
      // Else set real refrences to true
    } else {
      // result.open = true;
      result.realRefrences = true;
    }
  }

  return result;
}


/**
 * Create a object, and add it to "objects array".
 * @param {String} [name] Name for the new object.
 * @param {String} [type] Type of object to be created.
 * @return {Integer} Returns the objects index in "objects array".
 */
function branchCreate(name, type, root) {
  // Setup variables
  type = type || "sprite";
  name = name || type + " " + tree.branches.length;

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
  tree.branches[tree.branches_total] = {
    id: tree.branches_total,
    name: name,
    type: type,
    root: root,
    branches: [],
    realRefrences: false,
    open: true
  };
  tree.branches_total += 1;

  if (root === undefined) {
    // Add as branches to tree root
    tree.root.push(tree.branches_total - 1);
  } else {
    // Add as branch to branches root
    tree.branches[root].branches.push(tree.branches_total - 1);
  }

  updateObjectManagers();

  return tree.branches_total - 1;
}


/**
 * Delete a branch and all it's branches.
 * @param {Integer} [branch_id] ID of branch to delete.
 * @return {undefined} Returns nothing.
 */
function branchDelete(branch_id) {
  // Refrence to branch object
  var main_branch = tree.branches[branch_id];

  // Remove all sub branches
  for (let branch of main_branch.branches) {
    delete tree.branches[branch.id];
  }

  // Remove itself from parent branches
  if (main_branch.parent !== undefined) {
    var result = tree.branches[main_branch.root].branches.indexOf(branch_id);
    if (result !== -1) {
      delete tree.branches[main_branch.root].branches[result];
    }
  }

  // Finally delete itself
  delete tree.branches[branch_id];

  // Update object managers
  updateObjectManagers();
}

/**
 * Toggle a branch.
 * @param {Integer} [branch_id] ID of branch to toggle.
 * @return {undefined} Returns nothing.
 */
function branchToggle(branch_id) {
  tree.branches[branch_id].open = !tree.branches[branch_id].open;
  updateObjectManagers();
}


/**
 * Update all of the object managers with the following objs.
 * @return {undefined} Returns nothing.
 */
function updateObjectManagers() {
  let object_managers = document.querySelectorAll("#object_manager");
  for (let object_manager of object_managers) {
    var branches = "";
    for (let branch of tree.root) {
      branches += branchToHTML(branchSearch(object_manager.obj_search.value, object_manager.obj_filter.value, tree.branches[branch]));
    }
    object_manager.querySelector("[name=obj_view]").innerHTML = branches;
  }
}


/**
 * Create HTML, meant for object managing, out of a given object's data.
 * @param {Object} [branch] Name of the file.
 * @return {String} String representing object's data in HTML.
 */
function branchToHTML(branch) {
  // Setup variables
  var inner = "";

  if (branch.open == true) {
    for (let sub_branch of branch.branches) {
      if (sub_branch.realRefrences) {
        inner += branchToHTML(branch.branches[sub_branch]);
      } else {
        inner += branchToHTML(tree.branches[sub_branch]);
      }
    }
  } else {
    inner = "";
  }

  return '<li class="item" draggable="true" ondragstart="branchDragStart(event);" ondragenter="branchDragEnter(event);" ondragover="branchDragOver(event);" ondragleave="branchDragExit(event);" ondrop="branchDragDrop(event);" data-id="' + branch.id + '" data-path=0> <div class="above" data-path=1></div> <div class="content" data-path=1> <span onclick="branchToggle(this.parentNode.parentNode.dataset.id)" class="toggle" data-path=2>' + (inner === "" ? "&#9900" : (tree.branches[branch.id].open ? "-" : "+")) + '</span><span ondblclick="this.contentEditable = !(this.contentEditable == `true`);" class="name" data-path=2>' + branch.name + '</span><span onclick="branchDelete(this.parentNode.parentNode.dataset.id);" class="remove"  data-path=2>x</span></div> ' + (inner === "" ? "" : '<ul class="item-menu" data-path=1>' + inner + '</ul>') + ' <div class="bottom" data-path=1></div> </li>';
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