"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 220;

// Generates a soft radial-gradient sprite texture used for each particle,
// so points render as glowing dots rather than hard squares.
function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,200,140,0.7)");
  gradient.addColorStop(1, "rgba(255,150,60,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CinematicLayer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Particles ---
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT); // per-particle phase offset for sine drift
    const warmth = new Float32Array(PARTICLE_COUNT); // 0 = white, 1 = full ember orange
    const scales = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      seeds[i] = Math.random() * Math.PI * 2;
      warmth[i] = Math.random();
      scales[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const glowTexture = createGlowTexture();

    const material = new THREE.PointsMaterial({
      size: 0.5,
      map: glowTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
      color: new THREE.Color("#ffb27a"),
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // A second, sparser layer of pure white particles for depth variety.
    const whiteGeometry = geometry.clone();
    const whiteMaterial = material.clone();
    whiteMaterial.color = new THREE.Color("#ffffff");
    whiteMaterial.opacity = 0.5;
    whiteMaterial.size = 0.32;
    const whitePoints = new THREE.Points(whiteGeometry, whiteMaterial);
    whitePoints.position.z = -2;
    scene.add(whitePoints);

    const basePositions = positions.slice();

    // --- Mouse parallax state ---
    const mouse = { x: 0, y: 0 };
    const targetCameraOffset = { x: 0, y: 0 };

    function handlePointerMove(event) {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // --- Resize handling ---
    function handleResize() {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        posAttr.array[idx + 1] =
          basePositions[idx + 1] + Math.sin(elapsed * 0.3 + seeds[i]) * 0.6;
        posAttr.array[idx] =
          basePositions[idx] + Math.cos(elapsed * 0.2 + seeds[i]) * 0.3;
      }
      posAttr.needsUpdate = true;

      points.rotation.y = elapsed * 0.015;
      whitePoints.rotation.y = -elapsed * 0.01;

      // Smooth parallax easing toward mouse target
      targetCameraOffset.x += (mouse.x * 0.8 - targetCameraOffset.x) * 0.03;
      targetCameraOffset.y += (-mouse.y * 0.5 - targetCameraOffset.y) * 0.03;
      camera.position.x = targetCameraOffset.x;
      camera.position.y = targetCameraOffset.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();

      geometry.dispose();
      whiteGeometry.dispose();
      material.dispose();
      whiteMaterial.dispose();
      glowTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
