"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Animated 3D bar chart embedded in the hero dashboard.
export default function Chart3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5.5, 4.5, 6.5);
    camera.lookAt(0, 1.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 10, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 50;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9bb8ff, 0.5);
    fill.position.set(-6, 4, -4);
    scene.add(fill);

    // Group that holds bars + floor, rotated gently
    const group = new THREE.Group();
    scene.add(group);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(8.5, 3.5);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xeaeeff,
      roughness: 0.9,
      metalness: 0,
      transparent: true,
      opacity: 0.55,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    group.add(floor);

    // Bars
    const data = [0.45, 0.62, 0.5, 0.78, 0.9, 0.68, 0.82];
    const barWidth = 0.85;
    const gap = 0.45;
    const totalWidth = data.length * barWidth + (data.length - 1) * gap;
    const startX = -totalWidth / 2 + barWidth / 2;

    const bars: { mesh: THREE.Mesh; target: number }[] = [];

    data.forEach((v, i) => {
      const geo = new THREE.BoxGeometry(barWidth, 1, barWidth);
      // Shift geometry so it grows from the floor (pivot at base)
      geo.translate(0, 0.5, 0);

      const hue = new THREE.Color().lerpColors(
        new THREE.Color(0x4f86ff),
        new THREE.Color(0x0053ce),
        v
      );
      const mat = new THREE.MeshStandardMaterial({
        color: hue,
        roughness: 0.35,
        metalness: 0.15,
      });
      const bar = new THREE.Mesh(geo, mat);
      bar.castShadow = true;
      bar.position.set(startX + i * (barWidth + gap), 0, 0);
      const target = v * 4 + 1;
      bar.scale.y = target; // start at full height; intro multiplier animates it in
      group.add(bar);
      bars.push({ mesh: bar, target });
    });

    // Animation
    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.016;
      bars.forEach((b, i) => {
        // Staggered grow-in (eases 0→1 over the first ~1.5s), then gentle breathing
        const intro = Math.min(1, Math.max(0, t * 0.9 - i * 0.12));
        const eased = 1 - Math.pow(1 - intro, 3); // easeOutCubic
        const breathe = 1 + Math.sin(t * 1.4 + i) * 0.04;
        b.mesh.scale.y = b.target * eased * breathe;
      });
      // Slow auto-rotate
      group.rotation.y = Math.sin(t * 0.22) * 0.4;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      floorGeo.dispose();
      floorMat.dispose();
      bars.forEach((b) => {
        b.mesh.geometry.dispose();
        (b.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" aria-hidden="true" />;
}
