"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useReducedMotion } from "framer-motion";

// Lightweight floating particle field (Three.js Points).
function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip the WebGL field entirely for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Soft circular sprite for each particle
    const sprite = document.createElement("canvas");
    sprite.width = 64;
    sprite.height = 64;
    const sctx = sprite.getContext("2d")!;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(25,107,250,0.95)");
    grad.addColorStop(0.4, "rgba(25,107,250,0.5)");
    grad.addColorStop(1, "rgba(25,107,250,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(sprite);

    const COUNT = 60;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const sway = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = 0.004 + Math.random() * 0.006;
      sway[i] = Math.random() * Math.PI * 2;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      map: texture,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    let raf = 0;
    let t = 0;
    let running = false;

    const animate = () => {
      if (!running) return;
      t += 0.01;
      for (let i = 0; i < COUNT; i++) {
        let y = pos.getY(i) + speeds[i];
        if (y > 8.5) y = -8.5; // wrap around for endless upward drift
        pos.setY(i, y);
        pos.setX(i, pos.getX(i) + Math.sin(t + sway[i]) * 0.0025); // horizontal sway
      }
      pos.needsUpdate = true;
      points.rotation.y = Math.sin(t * 0.08) * 0.12; // slow group rotation
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only render while the hero is on screen — stop the loop once the user
    // scrolls past it, so the rest of the page isn't paying for WebGL.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(container);

    const onResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}

export default function MinimalBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Slow drifting gradient blobs (Framer Motion) */}
      <motion.div
        className="absolute -top-40 -left-24 w-[520px] h-[520px] rounded-full bg-[#0053ce]/10 blur-3xl"
        animate={reduced ? undefined : { x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 right-[-80px] w-[460px] h-[460px] rounded-full bg-[#94a6fe]/20 blur-3xl"
        animate={reduced ? undefined : { x: [0, -40, 0], y: [0, 45, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] left-1/3 w-[400px] h-[400px] rounded-full bg-[#196bfa]/10 blur-3xl"
        animate={reduced ? undefined : { x: [0, 30, 0], y: [0, -35, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D floating particles */}
      <Particles />
    </div>
  );
}
