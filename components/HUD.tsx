
import React from 'react';
import { Trophy, Zap, Map as MapIcon, RotateCcw, Activity, Clock } from 'lucide-react';
import { GameState, ZoneType } from '../types';
import { Commentary } from './Commentary';
import { Leaderboard } from './Leaderboard';

interface Props {
  gameState: GameState;
  onReset: () => void;
}

const ZONE_LABELS: Record<ZoneType, string> = {
  vagina: 'Vaginal Canal (The Barrier)',
  cervix: 'Cervical Labyrinth',
  uterus: 'The Great Uterus',
  tube: 'Fallopian Final Sprint',
};

export const HUD: React.FC<Props> = ({ gameState, onReset }) => {
  const speedPercentage = Math.min(100, (gameState.velocity / 1.3) * 100);
  const totalLength = 1200;
  const progress = (gameState.distance / totalLength) * 100;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
      {/* Top Bar: Rank & Zone */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-6 shadow-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Rank</span>
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-yellow-500" />
                <span className="text-2xl font-black italic">#{gameState.rank.toLocaleString()}</span>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Rhythm Multiplier</span>
              <div className="flex items-center gap-2">
                <Zap size={18} className={gameState.rhythmScore > 50 ? 'text-blue-400 animate-pulse' : 'text-gray-500'} />
                <span className={`text-2xl font-black italic ${gameState.rhythmScore > 50 ? 'text-blue-400' : 'text-white'}`}>
                  {gameState.rhythmScore}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-red-600/20 border border-red-500/30 px-4 py-2 rounded-xl backdrop-blur-md self-start">
            <span className="text-xs font-black uppercase text-red-400 flex items-center gap-2">
              <Activity size={14} className="animate-pulse" />
              Location: {ZONE_LABELS[gameState.currentZone]}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Commentary gameState={gameState} />

          {/* Live Leaderboard */}
          {gameState.competitors.length > 0 && (
            <Leaderboard
              competitors={gameState.competitors}
              playerDistance={gameState.distance}
              playerName={gameState.playerName}
              isFinished={gameState.isFinished}
              raceTime={gameState.raceTime}
            />
          )}
        </div>
      </div>

      {/* Win Modal */}
      {gameState.isFinished && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/90 backdrop-blur-xl z-50">
          <div className="text-center p-12 border-4 border-yellow-500/50 rounded-[4rem] bg-gradient-to-b from-yellow-950/20 to-black max-w-lg shadow-[0_0_100px_rgba(234,179,8,0.3)]">
            <h2 className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white italic leading-tight">
              LIFE BEGUN!
            </h2>
            <p className="text-2xl text-white font-bold mb-2">You outran 100 million rivals.</p>
            <div className="flex items-center justify-center gap-4 text-gray-400 mb-4">
              <span>Final Rank: #{gameState.rank.toLocaleString()}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                Time: {gameState.raceTime.toFixed(1)}s
              </span>
            </div>

            {/* Final Leaderboard */}
            {gameState.competitors.length > 0 && (
              <div className="mb-6">
                <Leaderboard
                  competitors={gameState.competitors}
                  playerDistance={gameState.distance}
                  playerName={gameState.playerName}
                  isFinished={true}
                  raceTime={gameState.raceTime}
                />
              </div>
            )}

            <button
              onClick={onReset}
              className="flex items-center gap-2 mx-auto px-10 py-5 bg-yellow-500 text-black font-black text-2xl rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <RotateCcw /> EVOLVE AGAIN
            </button>
          </div>
        </div>
      )}

      {/* Bottom Bar: Full Mini-Map */}
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full max-w-4xl mx-auto bg-black/80 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] shadow-2xl">
          <div className="flex justify-between items-end mb-2 px-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Full Biological Map</span>
            <span className="text-sm font-black text-white italic">{Math.floor(progress)}% Progress</span>
          </div>

          <div className="relative h-10 w-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex">
            {/* Zone Markers */}
            <div className="absolute inset-0 flex">
              <div className="flex-1 border-r border-white/5 flex items-center justify-center"><span className="text-[8px] text-red-500/40 font-bold uppercase">Vagina</span></div>
              <div className="flex-1 border-r border-white/5 flex items-center justify-center"><span className="text-[8px] text-pink-500/40 font-bold uppercase">Cervix</span></div>
              <div className="flex-1 border-r border-white/5 flex items-center justify-center"><span className="text-[8px] text-purple-500/40 font-bold uppercase">Uterus</span></div>
              <div className="flex-1 flex items-center justify-center"><span className="text-[8px] text-blue-500/40 font-bold uppercase">Tube</span></div>
            </div>

            {/* Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-red-600 via-pink-500 to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-10"
              style={{ width: `${progress}%` }}
            >
              {/* Animated Head Pin */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff] border-2 border-black" />
            </div>
          </div>

          <div className="flex justify-between mt-2 px-2">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="w-2 h-2 rounded-full bg-red-500" /> START
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" /> THE EGG
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black italic text-white leading-none">
                {Math.floor(gameState.velocity * 1000)}
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase">nm/sec</span>
            </div>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="flex justify-center gap-4 text-xs font-black uppercase text-gray-600 tracking-widest pb-2">
          <span>[SPACE] Swim</span>
          <span className="text-white/20">•</span>
          <span>[← →] Steering</span>
          <span className="text-white/20">•</span>
          <span>Reach the Egg</span>
        </div>
      </div>
    </div>
  );
};
