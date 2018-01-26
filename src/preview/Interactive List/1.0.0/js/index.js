var style = 0;
var tree = {
  active: [], // Branches that are active
  root: [], // Branches found at the root of the tree
  branches: {}, // All the branches attached to the tree
  branches_total: 0 // Total number of branches in the tree's lifetime
};

window.onload = function() {
  // Testing branches
  objCreate("Head", "sprite");
  objCreate("Body", "sprite");
  objCreate("Hands", "sprite");
  objCreate("Legs", "sprite");
  objCreate("Feet", "sprite");
};


/**
 * Function to handle the action "drag start" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragStart(e) {
  // Check if it's a invalid target; meaning target isn't a disabled branch
  if (e.target.dataset.id == 0 || e.target.dataset.id == "error") {
    e.preventDefault();
    return;
  }

  // Setup data for data transfer
  e.dataTransfer.setData("obj", e.target.dataset.id);
  e.dataTransfer.setData("type", "object");
}


/**
 * Function to handle the action "drag enter" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragEnter(e) {
  // Check if it's not a invalid target; meaning target isn't itself or a disabled branch
  if ((e.target.dataset.id || e.target.parentNode.dataset.id) === e.dataTransfer.getData("obj") || (e.target.dataset.id || e.target.parentNode.dataset.id) == 0 || (e.target.dataset.id || e.target.parentNode.dataset.id) == "error") {
    e.preventDefault();
    return;
  }

  // Add CSS "hover" class to target's parent DOM
  e.target.parentNode.classList.add("hover-" + e.target.classList[0]);
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
  // Remove CSS "hover" class to target's parent DOM
  e.target.parentNode.classList.remove("hover-" + e.target.classList[0]);
}


/**
 * Function to handle the action "drag drop" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function branchDragDrop(e) {
  // Remove CSS "hover" class to target's parent DOM
  e.target.parentNode.classList.remove("hover-" + e.target.classList[0]);

  // Check if it's invalid target; meaning target isn't itself or a disabled branch
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
    branchMove(tree.branches[obj], tree.branches[target], "above");
  } else if (e.target.classList.contains("content")) {
    branchMove(tree.branches[obj], tree.branches[target], "into");
  } else if (e.target.classList.contains("bottom")) {
    branchMove(tree.branches[obj], tree.branches[target], "below");
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
      let subResult = branchSearch(search_term, search_type, objects[branches]);

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
function objCreate(name, type, root) {
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
  for (let branch of tree.branches[obj_id].branches) {
    delete tree.branches[branch.id];
  }
  delete tree.branches[branch_id];
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
    inner = null;
  }

  return '<li class="item" draggable="true" ondragstart="branchDragStart(event);" ondragenter="branchDragEnter(event);" ondragover="branchDragOver(event);" ondragleave="branchDragExit(event);" ondrop="branchDragDrop(event);" data-id="' + branch.id + '"> <div class="above"></div> <div class="content"> <span onclick="branchToggle(this.parentNode.parentNode.dataset.id)" class="toggle">' + (inner == "" ? "&#9900" : "+" /** (tree.branches[branch.id].open ? "-" : "+") **/ ) + '</span>' + branch.name + '<span onclick="branchDelete(this.parentNode.parentNode.dataset.id);" class="remove">x</span></div> <ul class="item-menu">' + (inner == null ? "" : inner) + '</ul> <div class="bottom"></div> </li>';
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