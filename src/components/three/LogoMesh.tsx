'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function LogoMesh() {
  const groupRef  = useRef<THREE.Group>(null!);
  const layer1Ref = useRef<THREE.Mesh>(null!); // deep chrome base
  const layer2Ref = useRef<THREE.Mesh>(null!); // main chrome
  const layer3Ref = useRef<THREE.Mesh>(null!); // highlight rim
  const mouseRef  = useRef({ x: 0, y: 0 });

  const texture = useTexture('/logo.png');

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t     = clock.elapsedTime;
    const mouse = mouseRef.current;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.12, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.12, 0.04);
    groupRef.current.scale.setScalar(1 + Math.sin(t * 0.35) * 0.018);
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;

    if (layer1Ref.current) layer1Ref.current.position.z = -0.08 + mouse.x * 0.04;
    if (layer2Ref.current) layer2Ref.current.position.z =         mouse.x * 0.02;
    if (layer3Ref.current) layer3Ref.current.position.z =  0.05 + mouse.x * 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* Layer 1 — back shadow */}
      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[8.2, 3.2]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.6} />
      </mesh>

      {/* Layer 2 — deep chrome base */}
      <mesh ref={layer1Ref} position={[0, 0, -0.08]}>
        <planeGeometry args={[8.1, 3.1]} />
        <meshPhysicalMaterial
          map={texture}
          alphaMap={texture}
          transparent
          alphaTest={0.01}
          metalness={1.0}
          roughness={0.3}
          color="#4a6600"
          envMapIntensity={6}
        />
      </mesh>

      {/* Layer 3 — main chrome */}
      <mesh ref={layer2Ref} position={[0, 0, 0]}>
        <planeGeometry args={[8, 3]} />
        <meshPhysicalMaterial
          map={texture}
          alphaMap={texture}
          transparent
          alphaTest={0.01}
          metalness={1.0}
          roughness={0.05}
          color="#CCFF00"
          envMapIntensity={8}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          iridescence={0.3}
          iridescenceIOR={1.5}
        />
      </mesh>

      {/* Layer 4 — highlight rim */}
      <mesh ref={layer3Ref} position={[0, 0, 0.05]}>
        <planeGeometry args={[8, 3]} />
        <meshPhysicalMaterial
          map={texture}
          alphaMap={texture}
          transparent
          alphaTest={0.01}
          metalness={1.0}
          roughness={0.0}
          color="#ffffff"
          envMapIntensity={10}
          opacity={0.15}
        />
      </mesh>

      {/* Layer 5 — front glow plane */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[8, 3]} />
        <meshBasicMaterial
          map={texture}
          alphaMap={texture}
          transparent
          alphaTest={0.01}
          color="#CCFF00"
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}
