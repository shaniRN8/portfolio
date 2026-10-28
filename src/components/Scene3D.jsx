import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── 1. Soft Circular Star Texture ───────────────────────────────────────────
function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.12, "rgba(255, 255, 255, 0.95)");
  gradient.addColorStop(0.28, "rgba(219, 234, 254, 0.65)");
  gradient.addColorStop(0.55, "rgba(96, 165, 250, 0.22)");
  gradient.addColorStop(0.8, "rgba(56, 189, 248, 0.06)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ─── 2. Diffraction-Spiked Star Flare Texture (Cross Spikes) ─────────────────
function createSpikeStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const cx = 64;
  const cy = 64;

  ctx.clearRect(0, 0, 128, 128);

  // Soft circular halo
  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 54);
  halo.addColorStop(0, "rgba(255, 255, 255, 1)");
  halo.addColorStop(0.12, "rgba(255, 255, 255, 0.85)");
  halo.addColorStop(0.35, "rgba(186, 230, 253, 0.28)");
  halo.addColorStop(0.7, "rgba(56, 189, 248, 0.06)");
  halo.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, 128, 128);

  // Horizontal diffraction spike ray
  const hSpike = ctx.createLinearGradient(0, cy, 128, cy);
  hSpike.addColorStop(0, "rgba(255, 255, 255, 0)");
  hSpike.addColorStop(0.35, "rgba(255, 255, 255, 0.35)");
  hSpike.addColorStop(0.5, "rgba(255, 255, 255, 1)");
  hSpike.addColorStop(0.65, "rgba(255, 255, 255, 0.35)");
  hSpike.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = hSpike;
  ctx.beginPath();
  ctx.moveTo(2, cy);
  ctx.lineTo(cx, cy - 2.5);
  ctx.lineTo(126, cy);
  ctx.lineTo(cx, cy + 2.5);
  ctx.closePath();
  ctx.fill();

  // Vertical diffraction spike ray
  const vSpike = ctx.createLinearGradient(cx, 0, cx, 128);
  vSpike.addColorStop(0, "rgba(255, 255, 255, 0)");
  vSpike.addColorStop(0.35, "rgba(255, 255, 255, 0.35)");
  vSpike.addColorStop(0.5, "rgba(255, 255, 255, 1)");
  vSpike.addColorStop(0.65, "rgba(255, 255, 255, 0.35)");
  vSpike.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = vSpike;
  ctx.beginPath();
  ctx.moveTo(cx, 2);
  ctx.lineTo(cx + 2.5, cy);
  ctx.lineTo(cx, 126);
  ctx.lineTo(cx - 2.5, cy);
  ctx.closePath();
  ctx.fill();

  // Intense central nucleus
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 7);
  core.addColorStop(0, "rgba(255, 255, 255, 1)");
  core.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Prominent Spiked Stars sampled from user reference photo
const HERO_SPIKED_STARS = [
  // 1. Bright Orange Giant Star (Lower Left - exact signature from user image!)
  { position: [-6.2, -3.2, -1.2], color: "#fb923c", size: 1.25, speed: 2.1 },
  // 2. Radiant Cyan Star (Upper Left - exact signature from user image!)
  { position: [-3.8, 4.3, -2.0], color: "#38bdf8", size: 1.4, speed: 1.7 },
  // 3. Bright White-Blue Star (Upper Right - exact signature from user image!)
  { position: [6.6, 3.8, -1.8], color: "#ffffff", size: 1.3, speed: 2.4 },
  // 4. Cyan Star (Mid Upper Right - exact signature from user image!)
  { position: [5.8, 2.1, -1.0], color: "#67e8f9", size: 1.1, speed: 2.9 },
  // 5. White Star (Mid Right - exact signature from user image!)
  { position: [7.2, 0.3, -1.6], color: "#e0f2fe", size: 1.15, speed: 1.8 },
  // 6. Amber Accent Star (Mid Lower Right)
  { position: [3.6, -1.8, -1.4], color: "#fcd34d", size: 0.95, speed: 2.7 },
  // 7. Electric Blue Star (Mid Left)
  { position: [-6.5, 2.6, -1.5], color: "#60a5fa", size: 1.05, speed: 2.2 },
  // 8. Distant Spiked Star (Upper Center)
  { position: [-0.4, 4.9, -2.5], color: "#93c5fd", size: 0.9, speed: 2.5 },
  // 9. Lower Right Spiked Star
  { position: [6.2, -4.4, -1.8], color: "#ffffff", size: 1.0, speed: 1.6 },
  // 10. Warm Amber Star (Far Lower Left)
  { position: [-7.8, -4.6, -2.2], color: "#fdba74", size: 0.85, speed: 2.3 },
];

