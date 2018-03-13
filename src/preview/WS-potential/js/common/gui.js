var past_width = window.innerWidth,
  past_height = window.innerHeight;

// Things to do when page is done loading
$(document).ready(function() {
  // Setup Configuration Menu
  $.get(PREFIX + "/html/common/ConfigurationMenu.html", function(html) {
    window.addEventListener("resize", master_resize);

    // Append Configuration Menu
    $("body").append(html);

    // Setup dialog
    $("#ConfigurationMenu").dialog({
      width: window.innerWidth / 1.5,
      height: window.innerHeight / 1.5,
      autoOpen: false
    });

    // Setup tabs
    $("#ConfigTabs").tabs();

    // Load things
    themesLoad();
    setupSpectrum();
    themesSet(THEMES["<current>"]);
    themeRefresh();
  }, "html");

  // Setup Drop Zone
  Dropzone.autoDiscover = false;
  $(function() {
    // Setup DOM
    var dropzone_dom = new Dropzone("body", {
      url: "none", // we aren't sending it to a server
      clickable: "" // Things to open file browser
    });

    // Setup event handlers
    dropzone_dom.on("addedfile", function(file) {
      // FOR DEBUGGING
      if (WORKSPACE.settings.DEBUGGING) {
        console.log("Got File, From: DropZone:");
        console.log(file);
        console.log("---");
      }

      // TODO make use of file accordingly

      // Remove file once done processing
      this.removeFile(file);
    });
  });

  // Setup key short cuts
  $("html").on("keypress", function(eve) {
    if (eve.key == "`") {
      $("#ConfigurationMenu").dialog("open");
      $("#ConfigTabs").tabs({
        active: 0
      });
    }
  });

  // Smart menu setup
  $(".sm").smartmenus();
});


/**
 * Resizes GUI accordingly.
 * @return {undefined} Returns nothing.
 */
function master_resize() {
  width_diffrence = window.innerWidth - past_width;
  past_width = window.innerWidth;
  height_diffrence = window.innerHeight - past_height;
  past_height = window.innerHeight;
  if (SETTINGS.settings.DEBUGGING) {
    console.log(width_diffrence + " --- " + height_diffrence);
  }

  $(".ui-dialog-content").each(function(num, dom) {
    console.log(dom);
  });
}

/**
 * Setup panel given a type and name.
 * @param {String} [type] Type of panel; options: 2D, 3D, Audio and Video.
 * @param {String} [name] Name of the panel
 * @return {DOM} Returns DOM representing panel.
 */
function setupPanel(type, name) {
  $.get(PREFIX + "/html/panels/" + type + "/" + name + ".html", function(html) {
    var dom = $.parseHTML(html);
    $("body").append(dom);
    $(dom).dialog({
      width: window.innerWidth / 1.5,
      height: window.innerHeight / 1.5
    });
  }, 'html');
}


/**
 * Setup all spectrum widgets in page.
 * @return {undefined} Returns nothing.
 */
function setupSpectrum() {
  $(".spectrum-widget").spectrum({
    showInitial: true,
    showAlpha: true,
    showInput: true,
    preferredFormat: "rgb",
    change: function(color) {
      if (this.dataset.type === "theme") {
        themeUpdate(this.name, $(this).spectrum("get").toRgbString());
      }
    }
  });
}


/**
 * THEMING <--->
 */
var THEMES = {
  "<current>": "Dark",
  "<structure>": {
    // Text
    "--text-size": "18px",
    "--text-color": "rgba(255, 255, 255, 1)",
    // Interactive
    "--choosen-color": "rgba(60, 60, 60, 1)",
    "--selected-color": "rgba(50, 50, 50, 1)",
    // Foreground
    "--cover-color": "rgba(0, 0, 0, 0.6)",
    "--border-color": "rgba(17, 17, 17, 0.3)",
    "--primary-background-color": "rgba(30, 30, 30, 1)",
    "--secondary-background-color": "rgba(42, 42, 42, 1)"
  },
  "Dark": {
    // Text
    "--text-size": "18px",
    "--text-color": "rgba(255, 255, 255, 1)",
    // Interactive
    "--choosen-color": "rgba(60, 60, 60, 1)",
    "--selected-color": "rgba(50, 50, 50, 1)",
    // Foreground
    "--cover-color": "rgba(0, 0, 0, 0.6)",
    "--border-color": "rgba(17, 17, 17, 0.3)",
    "--primary-background-color": "rgba(30, 30, 30, 1)",
    "--secondary-background-color": "rgba(42, 42, 42, 1)"
  },
  "Light": {
    // Text
    "--text-size": "18px",
    "--text-color": "rgba(0, 0, 0, 1)",
    // Interactive
    "--choosen-color": "rgba(210, 210, 210, 1)",
    "--selected-color": "rgba(200, 200, 200, 1)",
    // Foreground
    "--cover-color": "rgba(0, 0, 0, 0.6)",
    "--border-color": "rgba(17, 17, 17, 0.3)",
    "--primary-background-color": "rgba(215, 215, 215, 1)",
    "--secondary-background-color": "rgba(233, 233, 233, 1)"
  }
};


/**
 * Save themes to local storage.
 * @return {undefined} Return nothing.
 */
function themesSave() {
  localStorage.setItem("THEMES", JSON.stringify(THEMES));
}


/**
 * Load themes from local storage.
 * @return {Boolean} Returns true if sucesfully loaded; otherwise, false.
 */
function themesLoad() {
  if (localStorage.getItem("THEMES") !== null) {
    THEMES = JSON.parse(localStorage.getItem("THEMES"));
    return true;
  } else {
    return false;
  }
}


/**
 * Updates all theme objects to current structure.
 * @return {undefined} Returns nothing.
 */
