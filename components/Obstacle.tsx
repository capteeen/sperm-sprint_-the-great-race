
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  size: number;
  type: 'enzyme' | 'cell' | 'wall';
}

// Preload the model
useGLTF.preload('/red_blood_cell.glb');

export const ObstacleItem: React.FC<Props> = ({ position, size, type }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/red_blood_cell.glb');

  // Clone the scene to avoid shared state issues
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.y += 0.01;
      // Pulse effect
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      const baseScale = size * 0.2;
      groupRef.current.scale.set(baseScale * pulse, baseScale * pulse, baseScale * pulse);
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <primitive
        object={clonedScene}
        scale={[1, 1, 1]}
      />
    </group>
  );
};
