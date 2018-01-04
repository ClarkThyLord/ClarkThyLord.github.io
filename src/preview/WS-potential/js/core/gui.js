// Things to do when page is done loading
$(document).ready(function() {

  // Setup canvas
  $("#canvasDOM").each(function() {
    stage.canvas.width = $("#canvas_container").width();
    stage.canvas.height = $("#canvas_container").height();
    stage.update();
  });
  $(window).resize(function() {
    $("#canvasDOM").each(function() {
      stage.canvas.width = $("#canvas_container").width();
      stage.canvas.height = $("#canvas_container").height();
      stage.update();
    });
  });

  // Spectrum setup
  $(".spectrum-widget").spectrum({
    showInitial: true,
    showAlpha: true,
    showInput: true,
    preferredFormat: "rgb",
    change: function(color) {
      if (this.dataset.type === "theme") {
        themePropertyUpdate(this.name, $(this).spectrum("get").toRgbString());
      }
    }
  });

  // tooltip handlers
  $("body").on({
    "mouseenter mouseleave": function() {
      $(this).children(".tip").show();
    },
    "mouseleave": function() {
      $(this).children(".tip").hide();
    }
  }, ".tooltip");

  // dropmenu handlers
  $("body").on({
    "mouseenter mouseleave": function() {
      $(this).children(".menu").show();
    },
    "mouseleave": function() {
      $(this).children(".menu").hide();
    }
  }, ".dropmenu");

  // popup handlers
  $("body").on("click", ".popup", function(event) {
    if (event.target === this) {
      $(this).toggle();
    }
  });

  // Setup sections
  $(".section").each(function() {
    var menu_html = `
      <div class="item selectable dropmenu">
        ` + this.dataset.type + `
      <div class="menu">
    `;
    // Setup the panel type options
    for (var panel in Object.keys(PANELS)) {
      // Make sure it's not this panel type
      if (Object.keys(PANELS)[panel] !== this.dataset.type) {
        menu_html += `
          <div class="item selectable" data-section='` + this.id + `'  data-type='` + Object.keys(PANELS)[panel] + `' onclick='changeSection(this.dataset.section, this.dataset.type);'>
            ` + Object.keys(PANELS)[panel] + `
          </div>`;
      }
    }
    menu_html += "</div></div>";

    var panel_html = PANELS[this.dataset.type];

    $(this).find(".title").each(function() {
      this.innerHTML = menu_html;
    });

    $(this).find(".content").each(function() {
      this.innerHTML = panel_html;
    });
  });

  themeUse(themeCurrent);
  themeListUpdate();
});


/**
 * Toggle the view of settings.
 * @param {String} [tab] Tab to open settings into.
 * @return {undefined} Returns nothing.
 */
function settings(tab) {
  $(".settings").toggle();
  $(".settings .menus .item").hide();
  $(".settings .menus ." + (tab || "settings")).toggle();
}

/**
 * Changes a section's panel to another.
 * @param {String} [section] ID of the section to change.
 * @param {String} [type] Type of panel to update section with.
 * @return {undefined} Returns nothing.
 */
function changeSection(section, type) {
  $("#" + section).each(function() {
    var menu_html = `
      <div class="item selectable dropmenu">
        ` + type + `
      <div class="menu">
    `;
    // Setup the panel type options
    for (var panel in Object.keys(PANELS)) {
      // Make sure it's not this panel type
      if (Object.keys(PANELS)[panel] !== type) {
        menu_html += `
          <div class="item selectable" data-section='` + this.id + `'  data-type='` + Object.keys(PANELS)[panel] + `' onclick='changeSection(this.dataset.section, this.dataset.type);'>
            ` + Object.keys(PANELS)[panel] + `
          </div>`;
      }
    }
    menu_html += "</div></div>";

    var panel_html = PANELS[type];

    $(this).find(".title").each(function() {
      this.innerHTML = menu_html;
    });

    $(this).find(".content").each(function() {
      this.innerHTML = panel_html;
    });
  });
}

/**
 * Object containing all themes
 */
THEMES = {
  "Dark": {
    // Theme config
    "config": {
      "name": "Dark"
    },
    // Text
    "--text-size": 18,
    "--text-color": "rgba(255, 255, 255, 1)",
    // Interactive
    "--above-color": "rgba(54, 54, 54, 1)",
    "--over-color": "rgba(54, 54, 54, 1)",
    "--under-color": "rgba(54, 54, 54, 1)",
    // Foreground
    "--cover-color": "rgba(0, 0, 0, 0.6)",
    "--border-color": "rgba(17, 17, 17, 0.3)",
    "--primary-background-color": "rgba(30, 30, 30, 1)",
    "--secondary-background-color": "rgba(42, 42, 42, 1)",
  },
  "Light": {
    // Theme config
    "config": {
      "name": "Light"
    },
    // Text
    "--text-size": 18,
    "--text-color": "rgba(0, 0, 0, 1)",
    // Interactive
    "--above-color": "rgba(54, 54, 54, 1)",
    "--over-color": "rgba(54, 54, 54, 1)",
    "--under-color": "rgba(54, 54, 54, 1)",
    // Foreground
    "--cover-color": "rgba(0, 0, 0, 0.6)",
    "--border-color": "rgba(17, 17, 17, 0.3)",
    "--primary-background-color": "rgba(215, 215, 215, 1)",
    "--secondary-background-color": "rgba(233, 233, 233, 1)",
  }
};

