'use client';

import { useRef, MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ScissorsProps {
  scrollProgressRef: MutableRefObject<number>;
}

export default function ScissorsObject({ scrollProgressRef }: ScissorsProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const wireRef1 = useRef<THREE.Mesh>(null!);
  const wireRef2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollProgressRef.current;

    if (!groupRef.current) return;

    // Slow idle rotation
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.12;
    groupRef.current.rotation.z = Math.cos(t * 0.12) * 0.06;

    // Subtle float
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;

    // Scroll-driven: scale down + descend
    const targetScale = THREE.MathUtils.lerp(1.0, 0.05, p);
    groupRef.current.scale.setScalar(targetScale);
    groupRef.current.position.z = THREE.MathUtils.lerp(0, -3, p);

    // Pulse the wireframe green glow
    const pulse = (Math.sin(t * 2) + 1) * 0.5;
    if (wireRef1.current) {
      (wireRef1.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + pulse * 0.07;
    }
    if (wireRef2.current) {
      (wireRef2.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + pulse * 0.07;
    }
  });

  const metalProps = {
    metalness: 0.97,
    roughness: 0.04,
    color: '#D8D8D8',
  };

  const greenMetal = {
    metalness: 1,
    roughness: 0.05,
    color: '#CCFF00',
    emissive: '#334400',
    emissiveIntensity: 0.4,
  };

  return (
    <group ref={groupRef}>
      {/* ── LEFT BLADE ── */}
      <group rotation={[0, 0, -0.28]} position={[-0.12, 0.35, 0]}>
        {/* Main blade body */}
        <mesh>
          <boxGeometry args={[0.055, 1.85, 0.028]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        {/* Blade tip bevel */}
        <mesh position={[0, 0.96, 0]}>
          <coneGeometry args={[0.028, 0.14, 4]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        {/* Cutting edge ridge */}
        <mesh position={[0.018, 0, 0.015]}>
          <boxGeometry args={[0.008, 1.85, 0.005]} />
          <meshStandardMaterial metalness={1} roughness={0.0} color="#FFFFFF" />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={wireRef1}>
          <boxGeometry args={[0.056, 1.86, 0.029]} />
          <meshBasicMaterial color="#CCFF00" wireframe transparent opacity={0.12} />
        </mesh>
      </group>

      {/* ── RIGHT BLADE ── */}
      <group rotation={[0, 0, 0.28]} position={[0.12, 0.35, 0]}>
        <mesh>
          <boxGeometry args={[0.055, 1.85, 0.028]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        <mesh position={[0, 0.96, 0]}>
          <coneGeometry args={[0.028, 0.14, 4]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        <mesh position={[-0.018, 0, 0.015]}>
          <boxGeometry args={[0.008, 1.85, 0.005]} />
          <meshStandardMaterial metalness={1} roughness={0.0} color="#FFFFFF" />
        </mesh>
        <mesh ref={wireRef2}>
          <boxGeometry args={[0.056, 1.86, 0.029]} />
          <meshBasicMaterial color="#CCFF00" wireframe transparent opacity={0.12} />
        </mesh>
      </group>

      {/* ── PIVOT SCREW ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.055, 24]} />
        <meshStandardMaterial {...greenMetal} />
      </mesh>
      {/* Screw head detail */}
      <mesh position={[0, 0, 0.032]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 6]} />
        <meshStandardMaterial metalness={1} roughness={0.05} color="#CCFF00" emissive="#CCFF00" emissiveIntensity={0.6} />
      </mesh>

      {/* ── LEFT HANDLE RING ── */}
      <group position={[-0.38, -0.88, 0]} rotation={[0, 0, 0.28]}>
        <mesh>
          <torusGeometry args={[0.24, 0.055, 18, 40]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        {/* Inner ring rim */}
        <mesh>
          <torusGeometry args={[0.19, 0.018, 12, 32]} />
          <meshStandardMaterial metalness={1} roughness={0.02} color="#CCFF00" emissive="#CCFF00" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* ── RIGHT HANDLE RING ── */}
      <group position={[0.38, -0.88, 0]} rotation={[0, 0, -0.28]}>
        <mesh>
          <torusGeometry args={[0.24, 0.055, 18, 40]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.19, 0.018, 12, 32]} />
          <meshStandardMaterial metalness={1} roughness={0.02} color="#CCFF00" emissive="#CCFF00" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* ── BLADE CONNECTOR (where blades meet pivot) ── */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.34, 0.055, 0.032]} />
        <meshStandardMaterial {...metalProps} />
      </mesh>
    </group>
  );
}
