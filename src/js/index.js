// Setup Global(s)
GLOBALS.works = [];
GLOBALS.projects = [];

$(function() {
  $.getJSON('http://www-potential/server/api.php/works?filter={"type": "images"}&options={"max":5,"sort":"DES"}', function(response) {
    console.log(response);
    GLOBALS.works = response.data.works;
  });
});
