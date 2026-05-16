'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import LogoMesh from './LogoMesh';

function OrbitingLights() {
  const light1Ref = useRef<THREE.PointLight>(null!);
  const light2Ref = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const angle = clock.elapsedTime * 0.25;

    if (light1Ref.current) {
      light1Ref.current.position.x = Math.cos(angle) * 6;
      light1Ref.current.position.y = Math.sin(angle * 0.6) * 3;
      light1Ref.current.position.z = 4 + Math.sin(angle * 0.4) * 2;
    }

    if (light2Ref.current) {
      const a2 = angle + Math.PI;
      light2Ref.current.position.x = Math.cos(a2) * 6;
      light2Ref.current.position.y = Math.sin(a2 * 0.6) * 3;
      light2Ref.current.position.z = 4 + Math.sin(a2 * 0.4) * 2;
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} color="#ffffff"  intensity={5} />
      <pointLight ref={light2Ref} color="#aaffaa" intensity={2} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.8,
      }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.08} />
        <OrbitingLights />
        <pointLight position={[0,  2,  5]} color="#CCFF00" intensity={1.5} />
        <pointLight position={[4, -1, -3]} color="#88ccff" intensity={1}   />
        <LogoMesh />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  );
}
