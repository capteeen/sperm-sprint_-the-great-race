
import React, { useState, useEffect } from 'react';
import { Trophy, Play, ChevronDown } from 'lucide-react';
import { GLOBAL_LEADERBOARD, getNextRewardTime } from '../data/leaderboard';

interface Props {
    onPlay: () => void;
}

export const LandingPage: React.FC<Props> = ({ onPlay }) => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const timer = setInterval(() => {
            const target = getNextRewardTime();
            const diff = target - Date.now();
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${mins}m ${secs}s`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#050203] text-white overflow-y-auto">
            {/* Hero */}
            <section
                className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
                style={{
                    backgroundImage: 'url(/assets/biological_bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050203]" />

                <div className="relative z-10 text-center max-w-3xl">
                    <p className="text-pink-400/80 text-sm uppercase tracking-[0.4em] mb-4 font-bold">
                        The Ultimate Race
                    </p>
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none mb-6">
                        <span className="block text-white">SPERM</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
                            RACE
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                        Navigate the biological gauntlet. Outswim 99 million rivals. Win hourly rewards.
                    </p>
                    <button
                        onClick={onPlay}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-rose-900/50 transition-all active:scale-[0.98]"
                    >
                        <Play className="fill-current" size={22} />
                        PLAY NOW
                    </button>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="text-gray-500" />
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-extrabold text-center mb-16 uppercase tracking-wide">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-4xl font-bold text-pink-500 mb-3">01</div>
                        <h3 className="font-bold text-lg mb-2">Enter the Race</h3>
                        <p className="text-sm text-gray-500">
                            Choose your swimmer name and enter the biological gauntlet.
                        </p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-4xl font-bold text-pink-500 mb-3">02</div>
                        <h3 className="font-bold text-lg mb-2">Tap to the Beat</h3>
                        <p className="text-sm text-gray-500">
                            Time your taps perfectly for maximum speed bursts and momentum.
                        </p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-4xl font-bold text-pink-500 mb-3">03</div>
                        <h3 className="font-bold text-lg mb-2">Win Rewards</h3>
                        <p className="text-sm text-gray-500">
                            Top the hourly leaderboard to earn Pumpfun Creator Rewards.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Journey Section */}
            <section className="relative py-24 px-6 min-h-[700px] overflow-hidden">
                {/* 3D Model Background */}
                <div className="absolute inset-0 z-0">
                    <iframe
                        title="Uterus and Ovaries"
                        frameBorder="0"
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        src="https://sketchfab.com/models/aeb509d93c7b4ac3be79da423ca6f706/embed?autospin=1&autostart=1&annotations_visible=0&ui_stop=0&ui_inspector=0&ui_infos=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_animations=0&transparent=1&preload=1"
                        className="w-full h-full scale-125"
                    />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#080406]/90 via-[#080406]/70 to-[#080406]/95 z-10" />

                {/* Content */}
                <div className="relative z-20 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-center mb-4 uppercase tracking-wide">
                        The Journey
                    </h2>
                    <p className="text-center text-gray-400 mb-16 max-w-xl mx-auto text-sm">
                        1200 meters of biological challenge. Only the fastest survive.
                    </p>

                    {/* Visual Journey Path */}
                    <div className="relative">
                        {/* Journey Nodes */}
                        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
                            {/* Start Point */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-300 flex items-center justify-center shadow-lg shadow-white/20 mb-3 relative">
                                    <span className="text-2xl">🏁</span>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                                        <span className="text-[8px]">GO</span>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-white">START</p>
                                <p className="text-[10px] text-gray-500">0m</p>
                            </div>

                            {/* Zone 1: Vagina */}
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-red-500/30 mb-3 border-2 border-red-400/50 hover:scale-110 transition-transform">
                                    <img src="/assets/zone_vagina.png" alt="Vagina Zone" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[10px] text-red-400 uppercase tracking-widest">Zone 1</p>
                                <p className="text-sm font-bold text-white">Vagina</p>
                                <p className="text-[10px] text-gray-500">0-300m</p>
                            </div>

                            {/* Zone 2: Cervix */}
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-cyan-500/30 mb-3 border-2 border-cyan-400/50 hover:scale-110 transition-transform">
                                    <img src="/assets/zone_cervix.png" alt="Cervix Zone" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[10px] text-cyan-400 uppercase tracking-widest">Zone 2</p>
                                <p className="text-sm font-bold text-white">Cervix</p>
                                <p className="text-[10px] text-gray-500">300-500m</p>
                            </div>

                            {/* Zone 3: Uterus */}
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-pink-500/30 mb-3 border-2 border-pink-400/50 hover:scale-110 transition-transform">
                                    <img src="/assets/zone_uterus.png" alt="Uterus Zone" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[10px] text-pink-400 uppercase tracking-widest">Zone 3</p>
                                <p className="text-sm font-bold text-white">Uterus</p>
                                <p className="text-[10px] text-gray-500">500-900m</p>
                            </div>

                            {/* Zone 4: Fallopian Tube */}
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-amber-500/30 mb-3 border-2 border-amber-400/50 hover:scale-110 transition-transform">
                                    <img src="/assets/zone_fallopian.png" alt="Fallopian Tube Zone" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[10px] text-amber-400 uppercase tracking-widest">Zone 4</p>
                                <p className="text-sm font-bold text-white">Fallopian</p>
                                <p className="text-[10px] text-gray-500">900-1200m</p>
                            </div>

                            {/* Finish: The Egg */}
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.5)] mb-3 border-4 border-yellow-200 animate-pulse">
                                    <img src="/assets/zone_egg.png" alt="The Egg" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-xs font-bold text-yellow-400">THE EGG</p>
                                <p className="text-[10px] text-gray-500">1200m</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-16 flex justify-center gap-12 text-center">
                        <div>
                            <p className="text-2xl font-bold text-white">1,200m</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Distance</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">4</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Zones</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">99M+</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Competitors</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hourly Rewards Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-[#0a0608] to-[#050203]">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-16">
                    <div className="flex-1">
                        <p className="text-rose-400 text-xs uppercase tracking-[0.3em] font-bold mb-3">
                            Pumpfun Creator Rewards
                        </p>
                        <h2 className="text-4xl font-extrabold mb-6">Hourly Payouts</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Every hour, the top player on the leaderboard receives a share of the creator reward pool. Stay in the lead to keep earning.
                        </p>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Next Payout</p>
                                <p className="text-3xl font-mono font-bold text-white">{timeLeft}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Current Leader</p>
                                <p className="text-2xl font-bold text-rose-400">SpeedySperm_82</p>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard Card */}
                    <div className="w-full md:w-80 p-6 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-5">
                            <Trophy className="text-yellow-500" size={18} />
                            <h3 className="font-bold">Leaderboard</h3>
                        </div>
                        <div className="space-y-3">
                            {GLOBAL_LEADERBOARD.slice(0, 5).map((entry, idx) => (
                                <div key={entry.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600 font-mono font-bold w-4">{idx + 1}</span>
                                        <span className="font-semibold">{entry.name}</span>
                                    </div>
                                    <span className="text-gray-500 font-mono">{entry.time}s</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 text-center text-gray-600 border-t border-white/5">
                <p className="text-xs uppercase tracking-[0.4em]">Sperm Race &copy; 2026</p>
            </footer>
        </div>
    );
};
