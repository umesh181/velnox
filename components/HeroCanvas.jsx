'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
  Hero WebGL: an ocean of particles rippling in slow waves beneath the
  headline. Muted warm-grey dots with occasional electric-blue sparks,
  camera sways gently toward the cursor. Pauses when the tab is hidden,
  respects prefers-reduced-motion, lighter grid on mobile.
*/

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 900;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.2, 9);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // particle grid
    const COLS = isMobile ? 90 : 130;
    const ROWS = isMobile ? 42 : 60;
    const W = 30;
    const D = 16;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const ink = new THREE.Color('#8a877f'); // muted so the type stays king
    const accent = new THREE.Color('#3440f0');

    let i3 = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i3] = (c / (COLS - 1) - 0.5) * W;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = (r / (ROWS - 1) - 0.5) * D;
        const col = Math.random() < 0.04 ? accent : ink;
        colors[i3] = col.r;
        colors[i3 + 1] = col.g;
        colors[i3 + 2] = col.b;
        i3 += 3;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const points = new THREE.Points(geo, mat);
    points.position.y = -2.1;
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId;
    let running = true;

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      if (!reduced) {
        const pos = geo.attributes.position.array;
        let j = 0;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const x = pos[j];
            const z = pos[j + 2];
            pos[j + 1] =
              Math.sin(x * 0.55 + t * 0.9) * Math.cos(z * 0.6 + t * 0.6) * 0.55 +
              Math.sin((x + z) * 0.3 + t * 0.4) * 0.3;
            j += 3;
          }
        }
        geo.attributes.position.needsUpdate = true;
        points.rotation.z = mouseX * 0.03;
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
        camera.position.y += (4.2 + mouseY * 0.5 - camera.position.y) * 0.04;
        camera.lookAt(0, -1, 0);
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) {
        clock.start();
        tick();
      } else {
        cancelAnimationFrame(rafId);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
