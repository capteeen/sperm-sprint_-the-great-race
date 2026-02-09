
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ZoneType } from '../types';

interface Props {
  length: number;
  currentZone: ZoneType;
}

const ZONE_COLORS: Record<ZoneType, string> = {
  vagina: '#441100', // Acidic Red/Orange
  cervix: '#440022', // Thick Pink/Magenta
  uterus: '#110033', // Deep Purple
  tube: '#222244',   // Blue/White glow
};

export const Tunnel: React.FC<Props> = ({ length, currentZone }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= length + 50; i += 15) {
      points.push(new THREE.Vector3(
        Math.sin(i * 0.08) * 0.8,
        Math.cos(i * 0.08) * 0.8,
        -i
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 120, 9, 24, false);
  }, [length]);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Target Color based on zone
      const targetColor = new THREE.Color(ZONE_COLORS[currentZone]);
      materialRef.current.color.lerp(targetColor, 0.02);
      materialRef.current.emissive.lerp(targetColor, 0.02);
      
      // Pulse effect matches zone intensity
      const pulseSpeed = currentZone === 'tube' ? 5 : 2;
      const pulse = 1 + Math.sin(time * pulseSpeed) * 0.03;
      meshRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <mesh geometry={geometry} ref={meshRef} receiveShadow>
      <meshStandardMaterial 
        ref={materialRef}
        side={THREE.BackSide} 
        color={ZONE_COLORS.vagina}
        emissive={ZONE_COLORS.vagina}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.4}
      />
    </mesh>
  );
};
