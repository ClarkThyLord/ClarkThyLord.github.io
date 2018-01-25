var InteractiveTrees = [];

class InteractiveTree {
  constructor(param = {}) {
    // Join custom parameters and default parameters
    param = Object.assign({
      enabled: true,
      search_bar: true,
      filter_bar: true,
      filter_types: [],
      input_class: "default",
      branch_class: "default"
    }, param)

    this.tree = {
      main: [],
      branches: {}
    };
    this.current_branch = null;

    // Refrence to parent DOM, "parent"
    this.DOM_parent = document.querySelector("#" + param.DOM_parent) || document.currentScript.parentNode;

    // Whether or not tree functionality is active
    this.enabled = param.enabled || true;

    // Whether or not a search bar is appended
    this.search_bar = param.search_bar || true;
    // Create and add <input> DOM, "search bar", to "parent"
    if (this.search_bar) {
      this.DOM_search_bar = document.createElement("input");
      this.DOM_search_bar.type = "text";
      this.DOM_search_bar.placeholder = "Search term...";
      this.DOM_parent.append(this.DOM_search_bar);
    }

    // Whether or not a filter bar is appended
    this.filter_bar = param.filter_bar || true;
    // Create and add <select> DOM, "filter bar", to "parent"
    if (this.filter_bar) {
      this.DOM_filter_bar = document.createElement("select");
      var option = document.createElement("option");
      option.value = "any";
      option.innerHTML = "Any";
      this.DOM_filter_bar.append(option);
      this.DOM_filter_bar.value = "any";
      // Create and add <option> DOM, from given filter types, to "filter bar"
      for (let filter_type of param.filter_types) {
        option = document.createElement("option");
        option.value = filter_type.toLowerCase();
        option.innerHTML = filter_type.charAt(0).toUpperCase() + filter_type.slice(1);
        this.DOM_filter_bar.append(option);
      }
      option = document.createElement("option");
      option.value = "unknown";
      option.innerHTML = "Unknown";
      this.DOM_filter_bar.append(option);
      this.DOM_parent.append(this.DOM_filter_bar);
    }

    // Create and add <div> DOM, "tree", to "parent"
    this.DOM_tree = document.createElement("div");
    this.DOM_parent.append(this.DOM_tree);

    // Append, retrive and attach ID for this tree's index within InteractiveTrees
    InteractiveTrees.push(this);
    this.id = InteractiveTrees.length - 1;
    this.DOM_parent.dataset.tree_id = this.id;
  }


  /**
   * Append a branch to the tree.
   * @param {Object} [param] Arguments for branch; name, refrence, type, children, parents and etc.
   * @return {Integer} Returns the branche's id within tree branches.
   */
  addBranch(param = {}) {
    // Branch Structure:
    // {String} [branche's name] : {
    //  id: {Integer} [branche's unique id within branches],
    //  name: {String} [branche's name],
    //  type: {String} [branche's type],
    //  root: {Integer} [branche's root id],
    //  branches: {Array of Objects} [branches under this object]
    //  refrence: {Anything} [what the branch represents]
    //  }
    let branch_id = this.tree.branches.push({
      id: objects.length,
      name: args.name || "Unnamed",
      type: args.type || "unknown",
      root: args.parent || none,
      branches: [],
      refrence: args.refrence
    }) - 1;

    return branch_id;
  }
}