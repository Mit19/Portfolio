/* ============================================================
   Neural Network 3D Background — Three.js r128
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
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 40;

  /* ----------------------------------------------------------
     Constants
     ---------------------------------------------------------- */
  const NODE_COUNT = 60;
  const BOUND = 25;          // ±25 on each axis
  const CONNECT_THRESHOLD = 12;          // units
  const MAX_CONNECTIONS = NODE_COUNT * (NODE_COUNT - 1) / 2; // worst case
  const COLOR_CYAN = new THREE.Color(0x00e5ff);
  const COLOR_PURPLE = new THREE.Color(0x8b5cf6);

  /* ----------------------------------------------------------
     Neural Nodes
     ---------------------------------------------------------- */
  const nodeGeo = new THREE.OctahedronGeometry(0.3, 0);

  const nodes = [];   // { mesh, velocity }
  const nodePositions = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const color = (i % 2 === 0) ? COLOR_CYAN : COLOR_PURPLE;

    const mat = new THREE.MeshBasicMaterial({ color, wireframe: true });
    const mesh = new THREE.Mesh(nodeGeo, mat);

    mesh.position.set(
      (Math.random() * 2 - 1) * BOUND,
      (Math.random() * 2 - 1) * BOUND,
      (Math.random() * 2 - 1) * BOUND
    );

    const speed = 0.04;
    const vel = new THREE.Vector3(
      (Math.random() * 2 - 1) * speed,
      (Math.random() * 2 - 1) * speed,
      (Math.random() * 2 - 1) * speed
    );

    scene.add(mesh);
    nodes.push({ mesh, vel });
    nodePositions.push(mesh.position);
  }

  /* ----------------------------------------------------------
     Connection Lines (pre-allocated BufferGeometry)
     ---------------------------------------------------------- */
  // Each segment = 2 vertices × 3 floats. Allocate for worst-case connections.
  const linePositions = new Float32Array(MAX_CONNECTIONS * 2 * 3);

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(linePositions, 3)
  );
  // Draw range will be updated each frame
  lineGeo.setDrawRange(0, 0);

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.1,
    vertexColors: false,
  });

  const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lineSegments);

  /* ----------------------------------------------------------
     Decorative Torus Rings
     ---------------------------------------------------------- */
  const torusGeoA = new THREE.TorusGeometry(20, 0.1, 16, 64);
  const torusMatA = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const torusA = new THREE.Mesh(torusGeoA, torusMatA);
  torusA.rotation.x = Math.PI / 4;
  scene.add(torusA);

  const torusGeoB = new THREE.TorusGeometry(20, 0.1, 16, 64);
  const torusMatB = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const torusB = new THREE.Mesh(torusGeoB, torusMatB);
  torusB.rotation.y = Math.PI / 3;
  scene.add(torusB);

  /* ----------------------------------------------------------
     Mouse Parallax
     ---------------------------------------------------------- */
  const mouse = { x: 0, y: 0 };
  const camTarget = { x: 0, y: 0 };

  if (!prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 20;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 20;
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Update Connection Lines
     ---------------------------------------------------------- */
  function updateLines() {
    let idx = 0;   // index into linePositions (floats)
    let count = 0;   // number of vertices written

    const threshSq = CONNECT_THRESHOLD * CONNECT_THRESHOLD;

    for (let i = 0; i < NODE_COUNT; i++) {
      const pi = nodePositions[i];

      for (let j = i + 1; j < NODE_COUNT; j++) {
        const pj = nodePositions[j];

        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const dz = pi.z - pj.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < threshSq) {
          // Write start vertex
          linePositions[idx++] = pi.x;
          linePositions[idx++] = pi.y;
          linePositions[idx++] = pi.z;
          // Write end vertex
          linePositions[idx++] = pj.x;
          linePositions[idx++] = pj.y;
          linePositions[idx++] = pj.z;

          count += 2;
        }
      }
    }

    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, count);

    // Fade opacity by average proximity — simple heuristic: more lines = denser
    const density = count / (MAX_CONNECTIONS * 2);
    lineMat.opacity = 0.05 + density * 0.2;
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
      /* --- Move nodes, bounce off boundaries --- */
      for (let i = 0; i < NODE_COUNT; i++) {
        const { mesh, vel } = nodes[i];
        const pos = mesh.position;

        pos.x += vel.x;
        pos.y += vel.y;
        pos.z += vel.z;

        if (pos.x > BOUND || pos.x < -BOUND) { vel.x *= -1; pos.x = Math.max(-BOUND, Math.min(BOUND, pos.x)); }
        if (pos.y > BOUND || pos.y < -BOUND) { vel.y *= -1; pos.y = Math.max(-BOUND, Math.min(BOUND, pos.y)); }
        if (pos.z > BOUND || pos.z < -BOUND) { vel.z *= -1; pos.z = Math.max(-BOUND, Math.min(BOUND, pos.z)); }

        /* Slight rotation per node */
        mesh.rotation.x += 0.008;
        mesh.rotation.y += 0.005;
      }

      /* --- Update connection lines --- */
      updateLines();

      /* --- Rotate torus rings --- */
      torusA.rotation.z += 0.0015;
      torusA.rotation.x += 0.0008;
      torusB.rotation.y += 0.0012;
      torusB.rotation.z -= 0.001;

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
