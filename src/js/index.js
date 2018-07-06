// Setup Global(s)
GLOBALS.works = [];
GLOBALS.projects = [];

$(function() {
  $.getJSON('http://www-potential/server/api.php/works', function(response) {
    console.log(response);
    GLOBALS.works = response.data.works;
  });
});
