
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Tunnel } from './Tunnel';
import { PlayerSperm } from './Sperm';
import { CompetitorSperm } from './CompetitorSperm';
import { ObstacleItem } from './Obstacle';
import { GameState, Competitor, Obstacle, ZoneType } from '../types';
import { getRandomNames } from '../data/names';
import { getInputState } from '../utils/inputManager';

interface Props {
  gameState: GameState;
  onUpdate: (updates: Partial<GameState>) => void;
  onFinish: () => void;
}

const RACE_LENGTH = 1200;
const TAP_COOLDOWN = 140;
const FRICTION = 0.985;
const MAX_VEL = 1.3;
const ACCEL = 0.085;
const COLLISION_RADIUS = 1.2;

const getZoneFromDistance = (dist: number): ZoneType => {
  if (dist < 300) return 'vagina';
  if (dist < 600) return 'cervix';
  if (dist < 950) return 'uterus';
  return 'tube';
};

const Scene: React.FC<Props> = ({ gameState, onUpdate, onFinish }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const playerXRef = useRef<number>(0);
  const playerYRef = useRef<number>(0);
  const lastProcessedTapRef = useRef<number>(0);
  const { camera } = useThree();

  useEffect(() => {
    const randomNames = getRandomNames(15);
    const initialComps = Array.from({ length: 15 }).map((_, i) => ({
      id: `comp-${i}`,
      name: randomNames[i],
      distance: Math.random() * 5,
      velocity: 0.15 + Math.random() * 0.25,
      offset: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8] as [number, number],
      color: `hsl(${Math.random() * 360}, 60%, 60%)`
    }));
    setCompetitors(initialComps);

    const obs: Obstacle[] = [];
    for (let i = 50; i < RACE_LENGTH; i += 35) {
      const zone = getZoneFromDistance(i);
      let size = 0.8 + Math.random() * 1.5;
      let density = 1;

      if (zone === 'cervix') size *= 1.8;
      if (zone === 'uterus') density = 2;

      for (let j = 0; j < density; j++) {
        obs.push({
          id: `obs-${i}-${j}`,
          distance: i + (Math.random() * 10),
          position: [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ],
          size: size,
          type: zone === 'vagina' ? 'enzyme' : 'cell'
        });
      }
    }
    setObstacles(obs);
  }, []);

  const velocityRef = useRef(gameState.velocity);
  const rhythmRef = useRef(gameState.rhythmScore);

  useEffect(() => {
    velocityRef.current = gameState.velocity;
    rhythmRef.current = gameState.rhythmScore;
  }, [gameState.velocity, gameState.rhythmScore]);

  useFrame(() => {
    if (!gameState.isRacing) return;

    // Get input from global input manager (outside R3F)
    const input = getInputState();

    // Handle steering from global input
    let steer = 0;
    if (input.left) steer = -1;
    if (input.right) steer = 1;

    // Handle forward boost from global input
    if (input.forward && input.lastTap > lastProcessedTapRef.current) {
      const now = input.lastTap;
      const diff = now - lastProcessedTapRef.current;

      if (diff > TAP_COOLDOWN) {
        let multiplier = 1.0;
        if (diff > 350 && diff < 550) {
          multiplier = 2.0;
          onUpdate({ rhythmScore: Math.min(100, rhythmRef.current + 12) });
        } else {
          onUpdate({ rhythmScore: Math.max(0, rhythmRef.current - 6) });
        }
        onUpdate({ velocity: Math.min(MAX_VEL, velocityRef.current + ACCEL * multiplier) });
        lastProcessedTapRef.current = now;
      }
    }

    // Movement
    playerXRef.current += steer * 0.18;
    playerXRef.current *= 0.95;
    playerYRef.current = Math.sin(gameState.distance * 0.04) * 0.6;

    let newVel = gameState.velocity * FRICTION;
    const newDist = gameState.distance + newVel;

    // Collisions
    for (const obs of obstacles) {
      if (Math.abs(obs.distance - newDist) < 1.2) {
        const dist2D = Math.sqrt(
          Math.pow(playerXRef.current - obs.position[0], 2) +
          Math.pow(playerYRef.current - obs.position[1], 2)
        );
        if (dist2D < obs.size + COLLISION_RADIUS) {
          newVel *= 0.35;
        }
      }
    }

    const currentZone = getZoneFromDistance(newDist);

    const camTargetX = playerXRef.current * 0.5;
    const camTargetY = playerYRef.current + 6;
    const camTargetZ = -newDist + 10;

    camera.position.lerp(new THREE.Vector3(camTargetX, camTargetY, camTargetZ), 0.1);
    camera.lookAt(playerXRef.current, playerYRef.current, -newDist - 8);

    const updatedComps = competitors.map(c => ({
      ...c,
      distance: c.distance + c.velocity + (Math.random() * 0.06),
      velocity: Math.max(0.1, c.velocity + (Math.random() - 0.5) * 0.012)
    }));
    setCompetitors(updatedComps);

    const sorted = [...updatedComps, { id: 'player', distance: newDist }]
      .sort((a, b) => b.distance - a.distance);
    const myRank = sorted.findIndex(x => x.id === 'player') + 1;

    onUpdate({
      velocity: newVel,
      distance: newDist,
      rank: myRank + 99999980,
      currentZone,
      competitors: updatedComps,
      raceTime: gameState.raceTime + 0.016,
    });

    if (newDist > RACE_LENGTH) onFinish();
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={60} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, -gameState.distance]} color="#ffffff" intensity={1.5} />
      <fog attach="fog" args={['#050005', 15, 85]} />

      <Stars radius={150} depth={50} count={4000} factor={4} speed={1} />

      <Tunnel length={RACE_LENGTH} currentZone={gameState.currentZone} />

      {obstacles.map(obs => (
        Math.abs(obs.distance - gameState.distance) < 100 && (
          <ObstacleItem
            key={obs.id}
            position={[obs.position[0], obs.position[1], -obs.distance]}
            size={obs.size}
            type={obs.type}
          />
        )
      ))}

      <PlayerSperm
        position={[playerXRef.current, playerYRef.current, -gameState.distance]}
        velocity={gameState.velocity}
      />

      {competitors.map(c => (
        Math.abs(c.distance - gameState.distance) < 70 && (
          <CompetitorSperm
            key={c.id}
            position={[c.offset[0], c.offset[1], -c.distance]}
            color={c.color}
            velocity={c.velocity}
          />
        )
      ))}

      <mesh position={[0, 0, -RACE_LENGTH - 25]}>
        <sphereGeometry args={[22, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffcc"
          emissiveIntensity={3}
          roughness={0}
          metalness={0.8}
        />
        <Sparkles count={3000} scale={50} size={20} speed={0.5} color="#fff" />
      </mesh>
    </>
  );
};

export const Game: React.FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusContainer = () => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
    };

    focusContainer();
    const timer1 = setTimeout(focusContainer, 100);
    const timer2 = setTimeout(focusContainer, 500);

    window.addEventListener('focus', focusContainer);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('focus', focusContainer);
    };
  }, []);

  const handleInteraction = () => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 outline-none"
      tabIndex={0}
      onClick={handleInteraction}
      onPointerDown={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <Canvas gl={{ antialias: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <Scene {...props} />
      </Canvas>
    </div>
  );
};
