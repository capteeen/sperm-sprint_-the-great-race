
import React, { useState, useCallback, useMemo } from 'react';
import { Game } from './components/Game';
import { HUD } from './components/HUD';
import { StartScreen } from './components/StartScreen';
import { GameState } from './types';
import { SPERM_NAMES } from './data/names';

const TOTAL_PARTICIPANTS = 100;

// Generate a random player name
const getRandomPlayerName = () => {
  const randomName = SPERM_NAMES[Math.floor(Math.random() * SPERM_NAMES.length)];
  return `${randomName}_${Math.floor(Math.random() * 1000)}`;
};

const getInitialState = (): GameState => ({
  velocity: 0,
  distance: 0,
  rank: 1,
  totalParticipants: TOTAL_PARTICIPANTS,
  isRacing: false,
  isFinished: false,
  rhythmScore: 0,
  currentZone: 'vagina',
  competitors: [],
  playerName: getRandomPlayerName(),
  raceTime: 0,
});

export default function App() {
  const [gameState, setGameState] = useState<GameState>(getInitialState);

  const handleStart = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isRacing: true,
      isFinished: false,
      distance: 0,
      velocity: 0,
      raceTime: 0,
    }));
  }, []);

  const handleFinish = useCallback(() => {
    setGameState(prev => ({ ...prev, isRacing: false, isFinished: true }));
  }, []);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleReset = useCallback(() => {
    setGameState({
      ...getInitialState(),
      playerName: getRandomPlayerName(), // New name each game
    });
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {!gameState.isRacing && !gameState.isFinished && (
        <StartScreen onStart={handleStart} playerName={gameState.playerName} />
      )}

      {(gameState.isRacing || gameState.isFinished) && (
        <>
          <Game
            gameState={gameState}
            onUpdate={updateGameState}
            onFinish={handleFinish}
          />
          <HUD gameState={gameState} onReset={handleReset} />
        </>
      )}
    </div>
  );
}
