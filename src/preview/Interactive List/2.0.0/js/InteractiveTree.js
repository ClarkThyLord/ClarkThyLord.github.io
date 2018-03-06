// Object containing all Interactive Tree instances.
var InteractiveTrees = {};


/**
 * Creat a Interactive Tree.
 * @param {String/DOM} [dom] Selector or DOM in which Interactive Tree is setup.
 * @param {Object} [parameters] Configuration for Interactive Tree.
 * @return {InteractiveTree} Returns a Interactive Tree.
 */
function InteractiveTree(dom, parameters) {
  this.config = Object.assign({
    enabled: true,
    search: true,
    search_dom: null,
    search_enabled: true,
    filter: true,
    filter_dom: null,
    filter_enabled: true,
    key_support: true,
    classes: {
      icons: "",
      input: "",
      branches: "",
      foreground: "",
      background: ""
    },
    branches: {
      movable: true,
      renamable: true,
      deletable: true
    }
  }, parameters);

  this.setupDOM(dom);
}


/**
 * Interactive Tree prototype.
 */
InteractiveTree.prototype = {
  /**
   * Function to handle the action "drag start" on a branch.
   * @param {Event} [e] Selector string representing DOM or the DOM itself to setup InteractiveTree in.
   * @return {Array} Returns a Array of DOMs in which Interactive Tree is setup.
   */
  setupDOM: function(dom) {
    if (dom === undefined) {
      dom = document.currentScript.parentNode;
    } else if (typeof dom === "string") {
      var doms = document.querySelectorAll(dom);
      if (doms.length === 0) {
        console.log("ERROR:\nInteractive Tree found no DOMs matching the following selector `" + dom + "`");
      } else {
        for (let dom of doms) {
          setupDOM(dom);
        }
      }

      return doms;
    } else if (typeof dom == "object") {
      var dom_one, dom_two;
      if (config.search) {
        dom_one = document.createElement("input");
        dom_one.type = "text";
        dom_one.placeholder = "Search term...";
        dom.append(dom_one);
      }
      if (config.filter) {
        dom_one = document.createElement("select");

        // Create default types
        dom_two = document.createElement("option");
        dom_two.value = "Any";
        dom_two.innerHTML = "Any";
        dom_one.append(dom_two);

        for (let type of interactive_tree.config.types) {
          dom_two = document.createElement("option");
          dom_two.value = "" + type;
          dom_two.innerHTML = "" + type;
          dom_one.append(dom_two);
        }
        dom.append(dom_one);
      }

      dom_one = document.createElement("div");
      dom.append(dom_one);
      if (Object.keys(interactive_tree.branches).lenght === 0) {
        let list = document.createElement("ul");
        let msg = document.createElement("li");
        msg.innerHTML = "Nothing To Show";
        list.append(msg);
        dom_one.append(list);
      } else {
        dom_one.append(interactive_tree.toHTML());
      }
      dom.append(dom_one);

      return [dom];
    }
  },


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
  },


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

  },


  /**
   * Interactive Tree to HTML list.
   * @return {String} Returns string representing HTML Interactive Tree as a list.
   */
  toHTML: function(json) {
    var result = document.createElement("ul");
    for (let branch of Object.keys(this.branches)) {
      branch = this.branches[branch];
      let branch_dom = document.createElement("li");
      branch_dom.innerHTML = branch.name;
      result.append(branch_dom);
    }

    return result;
  }
};