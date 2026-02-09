
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareText } from 'lucide-react';
import { getRaceCommentary } from '../services/gemini';
import { GameState } from '../types';

export const Commentary: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  const [comment, setComment] = useState("On your marks! Get set! FERTILIZE!");
  const [isUpdating, setIsUpdating] = useState(false);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    if (!gameState.isRacing) return;

    const interval = setInterval(async () => {
      const now = Date.now();
      if (now - lastUpdateRef.current > 7000) { 
        setIsUpdating(true);
        const progress = (gameState.distance / 1200) * 100;
        const newComment = await getRaceCommentary(
          gameState.rank, 
          progress, 
          gameState.rhythmScore, 
          gameState.currentZone
        );
        setComment(newComment);
        setIsUpdating(false);
        lastUpdateRef.current = now;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.isRacing, gameState.rank, gameState.distance, gameState.rhythmScore, gameState.currentZone]);

  return (
    <div className={`transition-all duration-500 max-w-xs ${isUpdating ? 'opacity-50 translate-x-4' : 'opacity-100 translate-x-0'}`}>
      <div className="bg-white text-black p-4 rounded-3xl rounded-tr-none shadow-[0_15px_30px_rgba(0,0,0,0.5)] relative border-b-4 border-red-500">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Biological Broadcast</span>
        </div>
        <p className="text-sm font-black leading-tight italic">
          "{comment}"
        </p>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </div>
    </div>
  );
};
