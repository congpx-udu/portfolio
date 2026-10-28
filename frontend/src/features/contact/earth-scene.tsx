'use client';

import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import { Suspense } from 'react';

const MODEL_PATH = '/models/planet/scene.gltf';

export function EarthScene() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate={!shouldReduceMotion}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

function Earth() {
  const { scene } = useGLTF(MODEL_PATH);

  return <primitive object={scene} scale={2.5} />;
}
