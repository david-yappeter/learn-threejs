/*
  Scene
    - Our 3d Workspace Environment
    - 3D World
  Camera
    - Camera to see in the 3d world
  Renderer
    - Render camera capture to screen
*/

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);
/*
  PerspectiveCamera Params:
  - FOV => Field of View (How width is your camera)
  - AspectRatio 
  - near clip - How close can the camera see
  - far clip  - How far can the camera see
*/

var renderer = new THREE.WebGLRenderer();

// var box = new THREE.BoxGeometry(1, 1, 1); // Create a box 1x1x1
// var boxMat = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //Color (r g b) (ff 00 00)
// var boxMesh = new THREE.Mesh(box, boxMat);

// scene.add(boxMesh);

const custom_geo = new THREE.BufferGeometry();
let vertices = new Float32Array([
  -1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,

  -1.0, -1.0, -1.0,
  1.0, 1.0, -1.0,
  -1.0, 1.0, -1.0,
  1.0, -1.0, -1.0,
]);
let colors = new Float32Array([
  1.0, 0.0, 0.0,
  1.0, 0.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,

  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
])

custom_geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
custom_geo.setAttribute("color", new THREE.BufferAttribute(colors,  3));
custom_geo.setIndex([
  0,3,1,
  1,2,0,

  4,6,5,
  5,7,4,

  4,0,2,
  2,6,4,

  5,1,3,
  3,7,5,
  
  1,5,6,
  6,2,1,

  0,4,7,
  7,3,0,
])
const material = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors,
  side: THREE.DoubleSide,
});
let my_mesh = new THREE.Mesh(custom_geo, material);
scene.add(my_mesh);

cam.position.z = 5;

renderer.setSize(innerWidth, innerHeight); // Set the size of the renderer To Fit The Screen
document.body.appendChild(renderer.domElement); // Add 'renderer' to DOM

// Handle window resizing
window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  cam.aspect = this.window.innerWidth / this.window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  requestAnimationFrame(draw); // Will Run draw() every frame
  // boxMesh.rotation.y += 0.01;
  // boxMesh.rotation.x += 0.01;
  my_mesh.rotation.x += 0.01;
  my_mesh.rotation.y += 0.01;
  renderer.render(scene, cam); // Commands to render the scene
}

draw(); // Initialize Draw
