// Interactive Trees list
var InteractiveTrees = {};

// Interactive Tree DOM
function InteractiveTreeDOM(parameters, interactive_tree) {
  config = Object.assign({
    dom: null,
    enabled: true,
    search: true,
    search_enabled: true,
    filter: true,
    filter_enabled: true,
    key_support: true,
    use_classes: true,
    classes: {
      icons: "",
      input: "",
      branches: "",
      foreground: "",
      background: ""
    },
    use_variables: false,
    variables: {
      ForegroundColor: "",
      BackgroundColor: ""
    },
    branches: {
      movable: true,
      renamable: true,
      deletable: true
    }
  }, parameters);

  if (interactive_tree === undefined) {
    interactive_tree = new InteractiveTree();
  } else {
    interactive_tree = InteractiveTrees[interactive_tree];
  }

  if (config.dom === null) {
    config.dom = document.currentScript.parentNode;
    InteractiveTreeDOM(config, interactive_tree);
  } else if (typeof config.dom === "string") {
    var doms = document.querySelectorAll(config.dom);
    if (doms.length === []) {
      console.log("ERROR:\nInteractive Tree found no DOMs matching the following selector `" + config.dom + "`");
    } else {
      for (let dom of doms) {
        config.dom = dom;
        InteractiveTreeDOM(config, interactive_tree);
      }
    }
  } else {

  }
}

// Interactive Tree object
function InteractiveTree(parameters) {
  this.config = Object.assign({
    id: Object.keys(InteractiveTrees).length,
    maximum_branches: null
  }, parameters);

  // The root branches of tree
  this.tree = [];
  // All the branches of the tree
  this.branches = {};
  // Number of branches in tree's life span
  this.branch_count = 0;
  // Branch currently in use
  this.current = null;

  // Add self the list of existing trees
  InteractiveTrees[this.config.id] = this;
}


/**
 * Function to handle the action "drag start" on a branch.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
branchDragStart: function(e) {
    // Make sure it's a valid target; meaning target isn't a disabled branch
    if (e.target.classList.contains("disabled")) {
      e.preventDefault();
      return;
    }

    // Setup data for data transfer
    e.dataTransfer.setData("branch_id", e.target.dataset.id);
  },


  /**
   * Function to handle the action "drag enter" on a branch.
   * @param {Event} [e] Event to be handled.
   * @return {undefined} Returns nothing.
   */
  branchDragEnter: function(e) {
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
  },


  /**
   * Function to handle the action "drag over" on a branch.
   * @param {Event} [e] Event to be handled.
   * @return {undefined} Returns nothing.
   */
  branchDragOver: function(e) {
    e.preventDefault();
  },


  /**
   * Function to handle the action "drag exit" on a branch.
   * @param {Event} [e] Event to be handled.
   * @return {undefined} Returns nothing.
   */
  branchDragExit: function(e) {
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
  },


  /**
   * Function to handle the action "drag drop" on a branch.
   * @param {Event} [e] Event to be handled.
   * @return {undefined} Returns nothing.
   */
  branchDragDrop: function(e) {
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

// Interactive Tree object prototype
InteractiveTree.prototype = {
  /**
   * Export Interactive Tree object as JSON.
   * @return {String} Returns string representing JSON.
   */
  export: function() {

  },


  /**
   * Import Interactive Tree object from a JSON.
   * @param {String} json String representing JSON.
   * @return {undefined} Returns nothing.
   */
  import: function(json) {

  }
};