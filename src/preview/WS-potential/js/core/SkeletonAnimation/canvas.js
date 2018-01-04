//Create a stage by getting a reference to the canvas
var stage = new createjs.Stage("canvasDOM");

// Setup render in the ticker loop
createjs.Ticker.addEventListener("tick", render);

/**
 * Updates the canvas and everything related to it.
 * @return {undefined} Returns nothing.
 */
function render() {

  // Update the canva's size
  stage.canvas.width = $("#canvas_container").width();
  stage.canvas.height = $("#canvas_container").height();

  // Update stage will render next frame
  stage.update();
}
