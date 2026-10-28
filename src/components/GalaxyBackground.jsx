import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, AdditiveBlending } from "three";

// Option A: Image-based Galaxy Plane with tilt & mouse parallax
export function GalaxyImage() {
  const ref = useRef();
  const tex = useLoader(TextureLoader, "/galaxy.png");

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.04; // slow spin
    ref.current.rotation.x = -0.9 + state.pointer.y * 0.15; // tilt + mouse parallax
    ref.current.rotation.y = state.pointer.x * 0.15;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[22, 22]} />
      <meshBasicMaterial
        map={tex}
        transparent
        blending={AdditiveBlending} // black background becomes see-through
        depthWrite={false}
      />
    </mesh>
  );
}

// Option B: Real 3D particle galaxy (20,000 points spiral with depth)
export function GalaxyParticles({ count = 20000, radius = 9, arms = 2, spin = 1.3 }) {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const inner = new THREE.Color("#ffd2a8");
    const outer = new THREE.Color("#7fb8ff");

    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const angle = ((i % arms) / arms) * Math.PI * 2 + r * spin;
      const rand = () => (Math.random() - 0.5) * 0.35 * (r * 0.3 + 0.3);

      positions[i * 3] = Math.cos(angle) * r + rand();
      positions[i * 3 + 1] = rand() * 0.6; // thin disc
      positions[i * 3 + 2] = Math.sin(angle) * r + rand();

      const c = inner.clone().lerp(outer, r / radius);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count, radius, arms, spin]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x = 0.5 + state.pointer.y * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main GalaxyBackground component
// Accepts mode="image" (Option A default) or mode="particles" (Option B)
export default function GalaxyBackground({ mode = "image" }) {
  const isParticles = mode === "particles";

  return (
    <div
      className="galaxy-background-container"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={
          isParticles
            ? { position: [0, 4, 12], fov: 60 }
            : { position: [0, 0, 12], fov: 60 }
        }
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {isParticles ? <GalaxyParticles /> : <GalaxyImage />}
        </Suspense>
      </Canvas>
    </div>
  );
}
