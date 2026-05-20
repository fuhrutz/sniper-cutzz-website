'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function LogoPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture('/logo.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
  });

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y += 0.002;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 3]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0.05}
        color="#CCFF00"
        transparent
        alphaMap={texture}
        map={texture}
        side={THREE.DoubleSide}
        alphaTest={0.01}
      />
    </mesh>
  );
}
