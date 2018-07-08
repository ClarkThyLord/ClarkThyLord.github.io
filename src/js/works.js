// Setup Global(s)
GLOBALS.images = [];
GLOBALS.literature = [];

$(function() {
  $.getJSON('http://www-potential/server/api.php/works?filter={"type": "images"}&options={"sort":"ASC"}', function(response) {
    if (response.success) {
      GLOBALS.images = response.data.works;
    } else {
      alert(response.reason);
    }
  });
});
