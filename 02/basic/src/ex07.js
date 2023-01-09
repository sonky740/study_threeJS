import * as THREE from 'three';

export default function example() {
  // Renderer
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // devicePixelRatio: 디스플레이의 픽셀밀도

  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#000', 3, 7);

  // Camera (카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 (field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.x = 2;
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  scene.add(mesh);

  // 그리기
  let oldTime = Date.now();
  function draw() {
    const newTime = Date.now();
    const delta = (newTime - oldTime) * 0.001; // 이전 프레임과 현재 프레임 사이의 시간을 리턴
    oldTime = newTime;

    meshes.forEach((item) => {
      item.rotation.y += delta;
    });
    renderer.render(scene, camera);

    requestAnimationFrame(draw);
  }

  function setSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix(); // 카메라의 종횡비가 바뀌었으므로 업데이트

    renderer.setSize(width, height); // 렌더러의 크기도 바꿔준다.
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
