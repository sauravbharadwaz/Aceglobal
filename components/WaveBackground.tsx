"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera — angled to give a 3D perspective of the wave plane
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 6);
    camera.lookAt(0, -0.5, 0);

    // Renderer (transparent so the white section shows through)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Wavy plane geometry
    const SEG = 80;
    const geometry = new THREE.PlaneGeometry(22, 22, SEG, SEG);
    geometry.rotateX(-Math.PI / 2);

    const basePositions = Float32Array.from(
      (geometry.attributes.position as THREE.BufferAttribute).array
    );

    // Brand-blue wireframe material
    const material = new THREE.MeshBasicMaterial({
      color: 0x0053ce,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    let frame = 0;
    let raf = 0;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      frame += 0.02;
      for (let i = 0; i < posAttr.count; i++) {
        const x = basePositions[i * 3];
        const z = basePositions[i * 3 + 2];
        const wave =
          Math.sin(x * 0.5 + frame) * 0.6 +
          Math.cos(z * 0.5 + frame * 0.8) * 0.6 +
          Math.sin((x + z) * 0.3 + frame * 1.2) * 0.4;
        posAttr.setY(i, wave);
      }
      posAttr.needsUpdate = true;
      mesh.rotation.z = Math.sin(frame * 0.1) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Resize handling
    const onResize = () => {
      if (!container) return;
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
