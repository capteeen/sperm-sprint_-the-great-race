
export interface LeaderboardEntry {
    id: string;
    name: string;
    distance: number;
    time: number;
}

export const GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
    { id: '1', name: 'SpeedySperm_82', distance: 1200, time: 42.5 },
    { id: '2', name: 'NitroTail_911', distance: 1200, time: 44.2 },
    { id: '3', name: 'AquaBullet_44', distance: 1200, time: 45.8 },
    { id: '4', name: 'TurboZoa_007', distance: 1200, time: 47.1 },
    { id: '5', name: 'FlashFlagellum', distance: 1200, time: 48.3 },
    { id: '6', name: 'BioDrift_22', distance: 1200, time: 51.2 },
    { id: '7', name: 'Glider_88', distance: 1200, time: 53.0 },
    { id: '8', name: 'SonicCell_99', distance: 1200, time: 55.4 },
    { id: '9', name: 'JetStream_X', distance: 1200, time: 58.1 },
    { id: '10', name: 'RapidRover_5', distance: 1200, time: 62.3 },
];

export const getNextRewardTime = () => {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    return nextHour.getTime();
};
