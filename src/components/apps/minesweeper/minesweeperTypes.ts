export type DifficultyId = 'beginner' | 'intermediate';

export type Difficulty = {
  id: DifficultyId;
  label: string;
  w: number;
  h: number;
  mines: number;
};

export type Cell = {
  x: number;
  y: number;
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

export type GameStatus = 'ready' | 'playing' | 'lost' | 'won';

