import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const RENDER_SIZE = 100;
const MODEL_SCALE = 1.73;
const VIEW_PADDING = 0.68;
const ROTATION_SPEED = 0.4;

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const modelCache = new Map();

function showFallback(link) {
  link.classList.remove('is-loading');
  link.classList.add('is-fallback');
}

function loadModel(loader, url) {
  if (modelCache.has(url)) {
    return Promise.resolve(modelCache.get(url));
  }

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        modelCache.set(url, gltf);
        resolve(gltf);
      },
      undefined,
      reject
    );
  });
}

function enhanceMaterials(object) {
  object.traverse((child) => {
    if (!child.isMesh || !child.material) return;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (!material.isMeshStandardMaterial) return;

      material.metalnessMap = null;
      material.roughnessMap = null;
      material.metalness = 0.08;
      material.roughness = 0.72;
      material.envMap = null;
      material.envMapIntensity = 0;
      material.needsUpdate = true;
    });
  });
}

function fitModel(model) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = (MODEL_SCALE * VIEW_PADDING) / maxDim;

  model.position.sub(center);
  model.scale.setScalar(scale);
}

function initLogo(link) {
  const canvas = link.querySelector('.header__logo-canvas');
  if (!canvas) return;

  canvas.style.setProperty('--logo-display-scale', String(1 / VIEW_PADDING));

  const fallbackSrc = link.dataset.fallback;
  link.classList.add('is-loading');

  if (!supportsWebGL()) {
    showFallback(link);
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(RENDER_SIZE, RENDER_SIZE, false);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.05, 4.2);

  scene.add(new THREE.AmbientLight(0xffffff, 1.35));

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.55);
  keyLight.position.set(2.8, 3.5, 4.5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xf0f4fa, 0.35);
  fillLight.position.set(-3.2, 0.8, 2.5);
  scene.add(fillLight);

  const pivot = new THREE.Group();
  scene.add(pivot);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);

  loadModel(loader, link.dataset.model)
    .then((gltf) => {
      const model = gltf.scene.clone(true);
      enhanceMaterials(model);
      fitModel(model);
      pivot.add(model);
      pivot.rotation.y = -0.35;

      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
        if (!reducedMotion) {
          pivot.rotation.y += ROTATION_SPEED * clock.getDelta();
        }
        renderer.render(scene, camera);
      };

      link.classList.remove('is-loading');
      link.classList.add('is-ready');
      animate();
    })
    .catch(() => {
      if (fallbackSrc) showFallback(link);
    });
}

document.querySelectorAll('[data-logo-3d]').forEach(initLogo);
