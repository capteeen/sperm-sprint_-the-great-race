
import React from 'react';
import { Play, Info } from 'lucide-react';

interface Props {
  onStart: () => void;
  playerName: string;
  onNameChange: (name: string) => void;
}

export const StartScreen: React.FC<Props> = ({ onStart, playerName, onNameChange }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-md text-center p-8 border border-red-900/50 rounded-3xl bg-gradient-to-b from-red-950/20 to-black shadow-[0_0_50px_rgba(153,27,27,0.3)]">
        <h1 className="text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-white pulse-text italic">
          SPERM RACE
        </h1>

        {/* Player Identity Input */}
        <div className="mb-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl group focus-within:border-cyan-500/50 transition-all duration-300">
          <label className="text-[10px] text-cyan-500/50 uppercase tracking-[0.2em] block mb-2 font-bold">Your Bio-Identity</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full bg-transparent text-2xl font-black text-cyan-400 text-center outline-none placeholder:text-cyan-900/30 selection:bg-cyan-500/30"
            placeholder="Enter Name..."
            maxLength={20}
          />
          <div className="h-px w-0 group-focus-within:w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-all duration-500 mt-2 mx-auto" />
        </div>

        <p className="text-gray-400 mb-8 text-lg">
          Outswim 99 million competitors in a pulse-pounding biological race. Only the fastest survives.
        </p>

        <div className="space-y-4 mb-8 text-left bg-black/40 p-4 rounded-xl border border-white/5">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-red-500 rounded-md mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <p className="font-bold text-white">RHYTHM MECHANIC</p>
              <p className="text-sm text-gray-400">Tap <span className="text-red-400 font-mono">[SPACE]</span> or <span className="text-red-400 font-mono">[UP]</span> to the beat to gain massive momentum.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-500 rounded-md mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <p className="font-bold text-white">STEERING</p>
              <p className="text-sm text-gray-400">Use <span className="text-blue-400 font-mono">[LEFT/RIGHT]</span> to navigate the organic corridor.</p>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group relative flex items-center justify-center w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-full transition-all active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          <Play className="mr-2 fill-current" /> START THE RACE
        </button>
      </div>



      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
