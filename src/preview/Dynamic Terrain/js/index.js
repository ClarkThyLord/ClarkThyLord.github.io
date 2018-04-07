// Global variables
// Debug Type:
// 0 : Rare events
// 1 : Common events
// 2 : Abusive events
var debugging = true,
  debug_type = 1;
var fps_stats;
var gui_data;
var data = {
  seed: Math.floor(Math.random() * 100000),
  material: 'wireframe',
  material_color: [0, 255, 0],
};
var renderer, scene, light, camera;
var terrain;


// Setup once the page has finished loading
window.onload = function() {
  // Check if WebGL is usable
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  // Setup Stats.js FPS Stat Monitor
  fps_stats = new Stats(0);
  document.body.appendChild(fps_stats.dom);

  // Setup Dat.GUI.js Data Menu
  gui_data = new dat.GUI();
  gui_data.add(data, 'seed', 0, 100000, 1);
  gui_data.add(data, 'material', ['wireframe', 'solid', 'cartoonish', 'heat']);
  gui_data.addColor(data, 'material_color');

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
  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.userData.controls = new THREE.OrbitControls(camera);
  camera.position.z = 5;

  // Setup Three.js Light TODO

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
  let material = new THREE.PointsMaterial({
    color: new THREE.Color('rgb(255, 255, 255)'),
  });
  var stars = new THREE.Points(geometry, material);
  scene.add(stars);

  geometry = new THREE.PlaneGeometry(10, 10, 99, 99);
  material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(stringRGB(data.material_color)),
    wireframe: true,
  });
  terrain = new THREE.Mesh(geometry, material);
  terrain.userData.material = data.material;
  terrain.userData.material_color = stringRGB(data.material_color);
  update_seed(data.seed);
  scene.add(terrain);

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

  if (noise.get_seed() !== data.seed) {
    update_seed(data.seed);
  }

  if (terrain.userData.material !== data.material) {
    terrain.userData.material = data.material;
    if (data.material === 'wireframe') {
      terrain.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(stringRGB(data.material_color)),
        wireframe: true,
      });
    } else if (data.material === 'solid') {
      terrain.material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(stringRGB(data.material_color)),
      });
    } else if (data.material === 'cartoonish') {
      terrain.material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(stringRGB(data.material_color)),
      });
    } else if (data.material === 'heat') {
      terrain.material = new THREE.MeshDepthMaterial({
        color: new THREE.Color(stringRGB(data.material_color)),
      });
    }
  }
  if (terrain.userData.material_color !== stringRGB(data.material_color)) {
    terrain.material.color = new THREE.Color(stringRGB(data.material_color))
  }

  // Update Stats.js Stat Monitor
  fps_stats.update();

  // Update on next animation frame
  requestAnimationFrame(render_update);
}


/**
 * Given a RGB object return a RGB string.
 * @param {Object} [rgb] RGB object.
 * @return {String} Returns a string representing a RGB color.
 */
function stringRGB(rgb) {
  return "rgb(" + Math.floor(rgb[0]) + "," + Math.floor(rgb[1]) + "," + Math.floor(rgb[2]) + ")";
}


/**
 * Updates renderer's content.
 * @param {integer} seed Seed used to generate the noise map.
 * @return {undefined} Returns nothing.
 */
function update_seed(seed) {
  noise.seed(data.seed);
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      var ex = 0.5;
      terrain.geometry.vertices[i + j * 100].z = (noise.simplex2(i / 100, j / 100) + (noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1)) + (noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2)) +
        (noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3)) +
        +
        (noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))
      ) / 1.25;
    }
  }
  terrain.geometry.verticesNeedUpdate = true;
}