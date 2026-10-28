'use client';

import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import type { Points as ThreePoints } from 'three';

interface StarsProps {
  color: string;
  isAnimated: boolean;
}

const STAR_COUNT = 5000;
const SPHERE_RADIUS = 1.2;

export function StarsScene() {
  const shouldReduceMotion = useReducedMotion();
  // WebGL materials can't read CSS variables, so resolve the token once on mount.
  const [color] = useState(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--star').trim(),
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      dpr={[1, 2]}
      frameloop={shouldReduceMotion ? 'demand' : 'always'}
    >
      <Stars color={color} isAnimated={!shouldReduceMotion} />
    </Canvas>
  );
}

function Stars({ color, isAnimated }: StarsProps) {
  const ref = useRef<ThreePoints>(null);
  const [positions] = useState(() => randomPointsInSphere(STAR_COUNT, SPHERE_RADIUS));

  useFrame((_state, delta) => {
    if (!ref.current || !isAnimated) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial transparent color={color} size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

/** Uniformly distributed points inside a sphere, flattened as [x, y, z, x, y, z, …]. */
function randomPointsInSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}
