
import React from 'react';
import { Trophy, Medal, Clock } from 'lucide-react';
import { Competitor } from '../types';

interface Props {
    competitors: Competitor[];
    playerDistance: number;
    playerName: string;
    isFinished: boolean;
    raceTime: number;
}

export const Leaderboard: React.FC<Props> = ({
    competitors,
    playerDistance,
    playerName,
    isFinished,
    raceTime
}) => {
    // Combine player with competitors and sort by distance
    const allRacers = [
        { id: 'player', name: playerName, distance: playerDistance, isPlayer: true },
        ...competitors.map(c => ({ ...c, isPlayer: false }))
    ].sort((a, b) => b.distance - a.distance);

    // Show top 8 racers
    const topRacers = allRacers.slice(0, 8);
    const playerRank = allRacers.findIndex(r => r.id === 'player') + 1;

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy size={14} className="text-yellow-400" />;
        if (rank === 2) return <Medal size={14} className="text-gray-300" />;
        if (rank === 3) return <Medal size={14} className="text-amber-600" />;
        return <span className="text-[10px] text-gray-500 w-[14px] text-center">{rank}</span>;
    };

    return (
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl min-w-[200px]">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                <Trophy size={14} className="text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {isFinished ? 'Final Results' : 'Live Standings'}
                </span>
                {raceTime > 0 && (
                    <span className="ml-auto text-[10px] text-gray-500 flex items-center gap-1">
                        <Clock size={10} />
                        {raceTime.toFixed(1)}s
                    </span>
                )}
            </div>

            <div className="space-y-1">
                {topRacers.map((racer, index) => (
                    <div
                        key={racer.id}
                        className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all ${racer.isPlayer
                                ? 'bg-cyan-500/20 border border-cyan-500/30'
                                : 'hover:bg-white/5'
                            }`}
                    >
                        <div className="w-5 flex justify-center">
                            {getRankIcon(index + 1)}
                        </div>
                        <span className={`text-xs font-bold flex-1 truncate ${racer.isPlayer ? 'text-cyan-400' : 'text-white'
                            }`}>
                            {racer.name}
                            {racer.isPlayer && ' (You)'}
                        </span>
                        <span className="text-[10px] text-gray-500">
                            {Math.floor(racer.distance)}m
                        </span>
                    </div>
                ))}
            </div>

            {playerRank > 8 && (
                <div className="mt-2 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                        <span className="text-[10px] text-gray-500 w-5 text-center">#{playerRank}</span>
                        <span className="text-xs font-bold text-cyan-400 flex-1">{playerName} (You)</span>
                        <span className="text-[10px] text-gray-500">{Math.floor(playerDistance)}m</span>
                    </div>
                </div>
            )}
        </div>
    );
};
