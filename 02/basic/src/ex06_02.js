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

  // Camera (카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 (field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 2;
  light.position.z = 5;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  let oldTime = Date.now();
  function draw() {
    const newTime = Date.now();
    const delta = (newTime - oldTime) * 0.001; // 이전 프레임과 현재 프레임 사이의 시간을 리턴
    oldTime = newTime;

    // 각도는 Radian을 사용
    mesh.rotation.y += delta;
    mesh.position.y += delta;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    requestAnimationFrame(draw);
    // renderer.setAnimationLoop(draw); // === requestAnimationFrame // THREE를 이용해서 AR, VR을 만들 때 써야함.
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
