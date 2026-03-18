/**
 * Particle Constellation — Default 3D Background
 * Three.js r128 is loaded before this script via CDN.
 * Canvas element: #bg-canvas
 */

(function () {
  'use strict';

  // ── Reduced-motion check ─────────────────────────────────────────────────
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Canvas & renderer ────────────────────────────────────────────────────
  const canvas = document.getElementById('bg-canvas');

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ── Scene & camera ───────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  // No background — transparent so the page background shows through.

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  // ── Particles ────────────────────────────────────────────────────────────
  const PARTICLE_COUNT = 250;
  const BOUNDARY = 50;

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * BOUNDARY * 2; // x
    positions[i3 + 1] = (Math.random() - 0.5) * BOUNDARY * 2; // y
    positions[i3 + 2] = (Math.random() - 0.5) * BOUNDARY * 2; // z

    // Small random drift velocities
    velocities[i3]     = (Math.random() - 0.5) * 0.06;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.06;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.06;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00e5ff,
    size: 2,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // ── Connection lines ─────────────────────────────────────────────────────
  // Maximum possible connections = n*(n-1)/2; pre-allocate for all of them.
  const MAX_CONNECTIONS = PARTICLE_COUNT * (PARTICLE_COUNT - 1) / 2;
  // Each segment = 2 vertices × 3 floats
  const linePositions = new Float32Array(MAX_CONNECTIONS * 2 * 3);

  const lineGeometry = new THREE.BufferGeometry();
  const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
  linePosAttr.setUsage(THREE.DynamicDrawUsage);
  lineGeometry.setAttribute('position', linePosAttr);
  // We'll use drawRange to only render active segments each frame.
  lineGeometry.setDrawRange(0, 0);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.15,
  });

  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSegments);

  // ── Mouse parallax ───────────────────────────────────────────────────────
  const mouse = { x: 0, y: 0 };
  const cameraTarget = { x: 0, y: 0 };

  window.addEventListener(
    'mousemove',
    function (e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );

  // ── Window resize ────────────────────────────────────────────────────────
  window.addEventListener(
    'resize',
    function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    { passive: true }
  );

  // ── Connection distance threshold ────────────────────────────────────────
  const CONNECTION_DISTANCE = 8;
  const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

  // ── Animation loop ───────────────────────────────────────────────────────
  function animate() {
    window.__threeAnimationId = requestAnimationFrame(animate);

    // Move particles & bounce off boundaries
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      positions[i3]     += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Bounce on each axis
      if (positions[i3] > BOUNDARY || positions[i3] < -BOUNDARY) {
        velocities[i3] *= -1;
        positions[i3] = Math.max(-BOUNDARY, Math.min(BOUNDARY, positions[i3]));
      }
      if (positions[i3 + 1] > BOUNDARY || positions[i3 + 1] < -BOUNDARY) {
        velocities[i3 + 1] *= -1;
        positions[i3 + 1] = Math.max(-BOUNDARY, Math.min(BOUNDARY, positions[i3 + 1]));
      }
      if (positions[i3 + 2] > BOUNDARY || positions[i3 + 2] < -BOUNDARY) {
        velocities[i3 + 2] *= -1;
        positions[i3 + 2] = Math.max(-BOUNDARY, Math.min(BOUNDARY, positions[i3 + 2]));
      }
    }

    particleGeometry.attributes.position.needsUpdate = true;

    // Rebuild connection line segments
    let segmentCount = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ix = positions[i3];
      const iy = positions[i3 + 1];
      const iz = positions[i3 + 2];

      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const j3 = j * 3;
        const dx = ix - positions[j3];
        const dy = iy - positions[j3 + 1];
        const dz = iz - positions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < CONNECTION_DISTANCE_SQ) {
          const base = segmentCount * 6; // 2 vertices × 3 components
          linePositions[base]     = ix;
          linePositions[base + 1] = iy;
          linePositions[base + 2] = iz;
          linePositions[base + 3] = positions[j3];
          linePositions[base + 4] = positions[j3 + 1];
          linePositions[base + 5] = positions[j3 + 2];
          segmentCount++;
        }
      }
    }

    lineGeometry.setDrawRange(0, segmentCount * 2); // 2 vertices per segment
    lineGeometry.attributes.position.needsUpdate = true;

    // Camera parallax with easing
    cameraTarget.x += (mouse.x * 5 - cameraTarget.x) * 0.03;
    cameraTarget.y += (mouse.y * 5 - cameraTarget.y) * 0.03;
    camera.position.x = cameraTarget.x;
    camera.position.y = cameraTarget.y;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // ── Start (or static render for reduced motion) ──────────────────────────
  if (prefersReducedMotion) {
    renderer.render(scene, camera);
  } else {
    animate();
  }
})();