// ─── Prominent Spiked Stars Component ────────────────────────────────────────
function SpikedStars() {
  const spikeTexture = useMemo(() => createSpikeStarTexture(), []);
  const starsRef = useRef([]);

  useEffect(() => {
    return () => {
      spikeTexture.dispose();
    };
  }, [spikeTexture]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    starsRef.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const data = HERO_SPIKED_STARS[idx];
      // Organic celestial twinkle
      const twinkle =
        1 +
        Math.sin(t * data.speed + idx * 1.6) * 0.2 +
        Math.cos(t * (data.speed * 0.6)) * 0.08;
      mesh.scale.set(data.size * twinkle, data.size * twinkle, 1);
    });
  });

  return (
    <group>
      {HERO_SPIKED_STARS.map((star, idx) => (
        <mesh
          key={idx}
          ref={(el) => (starsRef.current[idx] = el)}
          position={star.position}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={spikeTexture}
            color={star.color}
            transparent
            opacity={0.96}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Dense Cosmic Starfield Component (Thousands of Stars) ───────────────────
function DeepCosmicStarfield() {
  const pointsRef = useRef();
  const count = 5500; // Dense field matching the user's starry background

  const starTexture = useMemo(() => createStarTexture(), []);

  useEffect(() => {
    return () => {
      starTexture.dispose();
    };
  }, [starTexture]);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cWhite = new THREE.Color("#ffffff");
    const cIceBlue = new THREE.Color("#dbeafe");
    const cCyan = new THREE.Color("#38bdf8");
    const cOrange = new THREE.Color("#fb923c");
    const cAmber = new THREE.Color("#fcd34d");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Fill entire view widely across width and height
      pos[i3] = (Math.random() - 0.5) * 36;
      pos[i3 + 1] = (Math.random() - 0.5) * 26;
      pos[i3 + 2] = -12 + Math.random() * 11; // Layered depth

      // Color distribution sampled from user photo
      const rand = Math.random();
      const starCol = new THREE.Color();

      if (rand < 0.68) {
        // Crisp white / diamond ice-blue stars
        starCol.copy(cWhite).lerp(cIceBlue, Math.random() * 0.7);
      } else if (rand < 0.86) {
        // Cyan / electric blue stars
        starCol.copy(cCyan).lerp(cWhite, Math.random() * 0.4);
      } else if (rand < 0.95) {
        // Golden / amber stars
        starCol.copy(cAmber);
      } else {
        // Warm orange/peach stars
        starCol.copy(cOrange);
      }

      col[i3] = starCol.r;
      col[i3 + 1] = starCol.g;
      col[i3 + 2] = starCol.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      // Very slow cosmic drift
      pointsRef.current.rotation.z += delta * 0.006;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        map={starTexture}
        vertexColors
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Spiral Galaxy Component ─────────────────────────────────────────────────
function SpiralGalaxy({ mouseX, mouseY }) {
  const groupRef = useRef();
  const coreRef = useRef();

  const starTexture = useMemo(() => createStarTexture(), []);

  useEffect(() => {
    return () => {
      starTexture.dispose();
    };
  }, [starTexture]);

  const parameters = {
    count: 14000,
    radius: 5.6,
    branches: 3,
    spin: 1.35,
    randomness: 0.52,
    power: 3.8,
  };

  const { positions, colors } = useMemo(() => {
    const { count, radius, branches, spin, randomness, power } = parameters;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorCoreWhite = new THREE.Color("#ffffff");
    const colorCoreCyan = new THREE.Color("#e0f2fe");
    const colorArmCyan = new THREE.Color("#38bdf8");
    const colorArmBlue = new THREE.Color("#60a5fa");
    const colorArmOrange = new THREE.Color("#fb923c");
    const colorArmAmber = new THREE.Color("#fcd34d");
    const colorOuter = new THREE.Color("#2563eb");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 1.55) * radius;
      const branchAngle = ((i % branches) * 2 * Math.PI) / branches;
      const spinAngle = r * spin;

      const randX =
        Math.pow(Math.random(), power) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        (r * 0.35 + 0.15);
      const randY =
        Math.pow(Math.random(), power) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        (r * 0.35 + 0.15);
      const randZ =
        Math.pow(Math.random(), power) *
        (Math.random() < 0.5 ? 1 : -1) *
        0.28 *
        (r * 0.2 + 0.08);

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randX;
      positions[i3 + 1] = Math.sin(branchAngle + spinAngle) * r + randY;
      positions[i3 + 2] = randZ;

      const starColor = new THREE.Color();
      const normR = r / radius;

      if (r < 0.65) {
        starColor.copy(colorCoreWhite).lerp(colorCoreCyan, normR / 0.65);
      } else {
        const starType = Math.random();
        if (starType < 0.28) {
          starColor.copy(colorArmOrange).lerp(colorArmAmber, Math.random() * 0.6);
        } else if (starType < 0.76) {
          starColor.copy(colorArmCyan).lerp(colorArmBlue, Math.random() * 0.5);
        } else {
          starColor.copy(colorCoreWhite).lerp(colorArmCyan, 0.3);
        }

        if (normR > 0.7) {
          starColor.lerp(colorOuter, (normR - 0.7) * 0.8);
        }
      }

      colors[i3] = starColor.r;
      colors[i3 + 1] = starColor.g;
      colors[i3 + 2] = starColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.z += delta * 0.085;

    const targetRotX = -0.35 + -mouseY.current * 0.2;
    const targetRotY = 0.25 + mouseX.current * 0.2;

    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.05;

    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group ref={groupRef} position={[1.1, 0.15, -0.2]}>
      {/* Radiant Core Bloom */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial
          map={starTexture}
          color="#ffffff"
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary Cyan Glow Aura */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          map={starTexture}
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 14,000 Spiral Star Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.072}
          map={starTexture}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.95}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ─── Scene Container ──────────────────────────────────────────────────────────
function Scene({ mouseX, mouseY }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[1.1, 0.15, 2]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, 2, -2]} intensity={0.6} color="#38bdf8" />

      {/* 1. Thousands of background stars matching user photo */}
      <DeepCosmicStarfield />

      {/* 2. Prominent diffraction-spiked stars (cross-flare stars) */}
      <SpikedStars />

      {/* 3. Central rotating Spiral Galaxy */}
      <SpiralGalaxy mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

// ─── Fallback (no WebGL) ──────────────────────────────────────────────────────
function CanvasFallback() {
  return (
    <div className="hero-fallback">
      <div className="fallback-orb" />
    </div>
  );
}

// ─── Exported Component ───────────────────────────────────────────────────────
export default function Scene3D() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) setWebGLSupported(false);

    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!webGLSupported) return <CanvasFallback />;

  return (
    <div className="scene-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 58 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
