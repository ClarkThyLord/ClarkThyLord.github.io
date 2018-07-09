// Setup Global(s)
GLOBALS.works = [];
GLOBALS.projects = [];

$(function() {
  $.getJSON('/server/api.php/works?filter={"type": "images"}&options={"max":5,"sort":"ASC"}', function(response) {
    if (response.success) {
      GLOBALS.works = response.data.works;
    } else {
      alert(response.reason);
    }
  });

  $.getJSON('/server/api.php/projects?options={"max":5,"sort":"ASC"}', function(response) {
    if (response.success) {
      GLOBALS.projects = response.data.projects;
    } else {
      alert(response.reason);
    }
  });
});
