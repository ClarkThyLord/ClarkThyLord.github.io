// Setup Global(s)
GLOBALS.projects = [];

$(function() {
  $.getJSON('http://www-potential/server/api.php/projects?options={"sort":"ASC"}', function(response) {
    if (response.success) {
      GLOBALS.projects = response.data.projects;
    } else {
      alert(response.reason);
    }
  });
});
