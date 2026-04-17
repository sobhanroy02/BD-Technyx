"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingPlanet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture("/earth.jpg");

  // Create a custom material that makes the Earth grayscale and high contrast
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: colorMap,
      roughness: 0.8,
      metalness: 0.2,
    });
    // Easy trick for grayscale if we don't write a custom shader: 
    // The texture will be naturally colored, we can use a white light 
    // but actual desaturation requires a small shader patch.
    // Let's modify the shader to desaturate the map color.
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #ifdef USE_MAP
          vec4 texelColor = texture2D( map, vMapUv );
          texelColor = mapTexelToLinear( texelColor );
          // Desaturate
          float gray = dot(texelColor.rgb, vec3(0.299, 0.587, 0.114));
          // Boost contrast for that stark black and white look
          gray = smoothstep(0.1, 0.8, gray);
          diffuseColor *= vec4(vec3(gray), texelColor.a);
        #endif
        `
      );
    };
    return mat;
  }, [colorMap]);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group position={[0, -3.5, 0]}>
      {/* The main planet */}
      <Sphere ref={planetRef} args={[4.5, 64, 64]} position={[0, 0, 0]}>
        <primitive object={material} attach="material" />
      </Sphere>
      {/* Outer atmosphere glow */}
      <Sphere args={[4.65, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      <Sphere args={[4.55, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

export default function PlanetScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Lights to create dramatic dropoff */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#cbfb45" />

        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
        <Suspense fallback={null}>
          <RotatingPlanet />
        </Suspense>
      </Canvas>
    </div>
  );
}
