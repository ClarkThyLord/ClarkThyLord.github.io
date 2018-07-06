// Setup Global(s)
GLOBALS.works = [];
GLOBALS.projects = [];

$(function() {
  $.getJSON('http://www-potential/server/api.php/works?options={"max":5,"order":"DES"}', function(response) {
    console.log(response);
    GLOBALS.works = response.data.works;
  });
});