// THEME SETUP
themeCurrent = Object.assign({}, THEMES[Object.keys(THEMES)[0]] || {
  // Theme config
  "config": {
    "name": "Dark"
  },
  // Text
  "--text-size": 18,
  "--text-color": "rgba(255, 255, 255, 1)",
  // Interactive
  "--above-color": "rgba(54, 54, 54, 1)",
  "--over-color": "rgba(54, 54, 54, 1)",
  "--under-color": "rgba(54, 54, 54, 1)",
  // Foreground
  "--cover-color": "rgba(0, 0, 0, 0.6)",
  "--border-color": "rgba(17, 17, 17, 0.3)",
  "--primary-background-color": "rgba(30, 30, 30, 1)",
  "--secondary-background-color": "rgba(42, 42, 42, 1)",
});

/**
 * Updates DOM element with all available themes.
 * @return {undefined} Returns nothing.
 */
function themeListUpdate() {
  $("[name=theme_list]").each(function() {
    $(this).empty();
    for (var theme in THEMES) {
      $(this).append("<option value=" + theme + ">" + theme + "</option>");
    }
  });
}

/**
 * Updates the current theme's given property with the given value.
 * @param {String} [property_name] Name of the property to update.
 * @param {String} [property_value] Value to update with.
 * @return {undefined} Returns nothing.
 */
function themePropertyUpdate(property_name, property_value) {
  // FOR DEBUGGING
  console.log("Updating theme property ~ " + property_name + " : " + property_value);

  themeCurrent[property_name] = property_value;
  document.documentElement.style.setProperty(property_name, property_value);
}

/**
 * Loads a theme from a uploaded file, JSON.
 * @param {File} [file] File representing JSON.
 * @return {Boolean} Returns true if theme was loaded sucesfully; otherwise false.
 */
function themeLoad(file) {
  try {
    var reader = new FileReader();
    reader.onload = function(event) {
      THEMES[file.name.split(".")[0]] = Object.assign(THEMES[Object.keys(THEMES)[0]] || {}, JSON.parse(event.target.result));

      themeListUpdate();

      return true;
    };
    reader.readAsText(file);
  } catch (error) {
    // FOR DEBUGGING
    console.log("Loading theme error: " + error);

    return false;
  }
}

/**
 * Delete given theme from themes.
 * @param {String} [theme_name] Name of the theme.
 * @return {undefined} Returns nothing.
 */
function themeDelete(theme_name) {
  if (theme_name in THEMES) {
    delete THEMES[theme_name];

    themeListUpdate();
  }
}

/**
 * Puts a given theme inside THEMES for saving.
 * @param {Object} [theme_object] Theme object to save.
 * @param {String} [theme_name] Type of object to be created.
 * @return {undefined} Returns nothing..
 */
function themeSave(theme_object, theme_name) {
  theme_name = theme_name || "Custom Theme";
  THEMES[theme_name] = Object.assign({
    "config": {
      "name": theme_name
    }
  }, theme_object);

  themeListUpdate();
}

/**
 * Export the given theme object as a JSON file.
 * @param {Object} [theme_object] Theme object to save.
 * @return {undefined} Returns nothing.
 */
function themeExport(theme_object) {
  var download = document.createElement('a');
  download.setAttribute('href', "data:text/JSON," + JSON.stringify(theme_object));
  download.setAttribute('download', theme_object.config.name + '.json');
  document.body.appendChild(download);
  download.click();
}

/**
 *  Uses a given theme object.
 * @param {Object} [theme_object] Theme object to use.
 * @return {undefined} Returns nothing.
 */
function themeUse(theme_object) {
  // Get a list of all the properties in the theme object
  var properties = Object.keys(theme_object);
  for (var property in properties) {
    // Refrence to the key instead of position
    property = properties[property];

    // Prevent update if it's the following
    if (property == "config") {
      continue;
    }

    // Modify DOM representing this property
    $("[name=" + property + "]").each(function() {
      // If it's a color modify value through spectrum
      if (this.type == "color") {
        $(this).spectrum("set", theme_object[property]);
      } else { // Else modify value directly
        this.value = theme_object[property];
      }
    });
    themePropertyUpdate(property, theme_object[property]);
  }
}