function themesUpdate() {
  for (var theme in THEMES) {
    THEMES[theme] = Object.assign(Object.assign({}, THEMES["<structure>"]), THEMES[theme]);
  }
}


/**
 * Add a theme preset from given name & theme object.
 * @param {String} [theme_name] Name given to preset.
 * @param {Object} [theme_object] Theme object used for preset; if non given, theme with corresponding name.
 * @return {undefined} Returns nothing.
 */
function themesAdd(theme_name, theme_object) {
  theme_name = theme_name || "Custom Theme";
  theme_object = theme_object || THEMES[THEMES["<current>"]];

  THEMES[theme_name] = Object.assign({}, theme_object);
  themeRefresh(true, false);
  themesSave();
}


/**
 * Remove a theme preset by it's name.
 * @param {String} [theme_name] Name of the theme preset.
 * @return {undefined} Returns nothing.
 */
function themesRemove(theme_name) {
  if (theme_name in THEMES) {
    delete THEMES[theme_name];

    var themes = Object.keys(THEMES);
    if (themes[2] === undefined) {
      THEMES["<current>"] = "Custom Theme";
      THEMES["Custom Theme"] = themeDomToObj();
    } else {
      THEMES["<current>"] = themes[2];
    }

    themesSet(THEMES["<current>"]);
    themeRefresh();
    themesSave();
  }
}


/**
 * Export the given theme object as a JSON file.
 * @param {String} [theme_name] Name for theme being exported.
 * @param {Object} [theme_object] Theme object to export; if non given, theme with corresponding name.
 * @return {undefined} Returns nothing.
 */
function themesExport(theme_name, theme_object) {
  theme_name = theme_name || "Custom Theme";
  theme_object = theme_object || THEMES[theme_name] || THEMES[THEMES["<current>"]];

  // Setting up a DOM is necessary for downloads in some Browsers
  var download = document.createElement("a");
  download.setAttribute("href", "data:text/JSON," + JSON.stringify({
    "config": {
      "version": "0.0.0",
      "type": "theme"
    },
    "data": theme_object
  }));
  download.setAttribute("download", theme_name + ".json");
  document.body.appendChild(download);
  download.click();
  download.remove();
}


/**
 * Import a theme from a given file.
 * @param {File} [theme_file] File that represents a theme.
 * @return {String/undefined} Returns theme's name when sucesfully imported; otherwise, undefined.
 */
function themesImport(theme_file) {

  var theme_name = theme_file.name.split(".")[0],
    reader = new FileReader();
  reader.onload = function(event) {
    var data = JSON.parse(event.target.result);

    if (data.config.type === "theme") {
      THEMES[theme_name] = data.data;

      themeRefresh(true, false);

      return theme_name;
    }
  };
  reader.readAsText(theme_file);
}


/**
 *  Sets a given theme object as current theme.
 * @param {String/Object} [theme] Name for theme preset; otherwise, a theme object.
 * @return {undefined} Returns nothing.
 */
function themesSet(theme) {
  if (typeof theme == "string" && theme in THEMES) {
    THEMES["<current>"] = theme;
    theme = THEMES[theme];
  } else if (typeof theme == "object") {
    THEMES["<current>"] = "Custom Theme";
    THEMES["Custom Theme"] = theme;
  } else {
    return;
  }

  // Get a list of all the properties in the theme object
  for (var property in theme) {
    themeUpdate(property, theme[property]);
  }

  themeRefresh();
  themesSave();
}


/**
 * Update the current theme's property a with given value.
 * @param {String} [property_name] Property to update.
 * @param {String} [property_value] Value to update with.
 * @return {undefined} Returns nothing.
 */
function themeUpdate(property_name, property_value) {
  THEMES[THEMES["<current>"]][property_name] = property_value;
  document.documentElement.style.setProperty(property_name, property_value);

  themesSave();
}


/**
 * Update DOMs corresponding to theming.
 * @param {Boolean} [update_list] Theme object to use; default: true.
 * @param {Boolean} [update_properties] Theme object to use;  default: true.
 * @return {undefined} Returns nothing.
 */
function themeRefresh(update_list, update_properties) {
  if (update_list === undefined) {
    update_list = true;
  }
  if (update_properties === undefined) {
    update_properties = true;
  }

  if (update_list) {
    $("[name=theme_list]").each(function() {
      this.innerHTML = "";
      for (var theme in THEMES) {
        if (theme !== "<current>" && theme !== "<structure>") {
          $(this).append("<option value='" + theme + "'>" + theme + "</option>");
        }
      }
      this.value = THEMES["<current>"];
    });
    $("[name=theme_name]").each(function() {
      this.value = THEMES["<current>"];
    });
  }
  if (update_properties) {
    for (var property_name in THEMES[THEMES["<current>"]]) {
      property_value = THEMES[THEMES["<current>"]][property_name];
      $("[name=" + property_name + "]").each(function() {
        if (this.type == "color") { // If it's a color modify value through spectrum
          $(this).spectrum("set", property_value);
        } else { // Else modify value directly
          this.value = property_value.match(/\d+/, "")[0];
        }
      });
    }
  }
}


/**
 * Makes a theme object from the values found on DOMs.
 * @return {undefined} Returns object representing theme with values found on DOM.
 */
function themeDomToObj() {
  var obj = {};
  for (var property in THEMES["<structure>"]) {
    $("[name=" + property + "]").each(function() {
      if (this.type == "color") { // If it's a color modify value through spectrum
        obj[property] = $(this).spectrum("get").toRgbString();
      } else { // Else modify value directly
        obj[property] = this.value + (this.dataset.unit || "")
      }
    });
  }

  return obj;
}