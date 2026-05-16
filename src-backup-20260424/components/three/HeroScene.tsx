'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import LogoMesh from './LogoMesh';

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 3, // ACESFilmicToneMapping
        toneMappingExposure: 1.4,
      }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        {/* Green key light — in front of the logo */}
        <pointLight position={[0, 0, 3]} color="#CCFF00" intensity={2} />
        {/* White rim light — from behind-left */}
        <pointLight position={[-4, 2, -2]} color="#ffffff" intensity={0.5} />
        <LogoMesh />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
