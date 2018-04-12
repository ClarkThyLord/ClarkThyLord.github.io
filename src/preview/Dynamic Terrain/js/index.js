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
  environment: {
    light: {
      on: true,
      color: [255, 255, 0],
      dynamic: {
        color: false,
      },
    },
    fog: {
      on: false,
      color: [255, 255, 255],
      dynamic: {
        color: false,
      },
    },
    stars: {
      on: true,
      color: [255, 255, 255],
      dynamic: {
        color: false,
      },
    },
    background: {
      color: [0, 0, 0],
      dynamic: {
        color: false,
      },
    },
    dynamic: {
      color: false,
    },
  },
  terrain: {
    type: 'wireframe',
    color: [0, 255, 0],
    dynamic: {
      color: false,
      terrain: false,
    },
  },
};
var renderer, scene, light, camera;
var stars, terrain;


// Setup once the page has finished loading
window.onload = function() {
  // Check if WebGL is usable
  if (!Detector.webgl) Detector.addGetWebGLMessage();


  // Setup Stats.js FPS Stat Monitor
  fps_stats = new Stats(0);
  document.body.appendChild(fps_stats.dom);


  // Setup Dat.GUI.js Data Menu
  gui_data = new dat.GUI();

  gui_data.add(data, 'seed', 0, 100000, 1).onChange(function(value) {
    terrain_update();
  });


  // Setup Environment data in GUI
  let environment_data = gui_data.addFolder('Environment');

  let light_data = environment_data.addFolder('Light');
  light_data.add(data.environment.light, 'on').onChange(function(value) {
    light.visible = value;
  });
  light_data.addColor(data.environment.light, 'color').onChange(function(value) {
    light.color = new THREE.Color(stringRGB(value))
  });;
  let dynamic_data = light_data.addFolder('Dynamic');
  dynamic_data.add(data.environment.light.dynamic, 'color');

  let fog_data = environment_data.addFolder('Fog');
  fog_data.add(data.environment.fog, 'on').onChange(function(value) {
    if (value) {
      scene.fog.near = 2000;
      scene.fog.far = 4000;
    } else {
      scene.fog.near = 0.1;
      scene.fog.far = 0;
    }
  });;
  fog_data.addColor(data.environment.fog, 'color').onChange(function(value) {
    scene.fog.color = new THREE.Color(stringRGB(value));
  });
  dynamic_data = fog_data.addFolder('Dynamic');
  dynamic_data.add(data.environment.fog.dynamic, 'color');

  let stars_data = environment_data.addFolder('Stars');
  stars_data.add(data.environment.stars, 'on').onChange(function(value) {
    stars.visible = value;
  });
  stars_data.addColor(data.environment.stars, 'color').onChange(function(value) {
    stars.material.color = new THREE.Color(stringRGB(value));
  });
  dynamic_data = stars_data.addFolder('Dynamic');
  dynamic_data.add(data.environment.stars.dynamic, 'color');

  let background_data = environment_data.addFolder('Background');
  background_data.addColor(data.environment.background, 'color').onChange(function(value) {
    scene.background = new THREE.Color(stringRGB(value));
  });
  dynamic_data = background_data.addFolder('Dynamic');
  dynamic_data.add(data.environment.background.dynamic, 'color');

  dynamic_data = environment_data.addFolder('Dynamic');
  dynamic_data.add(data.environment.dynamic, 'color');


  // Setup Terrain data in GUI
  let terrain_data = gui_data.addFolder('Terrain');

  terrain_data.add(data.terrain, 'type', ['wireframe', 'solid', 'cartoonish', 'heat']).onChange(function(value) {
    if (value === 'wireframe') {
      terrain.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(stringRGB(data.terrain.color)),
        wireframe: true,
      });
    } else if (value === 'solid') {
      terrain.material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(stringRGB(data.terrain.color)),
      });
    } else if (value === 'cartoonish') {
      terrain.material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(stringRGB(data.terrain.color)),
        specular: 0x773300,
        shading: THREE.FlatShading,
        shininess: 3
      });
    } else if (value === 'heat') {
      terrain.material = new THREE.MeshDepthMaterial({
        color: new THREE.Color(stringRGB(data.terrain.color)),
      });
    }
  });
  terrain_data.addColor(data.terrain, 'color').onChange(function(value) {
    terrain.material.color = new THREE.Color(stringRGB(value));
  });

  dynamic_data = terrain_data.addFolder('Dynamic');
  dynamic_data.add(data.terrain.dynamic, 'color');
  dynamic_data.add(data.terrain.dynamic, 'terrain');

  // Setup Three.js Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Setup Three.js Scene
  scene = new THREE.Scene();

  // Setup Scene's background
  scene.background = new THREE.Color(stringRGB(data.environment.background.color));

  // Setup Scene's fog
  scene.fog = new THREE.Fog(new THREE.Color(stringRGB(data.environment.fog.color), 2000, 4000));
  if (!data.environment.fog.on) {
    scene.fog.near = 0.1;
    scene.fog.far = 0;
  }

  // Setup Three.js Camera and Controls
  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.userData.controls = new THREE.OrbitControls(camera);
  camera.position.z = 5;

  // Setup Three.js Light
  light = new THREE.AmbientLight(new THREE.Color(stringRGB(data.environment.light.color)), 0.25); // soft white light
  light.visible = data.environment.light.on;
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
  let material = new THREE.PointsMaterial({
    color: new THREE.Color('rgb(255, 255, 255)'),
  });
  stars = new THREE.Points(geometry, material);
  scene.add(stars);

  geometry = new THREE.PlaneGeometry(10, 10, 99, 99);
  material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(stringRGB(data.terrain.color)),
    wireframe: true,
  });
  terrain = new THREE.Mesh(geometry, material);
  terrain_update();
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

  // Update Stats.js Stat Monitor
  fps_stats.update();

  // Update on next animation frame
  requestAnimationFrame(render_update);
}


/**
 * Given a RGB object return a RGB string.
 * @param {array} [rgb] Array representing RGB; [ Red, Green, Blue ].
 * @return {String} Returns a string representing a RGB color.
 */
function stringRGB(rgb) {
  return "rgb(" + Math.floor(rgb[0]) + "," + Math.floor(rgb[1]) + "," + Math.floor(rgb[2]) + ")";
}


/**
 * Update terrain.
 * @return {undefined} Returns nothing.
 */
function terrain_update() {
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