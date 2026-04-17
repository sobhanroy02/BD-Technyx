"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type VantaEffect = {
  destroy: () => void;
};

type VantaFactory = (options: Record<string, unknown>) => VantaEffect;

export default function VantaGlobeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!containerRef.current || effectRef.current) {
        return;
      }

      (window as Window & { THREE?: typeof THREE }).THREE = THREE;
      const vantaModule = await import("vanta/dist/vanta.globe.min");
      const createGlobe = vantaModule.default as VantaFactory;

      if (!mounted || !containerRef.current) {
        return;
      }

      effectRef.current = createGlobe({
        el: containerRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x020614,
        color: 0x3f7cff,
        color2: 0x93cbff,
        size: 1,
        points: 10,
        maxDistance: 21,
        spacing: 16,
        showDots: true,
      });
    };

    void init();

    return () => {
      mounted = false;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
