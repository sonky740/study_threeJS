import * as THREE from 'three';

// 동적으로 canvas 생성
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // 시야각 (field of view)
  window.innerWidth / window.innerHeight, // 종횡비(aspect)
  0.1, // near
  1000 // far
);

camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// 그리기
renderer.render(scene, camera);
