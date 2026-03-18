/* ============================================================
   Data Flow / Matrix Rain 3D Background — Three.js r128
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Reduced Motion Guard
     ---------------------------------------------------------- */
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     Cancel any previously running animation loop
     ---------------------------------------------------------- */
  if (window.__threeAnimationId !== undefined) {
    cancelAnimationFrame(window.__threeAnimationId);
    window.__threeAnimationId = undefined;
  }

  /* ----------------------------------------------------------
     Canvas & Renderer
     ---------------------------------------------------------- */
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  /* ----------------------------------------------------------
     Scene & Camera
     ---------------------------------------------------------- */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  /* ----------------------------------------------------------
     Constants
     ---------------------------------------------------------- */
  const PARTICLE_COUNT  = 170;   // per stream
  const Z_MIN           = -100;
  const Z_MAX           = 100;
  const SPREAD          = 15;    // ±15 on X and Y
  const RESET_THRESHOLD = 50;    // reset when Z > this
  const WAVE_AMPLITUDE  = 0.02;
  const STAR_COUNT      = 100;

  /* ----------------------------------------------------------
     Helper: build a particle stream
     ---------------------------------------------------------- */
  function createStream(color) {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds    = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() * 2 - 1) * SPREAD;   // X
      positions[i3 + 1] = (Math.random() * 2 - 1) * SPREAD;   // Y
      positions[i3 + 2] = (Math.random() * 2 - 1) * (Z_MAX - Z_MIN) / 2 + (Z_MIN + Z_MAX) / 2; // Z spread across range
      speeds[i] = 0.1 + Math.random() * 0.3;                   // 0.1 – 0.4
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color,
      size: 1.5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    return { geometry, speeds };
  }

  /* ----------------------------------------------------------
     Data Stream Particles (3 streams × 170 = 510 particles)
     ---------------------------------------------------------- */
  const stream1 = createStream(0x00e5ff);   // cyan
  const stream2 = createStream(0x8b5cf6);   // purple
  const stream3 = createStream(0xff2d7b);   // pink

  const streams = [stream1, stream2, stream3];

  /* ----------------------------------------------------------
     Background Starfield (static)
     ---------------------------------------------------------- */
  (function buildStarfield() {
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const radius = 200;

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3    = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = radius * (0.5 + Math.random() * 0.5);

      starPositions[i3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = r * Math.cos(phi);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });

    scene.add(new THREE.Points(geo, mat));
  })();

  /* ----------------------------------------------------------
     Mouse Parallax
     ---------------------------------------------------------- */
  const mouse     = { x: 0, y: 0 };
  const camTarget = { x: 0, y: 0 };

  if (!prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Resize Handler
     ---------------------------------------------------------- */
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize, { passive: true });

  /* ----------------------------------------------------------
     Animation Loop
     ---------------------------------------------------------- */
  function animate() {
    window.__threeAnimationId = requestAnimationFrame(animate);

    if (!prefersReducedMotion) {
      /* --- Advance each stream's particles --- */
      for (let s = 0; s < streams.length; s++) {
        const { geometry, speeds } = streams[s];
        const positions = geometry.attributes.position.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;

          // Move forward along Z
          positions[i3 + 2] += speeds[i];

          // Sinusoidal wave wobble on X and Y (frequency based on Z position)
          const zPhase = positions[i3 + 2] * 0.05;
          positions[i3]     += Math.sin(zPhase + i)       * WAVE_AMPLITUDE;
          positions[i3 + 1] += Math.cos(zPhase + i * 0.7) * WAVE_AMPLITUDE;

          // Reset particles that pass the camera threshold
          if (positions[i3 + 2] > RESET_THRESHOLD) {
            positions[i3]     = (Math.random() * 2 - 1) * SPREAD;
            positions[i3 + 1] = (Math.random() * 2 - 1) * SPREAD;
            positions[i3 + 2] = Z_MIN;
          }
        }

        geometry.attributes.position.needsUpdate = true;
      }

      /* --- Camera parallax --- */
      camTarget.x += (mouse.x * 4 - camTarget.x) * 0.03;
      camTarget.y += (-mouse.y * 4 - camTarget.y) * 0.03;
      camera.position.x = camTarget.x;
      camera.position.y = camTarget.y;
      camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
  }

  animate();

})();
