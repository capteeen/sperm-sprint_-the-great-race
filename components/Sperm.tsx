
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  velocity: number;
}

// Preload the model
useGLTF.preload('/cc0_-_sperm.glb');

export const PlayerSperm: React.FC<Props> = ({ position, velocity }) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/cc0_-_sperm.glb');

  // Clone the scene to avoid shared state issues
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const swimSpeed = 10 + velocity * 25;

    if (group.current) {
      // Position the entire entity
      group.current.position.set(position[0], position[1], position[2]);

      // Swimming animation - head shake rotation
      group.current.rotation.z = Math.sin(time * swimSpeed) * 0.12;
      group.current.rotation.y = Math.cos(time * swimSpeed * 0.5) * 0.05;
      // Pitch based on velocity
      group.current.rotation.x = -velocity * 0.3;
    }
  });

  return (
    <group ref={group}>
      {/* GLB Model */}
      <primitive
        object={clonedScene}
        scale={[12, 12, 12]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[0, 0, 0]}
      />

      {/* Internal "Nucleus" Glow */}
      <pointLight distance={3} intensity={5} color="#00ffff" />
    </group>
  );
};
