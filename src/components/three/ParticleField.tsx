'use client';

import { useRef, MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 2800;
const SPREAD = 14;

// Initialized at module load — safe to use Math.random() outside component render
const velocities = new Float32Array(COUNT * 3);
const phases = new Float32Array(COUNT);
const sizes = new Float32Array(COUNT);
const initialPositions = new Float32Array(COUNT * 3);

for (let i = 0; i < COUNT; i++) {
  const i3 = i * 3;
  initialPositions[i3]     = (Math.random() - 0.5) * SPREAD;
  initialPositions[i3 + 1] = (Math.random() - 0.5) * SPREAD * 0.7;
  initialPositions[i3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;

  velocities[i3]     = (Math.random() - 0.5) * 0.002;
  velocities[i3 + 1] = Math.random() * 0.003 + 0.001; // drift upward
  velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

  phases[i] = Math.random() * Math.PI * 2;
  sizes[i] = Math.random() < 0.08 ? Math.random() * 0.04 + 0.02 : Math.random() * 0.015 + 0.005;
}

// Working copy mutated every frame — kept in module scope so it's stable
const workingPos = initialPositions.slice();

interface ParticleFieldProps {
  scrollProgressRef: MutableRefObject<number>;
}

export default function ParticleField({ scrollProgressRef }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollProgressRef.current;
    const geo = pointsRef.current.geometry;
    const half = SPREAD * 0.5;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      workingPos[i3]     += velocities[i3]     + Math.sin(t * 0.3 + phases[i]) * 0.0006;
      workingPos[i3 + 1] += velocities[i3 + 1];
      workingPos[i3 + 2] += velocities[i3 + 2];

      // Wrap vertically
      if (workingPos[i3 + 1] > half * 0.7) workingPos[i3 + 1] = -half * 0.7;
      // Wrap horizontally
      if (workingPos[i3]     >  half) workingPos[i3]     = -half;
      if (workingPos[i3]     < -half) workingPos[i3]     =  half;
      if (workingPos[i3 + 2] >  half * 0.5) workingPos[i3 + 2] = -half * 0.5;
      if (workingPos[i3 + 2] < -half * 0.5) workingPos[i3 + 2] =  half * 0.5;
    }

    // In-place mutation — just mark the attribute dirty
    geo.attributes.position.needsUpdate = true;

    // Fade + drift apart on scroll
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(0.65, 0.0, p);
    mat.size = THREE.MathUtils.lerp(0.022, 0.055, p); // expand before disappearing
    pointsRef.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[workingPos, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#CCFF00"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
