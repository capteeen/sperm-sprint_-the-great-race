
import React, { useState, useCallback, useEffect } from 'react';
import { Game } from './components/Game';
import { HUD } from './components/HUD';
import { StartScreen } from './components/StartScreen';
import { GameState } from './types';

const TOTAL_PARTICIPANTS = 100;

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    velocity: 0,
    distance: 0,
    rank: 1,
    totalParticipants: TOTAL_PARTICIPANTS,
    isRacing: false,
    isFinished: false,
    rhythmScore: 0,
  });

  const handleStart = useCallback(() => {
    setGameState(prev => ({ ...prev, isRacing: true, isFinished: false, distance: 0, velocity: 0 }));
  }, []);

  const handleFinish = useCallback(() => {
    setGameState(prev => ({ ...prev, isRacing: false, isFinished: true }));
  }, []);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {!gameState.isRacing && !gameState.isFinished && (
        <StartScreen onStart={handleStart} />
      )}

      {(gameState.isRacing || gameState.isFinished) && (
        <>
          <Game 
            gameState={gameState} 
            onUpdate={updateGameState} 
            onFinish={handleFinish} 
          />
          <HUD gameState={gameState} onReset={() => setGameState({
            velocity: 0,
            distance: 0,
            rank: 1,
            totalParticipants: TOTAL_PARTICIPANTS,
            isRacing: false,
            isFinished: false,
            rhythmScore: 0,
          })} />
        </>
      )}
    </div>
  );
}
