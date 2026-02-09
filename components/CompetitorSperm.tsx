
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  color: string;
  velocity: number;
}

export const CompetitorSperm: React.FC<Props> = ({ position, color, velocity }) => {
  const group = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const swimSpeed = 8 + velocity * 15;
    const offset = position[2] * 0.1; // Unique offset based on Z

    if (group.current) {
      group.current.rotation.z = Math.sin(time * swimSpeed + offset) * 0.1;
    }
    
    if (tailRef.current) {
      const positions = tailRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const z = positions.getZ(i);
        const normalizedZ = z / 2.5;
        const wave = Math.sin(time * swimSpeed - z * 2 + offset) * (normalizedZ * 0.6);
        positions.setX(i, wave);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Realistic Head shape */}
      <mesh scale={[1, 1, 1.3]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      
      {/* Midpiece */}
      <mesh position={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.08, 0.04, 0.4, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>

      {/* Flagellum */}
      <mesh ref={tailRef} position={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.04, 0.005, 2.5, 8, 20]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
