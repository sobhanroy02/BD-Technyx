"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

type Block = {
  x: number;
  z: number;
  height: number;
  width: number;
};

function CinematicCameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime() * 0.15;
    camera.position.x = Math.sin(t) * 2.2;
    camera.position.y = 4 + Math.sin(t * 1.8) * 0.7;
    camera.position.z = 16 + Math.cos(t) * 1.5;
    camera.lookAt(0, 2.5, 0);
  });

  return null;
}

function DroneTraffic() {
  const dronesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!dronesRef.current) return;

    const t = clock.getElapsedTime();
    dronesRef.current.children.forEach((drone, index) => {
      drone.position.x = Math.cos(t * 0.7 + index * 0.5) * (6 + index * 0.25);
      drone.position.z = Math.sin(t * 0.65 + index * 0.55) * (5 + index * 0.2);
      drone.position.y = 3 + Math.sin(t * 2 + index) * 0.6;
    });
  });

  return (
    <group ref={dronesRef}>
      {Array.from({ length: 10 }).map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#3AA8FF" : "#FF7A18"}
            emissive={index % 2 === 0 ? "#3AA8FF" : "#FF7A18"}
            emissiveIntensity={1.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function HolographicCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.55;
    groupRef.current.position.y = 4.5 + Math.sin(t * 1.4) * 0.18;
  });

  return (
    <group ref={groupRef} position={[0, 4.5, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.07, 20, 80]} />
        <meshStandardMaterial
          color="#3AA8FF"
          emissive="#3AA8FF"
          emissiveIntensity={1.1}
          transparent
          opacity={0.86}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.1, 0.05, 18, 64]} />
        <meshStandardMaterial
          color="#7B5CFF"
          emissive="#7B5CFF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#00E5C3"
          emissive="#00E5C3"
          emissiveIntensity={1.2}
          metalness={0.4}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

function ScanningBeams() {
  const beamsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!beamsRef.current) return;
    const t = clock.getElapsedTime();

    beamsRef.current.children.forEach((beam, index) => {
      beam.rotation.y = t * (0.3 + index * 0.08);
      beam.position.y = 2.2 + Math.sin(t * 1.2 + index) * 0.25;
    });
  });

  const beamPositions: [number, number, number][] = [
    [-4, 2.2, -3],
    [3.8, 2.2, 2.6],
    [5.5, 2.2, -5.2],
  ];

  return (
    <group ref={beamsRef}>
      {beamPositions.map((position, index) => (
        <mesh key={`beam-${index}`} position={position}>
          <cylinderGeometry args={[0.02, 0.3, 7.4, 16, 1, true]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#00E5C3" : "#FF7A18"}
            emissive={index % 2 === 0 ? "#00E5C3" : "#FF7A18"}
            emissiveIntensity={0.85}
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function MicroSatellites() {
  const satellitesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!satellitesRef.current) return;

    const t = clock.getElapsedTime();
    satellitesRef.current.children.forEach((satellite, index) => {
      const radius = 2.3 + index * 0.55;
      satellite.position.x = Math.cos(t * (1 + index * 0.2) + index * 1.2) * radius;
      satellite.position.z = Math.sin(t * (1 + index * 0.2) + index * 1.2) * radius;
      satellite.position.y = 5.4 + Math.sin(t * 2 + index) * 0.25;
    });
  });

  return (
    <group ref={satellitesRef}>
      {["#3AA8FF", "#7B5CFF", "#FF7A18"].map((color, index) => (
        <mesh key={`satellite-${index}`}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.55} />
        </mesh>
      ))}
    </group>
  );
}

function Skyline() {
  const blocks = useMemo<Block[]>(() => {
    const rows = 11;
    const cols = 11;
    const generated: Block[] = [];

    for (let r = -Math.floor(rows / 2); r <= Math.floor(rows / 2); r += 1) {
      for (let c = -Math.floor(cols / 2); c <= Math.floor(cols / 2); c += 1) {
        const distance = Math.sqrt(r * r + c * c);
        const noise = Math.abs(Math.sin((r + 11) * 12.9898 + (c + 7) * 78.233)) % 1;
        const baseHeight = Math.max(0.8, 6.8 - distance) * (0.7 + noise * 0.8);
        const isCentralTower = r === 0 && c === 0;

        generated.push({
          x: c * 1.7,
          z: r * 1.7,
          height: isCentralTower ? 10.5 : baseHeight,
          width: isCentralTower ? 1.45 : 1.05,
        });
      }
    }

    return generated;
  }, []);

  return (
    <group>
      {blocks.map((block, index) => (
        <Float key={`${block.x}-${block.z}`} speed={0.55} floatIntensity={0.2} rotationIntensity={0.08}>
          <mesh position={[block.x, block.height / 2, block.z]}>
            <boxGeometry args={[block.width, block.height, block.width]} />
            <meshStandardMaterial
              color="#151A2E"
              emissive={index % 3 === 0 ? "#7B5CFF" : "#3AA8FF"}
              emissiveIntensity={0.18}
              metalness={0.65}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshStandardMaterial color="#0F1117" metalness={0.7} roughness={0.28} />
      </mesh>
    </group>
  );
}

export default function CityScene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 16], fov: 48 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="h-full w-full"
    >
      <fog attach="fog" args={["#0F1117", 15, 36]} />
      <ambientLight intensity={0.45} color="#3AA8FF" />
      <directionalLight position={[7, 12, 6]} intensity={1.5} color="#7B5CFF" />
      <pointLight position={[-6, 7, -3]} intensity={2.5} color="#00E5C3" />
      <pointLight position={[6, 5, 6]} intensity={1.8} color="#FF7A18" />
      <CinematicCameraRig />
      <Skyline />
      <DroneTraffic />
      <HolographicCore />
      <ScanningBeams />
      <MicroSatellites />
      <Stars radius={100} depth={65} count={2200} factor={3.5} fade speed={0.5} />
    </Canvas>
  );
}
