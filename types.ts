
export type ZoneType = 'vagina' | 'cervix' | 'uterus' | 'tube';

export interface GameState {
  velocity: number;
  distance: number;
  rank: number;
  totalParticipants: number;
  isRacing: boolean;
  isFinished: boolean;
  rhythmScore: number;
  currentZone: ZoneType;
}

export interface Competitor {
  id: string;
  name: string;
  distance: number;
  velocity: number;
  offset: [number, number];
  color: string;
}

export interface Obstacle {
  id: string;
  distance: number;
  position: [number, number];
  size: number;
  type: 'enzyme' | 'cell' | 'wall';
}

export interface Comment {
  text: string;
  timestamp: number;
}
