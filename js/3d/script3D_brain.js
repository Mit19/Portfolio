/* ============================================================
   Geometric AI Brain — 3D Background
   Three.js r128 is loaded via CDN before this script.
   Canvas element: #bg-canvas
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
  camera.position.z = 25;

  /* ----------------------------------------------------------
     Brain — IcosahedronGeometry wireframe
     ---------------------------------------------------------- */
  const brainGeo = new THREE.IcosahedronGeometry(8, 2);
  const brainMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const brainMesh = new THREE.Mesh(brainGeo, brainMat);
  scene.add(brainMesh);

  /* ----------------------------------------------------------
     Extract brain vertex positions for synapse effect
     ---------------------------------------------------------- */
  const brainPosAttr = brainGeo.attributes.position;
  const brainVertexCount = brainPosAttr.count;

  // Collect unique vertex positions (icosahedron detail=2 has duplicates)
  const uniqueVertices = [];
  const seen = new Set();
  for (let i = 0; i < brainVertexCount; i++) {
    const x = parseFloat(brainPosAttr.getX(i).toFixed(4));
    const y = parseFloat(brainPosAttr.getY(i).toFixed(4));
    const z = parseFloat(brainPosAttr.getZ(i).toFixed(4));
    const key = `${x},${y},${z}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueVertices.push(new THREE.Vector3(x, y, z));
    }
  }

  /* ----------------------------------------------------------
     Orbiting Particles (100)
     Three colour groups: cyan, purple, pink
     ---------------------------------------------------------- */
  const ORBIT_COUNT   = 100;
  const COLOR_CYAN    = new THREE.Color(0x00d4ff);
  const COLOR_PURPLE  = new THREE.Color(0x8b5cf6);
  const COLOR_PINK    = new THREE.Color(0xec4899);

  // Orbital parameters stored in plain arrays (avoids object churn)
  const orbitRadius = new Float32Array(ORBIT_COUNT);
  const orbitAngle  = new Float32Array(ORBIT_COUNT);
  const orbitSpeed  = new Float32Array(ORBIT_COUNT);
  const orbitTilt   = new Float32Array(ORBIT_COUNT);   // inclination (radians)
  const orbitPhase  = new Float32Array(ORBIT_COUNT);   // Y-axis phase offset

  for (let i = 0; i < ORBIT_COUNT; i++) {
    orbitRadius[i] = 9 + Math.random() * 6;            // 9–15 units
    orbitAngle[i]  = Math.random() * Math.PI * 2;
    orbitSpeed[i]  = (0.002 + Math.random() * 0.006) * (Math.random() < 0.5 ? 1 : -1);
    orbitTilt[i]   = Math.random() * Math.PI;          // 0–π inclination
    orbitPhase[i]  = Math.random() * Math.PI * 2;      // phase for Y wobble
  }

  // Split into 3 colour groups using 3 separate Points objects
  function buildOrbitGroup(startIdx, endIdx, color) {
    const count = endIdx - startIdx;
    const pos   = new Float32Array(count * 3);
    const geo   = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size: 1.5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    return { pts, geo, pos, startIdx, count };
  }

  const groupSize  = Math.floor(ORBIT_COUNT / 3);
  const orbitGroups = [
    buildOrbitGroup(0,           groupSize,       COLOR_CYAN),
    buildOrbitGroup(groupSize,   groupSize * 2,   COLOR_PURPLE),
    buildOrbitGroup(groupSize*2, ORBIT_COUNT,     COLOR_PINK),
  ];

  /* Compute a particle's world position given its orbital parameters.
     Uses a simple rotated circle: rotate around X by tilt, then around Y by angle. */
  function orbitPosition(i, target) {
    const r     = orbitRadius[i];
    const theta = orbitAngle[i];
    const tilt  = orbitTilt[i];

    // Circle in XZ plane, then tilt around X axis
    const xFlat = r * Math.cos(theta);
    const zFlat = r * Math.sin(theta);

    target.x = xFlat;
    target.y = zFlat * Math.sin(tilt);
    target.z = zFlat * Math.cos(tilt);
  }

  // Initialise positions
  const _tmp = new THREE.Vector3();
  for (const grp of orbitGroups) {
    for (let k = 0; k < grp.count; k++) {
      const i = grp.startIdx + k;
      orbitPosition(i, _tmp);
      grp.pos[k * 3]     = _tmp.x;
      grp.pos[k * 3 + 1] = _tmp.y;
      grp.pos[k * 3 + 2] = _tmp.z;
    }
    grp.geo.attributes.position.needsUpdate = true;
  }

  /* ----------------------------------------------------------
     Synapse Flash — glowing points that fade out
     ---------------------------------------------------------- */
  const MAX_SYNAPSES = 5;

  // Pre-allocate a pool of synapse point objects
  const synapsePosArr = new Float32Array(MAX_SYNAPSES * 3);
  const synapseGeo    = new THREE.BufferGeometry();
  synapseGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(synapsePosArr, 3)
  );
  synapseGeo.setDrawRange(0, 0);

  const synapseMat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 3.5,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const synapsePoints = new THREE.Points(synapseGeo, synapseMat);
  scene.add(synapsePoints);

  // Active synapse state
  let synapseLife        = 0;   // frames remaining (counts down from 30)
  let synapseCount       = 0;   // how many are active
  const SYNAPSE_DURATION = 30;
  const SYNAPSE_INTERVAL = 120; // trigger every ~120 frames
  let   frameCount       = 0;

  function triggerSynapses() {
    synapseCount = 3 + Math.floor(Math.random() * 3);  // 3–5
    synapseLife  = SYNAPSE_DURATION;

    for (let s = 0; s < synapseCount; s++) {
      const v = uniqueVertices[Math.floor(Math.random() * uniqueVertices.length)];
      // Apply the brain mesh's current world rotation
      const world = v.clone().applyEuler(brainMesh.rotation);
      synapsePosArr[s * 3]     = world.x;
      synapsePosArr[s * 3 + 1] = world.y;
      synapsePosArr[s * 3 + 2] = world.z;
    }

    synapseGeo.attributes.position.needsUpdate = true;
    synapseGeo.setDrawRange(0, synapseCount);
  }

  /* ----------------------------------------------------------
     Background Starfield — 80 dim white static points
     ---------------------------------------------------------- */
  const STAR_COUNT = 80;
  const starPos    = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    // Distribute on a large sphere shell (radius 60–90)
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = 60 + Math.random() * 30;
    starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i * 3 + 2] = r * Math.cos(phi);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.8,
    transparent: true,
    opacity: 0.25,
    sizeAttenuation: true,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ----------------------------------------------------------
     Mouse Parallax
     ---------------------------------------------------------- */
  const mouse     = { x: 0, y: 0 };
  const camTarget = { x: 0, y: 0 };

  if (!prefersReducedMotion) {
    window.addEventListener('mousemove', function (e) {
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
      frameCount++;

      /* --- Rotate brain --- */
      brainMesh.rotation.y += 0.001;
      brainMesh.rotation.x += 0.0005 * Math.sin(frameCount * 0.01);

      /* --- Update orbiting particles --- */
      for (let i = 0; i < ORBIT_COUNT; i++) {
        orbitAngle[i] += orbitSpeed[i];
      }
      for (const grp of orbitGroups) {
        for (let k = 0; k < grp.count; k++) {
          const i = grp.startIdx + k;
          orbitPosition(i, _tmp);
          grp.pos[k * 3]     = _tmp.x;
          grp.pos[k * 3 + 1] = _tmp.y;
          grp.pos[k * 3 + 2] = _tmp.z;
        }
        grp.geo.attributes.position.needsUpdate = true;
      }

      /* --- Synapse firing --- */
      if (frameCount % SYNAPSE_INTERVAL === 0) {
        triggerSynapses();
      }
      if (synapseLife > 0) {
        synapseLife--;
        // Fade out over the duration
        synapseMat.opacity = synapseLife / SYNAPSE_DURATION;
        if (synapseLife === 0) {
          synapseGeo.setDrawRange(0, 0);
          synapseMat.opacity = 1.0;
        }
      }

      /* --- Camera parallax with easing --- */
      camTarget.x += (mouse.x * 4 - camTarget.x) * 0.03;
      camTarget.y += (-mouse.y * 4 - camTarget.y) * 0.03;
      camera.position.x = camTarget.x;
      camera.position.y = camTarget.y;
      camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
  }

  /* ----------------------------------------------------------
     Start
     ---------------------------------------------------------- */
  if (prefersReducedMotion) {
    renderer.render(scene, camera);
  } else {
    animate();
  }

})();
