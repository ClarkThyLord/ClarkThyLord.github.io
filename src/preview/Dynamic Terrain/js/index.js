// Global variables
var debugging = true;
var renderer, scene, light, camera;


// Setup once the page has finished loading
window.onload = function() {
  // Check if WebGL is usable
  if (!Detector.webgl) Detector.addGetWebGLMessage({});

  // Setup Three.js Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Setup Three.js Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('rgba(0, 0, 0, 1)');

  // Append Scene DOM to HTML's body
  document.body.appendChild(renderer.domElement);
}

// Setup Window resize event
window.addEventListener('resize', function() {
  // FOR DEBUGGING
  if (debugging) {
    console.log(`Resize:\nX: ${window.innerWidth} | Y: ${window.innerHeight}\n---`);
  }

  // Update width and height of Three.js Renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
});