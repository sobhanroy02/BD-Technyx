"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

type SceneVariant = "services" | "labs" | "about" | "work" | "timeline" | "rooms" | "conversion";

type SceneStyle = {
  baseColor: string;
  accentColor: string;
  secondaryColor: string;
  sparkleColor: string;
  count: number;
  spread: number;
};

const sceneStyles: Record<SceneVariant, SceneStyle> = {
  services: {
    baseColor: "#E50914",
    accentColor: "#FF2B3A",
    secondaryColor: "#F5F5F5",
    sparkleColor: "#FFCDD2",
    count: 18,
    spread: 8,
  },
  labs: {
    baseColor: "#FF2B3A",
    accentColor: "#F5F5F5",
    secondaryColor: "#E50914",
    sparkleColor: "#FFE3E6",
    count: 22,
    spread: 9,
  },
  about: {
    baseColor: "#E50914",
    accentColor: "#F5F5F5",
    secondaryColor: "#FF6B6B",
    sparkleColor: "#FFD8DF",
    count: 16,
    spread: 7,
  },
  work: {
    baseColor: "#FF2B3A",
    accentColor: "#E50914",
    secondaryColor: "#F5F5F5",
    sparkleColor: "#FFE3E6",
    count: 15,
    spread: 7,
  },
  timeline: {
    baseColor: "#E50914",
    accentColor: "#FF2B3A",
    secondaryColor: "#F5F5F5",
    sparkleColor: "#FFC2CC",
    count: 20,
    spread: 10,
  },
  rooms: {
    baseColor: "#E50914",
    accentColor: "#FF2B3A",
    secondaryColor: "#F5F5F5",
    sparkleColor: "#FFD8DF",
    count: 17,
    spread: 8,
  },
  conversion: {
    baseColor: "#FF2B3A",
    accentColor: "#E50914",
    secondaryColor: "#F5F5F5",
    sparkleColor: "#FFE3E6",
    count: 14,
    spread: 6,
  },
};

function BackgroundObjects({ variant }: { variant: SceneVariant }) {
  const style = sceneStyles[variant];
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      Array.from({ length: style.count }, (_, index) => {
        const x = (Math.sin(index * 2.17) * style.spread) / 2;
        const y = Math.cos(index * 1.31) * 2.2;
        const z = Math.sin(index * 0.93) * 2.6;
        const scale = 0.18 + (index % 5) * 0.05;
        return { x, y, z, scale, index };
      }),
    [style.count, style.spread],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.14;
    groupRef.current.rotation.x = Math.sin(t * 0.24) * 0.05;

    groupRef.current.children.forEach((child, index) => {
      child.position.y += Math.sin(t * 0.9 + index) * 0.0018;
      child.rotation.x += 0.003 + index * 0.00003;
      child.rotation.y += 0.0025 + index * 0.00002;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <Float key={`${variant}-${node.index}`} speed={0.8} floatIntensity={0.45} rotationIntensity={0.22}>
          <mesh position={[node.x, node.y, node.z]} scale={node.scale}>
            {(node.index + variant.length) % 3 === 0 ? <octahedronGeometry args={[1, 0]} /> : <icosahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial
              color={node.index % 2 === 0 ? style.baseColor : style.secondaryColor}
              emissive={node.index % 2 === 0 ? style.baseColor : style.secondaryColor}
              emissiveIntensity={0.9}
              roughness={0.25}
              metalness={0.7}
            />
          </mesh>
        </Float>
      ))}

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
        <torusGeometry args={[2.2, 0.05, 16, 120]} />
        <meshStandardMaterial color={style.accentColor} emissive={style.accentColor} emissiveIntensity={1.15} transparent opacity={0.6} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0.5, 0]} position={[0, -2.8, 0]}>
        <torusGeometry args={[3.3, 0.04, 14, 90]} />
        <meshStandardMaterial color={style.secondaryColor} emissive={style.secondaryColor} emissiveIntensity={0.9} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function SectionScene({ variant }: { variant: SceneVariant }) {
  const style = sceneStyles[variant];

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.4]} gl={{ antialias: true, alpha: true }} className="h-full w-full">
      <ambientLight intensity={0.4} color={style.baseColor} />
      <pointLight position={[4, 4, 2]} intensity={1.2} color={style.accentColor} />
      <pointLight position={[-3, -2, 2]} intensity={1.1} color={style.secondaryColor} />
      <BackgroundObjects variant={variant} />
      <Sparkles count={40} speed={0.45} opacity={0.6} size={1.7} scale={[15, 6, 8]} color={style.sparkleColor} />
    </Canvas>
  );
}
