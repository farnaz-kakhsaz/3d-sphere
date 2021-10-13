import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Materials
const material = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalTexture,
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Light 1
const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
pointLight1.position.x = 2;
pointLight1.position.y = 3;
pointLight1.position.z = 4;
scene.add(pointLight1);

// const light1 = gui.addFolder("Light 1");

// light1.add(pointLight1.position, "x").min(-6).max(6).step(0.01);
// light1.add(pointLight1.position, "y").min(-3).max(3).step(0.01);
// light1.add(pointLight1.position, "z").min(-3).max(3).step(0.01);
// light1.add(pointLight1, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 0.1);
// scene.add(pointLightHelper1);

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 10;
scene.add(pointLight2);

// const light2 = gui.addFolder("Light 2");

// light2.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
// light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
// light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.1);
// scene.add(pointLightHelper2);

// Light 3
const pointLight3 = new THREE.PointLight(0xe1ff, 2);
pointLight3.position.set(2.13, -3, -1.98);
pointLight3.intensity = 6.8;
scene.add(pointLight3);

// const light3 = gui.addFolder("Light 3");

// const lightColer3 = { color: 0x0000ff };
// light3.addColor(lightColer3, "color").onChange(() => {
//   pointLight3.color.set(lightColer3.color);
// });

// light3.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
// light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
// light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.1);
// scene.add(pointLightHelper3);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

document.addEventListener("mousemove", onMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
