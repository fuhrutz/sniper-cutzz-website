'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function LogoMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture('/logo.png');

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 3]} />
      <meshStandardMaterial
        map={texture}
        alphaMap={texture}
        transparent={true}
        metalness={1.0}
        roughness={0.05}
        color="#CCFF00"
        envMapIntensity={3}
        side={THREE.DoubleSide}
        alphaTest={0.01}
      />
    </mesh>
  );
}
