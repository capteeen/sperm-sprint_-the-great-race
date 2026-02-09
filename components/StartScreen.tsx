
import React from 'react';
import { Play } from 'lucide-react';

interface Props {
  onStart: () => void;
  playerName: string;
  onNameChange: (name: string) => void;
}

export const StartScreen: React.FC<Props> = ({ onStart, playerName, onNameChange }) => {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-50"
      style={{
        backgroundImage: 'url(/assets/biological_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-lg text-center p-10">
        {/* Title */}
        <h1 className="text-7xl font-extrabold mb-2 tracking-tight text-white drop-shadow-[0_0_35px_rgba(180,50,100,0.7)]">
          SPERM
        </h1>
        <h1 className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-rose-400 mb-8 drop-shadow-[0_0_35px_rgba(180,50,100,0.7)]">
          RACE
        </h1>

        {/* Player Identity Input */}
        <div className="mb-8 p-5 bg-black/50 border border-pink-900/40 rounded-2xl backdrop-blur-sm">
          <label className="text-[11px] text-pink-400/70 uppercase tracking-[0.25em] block mb-3 font-bold">
            Your Swimmer Name
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full bg-transparent text-3xl font-bold text-pink-300 text-center outline-none placeholder:text-pink-900/50 focus:text-white transition-colors"
            placeholder="Enter Name..."
            maxLength={20}
          />
        </div>

        {/* Game Instructions */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left">
            <p className="text-xs font-bold text-pink-400 uppercase mb-1">Boost</p>
            <p className="text-sm text-gray-400">
              Tap <span className="text-white font-mono bg-white/10 px-1 rounded">SPACE</span> rhythmically
            </p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left">
            <p className="text-xs font-bold text-blue-400 uppercase mb-1">Steer</p>
            <p className="text-sm text-gray-400">
              Use <span className="text-white font-mono bg-white/10 px-1 rounded">←</span> <span className="text-white font-mono bg-white/10 px-1 rounded">→</span> arrows
            </p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="group w-full py-5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-rose-900/50 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <Play className="fill-current" size={20} />
          START
        </button>
      </div>
    </div>
  );
};
