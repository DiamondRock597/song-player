// Playable track. Features map their song models to this (e.g. clip.coverUrl -> imageUrl).
export type Track = {
  id: string;
  title: string;
  audioUrl: string;
  imageUrl: string | null;
};

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
