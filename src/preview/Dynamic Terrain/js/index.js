// Global variables
// Debug Type:
// 0 : Rare events
// 1 : Common events
// 2 : Abusive events
var debugging = true,
  debug_type = 1;
var fps_stats;
var renderer, scene, light, camera;


// Setup once the page has finished loading
window.onload = function() {
  // Check if WebGL is usable
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  // Setup Stats.js FPS Stat Monitor
  fps_stats = new Stats(0);
  document.body.appendChild(fps_stats.dom);

  // Setup Three.js Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Setup Three.js Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('rgba(0, 0, 0, 1)');

  // Setup Three.js Camera and Controls
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.userData.controls = new THREE.OrbitControls(camera);
  camera.position.z = 5;

  // Setup Three.js Light
  light = new THREE.AmbientLight(new THREE.Color('rgb(255, 255, 0)'));
  scene.add(light);

  // Setup Scene's content
  let geometry = new THREE.Geometry();
  for (var i = 0; i < 10000; i++) {
    var vertex = new THREE.Vector3();

    // Random cordinates
    vertex.x = THREE.Math.randFloatSpread(2000);
    vertex.y = THREE.Math.randFloatSpread(2000);
    vertex.z = THREE.Math.randFloatSpread(2000);

    geometry.vertices.push(vertex);
  }
  var stars = new THREE.Points(geometry, new THREE.PointsMaterial({
    color: new THREE.Color('rgb(255, 255, 255)'),
  }));
  scene.add(stars);

  geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('rgba(0, 255, 0, 1)'),
    wireframe: true
  });
  let cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Append Scene DOM to HTML's body
  document.body.appendChild(renderer.domElement);

  // Setup continuous updates for renderer's content
  requestAnimationFrame(render_update);
}

// Setup Window resize event
window.addEventListener('resize', function() {
  // FOR DEBUGGING
  if (debugging && debug_type >= 0) {
    console.log(`Resize:\nWidth: ${window.innerWidth} | Height: ${window.innerHeight}\n---`);
  }

  // Update width and height of Three.js Renderer
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Update Three.js Camera properties
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


/**
 * Updates renderer's content.
 * @return {undefined} Returns nothing.
 */
function render_update() {
  // FOR DEBUGGING
  if (debugging && debug_type >= 2) {
    console.log('Updating renderer\'s content!\n---');
  }

  // Update scene according to camera
  renderer.render(scene, camera);

  // Update Stats.js Stat Monitor
  fps_stats.update();

  // Update on next animation frame
  requestAnimationFrame(render_update);
}